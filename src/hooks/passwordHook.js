import { useMutation, useQuery } from '@tanstack/react-query'
import req from '../utils/request'
import { toast } from 'react-toastify'

export const useSendResetPasswordLink = () => {
	return useMutation(
		async infos => {
			const { data } = await req.post(`/api/password/reset-password-link`, infos)
			return data
		},
		{
			onSuccess: ({ message }) => {
				toast.success(message)
			},
		},
	)
}

export const useCheckResetLink = (userId, token) => {
	return useQuery({
		queryKey: ['check-password', userId, token],
		queryFn: async () => {
			const { data } = await req.get(`/api/password/reset-password/${userId}/${token}`)
			return data
		},
	})
}

export const useResetPassword = () => {
	return useMutation(
		async ({ userId, token, password }) => {
			const { data } = await req.post(`/api/password/reset-password/${userId}/${token}`, {
				password,
			})
			return data
		},
		{
			onSuccess: ({ message }) => {
				toast.success(message)
			},
		},
	)
}
