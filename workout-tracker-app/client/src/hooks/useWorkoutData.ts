import { useEffect, useState } from "react";
import type { WorkoutData } from "@/types/workout";

export function useWorkoutData() {
  const [data, setData] = useState<WorkoutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/workoutData.json")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Failed to load workout data:", err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
