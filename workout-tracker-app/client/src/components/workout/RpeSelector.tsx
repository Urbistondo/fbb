import { cn } from "@/lib/utils";

const RPE_VALUES = [6, 7, 7.5, 8, 8.5, 9, 10] as const;

interface RpeSelectorProps {
  value?: number;
  onChange: (value: number | undefined) => void;
}

export function RpeSelector({ value, onChange }: RpeSelectorProps) {
  return (
    <div className="flex items-center gap-1">
      {RPE_VALUES.map((rpe) => (
        <button
          key={rpe}
          type="button"
          onClick={() => onChange(value === rpe ? undefined : rpe)}
          className={cn(
            "min-w-[32px] min-h-[32px] rounded-md text-xs font-medium transition-colors",
            value === rpe
              ? "bg-primary text-primary-foreground"
              : "bg-muted/50 text-muted-foreground hover:bg-muted"
          )}
        >
          {rpe}
        </button>
      ))}
    </div>
  );
}
