import { Dumbbell } from "lucide-react";

export function LoadingState() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <Dumbbell className="w-12 h-12 mx-auto mb-4 animate-pulse text-primary" />
        <p className="text-muted-foreground">Loading your workout plan...</p>
      </div>
    </div>
  );
}
