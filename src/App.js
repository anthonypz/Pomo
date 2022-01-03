import React, { useState, useEffect, useRef } from "react";
import TimerControls from "./components/TimerControls";
import TimerDisplay from "./components/TimerDisplay";
import bellSound from "../src/assets/bell.mp3";

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
      handleBeep();
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
      handleBeep();
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
    bell.current.load();
  };

  const sessionIncrement = () => {
    if (sessionLength >= 60) return;
    setSessionLength((prevLength) => prevLength + 1);
    setSessionTimer(sessionLength * 60 + 60);
  };

  const sessionDecrement = () => {
    if (sessionLength <= 1) return;
    setSessionLength((prevLength) => prevLength - 1);
    setSessionTimer(sessionLength * 60 - 60);
  };

  const breakIncrement = () => {
    if (breakLength >= 60) return;
    setBreakLength((prevLength) => prevLength + 1);
    setBreakTimer(breakLength * 60 + 60);
  };
  const breakDecrement = () => {
    if (breakLength <= 1) return;
    setBreakLength((prevLength) => prevLength - 1);
    setBreakTimer(breakLength * 60 - 60);
  };

  const bell = useRef(null);
  const handleBeep = () => {
    if (bell.current !== null) {
      bell.current.play();
    }
  };

  return (
    <div className="min-w-fit min-h-screen flex flex-col justify-center items-center text-center text-zinc-100 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900">
      <header>
        <h1 className="text-4xl font-bold text-zinc-100 pt-2">Pomo</h1>
        <p className="text-base font-thin pb-1 text-zinc-200">focus timer</p>
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
      <audio id="beep" ref={bell} src={bellSound} />
    </div>
  );
}

export default App;
