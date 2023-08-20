import './Categories.scss'
import { Link } from 'react-router-dom'
import { LoadingPlacholder } from '../../pages/CategoryPage/Category'
import { useGetAllCategories } from '../../hooks/categoryHooks'

const Categories = () => {
	const { data: categories, isLoading } = useGetAllCategories()

	return (
		<div className="categories-wrapper">
			<h3>Categories</h3>

			{isLoading ? (
				<LoadingPlacholder />
			) : (
				<div className="categories">
					{categories?.map(c => {
						return (
							<Link to={`/posts/categories/${c?.title}`} className="category-item" key={c?._id}>
								{c?.title}
							</Link>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default Categories
