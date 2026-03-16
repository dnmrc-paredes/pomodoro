'use client'

import { useRef, useState, useEffect } from 'react'
import { TimerSettings } from '../TimerSettings/TimerSettings'
import { Play, RotateCcw, SkipForward, Pause } from 'lucide-react'
import { Modes } from '../Modes/Modes'
import { Mode } from '@/types/types'

export const Timer = () => {
  const [timeLeft, setTimeLeft] = useState({
    focus: 60 * 60,
    'short-break': 5 * 60,
    'long-break': 15 * 60,
  })
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [currentMode, setCurrentMode] = useState<Mode>('focus')

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev[currentMode] <= 1) {
          clearInterval(intervalRef.current ?? 0)
          return { ...prev, [currentMode]: 0 }
        }
        return { ...prev, [currentMode]: prev[currentMode] - 1 }
      })
    }, 1000)

    return () => clearInterval(intervalRef.current ?? 0)
  }, [isRunning, currentMode])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleTimer = () => setIsRunning((prev) => !prev)
  const resetTimer = () => {
    clearInterval(intervalRef.current ?? 0)
    setTimeLeft((prev) => ({
      ...prev,
    }))
  }

  return (
    <div className="h-screen w-full flex items-center justify-center flex-col gap-6">
      <Modes currentMode={currentMode} setCurrentMode={setCurrentMode} />
      <TimerSettings setTimeLeft={setTimeLeft} />
      <div
        className="flex justify-center items-center flex-col h-110 w-110 rounded-full px-4 py-2 bg-white/5 border-4 border-white/10"
        onClick={handleTimer}
      >
        <p className="text-[100px] leading-25 text-white">
          {formatTime(timeLeft[currentMode])}
        </p>
        <p className="text-1xl text-white/50 uppercase mt-2">
          {isRunning ? 'Focusing' : 'Taking a break'}
        </p>
      </div>

      <div className="flex gap-6 items-center">
        <button
          onClick={resetTimer}
          aria-label="Reset timer"
          className="border-2 h-10 w-10 flex items-center justify-center rounded-full"
          type="button"
        >
          <RotateCcw color="white" size={18} />
        </button>
        <button
          onClick={handleTimer}
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
          className="text-white h-20 w-20 rounded-full bg-white flex items-center justify-center"
          type="button"
        >
          {isRunning ? <Pause color="black" /> : <Play color="black" />}
        </button>
        <button
          aria-label="Skip Timer"
          className="border-2 h-10 w-10 flex items-center justify-center rounded-full"
          type="button"
        >
          <SkipForward color="white" size={18} />
        </button>
      </div>
    </div>
  )
}
