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
    <section className="flex justify-between w-80 py-6 px-px">
      <div className="flex flex-col items-center">
        <p id="session-label" className="underline decoration-blue-500">
          Focus length
        </p>
        <div className="flex items-center pt-1">
          <button
            id="session-decrement"
            onClick={sessDec}
            disabled={!isPaused || sessionLength <= 1}
            className="p-1 disabled:opacity-40 text-blue-500 disabled:text-gray-600"
            title="Decrease"
          >
            <ChevronDownIcon className="h-9 w-9" />
          </button>
          <p id="session-length" className="font-mono text-3xl w-10">
            {sessionLength}
          </p>
          <button
            id="session-increment"
            onClick={sessInc}
            disabled={!isPaused || sessionLength >= 60}
            className="p-1 disabled:opacity-40 text-blue-500 disabled:text-gray-600"
            title="Increase"
          >
            <ChevronUpIcon className="h-9 w-9" />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p id="break-label" className="underline decoration-blue-500">
          Break length
        </p>
        <div className="flex items-center pt-1">
          <button
            id="break-decrement"
            onClick={breakDec}
            disabled={!isPaused || breakLength <= 1}
            className="p-1 disabled:opacity-40 text-blue-500 disabled:text-gray-600"
            title="Decrease"
          >
            <ChevronDownIcon className="h-9 w-9" />
          </button>
          <p id="break-length" className="font-mono text-3xl w-10">
            {breakLength}
          </p>
          <button
            id="break-increment"
            onClick={breakInc}
            disabled={!isPaused || breakLength >= 60}
            className="p-1 disabled:opacity-40 text-blue-500 disabled:text-gray-600"
            title="Increase"
          >
            <ChevronUpIcon className="h-9 w-9" />
          </button>
        </div>
      </div>
    </section>
  );
}
