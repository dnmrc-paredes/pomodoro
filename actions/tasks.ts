'use server'

import { serverClient } from '@/lib/serverClient'
import { revalidatePath } from 'next/cache'

export const deleteTask = async (userId: string, taskId: string) => {
  const client = await serverClient()

  try {
    const { error } = await client
      .from('tasks')
      .delete()
      .eq('task_by', userId)
      .eq('id', taskId)

    if (error) {
      throw new Error('Failed to delete task. Please try again.')
    }

    revalidatePath('/')
  } catch (error) {
    console.error('Error deleting task:', error)
  }
}

export const addTask = async (input: string) => {
  const client = await serverClient()

  try {
    const { error } = await client.from('tasks').insert({ description: input })

    if (error) {
      console.error('Error adding task:', error)
      throw new Error('Failed to add task. Please try again.')
    }

    revalidatePath('/')
  } catch (error) {
    console.error('Error adding task:', error)
    throw new Error('Something went wrong. Please try again.')
  }
}
