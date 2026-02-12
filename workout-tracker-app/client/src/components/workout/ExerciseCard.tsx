import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SetLogRow } from "./SetLogRow";
import type { Exercise, SetData, SessionEntry } from "@/types/workout";

interface ExerciseCardProps {
  exercise: Exercise;
  sets: SetData[];
  lastSession?: SessionEntry;
  expectedSetCount: number;
  isComplete: boolean;
  onUpdateSet: (setIndex: number, field: keyof SetData, value: string | number | undefined) => void;
  isSuperset?: boolean;
}

export function ExerciseCard({
  exercise,
  sets,
  lastSession,
  expectedSetCount,
  isComplete,
  onUpdateSet,
  isSuperset = false,
}: ExerciseCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const completedSets = sets.filter((s) => s.weight !== "" && s.reps !== "").length;
  const setsArray = Array.from({ length: expectedSetCount }, (_, i) => i);

  // Find last session summary for comparison
  const lastSummary = lastSession?.sets?.[0];

  return (
    <div
      className={cn(
        "rounded-xl border transition-all",
        isComplete
          ? "bg-success/5 border-success/20"
          : isOpen
            ? "bg-card border-border"
            : "bg-card/50 border-border/50 hover:border-border",
        isSuperset && "ml-3 border-l-2 border-l-primary/30"
      )}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 flex items-center gap-3 min-h-[52px]"
      >
        {/* Exercise number */}
        <span className="text-xs font-bold text-primary/70 min-w-[28px] text-center">
          {exercise.number}
        </span>

        {/* Exercise info */}
        <div className="flex-1 min-w-0 text-left">
          <p className="text-base font-medium text-foreground leading-tight truncate">
            {exercise.name}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-sm text-muted-foreground">{exercise.sets}</p>
            {lastSummary && (
              <span className="text-xs text-muted-foreground/60">
                · Last: {lastSummary.weight}kg × {lastSummary.reps}
              </span>
            )}
          </div>
        </div>

        {/* Completion badge */}
        <div className="flex items-center gap-2">
          {completedSets > 0 && (
            <span
              className={cn(
                "text-xs font-semibold px-2 py-0.5 rounded-full",
                isComplete
                  ? "bg-success/15 text-success"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {isComplete ? (
                <Check className="w-3.5 h-3.5 inline-block" />
              ) : (
                `${completedSets}/${expectedSetCount}`
              )}
            </span>
          )}

          <ChevronDown
            className={cn(
              "w-4 h-4 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-3 border-t border-border/50">
              {/* Rest info */}
              {exercise.rest && exercise.rest !== "—" && (
                <p className="text-xs text-muted-foreground pt-2">
                  Rest: {exercise.rest.replace(/\n/g, " · ")}
                </p>
              )}

              {/* Set rows */}
              <div className="space-y-3 pt-1">
                {setsArray.map((setIndex) => {
                  const setData = sets[setIndex] || {
                    weight: "",
                    reps: "",
                  };
                  return (
                    <SetLogRow
                      key={setIndex}
                      setIndex={setIndex}
                      data={setData}
                      onUpdate={(field, value) =>
                        onUpdateSet(setIndex, field, value)
                      }
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
