import { forwardRef } from 'react'
import { IoCalendarOutline } from 'react-icons/io5'

interface CustomDatepickerProps {
	onClick?: (e: React.MouseEvent<HTMLElement>) => void
	value?: string
}

const CustomDatepicker = forwardRef<HTMLButtonElement, CustomDatepickerProps>(({ value, onClick }, ref) => {
	return (
		<button type="button" onClick={onClick} ref={ref} className="custom__datepicker">
			<span>{value}</span>
			<span className="float__right custom__datepicker__right">
				<span className="custom__datepicker__line"></span>
				<span>
					<IoCalendarOutline />
				</span>
			</span>
		</button>
	)
})

export default CustomDatepicker
