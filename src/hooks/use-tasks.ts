import { useContext } from 'react'
import { TasksContext } from '../context/tasks-context'

export function useTasks() {
	const { tasks, setTasks } = useContext(TasksContext)!
	return { tasks, setTasks }
}
