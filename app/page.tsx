import { Timer } from '@/components/Timer/Timer'
import { TaskList } from '@/components/Todo/TaskList'

export default function Home() {
  return (
    <div className="bg-black">
      <Timer />
      <TaskList />
    </div>
  )
}
