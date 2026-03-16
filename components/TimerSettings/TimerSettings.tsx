import { Settings } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Field, FieldLabel } from '@/components/ui/field'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { Mode } from '@/types/types'
import { mode } from '@/constants/contants'

type AllModes = {
  focus: number
  'short-break': number
  'long-break': number
}

type TimerSettingsProps = {
  setTimeLeft: Dispatch<SetStateAction<AllModes>>
}

export const TimerSettings = ({
  setTimeLeft,
}: TimerSettingsProps) => {
  const [timerInput, setTimerInput] = useState({
    focus: 60,
    'short-break': 5,
    'long-break': 15,
  })

  const handleChange = (mode: Mode) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setTimerInput((prev) => ({
      ...prev,
      [mode]: Number.isNaN(value) ? 0 : value,
    }))
  }

  const saveChanges = () => {
    setTimeLeft({
      focus: timerInput.focus * 60,
      'short-break': timerInput[mode.SHORT_BREAK] * 60,
      'long-break': timerInput[mode.LONG_BREAK] * 60,
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="absolute top-10 right-10" type="button">
          <Settings
            color="white"
            strokeWidth={1}
            size={18}
            className="h-10 w-10 cursor-pointer"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h3 className="font-medium leading-none">Timer Settings</h3>
            <Separator />
            <div className="flex gap-4 mt-6 mb-6">
              <Field>
                <FieldLabel htmlFor="focus-for">Focus for</FieldLabel>
                <Input
                  value={timerInput.focus}
                  onChange={handleChange(mode.FOCUS)}
                  name="focus-for"
                  id="focus-for"
                  type="text"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="short-break">Short</FieldLabel>
                <Input
                  value={timerInput[mode.SHORT_BREAK]}
                  onChange={handleChange(mode.SHORT_BREAK)}
                  name="short-break"
                  id="short-break"
                  type="text"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="long-break">Long</FieldLabel>
                <Input
                  value={timerInput[mode.LONG_BREAK]}
                  onChange={handleChange(mode.LONG_BREAK)}
                  name="long-break"
                  id="long-break"
                  type="text"
                />
              </Field>
            </div>

            <button
              onClick={saveChanges}
              className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
