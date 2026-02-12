import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface DaySummaryProps {
  title: string;
  date: string;
  progress: { completed: number; total: number };
  conditioningNote: string;
}

function formatDate(isoDate: string): string {
  const d = new Date(isoDate + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function DaySummary({ title, date, progress, conditioningNote }: DaySummaryProps) {
  const pct = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;
  const isAllDone = progress.completed === progress.total && progress.total > 0;

  return (
    <div className="space-y-3 px-4 pt-4">
      {/* Title + Date */}
      <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{formatDate(date)}</p>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <Progress
          value={pct}
          className={cn("h-2 flex-1", isAllDone && "[&>[data-slot=progress-indicator]]:bg-success")}
        />
        <span
          className={cn(
            "text-sm font-medium min-w-fit",
            isAllDone ? "text-success" : "text-muted-foreground"
          )}
        >
          {progress.completed}/{progress.total}
        </span>
      </div>

      {/* Conditioning note */}
      <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground/80">Conditioning: </span>
          {conditioningNote}
        </p>
      </div>
    </div>
  );
}
