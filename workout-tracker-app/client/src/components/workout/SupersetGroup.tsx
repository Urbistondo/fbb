import { ExerciseCard } from "./ExerciseCard";
import type { Superset, SetData, SessionEntry } from "@/types/workout";

interface SupersetGroupProps {
  superset: Superset;
  getExerciseSets: (id: string) => SetData[];
  getLastSession: (id: string) => SessionEntry | undefined;
  isExerciseComplete: (id: string, sets: string) => boolean;
  onUpdateSet: (exerciseId: string, setIndex: number, field: keyof SetData, value: string | number | undefined) => void;
}

function parseSetCount(setsStr: string): number {
  const match = setsStr.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}

export function SupersetGroup({
  superset,
  getExerciseSets,
  getLastSession,
  isExerciseComplete,
  onUpdateSet,
}: SupersetGroupProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-primary/60 uppercase tracking-wide px-1">
        {superset.label}
      </p>
      <div className="space-y-2">
        {superset.exercises.map((exercise) => (
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
            isSuperset
          />
        ))}
      </div>
    </div>
  );
}
