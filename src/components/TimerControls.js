import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

export default function TimerControls({
  sessionLength,
  breakLength,
  sessInc,
  sessDec,
  breakInc,
  breakDec,
  isPaused,
}) {
  return (
    <section className="flex justify-between w-60 p-2">
      <div>
        <p id="session-label">Focus length</p>
        <button id="session-decrement" onClick={sessDec} disabled={!isPaused}>
          <ChevronDownIcon className="h-5 w-5 text-blue-500" />
        </button>
        <span id="session-length" className="p-1">
          {sessionLength}
        </span>
        <button id="session-increment" onClick={sessInc} disabled={!isPaused}>
          <ChevronUpIcon className="h-5 w-5 text-blue-500" />
        </button>
      </div>
      <div>
        <p id="break-label">Break length</p>
        <button id="break-decrement" onClick={breakDec} disabled={!isPaused}>
          <ChevronDownIcon className="h-5 w-5 text-blue-500" />
        </button>
        <span id="break-length" className="p-1">
          {breakLength}
        </span>
        <button id="break-increment" onClick={breakInc} disabled={!isPaused}>
          <ChevronUpIcon className="h-5 w-5 text-blue-500" />
        </button>
      </div>
    </section>
  );
}
