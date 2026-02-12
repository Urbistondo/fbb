# FBB Workout Tracker — UI/UX Overhaul Implementation Plan

> **For**: Codex agent to pick up and execute
> **Branch**: `ui-overhaul` (already created, already checked out)
> **Working directory**: `/Users/urbistondo/Code/fbb/workout-tracker-app/`
> **Run dev server with**: `pnpm dev` (port 3000)
> **Dependencies already installed**: yes (`pnpm install` was run)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Current State — What Has Been Done](#2-current-state--what-has-been-done)
3. [What Remains — Tasks to Complete](#3-what-remains--tasks-to-complete)
4. [Task 1: Create BottomTabBar Component](#task-1-create-bottomtabbar-component)
5. [Task 2: Create ProgramInfo Component](#task-2-create-programinfo-component)
6. [Task 3: Create WorkoutLayout Component](#task-3-create-workoutlayout-component)
7. [Task 4: Rewrite Home.tsx as Thin Shell](#task-4-rewrite-hometsx-as-thin-shell)
8. [Task 5: Fix Sonner Toaster Integration](#task-5-fix-sonner-toaster-integration)
9. [Task 6: Verify and Fix TypeScript Errors](#task-6-verify-and-fix-typescript-errors)
10. [Task 7: Visual QA and Polish](#task-7-visual-qa-and-polish)
11. [Reference: All File Contents](#reference-all-file-contents)
12. [Verification Checklist](#verification-checklist)

---

## 1. Project Overview

This is a React 18 + Vite 7 + Tailwind CSS 4 workout tracker app for a "Pump Condition 4x Scaled v2" training block. It has 4 workout days, each with main exercises and supersets. Users log sets (weight, reps) and data persists in `localStorage`.

**The overhaul transforms it from a bland, monochrome, desktop-oriented app into a modern, dark-first, mobile-optimized gym tracker with:**
- Emerald/teal accent color scheme
- Bottom tab navigation for switching between workout days
- Enhanced tracking (RPE per set, optional notes)
- Session date awareness (detects new day, archives previous session)
- Completion indicators per exercise and per day
- Framer Motion animations for expand/collapse
- Larger inputs (16px font — prevents iOS auto-zoom, 44px min height)
- Program reference info moved to a Sheet (bottom drawer)

**Stack:**
- React 18.3.1, Vite 7.1, Tailwind CSS 4.1
- Radix UI primitives (Collapsible, Dialog/Sheet, Progress, Badge, etc.)
- Framer Motion 12.23 (installed but was previously unused)
- Lucide React icons
- Sonner for toasts
- Wouter for routing
- localStorage for persistence

**Path aliases (in vite.config.ts):**
- `@` → `client/src`
- `@shared` → `shared/`

---

## 2. Current State — What Has Been Done

### Files ALREADY CREATED (do not recreate):

| File | Purpose | Status |
|------|---------|--------|
| `client/src/types/workout.ts` | All TypeScript types for workout data + tracking data model v2 | DONE |
| `client/src/hooks/useWorkoutData.ts` | Hook to fetch `workoutData.json` | DONE |
| `client/src/hooks/useWorkoutTracking.ts` | Hook for tracking state, localStorage persistence, v1→v2 migration, session management | DONE |
| `client/src/components/workout/RpeSelector.tsx` | Tappable RPE buttons (6, 7, 7.5, 8, 8.5, 9, 10) | DONE |
| `client/src/components/workout/SetLogRow.tsx` | Single set row: weight, reps, RPE, note toggle, completion check | DONE |
| `client/src/components/workout/LoadingState.tsx` | Loading screen with animated dumbbell icon | DONE |
| `client/src/components/workout/SessionBanner.tsx` | "New day" banner with Start Fresh / Continue buttons | DONE |
| `client/src/components/workout/ExerciseCard.tsx` | Exercise with Framer Motion expand/collapse, completion badge, last session comparison | DONE |
| `client/src/components/workout/SupersetGroup.tsx` | Wrapper for paired superset exercises | DONE |
| `client/src/components/workout/DaySummary.tsx` | Day header: title, date, progress bar, conditioning note | DONE |
| `client/src/components/workout/DayView.tsx` | Renders one day's exercises with fade transition | DONE |

### Files ALREADY MODIFIED (do not revert):

| File | What Changed |
|------|-------------|
| `client/src/index.css` | Complete color palette overhaul — emerald/teal dark-first theme with success/warning/surface-elevated tokens |
| `client/src/App.tsx` | `defaultTheme="dark"` + `switchable` prop added to `ThemeProvider` |
| `client/src/components/ui/sonner.tsx` | Changed `import { useTheme } from "next-themes"` → `import { useTheme } from "@/contexts/ThemeContext"` |

### Files NOT YET CHANGED (still need work):

| File | What Needs To Happen |
|------|---------------------|
| `client/src/components/workout/BottomTabBar.tsx` | **CREATE** — Fixed bottom navigation |
| `client/src/components/workout/ProgramInfo.tsx` | **CREATE** — Reference content in a Sheet drawer |
| `client/src/components/workout/WorkoutLayout.tsx` | **CREATE** — App shell (header + DayView + BottomTabBar) |
| `client/src/pages/Home.tsx` | **REWRITE** — Reduce from 410 lines to ~30 lines |

---

## 3. What Remains — Tasks to Complete

Execute these tasks in order. Each task produces a working intermediate state.

---

## Task 1: Create BottomTabBar Component

**Create file**: `client/src/components/workout/BottomTabBar.tsx`

This is a fixed-position bottom navigation bar that lets users switch between the 4 workout days. It must:

1. Be `fixed` at the bottom of the viewport with `z-50`
2. Have a glass morphism background (use the `.glass` CSS class or inline `bg-background/90 backdrop-blur-lg`)
3. Show 4 tab buttons, one per workout day
4. Each tab shows:
   - A short label extracted from the day title: "Push", "Squat", "Pull", "Hinge" (parse from `day.title` — it's the last word, e.g., "Day 1 — Upper Push (Bench + Back + Triceps)" → "Push")
   - A small day number label: "D1", "D2", etc.
   - A completion indicator: a small dot or mini progress that fills based on `getDayProgress(day)`
5. Active tab has accent/primary color, inactive tabs are muted
6. Include `padding-bottom: env(safe-area-inset-bottom, 0px)` for notch phones
7. All buttons must have `min-h-[44px] min-w-[44px]` tap targets
8. Border-top with subtle border color

**Props interface:**
```typescript
interface BottomTabBarProps {
  days: WorkoutDay[];           // from types/workout.ts
  activeDay: number;            // currently selected day id
  onSelectDay: (dayId: number) => void;
  getDayProgress: (day: WorkoutDay) => { completed: number; total: number };
}
```

**Label extraction logic:**
```typescript
function getDayShortLabel(title: string): string {
  // "Day 1 — Upper Push (Bench + Back + Triceps)" → "Push"
  // "Day 2 — Lower (Squat Emphasis + Single-Leg + Core)" → "Lower"
  // "Day 3 — Upper Pull + Filly Press" → "Pull"
  // "Day 4 — Lower (Hinge/Glute Emphasis)" → "Lower"
  const afterDash = title.split("—")[1]?.trim() || title;
  const mainPart = afterDash.split("(")[0].trim().split("+")[0].trim();
  // Get the most meaningful word
  const words = mainPart.split(" ");
  if (words.length >= 2 && words[0] === "Upper") return words[1]; // "Push" or "Pull"
  return words[0]; // "Lower"
}
```

**Implementation:**
```tsx
import { cn } from "@/lib/utils";
import type { WorkoutDay } from "@/types/workout";

interface BottomTabBarProps {
  days: WorkoutDay[];
  activeDay: number;
  onSelectDay: (dayId: number) => void;
  getDayProgress: (day: WorkoutDay) => { completed: number; total: number };
}

function getDayShortLabel(title: string): string {
  const afterDash = title.split("—")[1]?.trim() || title;
  const mainPart = afterDash.split("(")[0].trim().split("+")[0].trim();
  const words = mainPart.split(" ");
  if (words.length >= 2 && (words[0] === "Upper" || words[0] === "Lower")) {
    return words.length > 1 ? words[1] : words[0];
  }
  return words[0];
}

export function BottomTabBar({ days, activeDay, onSelectDay, getDayProgress }: BottomTabBarProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-t border-border"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-center justify-around max-w-lg mx-auto h-16">
        {days.map((day) => {
          const isActive = day.id === activeDay;
          const progress = getDayProgress(day);
          const pct = progress.total > 0 ? progress.completed / progress.total : 0;
          const isAllDone = pct === 1 && progress.total > 0;

          return (
            <button
              key={day.id}
              onClick={() => onSelectDay(day.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 min-h-[44px] min-w-[44px] px-3 py-1 rounded-lg transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="text-xs font-medium">D{day.id}</span>
              <span className={cn("text-sm font-semibold", isActive && "text-primary")}>
                {getDayShortLabel(day.title)}
              </span>
              {/* Completion dot */}
              <div className="flex items-center gap-0.5 mt-0.5">
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-colors",
                    isAllDone
                      ? "bg-success"
                      : pct > 0
                        ? "bg-primary/60"
                        : "bg-muted-foreground/30"
                  )}
                />
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
```

---

## Task 2: Create ProgramInfo Component

**Create file**: `client/src/components/workout/ProgramInfo.tsx`

This component contains all the program reference information (weekly progression, conditioning table, recovery tips, priority bumps) that was previously rendered directly in Home.tsx. It's now shown in a Sheet (bottom drawer) triggered by a button in the header.

**It must:**
1. Accept the `WorkoutData` object as a prop
2. Render inside a Radix Sheet (from `@/components/ui/sheet`) opening from the bottom (`side="bottom"`)
3. Export both the `ProgramInfoSheet` component and a trigger mechanism
4. Content sections:
   - Weekly Progression: grid of 4 cards (W1-W4), each with week label and description
   - Conditioning Progression: table with Week, Volume & Density, Notes columns
   - Priority Bumps: text paragraph
   - Recovery Tips: text paragraph
   - Footer tip

**Implementation:**
```tsx
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { WorkoutData } from "@/types/workout";

interface ProgramInfoProps {
  workoutData: WorkoutData;
}

export function ProgramInfo({ workoutData }: ProgramInfoProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <BookOpen className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-2xl">
        <SheetHeader>
          <SheetTitle>Program Info</SheetTitle>
          <SheetDescription>{workoutData.subtitle}</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 p-4">
          {/* Note */}
          <p className="text-xs text-muted-foreground italic">{workoutData.note}</p>

          {/* Weekly Progression */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
              Weekly Progression
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {workoutData.weeklyProgression.map((week) => (
                <Card key={week.week} className="p-3 bg-card/50 border-border/50">
                  <p className="font-semibold text-sm text-primary mb-1">{week.week}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {week.description}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          {/* Conditioning Progression */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
              Conditioning Progression
            </h3>
            <div className="overflow-x-auto rounded-lg border border-border/50">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/20">
                    <th className="text-left py-2.5 px-3 font-semibold text-foreground/80 w-12">Wk</th>
                    <th className="text-left py-2.5 px-3 font-semibold text-foreground/80">Volume & Density</th>
                    <th className="text-left py-2.5 px-3 font-semibold text-foreground/80">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {workoutData.conditioningProgression.map((row) => (
                    <tr key={row.week} className="border-b border-border/30">
                      <td className="py-2.5 px-3 font-semibold text-primary">{row.week}</td>
                      <td className="py-2.5 px-3 text-foreground/70">{row.volumeDensity}</td>
                      <td className="py-2.5 px-3 text-muted-foreground text-xs">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Priority Bumps + Recovery */}
          <div className="grid grid-cols-1 gap-3">
            <Card className="p-4 bg-card/50 border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-2">Priority Bumps</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{workoutData.priorityBumps}</p>
            </Card>
            <Card className="p-4 bg-card/50 border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-2">Recovery Tips</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{workoutData.recovery}</p>
            </Card>
          </div>

          {/* Footer */}
          <p className="text-xs text-muted-foreground/60 italic text-center pb-4">{workoutData.footer}</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

---

## Task 3: Create WorkoutLayout Component

**Create file**: `client/src/components/workout/WorkoutLayout.tsx`

This is the main app shell. It composes the header, session banner, day view, and bottom tab bar.

**It must:**
1. Import and use `useWorkoutTracking` hook for all tracking state
2. Manage `activeDay` state (default to day 1)
3. Render a sticky top header with:
   - Dumbbell icon + program title (short form, split on "—")
   - ProgramInfo Sheet trigger button (BookOpen icon)
   - Theme toggle button (Moon/Sun)
4. Conditionally show `SessionBanner` when `tracking.isNewDay` is true
5. Render `DayView` for the currently selected day
6. Render `BottomTabBar` fixed at bottom
7. Have `pb-20` on the main content container (space for bottom nav)
8. Import `AnimatePresence` for the session banner
9. Use the Sonner `toast` function to show feedback on session start

**Implementation:**
```tsx
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Dumbbell, Moon, Sun } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useWorkoutTracking } from "@/hooks/useWorkoutTracking";
import { BottomTabBar } from "./BottomTabBar";
import { DayView } from "./DayView";
import { ProgramInfo } from "./ProgramInfo";
import { SessionBanner } from "./SessionBanner";
import type { WorkoutData } from "@/types/workout";

interface WorkoutLayoutProps {
  workoutData: WorkoutData;
}

export function WorkoutLayout({ workoutData }: WorkoutLayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const [activeDay, setActiveDay] = useState(workoutData.days[0]?.id ?? 1);
  const tracking = useWorkoutTracking();

  const day = workoutData.days.find((d) => d.id === activeDay);
  if (!day) return null;

  const progress = tracking.getDayProgress(day);

  const handleStartNewSession = () => {
    tracking.startNewSession();
    toast.success("New session started", {
      description: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    });
  };

  const handleUpdateSet = (
    exerciseId: string,
    setIndex: number,
    field: keyof import("@/types/workout").SetData,
    value: string | number | undefined
  ) => {
    tracking.updateSet(exerciseId, setIndex, field, value);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <Dumbbell className="w-5 h-5 text-primary shrink-0" />
            <div className="min-w-0">
              <h1 className="text-base font-semibold text-foreground truncate">
                {workoutData.title.split("—")[0].trim()}
              </h1>
              <p className="text-xs text-muted-foreground truncate">
                {workoutData.title.split("—")[1]?.trim()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <ProgramInfo workoutData={workoutData} />
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
        </div>
      </header>

      {/* Session Banner */}
      <AnimatePresence>
        {tracking.isNewDay && (
          <SessionBanner
            onStartNew={handleStartNewSession}
            onContinue={tracking.dismissNewDay}
          />
        )}
      </AnimatePresence>

      {/* Day Content */}
      <main>
        <DayView
          day={day}
          activeDate={tracking.tracking.activeDate}
          progress={progress}
          getExerciseSets={tracking.getExerciseSets}
          getLastSession={tracking.getLastSession}
          isExerciseComplete={tracking.isExerciseComplete}
          onUpdateSet={handleUpdateSet}
        />
      </main>

      {/* Bottom Navigation */}
      <BottomTabBar
        days={workoutData.days}
        activeDay={activeDay}
        onSelectDay={setActiveDay}
        getDayProgress={tracking.getDayProgress}
      />
    </div>
  );
}
```

**IMPORTANT NOTE about the `handleUpdateSet` type**: The `field` parameter type is `keyof SetData`. If TypeScript complains about the inline `import("@/types/workout").SetData` syntax, change it to a regular import:
```typescript
import type { WorkoutData, SetData } from "@/types/workout";
```
Then type `field` as `keyof SetData`.

---

## Task 4: Rewrite Home.tsx as Thin Shell

**Modify file**: `client/src/pages/Home.tsx`

Replace the entire 410-line file with this ~20-line version:

```tsx
import { useWorkoutData } from "@/hooks/useWorkoutData";
import { WorkoutLayout } from "@/components/workout/WorkoutLayout";
import { LoadingState } from "@/components/workout/LoadingState";

export default function Home() {
  const { data, loading } = useWorkoutData();

  if (loading || !data) {
    return <LoadingState />;
  }

  return <WorkoutLayout workoutData={data} />;
}
```

This completely removes:
- All inline type definitions (moved to `types/workout.ts`)
- All tracking state management (moved to `useWorkoutTracking` hook)
- The `ExerciseItem` inline component (replaced by `ExerciseCard`)
- All section rendering (moved to `WorkoutLayout`, `DayView`, `ProgramInfo`)

---

## Task 5: Fix Sonner Toaster Integration

**Modify file**: `client/src/App.tsx`

The Toaster component is already in App.tsx. We need to configure it for the workout tracker. Update the `<Toaster />` to include positioning that avoids the bottom nav:

```tsx
<Toaster position="top-center" duration={2000} />
```

Change the existing `<Toaster />` (line 30 in current App.tsx) to `<Toaster position="top-center" duration={2000} />`.

Also verify that the import path is correct — it should be:
```tsx
import { Toaster } from "@/components/ui/sonner";
```
(This is already correct in the current file.)

---

## Task 6: Verify and Fix TypeScript Errors

Run `pnpm check` (which runs `tsc --noEmit`) and fix any TypeScript errors.

**Known potential issues to watch for:**

1. **`useTheme` return shape**: The app's `useTheme` returns `{ theme, toggleTheme, switchable }` where `toggleTheme` can be `undefined` when `switchable` is false. But now `switchable` is `true`, so `toggleTheme` will always be defined. If TS complains about calling `toggleTheme?.()`, it's fine — it's a safe optional call.

2. **Sonner `useTheme` mismatch**: The sonner.tsx file now imports from `@/contexts/ThemeContext` which returns `{ theme: "light" | "dark", ... }`. The original code destructures `{ theme = "system" }` — the `= "system"` default is never hit since the app's theme is always "light" or "dark", but TS might flag the type mismatch with `ToasterProps["theme"]` which accepts `"system"`. The cast `theme as ToasterProps["theme"]` handles this.

3. **`framer-motion` import**: The `motion` and `AnimatePresence` imports from `framer-motion` should work since it's v12.23.22. If tree-shaking complaints arise, use `import { motion } from "framer-motion"`.

4. **`SetData` field typing in `WorkoutLayout`**: The `handleUpdateSet` function receives `field: keyof SetData`. Make sure the import is: `import type { WorkoutData, SetData } from "@/types/workout"`.

---

## Task 7: Visual QA and Polish

After all components are wired up and the app renders, verify these visual/UX items:

### 7a. Color Theme Verification
- Open the app in browser at `http://localhost:3000`
- It should render in **dark mode** by default
- The background should be a deep dark blue-black (not pure black)
- The accent color should be emerald/teal (visible on: primary buttons, RPE selected buttons, progress bar, completion badges, exercise numbers)
- Toggle to light mode using the Sun/Moon button — verify it switches cleanly

### 7b. Bottom Tab Bar
- Should be fixed at the bottom of the viewport
- Should show 4 tabs: Push, Lower, Pull, Lower (or similar short labels)
- Active tab should be highlighted with primary/accent color
- Tapping a tab should switch the day view with a subtle fade

### 7c. Exercise Flow
- Expand an exercise card — it should animate open (Framer Motion)
- The set log rows should show: weight input, reps input, RPE selector, note toggle, check icon
- All inputs should be large enough to tap comfortably (44px height, 16px font)
- After filling weight + reps, the check icon should turn green (`text-success`)
- The exercise card header should show "1/3" or "3/3" completion badge
- When all sets are complete, the card should have a subtle green tint

### 7d. Session Banner
- On first load (or if `activeDate` in localStorage differs from today), the session banner should appear
- "Start Fresh" should archive current data and show a Sonner toast
- "Continue" should dismiss the banner

### 7e. Program Info Sheet
- The BookOpen icon in the header should open a bottom Sheet
- The Sheet should contain: Weekly Progression cards, Conditioning table, Priority Bumps, Recovery Tips
- Should be scrollable and dismissible

### 7f. Mobile Viewport
- Test at 375px width (iPhone SE)
- Test at 390px width (iPhone 14)
- Bottom nav should not overlap content (the `pb-20` on main content handles this)
- Inputs should not trigger iOS auto-zoom (they're 16px)

---

## Reference: All File Contents

### Already-created files that Codex should NOT modify (unless fixing bugs):

#### `client/src/types/workout.ts`
Contains all TypeScript interfaces: `Exercise`, `Superset`, `WorkoutDay`, `WorkoutData`, `SetData` (with optional `rpe` and `note`), `SessionEntry`, `ExerciseHistory`, `TrackingData` (version 2), `LegacyTrackingData`.

#### `client/src/hooks/useWorkoutTracking.ts`
Exports `useWorkoutTracking()` returning:
- `tracking: TrackingData`
- `updateSet(exerciseId, setIndex, field, value)`
- `getExerciseSets(exerciseId): SetData[]`
- `getLastSession(exerciseId): SessionEntry | undefined`
- `isSetComplete(set): boolean`
- `isExerciseComplete(exerciseId, setsStr): boolean`
- `getDayProgress(day): { completed, total }`
- `startNewSession(): void`
- `dismissNewDay(): void`
- `isNewDay: boolean`

#### `client/src/hooks/useWorkoutData.ts`
Exports `useWorkoutData()` returning `{ data: WorkoutData | null, loading: boolean }`.

#### `client/src/components/workout/RpeSelector.tsx`
Props: `{ value?: number, onChange: (value: number | undefined) => void }`.
Renders tappable buttons for RPE values [6, 7, 7.5, 8, 8.5, 9, 10].

#### `client/src/components/workout/SetLogRow.tsx`
Props: `{ setIndex: number, data: SetData, onUpdate: (field: keyof SetData, value) => void }`.
Renders: Set label, weight input (16px, 44px height), reps input, note toggle, RPE selector, completion check.

#### `client/src/components/workout/ExerciseCard.tsx`
Props: `{ exercise, sets, lastSession?, expectedSetCount, isComplete, onUpdateSet, isSuperset? }`.
Uses Framer Motion `AnimatePresence` for expand/collapse. Shows completion badge.

#### `client/src/components/workout/SupersetGroup.tsx`
Props: `{ superset, getExerciseSets, getLastSession, isExerciseComplete, onUpdateSet }`.
Renders superset label + ExerciseCard for each exercise.

#### `client/src/components/workout/DaySummary.tsx`
Props: `{ title, date, progress: {completed, total}, conditioningNote }`.
Renders: day title, formatted date, progress bar, conditioning note callout.

#### `client/src/components/workout/DayView.tsx`
Props: `{ day, activeDate, progress, getExerciseSets, getLastSession, isExerciseComplete, onUpdateSet }`.
Renders DaySummary + all exercises/supersets/exercises2 for one day.

#### `client/src/components/workout/LoadingState.tsx`
No props. Renders centered Dumbbell icon with pulse animation.

#### `client/src/components/workout/SessionBanner.tsx`
Props: `{ onStartNew: () => void, onContinue: () => void }`.
Framer Motion slide-down entrance.

#### `client/src/index.css`
Emerald/teal dark-first theme. Key tokens:
- `--primary` / `--accent`: `oklch(0.7 0.17 162)` (dark) / `oklch(0.55 0.17 162)` (light)
- `--success`: `oklch(0.65 0.2 145)` (dark) / `oklch(0.6 0.18 145)` (light)
- `--background`: `oklch(0.12 0.015 260)` (dark) / `oklch(0.98 0.005 155)` (light)
- Custom colors registered in `@theme inline` block: `--color-success`, `--color-success-foreground`, `--color-warning`, `--color-surface-elevated`

### Existing UI components available for use (in `client/src/components/ui/`):
- `sheet.tsx` — Sheet/SheetContent/SheetHeader/SheetTitle/SheetDescription/SheetTrigger (Radix Dialog-based bottom/side drawer)
- `button.tsx` — Button with variants: default, destructive, outline, secondary, ghost, link. Sizes: default, sm, lg, icon
- `card.tsx` — Card/CardHeader/CardTitle/CardContent/CardFooter
- `progress.tsx` — Progress bar (Radix) with `value` prop (0-100)
- `badge.tsx` — Badge with variants: default, secondary, destructive, outline
- `collapsible.tsx` — Collapsible/CollapsibleTrigger/CollapsibleContent (Radix)
- `sonner.tsx` — Toaster wrapper for Sonner (already fixed to use app's ThemeContext)

### Workout data structure (`client/public/workoutData.json`):
- 4 workout days, each with:
  - `exercises`: array of main exercises (usually 1 compound lift)
  - `supersets`: array of `{ label, exercises[] }` pairs
  - `exercises2?`: optional additional exercises
- Each exercise: `{ id, number, name, sets, rest, notes }`
  - `sets` format: "3×6 @ RPE 7; tempo 21X1; optional back-off 1×AMRAP clean reps"
  - The leading digit is the set count (parse with `/^(\d+)/`)

---

## Verification Checklist

After completing all tasks, verify:

- [ ] `pnpm check` passes (no TypeScript errors)
- [ ] `pnpm dev` starts without errors
- [ ] App renders in dark mode by default at `http://localhost:3000`
- [ ] Bottom tab bar shows 4 day tabs, switching works
- [ ] Exercise cards expand/collapse with animation
- [ ] Weight + reps inputs are 16px font, 44px height
- [ ] RPE selector buttons work (toggle on/off)
- [ ] Note toggle expands a text input
- [ ] Completion badge shows on exercise cards (e.g., "2/3")
- [ ] Day progress bar updates as sets are logged
- [ ] Program Info (BookOpen icon) opens a bottom Sheet with reference content
- [ ] Theme toggle (Sun/Moon) switches between dark and light
- [ ] Data persists in localStorage across page refreshes
- [ ] No console errors in browser DevTools
- [ ] `pnpm build` succeeds (production build)
