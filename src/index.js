import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import store from './redux/store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<App />
				<ReactQueryDevtools initialIsOpen={false} />
			</Provider>
		</QueryClientProvider>
	</React.StrictMode>,
)
