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

export const Task = () => {
  const { elementRef, isHovered } = useHover<HTMLDivElement>()

  return (
    <Item className="border-white/10" ref={elementRef} variant="outline">
      <ItemMedia>
        <NotepadText color="white" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="text-white">Task 1 {String(isHovered)}</ItemTitle>
        <ItemDescription>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
          deleniti error nobis totam modi ullam accusantium possimus, porro
          distinctio dolore earum eos, a magni fugiat velit atque unde
          voluptates quos.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        {isHovered && (
          <button aria-label="Delete note" type="button">
            <Trash />
          </button>
        )}
      </ItemActions>
    </Item>
  )
}
