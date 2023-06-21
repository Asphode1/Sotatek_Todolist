import { z } from 'zod'

const PriorityZod = z.object({
	value: z.enum(['Low', 'Normal', 'High']),
	label: z.enum(['Low', 'Normal', 'High']),
})

const schema = z.object({
	name: z
		.string({
			required_error: 'Task name is required',
		})
		.nonempty(),
	description: z.string().optional(),
	dueDate: z
		.date({
			invalid_type_error: 'Not a valid Date',
		})
		.default(new Date()),
	priority: PriorityZod.default({ value: 'Normal', label: 'Normal' }),
})

export default schema
