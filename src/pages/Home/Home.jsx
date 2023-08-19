import './Home.scss'
import PostsList from '../../components/PostsList/PostsList'
import Categories from '../../components/Categories/Categories'
import { Link } from 'react-router-dom'
import { useGetPosts } from '../../hooks/postHooks'
import { LoadingPlacholder } from '../CategoryPage/Category'
import { toast } from 'react-toastify'

const Home = () => {
	const { data: posts, isLoading, error, status } = useGetPosts(1)

	return (
		<section className="home">
			<div className="welcome-background">
				<div className="overlay">
					<h1>Welcome To Blog</h1>
				</div>
			</div>

			<div className="content-layout container">
				{status === 'error' ? (
					<>{toast.error(error.response.data.message)}</>
				) : (
					<div className="latest-post-wrapper">
						<h3>Latest Posts</h3>
						{isLoading ? <LoadingPlacholder /> : <PostsList posts={posts} />}

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

export default Home
