import { cn } from '@/lib/utils'
import { Dispatch, SetStateAction } from 'react'
import { Mode } from '@/types/types'
import { mode } from '@/constants/contants'

type ModesProps = {
  currentMode: Mode
  setCurrentMode: Dispatch<SetStateAction<Mode>>
}

export const Modes = ({ currentMode, setCurrentMode }: ModesProps) => {
  const handleModeChange = (mode: Mode) => () => setCurrentMode(mode)

  return (
    <div className="bg-white/10 rounded-full p-1 flex gap-1">
      <button
        type="button"
        className={cn(
          'p-2 rounded-full text-white/50 text-center text-sm',
          currentMode === mode.FOCUS
            ? 'bg-white text-black'
            : 'hover:text-white',
        )}
        onClick={handleModeChange(mode.FOCUS)}
      >
        Focus
      </button>
      <button
        type="button"
        className={cn(
          'p-2 rounded-full text-white/50 text-center text-sm',
          currentMode === mode.SHORT_BREAK
            ? 'bg-white text-black'
            : 'hover:text-white',
        )}
        onClick={handleModeChange(mode.SHORT_BREAK)}
      >
        Short Break
      </button>
      <button
        type="button"
        className={cn(
          'p-2 rounded-full text-white/50 text-center text-sm',
          currentMode === mode.LONG_BREAK
            ? 'bg-white text-black'
            : 'hover:text-white',
        )}
        onClick={handleModeChange(mode.LONG_BREAK)}
      >
        Long Break
      </button>
    </div>
  )
}
