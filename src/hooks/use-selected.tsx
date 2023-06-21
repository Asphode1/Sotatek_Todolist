import { useContext } from 'react'
import { SelectedContext } from '../context/selected-context'

export default function useSelected() {
	const { selected, setSelected } = useContext(SelectedContext)!
	return { selected, setSelected }
}
