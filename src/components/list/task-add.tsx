import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, SetStateAction } from 'react'
import { createPortal } from 'react-dom'
import TaskForm from '../form/task-form'

export default function TaskAdd({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) {
	return createPortal(
		<AnimatePresence>
			{open ? (
				<motion.div
					key="add__modal__wrapper"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { duration: 0.5 } }}
					exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.25 } }}
					className="add__modal__wrapper"
				>
					<motion.div
						key="add__modal"
						initial={{ opacity: 0, y: -20 }}
						exit={{ opacity: 0, y: -20, transition: { ease: 'easeInOut', duration: 0.5 } }}
						animate={{ opacity: 1, y: 0, transition: { ease: 'easeInOut', delay: 0.25, duration: 0.25 } }}
						className="add__modal"
					>
						<h1>New task</h1>
						<div>
							<TaskForm setOpen={setOpen} />
						</div>
					</motion.div>
				</motion.div>
			) : null}
		</AnimatePresence>,
		document.body
	)
}
