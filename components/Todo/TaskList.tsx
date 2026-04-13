import { Task } from './Task'
import { TaskInput } from './TaskInput'
import { serverClient } from '@/lib/serverClient'

export const TaskList = async () => {
  const client = await serverClient()
  const {
    data: { user },
  } = await client.auth.getUser()
  const { data = [] } = (await client
    .from('tasks')
    .select('description, id')
    .eq('task_by', user?.id)) as {
    data: { description: string; id: string }[]
  }

  return (
    <div className="w-full flex flex-col items-center justify-center px-4">
      <div className="flex flex-col gap-10 w-full max-w-150">
        <TaskInput />
        <ul className="flex flex-col items-cente justify-center w-full gap-4">
          {data?.map((task, idx) => (
            <li className="w-full" key={task.id}>
              <Task
                key={task.id}
                description={task.description}
                taskId={task.id}
                taskNumber={idx + 1}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
