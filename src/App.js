import React, { useState, useEffect } from "react";
import TimerControls from "./components/TimerControls";
import TimerDisplay from "./components/TimerDisplay";

function App() {
  const [sessionTimer, setSessionTimer] = useState(1500);
  const [sessionIsActive, setSessionIsActive] = useState(true);
  const [sessionLength, setSessionLength] = useState(1500);

  const [breakTimer, setBreakTimer] = useState(300);
  const [breakIsActive, setBreakIsActive] = useState(false);
  const [breakLength, setBreakLength] = useState(300);

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
      setSessionTimer(1500);
    }
    return () => clearInterval(sessionInterval);
  }, [sessionIsActive, sessionTimer, isPaused]);

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
      setBreakTimer(300);
    }
    return () => clearInterval(breakInterval);
  }, [breakIsActive, breakTimer, isPaused]);

  const sessionCountdown = () => setSessionTimer((prevTime) => prevTime - 1);

  const breakCountdown = () => setBreakTimer((prevTime) => prevTime - 1);

  const handleTimer = () => setIsPaused((prevIsPaused) => !prevIsPaused);

  const handleReset = () => {
    setSessionIsActive(true);
    setBreakIsActive(false);
    setSessionLength(1500);
    setSessionTimer(1500);
    setBreakLength(300);
    setBreakTimer(300);
  };

  const sessionIncrement = () => {
    if (sessionLength + 60 > 3600) return;
    setSessionLength((prevLength) => prevLength + 60);
    setSessionTimer(sessionLength + 60);
  };

  const sessionDecrement = () => {
    if (sessionLength - 60 <= 0) return;
    setSessionLength((prevLength) => prevLength - 60);
    setSessionTimer(sessionLength - 60);
  };

  const breakIncrement = () => {
    if (breakLength + 60 > 3600) return;
    setBreakLength((prevLength) => prevLength + 60);
    setBreakTimer(breakLength + 60);
  };
  const breakDecrement = () => {
    if (breakLength - 60 <= 0) return;
    setBreakLength((prevLength) => prevLength - 60);
    setBreakTimer((prevBreakTimer) => prevBreakTimer - 60);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center text-white bg-gradient-to-b from-neutral-800 to-neutral-900">
      <header>
        <h1>Pomo</h1>
        <p>focus timer</p>
      </header>
      <TimerControls
        sessionLength={sessionLength}
        breakLength={breakLength}
        sessInc={sessionIncrement}
        sessDec={sessionDecrement}
        breakInc={breakIncrement}
        breakDec={breakDecrement}
      />
      <TimerDisplay
        handleTimer={handleTimer}
        handleReset={handleReset}
        sessionTimer={sessionTimer}
        sessionIsActive={sessionIsActive}
        breakTimer={breakTimer}
      />
    </div>
  );
}

export default App;
