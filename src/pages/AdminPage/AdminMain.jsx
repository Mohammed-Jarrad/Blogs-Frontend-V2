import { Link } from 'react-router-dom'
import AddCategoryForm from './AddCategoryForm'
import { useGetAllCategories } from '../../hooks/categoryHooks'
import { useGetCommentsCount } from '../../hooks/commentHooks'
import { useGetPostsCount } from '../../hooks/postHooks'
import { useGetUsersCount } from '../../hooks/profileHooks'

const AdminMain = () => {
	const categoriesQuery = useGetAllCategories()
	const commentsCountQuery = useGetCommentsCount()
	const postsCountQuery = useGetPostsCount()
	const usersCountQuery = useGetUsersCount()

	return (
		<div className="admin-main">
			<div className="admin-main-header">
				<div className="card">
					<h2>Users</h2>
					<div className="count">
						{usersCountQuery.isLoading ? 'Loading...' : usersCountQuery.data}
					</div>
					<div className="icons">
						<Link to={'/admin-dashboard/users'}>See All Users</Link>
						<i className="bi bi-person"></i>
					</div>
				</div>

				<div className="card">
					<h2>Posts</h2>
					<div className="count">
						{postsCountQuery.isLoading ? 'Loading...' : postsCountQuery.data}
					</div>
					<div className="icons">
						<Link to={'/admin-dashboard/posts'}>See All Posts</Link>
						<i className="bi bi-file-post"></i>
					</div>
				</div>

				<div className="card">
					<h2>Categories</h2>
					<div className="count">
						{categoriesQuery.isLoading ? 'Loading...' : categoriesQuery.data?.length}
					</div>
					<div className="icons">
						<Link to={'/admin-dashboard/categories'}>See All Categories</Link>
						<i className="bi bi-tag-fill"></i>
					</div>
				</div>

				<div className="card">
					<h2>Comments</h2>
					<div className="count">
						{commentsCountQuery.isLoading ? 'Loading...' : commentsCountQuery.data}
					</div>
					<div className="icons">
						<Link to={'/admin-dashboard/comments'}>See All Comments</Link>
						<i className="bi bi-chat-left-text"></i>
					</div>
				</div>
			</div>

			<AddCategoryForm />
		</div>
	)
}

export default AdminMain
