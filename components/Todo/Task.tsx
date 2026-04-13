'use client'

import { Trash, NotepadText } from 'lucide-react'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '../ui/item'
import { useHover } from '@/hooks/useHover'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'
import { deleteTask } from '@/actions/tasks'

type TaskProps = {
  description: string
  taskId: string
  taskNumber: number
}

export const Task = ({ description, taskId, taskNumber }: TaskProps) => {
  const { user } = useAuth()
  const { elementRef, isHovered } = useHover<HTMLDivElement>()

  const userId = user?.id

  console.log({ user })

  const handleDelete = async () => {
    if (!userId) return

    try {
      await deleteTask(userId, taskId)

      toast.success('Task deleted successfully.')
    } catch (error) {
      console.error('Error deleting task:', error)
      toast.error('Failed to delete task. Please try again.')
    }
  }

  return (
    <Item
      className="border-white/10 hover:scale-[1.02] transition-[2s]"
      ref={elementRef}
      variant="outline"
    >
      <ItemMedia>
        <NotepadText color="white" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="text-white">Task {taskNumber}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
      <ItemActions>
        {isHovered && (
          <button onClick={handleDelete} aria-label="Delete note" type="button">
            <Trash />
          </button>
        )}
      </ItemActions>
    </Item>
  )
}
