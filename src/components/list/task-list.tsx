import { useState } from 'react'
import { TaskProps } from '../../context/tasks-context'
import AddBtn from '../add-btn'
import TaskItem from './task-item'

export default function TaskList({ list }: { list: TaskProps[] }) {
	const [curr, setCurr] = useState<string>('')

	return (
		<ul>
			{list.length ? (
				list.map((e) => (
					<li key={e.name}>
						<TaskItem item={e} curr={curr} setCurr={setCurr} />
					</li>
				))
			) : (
				<li className="notask">There are no tasks</li>
			)}
			<li>
				<AddBtn />
			</li>
		</ul>
	)
}
