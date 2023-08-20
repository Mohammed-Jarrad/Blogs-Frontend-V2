import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import req from '../utils/request'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useUser } from '../context/UserProvider'

export const useGetPosts = pageNumber => {
	return useQuery({
		queryKey: ['posts-by-page-number', pageNumber],
		queryFn: async () => {
			const { data } = await req.get(`/api/posts/?pageNumber=${pageNumber}`)
			return data
		},
	})
}

export const useGetAllPosts = () => {
	return useQuery({
		queryKey: ['posts'],
		queryFn: async () => {
			const { data } = await req.get(`/api/posts`)
			return data
		},
	})
}

export const useGetPostsByCategory = category => {
	return useQuery({
		queryKey: ['category-posts', category],
		queryFn: async () => {
			const { data } = await req.get(`/api/posts/?category=${category}`)
			return data
		},
	})
}

export const useGetPostsCount = () => {
	return useQuery({
		queryKey: ['posts-count'],
		queryFn: async () => {
			const { data } = await req.get(`/api/posts/count`)
			return data
		},
	})
}

export const useGetSinglePost = postId => {
	return useQuery({
		queryKey: ['single-post', postId],
		queryFn: async () => {
			const { data } = await req.get(`/api/posts/${postId}`)
			return data
		},
	})
}

export const useCreatePost = () => {
	const client = useQueryClient()
	const navigate = useNavigate()
	const {
		user: { token },
	} = useUser()
	return useMutation(
		async post => {
			const { data } = await req.post(`/api/posts`, post, {
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-Type': 'multipart/form',
				},
			})
			return data
		},
		{
			onSuccess: data => {
				toast.success('You post has been created successfully')
				client.invalidateQueries(['posts-by-page-number', 1])
				client.setQueryData(['category-posts', data.category], old => (old ? [...old, data] : old))
				navigate('/')
			},
		},
	)
}

export const useDeletePost = () => {
	const {
		user: { token },
	} = useUser()
	return useMutation(
		async postId => {
			const { data } = await req.delete(`/api/posts/${postId}`, {
				headers: {
					Authorization: 'Bearer ' + token,
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

export const useUpdatePostImage = () => {
	const client = useQueryClient()
	const {
		user: { token },
	} = useUser()
	return useMutation(
		async ({ image, postId }) => {
			const { data } = await req.put(`/api/posts/update-image/${postId}`, image, {
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-Type': 'multipart/form',
				},
			})
			return data
		},
		{
			onSuccess: ({ updatedPost, message }) => {
				toast.success(message)
				// update single post cache
				client.setQueryData(['single-post', updatedPost._id], oldData => updatedPost)
				// update posts in home page cache
				client.setQueryData(['posts-by-page-number', 1], oldData => {
					return oldData
						? oldData.map(post => (post._id === updatedPost._id ? updatedPost : post))
						: []
				})
			},
		},
	)
}

export const useUpdatePostDetails = () => {
	const client = useQueryClient()
	const {
		user: { token },
	} = useUser()
	return useMutation(
		async ({ postDetails, postId }) => {
			const { data } = await req.put(`/api/posts/${postId}`, postDetails, {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			return data
		},
		{
			onSuccess: data => {
				// update single post cache
				client.setQueryData(['single-post', data._id], oldData => data)
			},
		},
	)
}

export const useTogglePostLike = () => {
	const client = useQueryClient()
	const {
		user: { token },
	} = useUser()
	return useMutation(
		async postId => {
			const { data } = await req.put(
				`/api/posts/like/${postId}`,
				{},
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				},
			)
			return data
		},
		{
			onSuccess: ({ likes, _id }) => {
				// update single post cache
				client.setQueryData(['single-post', _id], oldData => ({ ...oldData, likes }))
			},
		},
	)
}
