import { useCallback, useEffect, useState } from "react";
import type {
  ExerciseHistory,
  LegacyTrackingData,
  SetData,
  TrackingData,
  WorkoutDay,
} from "@/types/workout";

const STORAGE_KEY = "workoutTracking";

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function isLegacyData(data: unknown): data is LegacyTrackingData {
  if (!data || typeof data !== "object") return false;
  return !("version" in (data as Record<string, unknown>));
}

function migrateLegacyData(legacy: LegacyTrackingData): TrackingData {
  const exercises: TrackingData["exercises"] = {};
  for (const [id, sets] of Object.entries(legacy)) {
    exercises[id] = {
      current: sets.map((s) => ({ weight: s.weight, reps: s.reps })),
    };
  }
  return { version: 2, activeDate: getToday(), exercises };
}

function loadTracking(): TrackingData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { version: 2, activeDate: getToday(), exercises: {} };

    const parsed = JSON.parse(raw);
    if (isLegacyData(parsed)) {
      const migrated = migrateLegacyData(parsed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
    return parsed as TrackingData;
  } catch {
    return { version: 2, activeDate: getToday(), exercises: {} };
  }
}

function getAllExercisesForDay(day: WorkoutDay): string[] {
  const ids: string[] = [];
  day.exercises.forEach((e) => ids.push(e.id));
  day.supersets.forEach((s) => s.exercises.forEach((e) => ids.push(e.id)));
  day.exercises2?.forEach((e) => ids.push(e.id));
  return ids;
}

function parseSetCount(setsStr: string): number {
  const match = setsStr.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}

export function useWorkoutTracking() {
  const [tracking, setTracking] = useState<TrackingData>(loadTracking);

  const persist = useCallback((data: TrackingData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  // Sync state to localStorage on every change
  useEffect(() => {
    persist(tracking);
  }, [tracking, persist]);

  const isNewDay = tracking.activeDate !== getToday();

  const getExerciseSets = useCallback(
    (exerciseId: string): SetData[] => {
      return tracking.exercises[exerciseId]?.current ?? [];
    },
    [tracking]
  );

  const getLastSession = useCallback(
    (exerciseId: string) => {
      return tracking.exercises[exerciseId]?.lastSession;
    },
    [tracking]
  );

  const updateSet = useCallback(
    (
      exerciseId: string,
      setIndex: number,
      field: keyof SetData,
      value: string | number | undefined
    ) => {
      setTracking((prev) => {
        const exercises = { ...prev.exercises };
        const history: ExerciseHistory = exercises[exerciseId]
          ? { ...exercises[exerciseId], current: [...exercises[exerciseId].current] }
          : { current: [] };

        // Ensure array is long enough
        while (history.current.length <= setIndex) {
          history.current.push({ weight: "", reps: "" });
        }

        history.current[setIndex] = {
          ...history.current[setIndex],
          [field]: value,
        };

        exercises[exerciseId] = history;
        return { ...prev, exercises };
      });
    },
    []
  );

  const isSetComplete = useCallback((set: SetData): boolean => {
    return set.weight !== "" && set.reps !== "";
  }, []);

  const isExerciseComplete = useCallback(
    (exerciseId: string, setsStr: string): boolean => {
      const sets = getExerciseSets(exerciseId);
      const expected = parseSetCount(setsStr);
      if (sets.length < expected) return false;
      return sets.slice(0, expected).every((s) => s.weight !== "" && s.reps !== "");
    },
    [getExerciseSets]
  );

  const getDayProgress = useCallback(
    (day: WorkoutDay): { completed: number; total: number } => {
      let completed = 0;
      let total = 0;

      const check = (e: { id: string; sets: string }) => {
        total++;
        if (isExerciseComplete(e.id, e.sets)) completed++;
      };

      day.exercises.forEach(check);
      day.supersets.forEach((s) => s.exercises.forEach(check));
      day.exercises2?.forEach(check);

      return { completed, total };
    },
    [isExerciseComplete]
  );

  const startNewSession = useCallback(() => {
    setTracking((prev) => {
      const exercises: TrackingData["exercises"] = {};
      for (const [id, history] of Object.entries(prev.exercises)) {
        const hasCurrent = history.current.some(
          (s) => s.weight !== "" || s.reps !== ""
        );
        exercises[id] = {
          current: [],
          lastSession: hasCurrent
            ? { date: prev.activeDate, sets: history.current }
            : history.lastSession,
        };
      }
      return { version: 2, activeDate: getToday(), exercises };
    });
  }, []);

  const dismissNewDay = useCallback(() => {
    setTracking((prev) => ({ ...prev, activeDate: getToday() }));
  }, []);

  return {
    tracking,
    updateSet,
    getExerciseSets,
    getLastSession,
    isSetComplete,
    isExerciseComplete,
    getDayProgress,
    startNewSession,
    dismissNewDay,
    isNewDay,
  };
}
