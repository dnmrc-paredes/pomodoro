import { Task } from './Task'
import { TaskInput } from './TaskInput'

export const TaskList = () => {
  const tasks = [1, 2, 3, 4, 5]

  return (
    <div className="w-full flex flex-col items-center justify-center px-4">
      <div className="max-w-162.5 flex flex-col gap-10">
        <TaskInput />
        <ul className="flex flex-col items-center justify-center gap-4">
          {tasks.map((task) => (
            <li className="w-full" key={task}>
              <Task key={task} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
