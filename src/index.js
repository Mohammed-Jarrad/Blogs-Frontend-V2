import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { toast } from 'react-toastify'
import UserProvider from './context/UserProvider'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			onError: error => toast.error(error.response.data.message),
		},
		mutations: {
			onError: error => toast.error(error.response.data.message),
		},
	},
})

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<QueryClientProvider client={queryClient}>
		<UserProvider>
			<App />
		</UserProvider>
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>,
)
