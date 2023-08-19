import { useQuery } from '@tanstack/react-query'
import req from '../utils/request'

export const useGetPosts = pageNumber => {
	return useQuery({
		queryKey: ['posts', pageNumber],
		queryFn: async () => {
			const { data } = await req.get(`/api/posts/?pageNumber=${pageNumber}`)
			return data
		},
	})
}
