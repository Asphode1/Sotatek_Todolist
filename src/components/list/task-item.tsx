import { Dispatch, SetStateAction } from 'react'
import { IoCheckmark, IoChevronDownOutline, IoTrashOutline } from 'react-icons/io5'
import { TaskProps } from '../../context/tasks-context'
import useSelected from '../../hooks/use-selected'
import { useTasks } from '../../hooks/use-tasks'
import TaskExpand from './task-expand'

const TaskItemMatchColor = {
	Low: { item: 'task__green', expand: 'expand__green' },
	Normal: { item: 'task__yellow', expand: 'expand__yellow' },
	High: { item: 'task__red', expand: 'expand__red' },
}

export default function TaskItem({
	item,
	curr,
	setCurr,
}: {
	item: TaskProps
	curr: string
	setCurr: Dispatch<SetStateAction<string>>
}) {
	const { setTasks } = useTasks()
	const { selected, setSelected } = useSelected()
	return (
		<>
			<div
				onClick={() =>
					setCurr((curr) => {
						if (item.name === curr) return ''
						return item.name
					})
				}
				title={item.name === curr ? 'Click to shrink' : 'Click to expand'}
				className={`task__item ${TaskItemMatchColor[item.priority.value].item} task__hover`}
			>
				<button
					onClick={(e) => {
						e.stopPropagation()
						setSelected((s) => {
							if (s.indexOf(item.name) === -1) return [...s, item.name]
							return s.filter((e) => e !== item.name)
						})
					}}
					className="checkbox"
				>
					{selected.indexOf(item.name) !== -1 ? <IoCheckmark /> : null}
				</button>
				<div>
					<p>{item.name}</p>
				</div>
				<div className="float__right">
					<div className="remove">
						<button
							onClick={(e) => {
								e.stopPropagation()
								setTasks((list) => list.filter((e) => e.name !== item.name))
							}}
							title="Remove"
							className="remove__btn"
						>
							<IoTrashOutline />
						</button>
					</div>
					<div className="expand">
						<IoChevronDownOutline className={`${curr === item.name ? 'transform__z' : ''} transform__transition`} />
					</div>
				</div>
			</div>
			<TaskExpand item={item} isExpand={curr === item.name} />
		</>
	)
}
