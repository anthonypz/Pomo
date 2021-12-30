import React from "react";

export default function TimerControls({
  sessionLength,
  breakLength,
  sessInc,
  sessDec,
  breakInc,
  breakDec,
}) {
  let sessionMinutes = Math.floor(sessionLength / 60);
  let breakMinutes = Math.floor(breakLength / 60);

  return (
    <section>
      <p id="session-label">Focus length</p>
      <button id="session-decrement" onClick={sessDec}>
        dwn
      </button>
      <span>{sessionMinutes}</span>
      <button id="session-increment" onClick={sessInc}>
        up
      </button>
      <p id="break-label">Break length</p>
      <button id="break-decrement" onClick={breakDec}>
        dwn
      </button>
      <span>{breakMinutes}</span>
      <button id="break-increment" onClick={breakInc}>
        up
      </button>
    </section>
  );
}
