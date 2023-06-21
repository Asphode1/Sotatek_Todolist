import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'

export interface SelectedContextProps {
	selected: string[]
	setSelected: Dispatch<SetStateAction<string[]>>
}

export const SelectedContext = createContext<SelectedContextProps | null>(null)

export default function SelectedContextProvider({ children }: { children: ReactNode[] | ReactNode }) {
	const [selected, setSelected] = useState<string[]>([])

	return <SelectedContext.Provider value={{ selected, setSelected }}>{children}</SelectedContext.Provider>
}
