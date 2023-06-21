import { AnimatePresence, motion } from 'framer-motion'
import { TaskProps } from '../../context/tasks-context'
import TaskForm from '../form/task-form'

const TaskItemMatchColor = {
	Low: 'expand__green',
	Normal: 'expand__yellow',
	High: 'expand__red',
}

export default function TaskExpand({ item, isExpand }: { item: TaskProps; isExpand: boolean }) {
	return (
		<AnimatePresence>
			{isExpand ? (
				<motion.div
					key="expand"
					initial={{ height: 0 }}
					animate={{ height: 'auto', transition: { duration: 0.5 } }}
					exit={{ height: 0, transition: { duration: 0.5 } }}
					className={`task__expanded ${TaskItemMatchColor[item.priority.value]}`}
				>
					<TaskForm item={item} />
				</motion.div>
			) : null}
		</AnimatePresence>
	)
}
