import React from "react";
import { PlayIcon, PauseIcon, RefreshIcon } from "@heroicons/react/solid";

export default function TimerDisplay({
  handleTimer,
  handleReset,
  sessionTimer,
  breakTimer,
  sessionIsActive,
  isPaused,
}) {
  function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    return formattedTime;
  }

  return (
    <>
      <main className="bg-zinc-900/25 text-zinc-100 rounded-full border-4 border-blue-500/75 p-3 w-60 h-60 flex flex-col justify-center">
        <h2 id="timer-label" className="text-xl font-medium">
          {sessionIsActive ? "Focus Session" : "Break Session"}
        </h2>
        <h2
          id="time-left"
          className="text-6xl font-medium pt-1 font-mono tabular-nums"
        >
          {sessionIsActive ? formatTime(sessionTimer) : formatTime(breakTimer)}
        </h2>
      </main>
      <section className="pt-6">
        <button
          id="start_stop"
          onClick={handleTimer}
          title="Play/Pause"
          className="px-2 mx-3"
        >
          {isPaused ? (
            <PlayIcon className="h-12 w-12 text-blue-500" />
          ) : (
            <PauseIcon className="h-12 w-12 text-blue-500" />
          )}
        </button>
        <button
          id="reset"
          onClick={handleReset}
          title="Reset all timers"
          className="px-2 mx-3"
        >
          <RefreshIcon className="h-12 w-12 text-blue-500" />
        </button>
      </section>
    </>
  );
}
