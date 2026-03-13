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

export const TimerSettings = ({
  setTimeLeft,
}: {
  setTimeLeft: Dispatch<SetStateAction<number>>
}) => {
  const [focusedMinutes, setFocusedMinutes] = useState(0)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setFocusedMinutes(Number.isNaN(value) ? 0 : value)
  }

  const saveChanges = () => {
    setTimeLeft(focusedMinutes * 60)
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Settings className="h-10 w-10 cursor-pointer absolute top-10 right-10" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h3 className="font-medium leading-none">Timer Settings</h3>
            <Separator />
            <div className='flex gap-4 mt-6 mb-6'>
              <Field>
                <FieldLabel htmlFor="focus-for">Focus for</FieldLabel>
                <Input
                  value={focusedMinutes}
                  onChange={handleChange}
                  name="focus-for"
                  id="focus-for"
                  type="text"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="focus-for">Short</FieldLabel>
                <Input
                  value={focusedMinutes}
                  onChange={handleChange}
                  name="short-break"
                  id="short-break"
                  type="text"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="focus-for">Long</FieldLabel>
                <Input
                  value={focusedMinutes}
                  onChange={handleChange}
                  name="long-break"
                  id="long-break"
                  type="text"
                />
              </Field>
            </div>

            <button onClick={saveChanges} className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-md">
              Save
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
