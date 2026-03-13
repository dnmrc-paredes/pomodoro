import { Settings } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Field, FieldLabel } from '@/components/ui/field'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { Mode } from '@/types/types'
import { mode } from '@/constants/contants'

type AllModes = {
  focus: number
  'short-break': number
  'long-break': number
}

type TimerSettingsProps = {
  timeLeft: AllModes
  setTimeLeft: Dispatch<SetStateAction<AllModes>>
}

export const TimerSettings = ({
  setTimeLeft,
  timeLeft,
}: TimerSettingsProps) => {
  const handleChange = (mode: Mode) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setTimeLeft((prev) => ({
      ...prev,
      [mode]: Number.isNaN(value) ? 0 : value,
    }))
  }

  const saveChanges = () => {
    setTimeLeft({
      focus: timeLeft.focus * 60,
      'short-break': timeLeft[mode.SHORT_BREAK] * 60,
      'long-break': timeLeft[mode.LONG_BREAK] * 60,
    })
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Settings
          color="white"
          strokeWidth={1}
          size={18}
          className="h-10 w-10 cursor-pointer absolute top-10 right-10"
        />
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
                  value={timeLeft.focus}
                  onChange={handleChange(mode.FOCUS)}
                  name="focus-for"
                  id="focus-for"
                  type="text"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="focus-for">Short</FieldLabel>
                <Input
                  value={timeLeft[mode.SHORT_BREAK]}
                  onChange={handleChange(mode.SHORT_BREAK)}
                  name="short-break"
                  id="short-break"
                  type="text"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="focus-for">Long</FieldLabel>
                <Input
                  value={timeLeft[mode.LONG_BREAK]}
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
