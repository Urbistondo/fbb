import { motion } from "framer-motion";
import { CalendarPlus, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SessionBannerProps {
  onStartNew: () => void;
  onContinue: () => void;
}

export function SessionBanner({ onStartNew, onContinue }: SessionBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mx-4 mt-4 p-4 rounded-xl bg-primary/10 border border-primary/20"
    >
      <p className="text-sm font-medium text-foreground mb-3">
        New day — start a fresh session?
      </p>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onClick={onStartNew}
          className="gap-1.5"
        >
          <CalendarPlus className="w-4 h-4" />
          Start Fresh
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onContinue}
          className="gap-1.5"
        >
          <Play className="w-4 h-4" />
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
