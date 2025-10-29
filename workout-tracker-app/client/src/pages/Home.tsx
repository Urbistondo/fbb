import { useEffect, useState } from "react";
import { ChevronDown, Dumbbell, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";

interface WorkoutData {
  title: string;
  subtitle: string;
  note: string;
  weeklyProgression: Array<{ week: string; description: string }>;
  days: Array<{
    id: number;
    title: string;
    conditioningNote: string;
    exercises: Array<{
      id: string;
      number: string;
      name: string;
      sets: string;
      rest: string;
      notes: string;
    }>;
    supersets: Array<{
      label: string;
      exercises: Array<{
        id: string;
        number: string;
        name: string;
        sets: string;
        rest: string;
        notes: string;
      }>;
    }>;
    exercises2?: Array<{
      id: string;
      number: string;
      name: string;
      sets: string;
      rest: string;
      notes: string;
    }>;
  }>;
  conditioningProgression: Array<{
    week: string;
    volumeDensity: string;
    notes: string;
  }>;
  priorityBumps: string;
  recovery: string;
  footer: string;
}

interface SetData {
  weight: string;
  reps: string;
}

interface ExerciseTracking {
  [exerciseId: string]: SetData[];
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [workoutData, setWorkoutData] = useState<WorkoutData | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [tracking, setTracking] = useState<ExerciseTracking>({});

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const response = await fetch("/workoutData.json");
        const data = await response.json();
        setWorkoutData(data);
      } catch (error) {
        console.error("Failed to load workout data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutData();
  }, []);

  useEffect(() => {
    // Load tracking data from localStorage
    const saved = localStorage.getItem("workoutTracking");
    if (saved) {
      try {
        setTracking(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load tracking data:", error);
      }
    }
  }, []);

  const updateTracking = (exerciseId: string, setIndex: number, weight: string, reps: string) => {
    const newTracking = { ...tracking };
    if (!newTracking[exerciseId]) {
      newTracking[exerciseId] = [];
    }
    newTracking[exerciseId][setIndex] = { weight, reps };
    setTracking(newTracking);
    localStorage.setItem("workoutTracking", JSON.stringify(newTracking));
  };

  if (loading || !workoutData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Dumbbell className="w-12 h-12 mx-auto mb-4 animate-pulse text-accent" />
          <p className="text-foreground/60">Loading your workout plan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Dumbbell className="w-6 h-6 text-accent" />
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                {workoutData.title.split("—")[0].trim()}
              </h1>
              <p className="text-xs text-foreground/60">
                {workoutData.title.split("—")[1]?.trim()}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Subtitle and Note */}
        <div className="mb-8 space-y-2">
          <p className="text-sm text-foreground/70 font-medium">
            {workoutData.subtitle}
          </p>
          <p className="text-xs text-foreground/50 italic">{workoutData.note}</p>
        </div>

        {/* Weekly Progression */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
            Weekly Progression
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {workoutData.weeklyProgression.map((week) => (
              <Card key={week.week} className="p-4 bg-card/50 border-border/50">
                <p className="font-semibold text-sm text-accent mb-2">{week.week}</p>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  {week.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Workout Days */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold text-foreground mb-6 uppercase tracking-wide">
            Workout Days
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {workoutData.days.map((day) => (
              <Card
                key={day.id}
                className="overflow-hidden bg-card border-border/50 hover:border-border transition-colors"
              >
                <button
                  onClick={() =>
                    setExpandedDay(expandedDay === day.id ? null : day.id)
                  }
                  className="w-full p-4 flex items-center justify-between hover:bg-accent/5 transition-colors"
                >
                  <h3 className="text-sm font-semibold text-foreground text-left">
                    {day.title}
                  </h3>
                  <ChevronDown
                    className={`w-4 h-4 text-foreground/60 transition-transform ${
                      expandedDay === day.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedDay === day.id && (
                  <div className="border-t border-border/50 p-4 space-y-4">
                    {/* Main Exercises */}
                    {day.exercises.map((exercise) => (
                      <ExerciseItem
                        key={exercise.id}
                        exercise={exercise}
                        exerciseId={exercise.id}
                        tracking={tracking[exercise.id] || []}
                        onUpdate={(setIndex, weight, reps) =>
                          updateTracking(exercise.id, setIndex, weight, reps)
                        }
                      />
                    ))}

                    {/* Supersets */}
                    {day.supersets.map((superset, idx) => (
                      <div key={idx} className="space-y-2">
                        <p className="text-xs font-semibold text-accent/80 uppercase tracking-wide">
                          {superset.label}
                        </p>
                        {superset.exercises.map((exercise) => (
                          <ExerciseItem
                            key={exercise.id}
                            exercise={exercise}
                            exerciseId={exercise.id}
                            isSuperset
                            tracking={tracking[exercise.id] || []}
                            onUpdate={(setIndex, weight, reps) =>
                              updateTracking(exercise.id, setIndex, weight, reps)
                            }
                          />
                        ))}
                      </div>
                    ))}

                    {/* Additional Exercises */}
                    {day.exercises2 &&
                      day.exercises2.map((exercise) => (
                        <ExerciseItem
                          key={exercise.id}
                          exercise={exercise}
                          exerciseId={exercise.id}
                          tracking={tracking[exercise.id] || []}
                          onUpdate={(setIndex, weight, reps) =>
                            updateTracking(exercise.id, setIndex, weight, reps)
                          }
                        />
                      ))}

                    {/* Conditioning Note */}
                    <div className="pt-3 border-t border-border/50">
                      <p className="text-xs text-foreground/60 italic">
                        <span className="font-semibold">Conditioning:</span>{" "}
                        {day.conditioningNote}
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Conditioning Progression */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
            Conditioning Progression
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 font-semibold text-foreground/80 w-16">
                    Week
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground/80">
                    Volume & Density
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground/80">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {workoutData.conditioningProgression.map((row) => (
                  <tr
                    key={row.week}
                    className="border-b border-border/30 hover:bg-accent/5 transition-colors"
                  >
                    <td className="py-3 px-4 font-semibold text-accent">{row.week}</td>
                    <td className="py-3 px-4 text-foreground/70">{row.volumeDensity}</td>
                    <td className="py-3 px-4 text-foreground/60 text-xs">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recovery & Tips */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Priority Bumps
            </h3>
            <p className="text-xs text-foreground/70 leading-relaxed">
              {workoutData.priorityBumps}
            </p>
          </Card>
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Recovery Tips
            </h3>
            <p className="text-xs text-foreground/70 leading-relaxed">
              {workoutData.recovery}
            </p>
          </Card>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-border/50 text-center">
          <p className="text-xs text-foreground/50 italic">{workoutData.footer}</p>
        </footer>
      </main>
    </div>
  );
}

function ExerciseItem({
  exercise,
  exerciseId,
  isSuperset = false,
  tracking = [],
  onUpdate,
}: {
  exercise: {
    number: string;
    name: string;
    sets: string;
    rest: string;
    notes: string;
  };
  exerciseId: string;
  isSuperset?: boolean;
  tracking?: SetData[];
  onUpdate?: (setIndex: number, weight: string, reps: string) => void;
}) {
  const [showInputs, setShowInputs] = useState(false);
  const setCount = parseInt(exercise.sets.split("x")[0]) || 1;
  const sets = Array.from({ length: setCount }, (_, i) => i);

  return (
    <div className={`space-y-2 ${isSuperset ? "pl-4 border-l-2 border-accent/30" : ""}`}>
      <button
        onClick={() => setShowInputs(!showInputs)}
        className="w-full text-left group"
      >
        <div className="flex items-start gap-3 p-2 rounded-lg transition-all group-hover:bg-accent/5">
          <span className="text-xs font-semibold text-accent/70 min-w-fit pt-0.5">
            {exercise.number}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{exercise.name}</p>
            <p className="text-xs text-foreground/60 mt-1">{exercise.sets}</p>
            {exercise.rest && exercise.rest !== "—" && (
              <p className="text-xs text-foreground/50 mt-0.5">
                Rest: {exercise.rest.replace(/\n/g, " • ")}
              </p>
            )}
          </div>
        </div>
      </button>

      {showInputs && (
        <div className="space-y-2 mt-2 p-3 rounded-lg bg-gradient-to-br from-accent/5 via-transparent to-accent/5 border border-accent/10 backdrop-blur-sm">
          {sets.map((setIndex) => {
            const setData = tracking[setIndex] || { weight: "", reps: "" };
            return (
              <div key={setIndex} className="flex items-center gap-2">
                <span className="text-xs font-medium text-accent/60 min-w-fit">Set {setIndex + 1}</span>
                <input
                  type="number"
                  placeholder="Weight (kg)"
                  value={setData.weight}
                  onChange={(e) =>
                    onUpdate?.(setIndex, e.target.value, setData.reps)
                  }
                  className="flex-1 px-2 py-1.5 text-xs rounded-md bg-background/50 border border-accent/20 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all"
                />
                <input
                  type="number"
                  placeholder="Reps"
                  value={setData.reps}
                  onChange={(e) =>
                    onUpdate?.(setIndex, setData.weight, e.target.value)
                  }
                  className="w-16 px-2 py-1.5 text-xs rounded-md bg-background/50 border border-accent/20 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
