// === Workout Program Types (from workoutData.json) ===

export interface Exercise {
  id: string;
  number: string;
  name: string;
  sets: string;
  rest: string;
  notes: string;
}

export interface Superset {
  label: string;
  exercises: Exercise[];
}

export interface WorkoutDay {
  id: number;
  title: string;
  conditioningNote: string;
  exercises: Exercise[];
  supersets: Superset[];
  exercises2?: Exercise[];
}

export interface WorkoutData {
  title: string;
  subtitle: string;
  note: string;
  weeklyProgression: Array<{ week: string; description: string }>;
  days: WorkoutDay[];
  conditioningProgression: Array<{
    week: string;
    volumeDensity: string;
    notes: string;
  }>;
  priorityBumps: string;
  recovery: string;
  footer: string;
}

// === Tracking Data Model (localStorage) ===

export interface SetData {
  weight: string;
  reps: string;
  rpe?: number;
  note?: string;
}

export interface SessionEntry {
  date: string;
  sets: SetData[];
}

export interface ExerciseHistory {
  current: SetData[];
  lastSession?: SessionEntry;
}

export interface TrackingData {
  version: 2;
  activeDate: string;
  exercises: Record<string, ExerciseHistory>;
}

// Legacy format for migration
export interface LegacyTrackingData {
  [exerciseId: string]: Array<{ weight: string; reps: string }>;
}
