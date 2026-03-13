'use client'

import { useRef, useState, useEffect } from 'react'
import { TimerSettings } from '../timer-settings/TimerSettings'
import { Play, RotateCcw, SkipForward } from 'lucide-react'

export const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(60 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current ?? 0)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current ?? 0)
  }, [isRunning])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleTimer = () => setIsRunning((prev) => !prev)

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center flex-col gap-14">
      <TimerSettings setTimeLeft={setTimeLeft} />
      <div
        className="flex justify-center items-center flex-col h-110 w-110 rounded-full px-4 py-2 border-gray-800 border-4"
        onClick={handleTimer}
      >
        <p className="text-[100px] leading-25 text-white">
          {formatTime(timeLeft)}
        </p>
        <p className="text-1xl text-white uppercase">Ready?</p>
      </div>

      <div className="flex gap-6 items-center">
        <button className="border-2 h-10 w-10 flex items-center justify-center rounded-full">
          <RotateCcw color="white" size={18} />
        </button>
        <button className="text-white h-20 w-20 rounded-full bg-white flex items-center justify-center">
          <Play color="black" />
        </button>
        <button className="border-2 h-10 w-10 flex items-center justify-center rounded-full">
          <SkipForward color="white" size={18} />
        </button>
      </div>
    </div>
  )
}
