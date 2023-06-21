import { zodResolver } from '@hookform/resolvers/zod'
import vi from 'date-fns/locale/vi'
import { Dispatch, SetStateAction, useState } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, FieldValues, UseFormProps, useForm } from 'react-hook-form'
import Select from 'react-select'
import { Prioriries, TaskProps } from '../../context/tasks-context'
import { useTasks } from '../../hooks/use-tasks'
import schema from '../../zod/zod-schema'
import CustomDatepicker from '../utils/custom-datepicker'
registerLocale('vi', vi)

export default function TaskForm({ item, setOpen }: { item?: TaskProps; setOpen?: Dispatch<SetStateAction<boolean>> }) {
	const formObj: UseFormProps = {
		resolver: zodResolver(schema),
		...Object.assign(
			{},
			item === undefined
				? { defaultValues: { dueDate: new Date(), priority: Prioriries[1] } }
				: { defaultValues: { ...item, dueDate: new Date(item.dueDate) } }
		),
	}
	const { tasks, setTasks } = useTasks()
	const [err, setErr] = useState('')
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm(formObj)
	const onSubmit = (e: FieldValues) => {
		if (tasks.findIndex((t) => t.name === e.name) !== -1 && !item) setErr('Duplicate name task')
		else {
			setErr('')
			if (item) {
				const index = tasks.findIndex((t) => t.name === item.name)
				setTasks((task) =>
					[...task.slice(0, index), e as TaskProps, ...tasks.slice(index + 1, tasks.length)].sort(
						(a, b) => Date.parse(a.dueDate.toString()) - Date.parse(b.dueDate.toString())
					)
				)
			} else {
				setTasks((task) =>
					[...task, e as TaskProps].sort((a, b) => Date.parse(a.dueDate.toString()) - Date.parse(b.dueDate.toString()))
				)
				if (setOpen !== undefined) setOpen(false)
			}
		}
	}

	return (
		<form className="task__form" onSubmit={handleSubmit((e) => onSubmit(e))}>
			<div className="task__form__name">
				<input
					placeholder="Add new task..."
					onFocus={() => setErr('')}
					className={`${err.length || errors.name ? 'err__input' : ''}`}
					type="text"
					{...register('name')}
				/>
				{err.length ? <span className="err__text">{err}</span> : null}
				{errors.name ? <span className="err__text">{errors.name.message?.toString()}</span> : null}
			</div>
			<div>
				<label htmlFor="description">Description</label>
				<textarea {...register('description')}></textarea>
			</div>
			<div className="option__btn">
				<div>
					<label>Due Date</label>
					<Controller
						control={control}
						name="dueDate"
						render={({ field }) => (
							<ReactDatePicker
								portalId="datepicker"
								className="w__full"
								popperPlacement="top-end"
								dateFormat="dd MMMM yyyy"
								onChange={(date) => field.onChange(date)}
								minDate={new Date()}
								selected={new Date(field.value)}
								locale={'vi'}
								shouldCloseOnSelect={false}
								customInput={<CustomDatepicker />}
							/>
						)}
					/>
				</div>
				<div>
					<label>Priority</label>
					<Controller
						control={control}
						name="priority"
						render={({ field }) => (
							<Select
								{...field}
								menuPlacement="top"
								className="react__select"
								classNamePrefix={'react-select'}
								defaultValue={field.value}
								options={[
									{ value: 'Low', label: 'Low' },
									{ value: 'Normal', label: 'Normal' },
									{ value: 'High', label: 'High' },
								]}
							/>
						)}
					/>
				</div>
			</div>
			<div className="form__btn">
				{setOpen === undefined ? (
					<button type="submit">Update</button>
				) : (
					<>
						<button type="submit">Add</button>
						<button className="cancel__btn" type="button" onClick={() => setOpen(false)}>
							Cancel
						</button>
					</>
				)}
			</div>
		</form>
	)
}
