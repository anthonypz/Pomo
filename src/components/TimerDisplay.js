import React from "react";

export default function TimerDisplay({
  handleTimer,
  handleReset,
  sessionTimer,
  breakTimer,
  sessionIsActive,
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
      <main>
        <h2 id="timer-label">
          {sessionIsActive ? "Focus Session" : "Break Session"}
        </h2>
        <h2 id="time-left">
          {sessionIsActive ? formatTime(sessionTimer) : formatTime(breakTimer)}
        </h2>
      </main>
      <section>
        <button id="start_stop" onClick={handleTimer}>
          play/pause
        </button>
        <button id="reset" onClick={handleReset}>
          reset
        </button>
      </section>
    </>
  );
}
