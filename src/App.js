import React, { useState, useEffect, useRef } from 'react'
import TimerControls from './components/TimerControls'
import TimerDisplay from './components/TimerDisplay'
import { PlayIcon, PauseIcon, RefreshIcon } from '@heroicons/react/solid'
import bellSound from '../src/assets/bell.mp3'

function App() {
  const [sessionTimer, setSessionTimer] = useState(1500)
  const [sessionIsActive, setSessionIsActive] = useState(true)
  const [sessionLength, setSessionLength] = useState(25)

  const [breakTimer, setBreakTimer] = useState(300)
  const [breakIsActive, setBreakIsActive] = useState(false)
  const [breakLength, setBreakLength] = useState(5)

  const [isPaused, setIsPaused] = useState(true)

  //countdown for session timer
  useEffect(() => {
    let sessionInterval = null
    if (sessionIsActive && !isPaused) {
      sessionInterval = setInterval(sessionCountdown, 1000)
    }
    if (sessionTimer <= 0) {
      handleBeep()
      clearInterval(sessionInterval)
      setSessionIsActive(false)
      setBreakIsActive(true)
      setSessionTimer(sessionLength * 60)
    }
    return () => clearInterval(sessionInterval)
  }, [sessionIsActive, sessionTimer, isPaused, sessionLength])

  // countdown for break timer
  useEffect(() => {
    let breakInterval = null
    if (breakIsActive && !isPaused) {
      breakInterval = setInterval(breakCountdown, 1000)
    }
    if (breakTimer <= 0) {
      handleBeep()
      clearInterval(breakInterval)
      setBreakIsActive(false)
      setSessionIsActive(true)
      setBreakTimer(breakLength * 60)
    }
    return () => clearInterval(breakInterval)
  }, [breakIsActive, breakTimer, isPaused, breakLength])

  const sessionCountdown = () => setSessionTimer((prevTime) => prevTime - 1)

  const breakCountdown = () => setBreakTimer((prevTime) => prevTime - 1)

  const handleTimer = () => setIsPaused((prevIsPaused) => !prevIsPaused)

  const [rotate, setRotate] = useState(false)
  const rotateBtn = () => {
    setRotate(true)
    setTimeout(() => {
      setRotate(false)
    }, 500)
  }

  const handleReset = () => {
    rotateBtn()
    setSessionIsActive(true)
    setBreakIsActive(false)
    setSessionLength(25)
    setSessionTimer(1500)
    setBreakLength(5)
    setBreakTimer(300)
    setIsPaused(true)
    bell.current.load()
  }

  const sessionIncrement = () => {
    if (sessionLength >= 60) return
    setSessionLength((prevLength) => prevLength + 1)
    setSessionTimer((prevSessionTimer) => prevSessionTimer + 60)
  }

  const sessionDecrement = () => {
    if (sessionLength <= 1) return
    setSessionLength((prevLength) => prevLength - 1)
    setSessionTimer((prevSessionTimer) => prevSessionTimer - 60)
  }

  const breakIncrement = () => {
    if (breakLength >= 60) return
    setBreakLength((prevLength) => prevLength + 1)
    setBreakTimer((prevBreakTimer) => prevBreakTimer + 60)
  }
  const breakDecrement = () => {
    if (breakLength <= 1) return
    setBreakLength((prevLength) => prevLength - 1)
    setBreakTimer((prevBreakTimer) => prevBreakTimer - 60)
  }

  const bell = useRef(null)
  const handleBeep = () => {
    if (bell.current !== null) {
      bell.current.play()
    }
  }

  return (
    <div className='min-w-fit min-h-screen flex flex-col justify-center items-center text-center text-zinc-100 bg-zinc-800'>
      <header>
        <h1 className='text-4xl font-bold text-zinc-100 pt-2'>Pomo</h1>
        <p className='text-base font-thin pb-1 text-zinc-200'>focus timer</p>
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
      <section className='pt-6 flex'>
        <div className='flex flex-col p-2 items-center'>
          <button
            id='start_stop'
            onClick={handleTimer}
            title='Play/Pause'
            className='px-2 mx-3'
          >
            {isPaused ? (
              <PlayIcon className='h-12 w-12 text-blue-500' />
            ) : (
              <PauseIcon className='h-12 w-12 text-blue-500' />
            )}
          </button>
          <label htmlFor='start-stop' className='w-28 mt-1'>
            {isPaused ? 'Start Timer' : 'Pause Timer'}
          </label>
        </div>
        <div className='flex flex-col p-2 items-center'>
          <button
            id='reset'
            onClick={handleReset}
            title='Reset all timers'
            className='px-2 mx-3'
          >
            <RefreshIcon
              className={
                rotate
                  ? 'h-12 w-12 text-blue-500 -rotate-180 duration-200 ease-in'
                  : 'h-12 w-12 text-blue-500'
              }
            />
          </button>
          <label htmlFor='reset' className='w-28 mt-1'>
            Reset Timer
          </label>
        </div>
      </section>
      <audio id='beep' ref={bell} src={bellSound} />
    </div>
  )
}

export default App
