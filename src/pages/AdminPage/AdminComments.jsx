import Swal from 'sweetalert2'
import { useDeleteComment, useGetAllComments } from '../../hooks/commentHooks'
import { useQueryClient } from '@tanstack/react-query'
import { CircularProgress } from '@mui/material'
import { LoadingPlacholder } from '../CategoryPage/Category'

const AdminComments = () => {
	const { data: comments, isLoading } = useGetAllComments()
	const deleteCommentMutation = useDeleteComment()
	const client = useQueryClient()

	// Handle Delete Comment
	const handleDelete = commentId => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this Comment!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'var(--dark-blue-color)',
			iconColor: 'red',
			cancelButtonColor: 'var(--red-color)',
			confirmButtonText: 'Yes, delete it!',
		}).then(result => {
			if (result.isConfirmed) {
				deleteCommentMutation.mutate(
					{ commentId },
					{
						onSuccess: () => {
							client.setQueryData(['comments'], oldComments => {
								return [...oldComments].filter(c => c._id !== commentId)
							})
						},
					},
				)
			}
		})
	}

	if (isLoading) {
		return <LoadingPlacholder newClass="admin-table-wrapper" />
	}

	return (
		<div className="admin-table-wrapper">
			{deleteCommentMutation.isLoading ? <CircularProgress /> : <h2>Comments</h2>}

			<div className={`table-wrapper`}>
				<table>
					<thead>
						<tr>
							<th>Count</th>
							<th>User</th>
							<th>Comment Text</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
						{comments?.map((comment, index) => (
							<tr key={index}>
								<td>
									<div className="count">{index + 1}</div>
								</td>
								<td>
									<div className="user">
										<img loading="lazy" src={comment?.user?.profilePhoto?.url} alt="" />
										<span>{comment?.username}</span>
									</div>
								</td>
								<td>{comment?.text}</td>
								<td>
									<div className="actions">
										<button onClick={() => handleDelete(comment?._id)}>Delete</button>
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

export default AdminComments
