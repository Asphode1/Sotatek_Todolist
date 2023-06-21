import { AnimatePresence, motion } from 'framer-motion'
import useSelected from '../hooks/use-selected'
import { useTasks } from '../hooks/use-tasks'

export default function BulkAction() {
	const { selected, setSelected } = useSelected()
	const { setTasks } = useTasks()

	const removeAll = (e: React.MouseEvent) => {
		e.preventDefault()
		setTasks((task) => task.filter((t) => !selected.includes(t.name)))
		setSelected([])
	}

	return (
		<AnimatePresence>
			{selected.length ? (
				<motion.div
					initial={{ y: '100%' }}
					animate={{ y: 0 }}
					exit={{ y: '100%' }}
					transition={{ duration: 0.3 }}
					className="bulk__action__wrapper"
				>
					<div className="bulk__action">
						<span>Bulk Action</span>
						<div className="float__right">
							<button className="done__btn" title="Temporarily ignored">
								Done
							</button>
							<button className="remove__bulk__btn" onClick={removeAll}>
								Remove
							</button>
						</div>
					</div>
				</motion.div>
			) : null}
		</AnimatePresence>
	)
}
