import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import req from '../utils/request'
import { useUser } from '../context/UserProvider'

export const useCreateComment = () => {
	const client = useQueryClient()
	const {
		user: { token },
	} = useUser()

	return useMutation(
		async ({ comment }) => {
			const { data } = await req.post(`/api/comments`, comment, {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			return data
		},
		{
			onSuccess: data => {
				const { postId } = data
				client.setQueryData(['single-post', postId], oldPost => {
					if (oldPost && oldPost.comments) {
						return {
							...oldPost,
							comments: [...oldPost.comments, data],
						}
					}
					return oldPost
				})
				client.setQueryData(['comments'], oldComments =>
					oldComments ? [...oldComments, data] : oldComments,
				)
			},
		},
	)
}

export const useUpdateComment = () => {
	const client = useQueryClient()
	const {
		user: { token },
	} = useUser()

	return useMutation(
		async ({ commentId, text }) => {
			const { data } = await req.put(
				`/api/comments/${commentId}`,
				{ text },
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				},
			)
			return data
		},
		{
			onSuccess: data => {
				const { postId } = data
				client.setQueryData(['single-post', postId], oldPost => {
					return {
						...oldPost,
						comments: [...oldPost.comments.map(c => (c._id === data._id ? data : c))],
					}
				})
				client.setQueryData(['comments'], oldComments => {
					if (oldComments && oldComments?.length > 0) {
						return [...oldComments.map(comment => (comment._id === data._id ? data : comment))]
					}
					return oldComments
				})
			},
		},
	)
}

export const useDeleteComment = () => {
	const {
		user: { token },
	} = useUser()

	return useMutation(async ({ commentId }) => {
		const { data } = await req.delete(`/api/comments/${commentId}`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		})
		return data
	})
}

export const useGetAllComments = () => {
	const {
		user: { token },
	} = useUser()
	return useQuery({
		queryKey: ['comments'],
		queryFn: async () => {
			const { data } = await req.get('/api/comments', {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			return data
		},
	})
}

export const useGetCommentsCount = () => {
	const {
		user: { token },
	} = useUser()
	return useQuery({
		queryKey: ['comments-count'],
		queryFn: async () => {
			const { data } = await req.get('/api/comments/count', {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			return data
		},
	})
}
