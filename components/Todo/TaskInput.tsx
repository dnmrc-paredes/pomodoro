'use client'

import { PlusSquare } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { FieldLabel } from '../ui/field'

export const TaskInput = () => {
  const [input, setInput] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value)

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="flex  flex-col gap-2 ">
      <FieldLabel htmlFor="add-task" className="text-white/50">
        Add task
      </FieldLabel>
      <InputGroup className="border-white/10">
        <InputGroupInput
          type="text"
          className="text-white"
          placeholder="What are you working on?"
          onChange={handleChange}
          value={input}
          name="add-task"
          id="add-task"
        />
        <InputGroupAddon align="inline-end">
          <button aria-label="Add task" type="submit">
            <PlusSquare />
          </button>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}
