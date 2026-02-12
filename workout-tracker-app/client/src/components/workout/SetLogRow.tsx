import { useState } from "react";
import { Check, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { RpeSelector } from "./RpeSelector";
import type { SetData } from "@/types/workout";

interface SetLogRowProps {
  setIndex: number;
  data: SetData;
  onUpdate: (field: keyof SetData, value: string | number | undefined) => void;
}

export function SetLogRow({ setIndex, data, onUpdate }: SetLogRowProps) {
  const [showNote, setShowNote] = useState(false);
  const isComplete = data.weight !== "" && data.reps !== "";

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {/* Set label */}
        <span
          className={cn(
            "text-sm font-semibold min-w-[28px] text-center",
            isComplete ? "text-success" : "text-muted-foreground"
          )}
        >
          S{setIndex + 1}
        </span>

        {/* Weight input */}
        <div className="flex-1 relative">
          <input
            type="number"
            inputMode="decimal"
            placeholder="kg"
            value={data.weight}
            onChange={(e) => onUpdate("weight", e.target.value)}
            className="w-full min-h-[44px] px-3 text-base rounded-lg bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          />
        </div>

        {/* Reps input */}
        <div className="w-[72px] relative">
          <input
            type="number"
            inputMode="numeric"
            placeholder="reps"
            value={data.reps}
            onChange={(e) => onUpdate("reps", e.target.value)}
            className="w-full min-h-[44px] px-3 text-base rounded-lg bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          />
        </div>

        {/* Note toggle */}
        <button
          type="button"
          onClick={() => setShowNote(!showNote)}
          className={cn(
            "min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors",
            showNote || data.note
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted/50"
          )}
        >
          <MessageSquare className="w-4 h-4" />
        </button>

        {/* Completion check */}
        <div
          className={cn(
            "min-h-[44px] min-w-[28px] flex items-center justify-center rounded-lg transition-all",
            isComplete ? "text-success" : "text-muted-foreground/30"
          )}
        >
          <Check className="w-4 h-4" />
        </div>
      </div>

      {/* RPE selector row */}
      <div className="flex items-center gap-2 pl-[36px]">
        <span className="text-xs text-muted-foreground min-w-fit">RPE</span>
        <RpeSelector
          value={data.rpe}
          onChange={(val) => onUpdate("rpe", val)}
        />
      </div>

      {/* Note input */}
      {showNote && (
        <div className="pl-[36px]">
          <input
            type="text"
            placeholder="Add a note..."
            value={data.note || ""}
            onChange={(e) => onUpdate("note", e.target.value)}
            className="w-full min-h-[40px] px-3 text-sm rounded-lg bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          />
        </div>
      )}
    </div>
  );
}
