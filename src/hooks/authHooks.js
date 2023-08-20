import { useMutation, useQuery } from '@tanstack/react-query'
import req from '../utils/request'
import { toast } from 'react-toastify'
import { useUser } from '../context/UserProvider.js'

export const useLogin = () => {
	const { setUser } = useUser()
	return useMutation(
		async user => {
			const { data } = await req.post('/api/auth/login', user)
			return data
		},
		{
			onSuccess: data => {
				localStorage.setItem('userInfo', JSON.stringify(data))
				setUser(data)
			},
		},
	)
}

export const useRegister = () => {
	return useMutation(
		async user => {
			const { data } = await req.post(`/api/auth/register`, user)
			return data
		},
		{
			onSuccess: ({ message }) => toast.success(message),
		},
	)
}

export const useLogout = () => {
	const { setUser } = useUser()
	return useMutation(() => {
		setUser(null)
		localStorage.removeItem('userInfo')
	})
}

export const useVerifyEmail = token => {
	return useQuery({
		queryKey: ['verify-email', token],
		queryFn: async () => {
			const { data } = await req.get(`/api/auth/verify/${token}`)
			return data
		},
	})
}
