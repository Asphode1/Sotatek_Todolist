import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import SelectedContextProvider from './context/selected-context.tsx'
import TasksContextProvider from './context/tasks-context.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<TasksContextProvider>
			<SelectedContextProvider>
				<App />
			</SelectedContextProvider>
		</TasksContextProvider>
	</React.StrictMode>
)
