import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import req from '../utils/request'
import { toast } from 'react-toastify'
import { useUser } from '../context/UserProvider'

export const useGetUserProfile = userId => {
	return useQuery({
		queryKey: ['user-profile', userId],
		queryFn: async () => {
			const { data } = await req.get(`api/users/profile/${userId}`)
			return data
		},
	})
}

export const useUpdateProfilePhoto = () => {
	const { user, setUser } = useUser()
	const client = useQueryClient()
	return useMutation(
		async ({ newPhoto }) => {
			const { data } = await req.post(`/api/users/profile/profile-photo-upload`, newPhoto, {
				headers: {
					Authorization: 'Bearer ' + user?.token,
					'Content-Type': 'multipart/form-data',
				},
			})
			return data
		},
		{
			onSuccess: ({ message, profilePhoto }) => {
				client.setQueryData(['user-profile', user._id], oldProfile => ({
					...oldProfile,
					profilePhoto,
				}))
				// modify the user in local storage with new image
				setUser(prev => ({ ...prev, profilePhoto }))
				localStorage.userInfo = JSON.stringify(user)
				toast.success(message)
			},
		},
	)
}

export const useUpdateProfileDetails = () => {
	const { user } = useUser()
	const client = useQueryClient()

	return useMutation(
		async ({ userId, profile }) => {
			const { data } = await req.put(`/api/users/profile/${userId}`, profile, {
				headers: {
					Authorization: 'Bearer ' + user?.token,
				},
			})
			return data
		},
		{
			onSuccess: updatedUser => {
				client.setQueryData(['user-profile', updatedUser._id], updatedUser)
			},
		},
	)
}

export const useDeleteProfile = () => {
	const { user } = useUser()

	return useMutation(
		async ({ userId }) => {
			const { data } = await req.delete(`/api/users/profile/${userId}`, {
				headers: {
					Authorization: 'Bearer ' + user?.token,
				},
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

export const useGetUsersCount = () => {
	const { user } = useUser()
	return useQuery({
		queryKey: ['users-count'],
		queryFn: async () => {
			const { data } = await req.get(`/api/users/count`, {
				headers: {
					Authorization: 'Bearer ' + user?.token,
				},
			})
			return data
		},
	})
}

export const useGetAllUsers = () => {
	const { user } = useUser()
	return useQuery({
		queryKey: ['users'],
		queryFn: async () => {
			const { data } = await req.get(`/api/users/profile`, {
				headers: {
					Authorization: 'Bearer ' + user?.token,
				},
			})
			return data
		},
	})
}
