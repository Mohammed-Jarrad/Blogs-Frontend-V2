import './Home.scss'
import PostsList from '../../components/PostsList/PostsList'
import Categories from '../../components/Categories/Categories'
import { Link } from 'react-router-dom'
import { useGetPosts } from '../../hooks/postHooks'
import { LoadingPlacholder } from '../CategoryPage/Category'
import { Alert } from '@mui/material'

const Home = () => {
	const { data: posts, error, status } = useGetPosts(1)

	return (
		<section className="home">
			<div className="welcome-background">
				<div className="overlay">
					<h1>Welcome To Blog</h1>
				</div>
			</div>

			<div className="content-layout container">
				{status === 'error' ? (
					<Error error={error} />
				) : (
					<div className="latest-post-wrapper">
						<h3>Latest Posts</h3>
						{status === 'loading' ? <LoadingPlacholder /> : <PostsList posts={posts} />}

						<div className="posts-link">
							<Link to={'/posts'}>See All Posts</Link>
						</div>
					</div>
				)}

				<Categories />
			</div>
		</section>
	)
}

export const Error = ({ error }) => {
	return (
		<Alert variant="filled" severity="error">
			{error.response.data.message}
		</Alert>
	)
}

export default Home
