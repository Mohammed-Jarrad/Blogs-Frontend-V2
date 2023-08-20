import PostsList from '../../components/PostsList/PostsList'
import './PostPage.scss'
import Categories from '../../components/Categories/Categories'
import Pagination from '../../components/Pagination/Pagination'
import { useState } from 'react'
import { useGetPosts, useGetPostsCount } from '../../hooks/postHooks'
import { LoadingPlacholder } from '../CategoryPage/Category'

const POST_PER_PAGE = 3

const PostsPage = () => {
	const [currentPage, setCurrentPage] = useState(1)

	const { data: postsCount } = useGetPostsCount()
	const { data: posts, isLoading } = useGetPosts(currentPage)

	const pages = Math.ceil(postsCount / POST_PER_PAGE)

	return (
		<>
			<Pagination currentPage={currentPage} pages={pages} setCurrentPage={setCurrentPage} />

			<section className="posts-page container">
				{isLoading ? <LoadingPlacholder /> : <PostsList posts={posts} />}
				<Categories />
			</section>

			<Pagination currentPage={currentPage} pages={pages} setCurrentPage={setCurrentPage} />
		</>
	)
}

export default PostsPage
