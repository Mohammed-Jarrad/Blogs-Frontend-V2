import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import req from '../utils/request'
import { toast } from 'react-toastify'
import { useUser } from '../context/UserProvider'

export const useGetAllCategories = () => {
	return useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			const { data } = await req.get(`/api/categories`)
			return data
		},
	})
}

export const useCreateCategory = () => {
	const client = useQueryClient()
	const {
		user: { token },
	} = useUser()

	return useMutation(
		async category => {
			const { data } = await req.post(`/api/categories`, category, {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			return data
		},
		{
			onSuccess: data => {
				client.setQueryData(['categories'], oldData => [...oldData, data]) // update the categories cache
				toast.success('Category has been created successfully')
			},
		},
	)
}

export const useDeleteCategory = () => {
	const client = useQueryClient()
	const {
		user: { token },
	} = useUser()
	return useMutation(
		async categoryId => {
			const { data } = await req.delete(`/api/categories/${categoryId}`, {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			return data
		},
		{
			onSuccess: data => {
				client.setQueryData(['categories'], oldData =>
					// update the categories cache
					[...oldData].filter(c => c._id !== data.categoryId),
				)
				toast.success('Category has been deleted successfully')
			},
		},
	)
}
