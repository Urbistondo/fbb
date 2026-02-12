import { motion } from "framer-motion";
import { ExerciseCard } from "./ExerciseCard";
import { SupersetGroup } from "./SupersetGroup";
import { DaySummary } from "./DaySummary";
import type { WorkoutDay, SetData, SessionEntry } from "@/types/workout";

interface DayViewProps {
  day: WorkoutDay;
  activeDate: string;
  progress: { completed: number; total: number };
  getExerciseSets: (id: string) => SetData[];
  getLastSession: (id: string) => SessionEntry | undefined;
  isExerciseComplete: (id: string, sets: string) => boolean;
  onUpdateSet: (exerciseId: string, setIndex: number, field: keyof SetData, value: string | number | undefined) => void;
}

function parseSetCount(setsStr: string): number {
  const match = setsStr.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}

export function DayView({
  day,
  activeDate,
  progress,
  getExerciseSets,
  getLastSession,
  isExerciseComplete,
  onUpdateSet,
}: DayViewProps) {
  return (
    <motion.div
      key={day.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="pb-8"
    >
      {/* Day header + progress */}
      <DaySummary
        title={day.title}
        date={activeDate}
        progress={progress}
        conditioningNote={day.conditioningNote}
      />

      {/* Exercises */}
      <div className="space-y-3 px-4 pt-4">
        {/* Main exercises */}
        {day.exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            sets={getExerciseSets(exercise.id)}
            lastSession={getLastSession(exercise.id)}
            expectedSetCount={parseSetCount(exercise.sets)}
            isComplete={isExerciseComplete(exercise.id, exercise.sets)}
            onUpdateSet={(setIndex, field, value) =>
              onUpdateSet(exercise.id, setIndex, field, value)
            }
          />
        ))}

        {/* Supersets */}
        {day.supersets.map((superset, idx) => (
          <SupersetGroup
            key={idx}
            superset={superset}
            getExerciseSets={getExerciseSets}
            getLastSession={getLastSession}
            isExerciseComplete={isExerciseComplete}
            onUpdateSet={onUpdateSet}
          />
        ))}

        {/* Additional exercises */}
        {day.exercises2?.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            sets={getExerciseSets(exercise.id)}
            lastSession={getLastSession(exercise.id)}
            expectedSetCount={parseSetCount(exercise.sets)}
            isComplete={isExerciseComplete(exercise.id, exercise.sets)}
            onUpdateSet={(setIndex, field, value) =>
              onUpdateSet(exercise.id, setIndex, field, value)
            }
          />
        ))}
      </div>
    </motion.div>
  );
}
