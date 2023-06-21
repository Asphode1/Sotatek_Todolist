import { useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import useSelected from '../hooks/use-selected'
import TaskAdd from './list/task-add'

export default function AddBtn() {
	const [open, setOpen] = useState(false)
	const { selected } = useSelected()
	return (
		<>
			<button
				onClick={() => setOpen(true)}
				title="New Task"
				className={`add__btn ${selected.length ? 'add__btn__shifted' : ''} task__hover`}
			>
				<IoAdd />
			</button>
			<TaskAdd open={open} setOpen={setOpen} />
		</>
	)
}
