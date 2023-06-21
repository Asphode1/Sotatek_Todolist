import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react'

export type Priority =
	| { value: 'Low'; label: 'Low' }
	| { value: 'Normal'; label: 'Normal' }
	| { value: 'High'; label: 'High' }

export const Prioriries: Priority[] = [
	{ value: 'Low', label: 'Low' },
	{ value: 'Normal', label: 'Normal' },
	{ value: 'High', label: 'High' },
]

export interface TaskProps {
	name: string
	description?: string
	dueDate: Date
	priority: Priority
}

interface ContextProps {
	tasks: TaskProps[]
	setTasks: Dispatch<SetStateAction<TaskProps[]>>
}

export const TasksContext = createContext<ContextProps | null>(null)

const DefaultList: TaskProps[] = [
	{
		name: 'Do Homework',
		description: 'lorem ipsum...',
		dueDate: new Date('2023-07-01'),
		priority: Prioriries[0],
	},
	{
		name: 'Do Housework',
		description: 'lorem ipsum...',
		dueDate: new Date('2023-06-27'),
		priority: Prioriries[1],
	},
	{
		name: 'Learn Something',
		description: 'lorem ipsum...',
		dueDate: new Date('2023-06-21'),
		priority: Prioriries[2],
	},
]

export default function TasksContextProvider({ children }: { children: ReactNode | ReactNode[] }) {
	const [tasks, setTasks] = useState<TaskProps[]>([])

	useEffect(() => {
		const str = localStorage.getItem('tasks')
		if (str) {
			const data = JSON.parse(str) as TaskProps[]
			if (data.length === 0 || !(data.length && tasks.length === 0))
				localStorage.setItem('tasks', JSON.stringify(tasks))
		}
	}, [tasks])

	useEffect(() => {
		const str = localStorage.getItem('tasks')
		if (str) {
			const data = JSON.parse(str) as TaskProps[]
			setTasks(data)
		} else localStorage.setItem('tasks', JSON.stringify(DefaultList))
	}, [])

	return <TasksContext.Provider value={{ tasks, setTasks }}>{children}</TasksContext.Provider>
}
