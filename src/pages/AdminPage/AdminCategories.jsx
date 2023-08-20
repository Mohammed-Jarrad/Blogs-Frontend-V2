import Swal from 'sweetalert2'
import { useDeleteCategory, useGetAllCategories } from '../../hooks/categoryHooks'
import { LoadingPlacholder } from '../CategoryPage/Category'
import { CircularProgress } from '@mui/material'

const AdminCategories = () => {
	const categoriesQuery = useGetAllCategories()
	const deleteCategoryMutation = useDeleteCategory()

	// Handle Delete Categories
	const handleDelete = categoryId => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this Category!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'var(--dark-blue-color)',
			iconColor: 'red',
			cancelButtonColor: 'var(--red-color)',
			confirmButtonText: 'Yes, delete it!',
		}).then(result => {
			if (result.isConfirmed) {
				deleteCategoryMutation.mutate(categoryId)
			}
		})
	}

	if (categoriesQuery.isLoading) {
		return <LoadingPlacholder newClass={'admin-table-wrapper'} />
	}

	return (
		<div className="admin-table-wrapper">
			{deleteCategoryMutation.isLoading ? <CircularProgress size={60} /> : <h2>Categories</h2>}

			<div className={`table-wrapper`}>
				<table>
					<thead>
						<tr>
							<th>Count</th>
							<th>Category Title</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
						{categoriesQuery.data?.map((item, index) => (
							<tr key={index}>
								<td>
									<div className="count">{index + 1}</div>
								</td>
								<td>
									<div className="category-title">{item.title}</div>
								</td>
								<td>
									<div className="actions">
										<button onClick={() => handleDelete(item._id)}>Delete</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default AdminCategories
