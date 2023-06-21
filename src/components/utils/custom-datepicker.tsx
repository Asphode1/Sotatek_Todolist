import { forwardRef } from 'react'
import { IoCalendarOutline } from 'react-icons/io5'

const CustomDatepicker = forwardRef(({ value, onClick }, ref) => {
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
