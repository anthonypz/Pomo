import React, { useState, useEffect } from "react";

function App() {
  const [sessionTimer, setSessionTimer] = useState(1500);
  const [sessionIsActive, setSessionIsActive] = useState(false);
  const [sessionLength, setSessionLength] = useState(1500);

  const [breakTimer, setBreakTimer] = useState(300);
  const [breakIsActive, setBreakIsActive] = useState(false);
  const [breakLength, setBreakLength] = useState(300);

  //countdown for session timer
  useEffect(() => {
    let sessionInterval = null;
    if (sessionIsActive) {
      sessionInterval = setInterval(sessionCountdown, 1000);
    }
    if (sessionTimer <= 0) {
      clearInterval(sessionInterval);
      setSessionIsActive(false);
      setBreakIsActive(true);
      setSessionTimer(1500);
    }
    return () => clearInterval(sessionInterval);
  }, [sessionIsActive, sessionTimer]);

  // countdown for break timer
  useEffect(() => {
    let breakInterval = null;
    if (breakIsActive) {
      breakInterval = setInterval(breakCountdown, 1000);
    }
    if (breakTimer <= 0) {
      clearInterval(breakInterval);
      setBreakIsActive(false);
      setSessionIsActive(true);
      setBreakTimer(300);
    }
    return () => clearInterval(breakInterval);
  }, [breakIsActive, breakTimer]);

  const sessionCountdown = () => setSessionTimer((prevTime) => prevTime - 1);

  const breakCountdown = () => setBreakTimer((prevTime) => prevTime - 1);

  const handleTimer = () => setSessionIsActive((prevIsActive) => !prevIsActive);

  const handleReset = () => {
    setSessionIsActive(false);
    setBreakIsActive(false);
    setSessionLength(1500);
    setSessionTimer(1500);
    setBreakLength(300);
    setBreakTimer(300);
  };

  const sessionIncrement = () => {
    if (sessionLength + 60 > 3600 || sessionIsActive) return;
    setSessionLength((prevLength) => prevLength + 60);
    setSessionTimer(sessionLength + 60);
  };

  const sessionDecrement = () => {
    if (sessionLength - 60 <= 0 || sessionIsActive) return;
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
    <>
      <header>
        <h1>Pomo</h1>
        <p>focus timer</p>
      </header>
      <section>
        <p id="session-label">Focus length</p>
        <button id="session-decrement" onClick={sessionDecrement}>
          dwn
        </button>
        <span>{sessionLength}</span>
        <button id="session-increment" onClick={sessionIncrement}>
          up
        </button>
        <p id="break-label">Break length</p>
        <button id="break-decrement" onClick={breakDecrement}>
          dwn
        </button>
        <span>{breakLength}</span>
        <button id="break-increment" onClick={breakIncrement}>
          up
        </button>
      </section>
      <main>
        <h2 id="timer-label">Focus Session</h2>
        <h2 id="time-left">{sessionTimer}</h2>
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

export default App;
