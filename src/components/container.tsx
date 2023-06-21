import { useEffect, useState } from 'react'
import useSelected from '../hooks/use-selected'
import { useTasks } from '../hooks/use-tasks'
import BulkAction from './bulk-action'
import TaskList from './list/task-list'

export default function Container() {
	const { tasks } = useTasks()
	const [list, setList] = useState(tasks)
	const { selected } = useSelected()
	const [val, setVal] = useState('')

	useEffect(() => {
		setVal('')
		setList(tasks)
	}, [tasks])

	useEffect(() => {
		if (val.length) {
			setList(() => tasks.filter((e) => e.name.toLowerCase().indexOf(val.toLowerCase()) >= 0))
		} else setList(tasks)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [val])

	return (
		<div className="container">
			<div className="search__bar">
				<input
					className="search__input"
					placeholder="Search for task..."
					type="text"
					value={val}
					onChange={(e) => setVal(e.target.value)}
				/>
			</div>
			<div className={`list__wrapper  ${selected.length ? 'list__wrapper__shrink' : ''}`}>
				<TaskList list={list} />
			</div>
			<BulkAction />
		</div>
	)
}
