import React, { useState, useEffect } from "react";
import TimerControls from "./components/TimerControls";
import TimerDisplay from "./components/TimerDisplay";

function App() {
  const [sessionTimer, setSessionTimer] = useState(1500);
  const [sessionIsActive, setSessionIsActive] = useState(true);
  const [sessionLength, setSessionLength] = useState(25);

  const [breakTimer, setBreakTimer] = useState(300);
  const [breakIsActive, setBreakIsActive] = useState(false);
  const [breakLength, setBreakLength] = useState(5);

  const [isPaused, setIsPaused] = useState(true);

  //countdown for session timer
  useEffect(() => {
    let sessionInterval = null;
    if (sessionIsActive && !isPaused) {
      sessionInterval = setInterval(sessionCountdown, 1000);
    }
    if (sessionTimer <= 0) {
      clearInterval(sessionInterval);
      setSessionIsActive(false);
      setBreakIsActive(true);
      setSessionTimer(sessionLength * 60);
    }
    return () => clearInterval(sessionInterval);
  }, [sessionIsActive, sessionTimer, isPaused, sessionLength]);

  // countdown for break timer
  useEffect(() => {
    let breakInterval = null;
    if (breakIsActive && !isPaused) {
      breakInterval = setInterval(breakCountdown, 1000);
    }
    if (breakTimer <= 0) {
      clearInterval(breakInterval);
      setBreakIsActive(false);
      setSessionIsActive(true);
      setBreakTimer(breakLength * 60);
    }
    return () => clearInterval(breakInterval);
  }, [breakIsActive, breakTimer, isPaused, breakLength]);

  const sessionCountdown = () => setSessionTimer((prevTime) => prevTime - 1);

  const breakCountdown = () => setBreakTimer((prevTime) => prevTime - 1);

  const handleTimer = () => setIsPaused((prevIsPaused) => !prevIsPaused);

  const handleReset = () => {
    setSessionIsActive(true);
    setBreakIsActive(false);
    setSessionLength(25);
    setSessionTimer(1500);
    setBreakLength(5);
    setBreakTimer(300);
    setIsPaused(true);
  };

  const sessionIncrement = () => {
    if (sessionLength + 1 > 60) return;
    setSessionLength((prevLength) => prevLength + 1);
    setSessionTimer(sessionLength * 60 + 60);
  };

  const sessionDecrement = () => {
    if (sessionLength - 1 <= 0) return;
    setSessionLength((prevLength) => prevLength - 1);
    setSessionTimer(sessionLength * 60 - 60);
  };

  const breakIncrement = () => {
    if (breakLength + 1 > 60) return;
    setBreakLength((prevLength) => prevLength + 1);
    setBreakTimer(breakLength * 60 + 60);
  };
  const breakDecrement = () => {
    if (breakLength - 1 <= 0) return;
    setBreakLength((prevLength) => prevLength - 1);
    setBreakTimer(breakLength * 60 - 60);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center text-center text-white bg-gradient-to-b from-neutral-800 to-neutral-900">
      <header>
        <h1 className="">Pomo</h1>
        <p>focus timer</p>
      </header>
      <TimerControls
        sessionLength={sessionLength}
        breakLength={breakLength}
        sessInc={sessionIncrement}
        sessDec={sessionDecrement}
        breakInc={breakIncrement}
        breakDec={breakDecrement}
        isPaused={isPaused}
      />
      <TimerDisplay
        handleTimer={handleTimer}
        handleReset={handleReset}
        sessionTimer={sessionTimer}
        sessionIsActive={sessionIsActive}
        breakTimer={breakTimer}
        isPaused={isPaused}
      />
    </div>
  );
}

export default App;
