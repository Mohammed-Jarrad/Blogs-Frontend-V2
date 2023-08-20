import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useUser } from '../../context/UserProvider'
import { useDeleteProfile, useGetAllUsers } from '../../hooks/profileHooks'
import { LoadingPlacholder } from '../CategoryPage/Category'
import { useQueryClient } from '@tanstack/react-query'
import { useLogout } from '../../hooks/authHooks'
import { CircularProgress } from '@mui/material'

const AdminUsers = () => {
	const { user: currentUser } = useUser()

	const { data: users, isLoading } = useGetAllUsers()
	const deleteProfileMutation = useDeleteProfile()
	const client = useQueryClient()
	const logout = useLogout()

	// Handle Delete User
	const handleDelete = userId => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this Account!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'var(--dark-blue-color)',
			iconColor: 'red',
			cancelButtonColor: 'var(--red-color)',
			confirmButtonText: 'Yes, delete it!',
		}).then(result => {
			if (result.isConfirmed) {
				deleteProfileMutation.mutate(
					{ userId },
					{
						onSuccess: () => {
							client.setQueryData(['users'], old => old.filter(user => user._id !== userId))
							if (userId === currentUser) logout.mutate()
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
			{deleteProfileMutation.isLoading ? <CircularProgress /> : <h2>Users</h2>}

			<div className={`table-wrapper`}>
				<table>
					<thead>
						<tr>
							<th>Count</th>
							<th>User</th>
							<th>Email</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
						{users?.map((user, index) => (
							<tr key={user?._id}>
								<td>
									<div className="count">{index + 1}</div>
								</td>
								<td>
									<div className="user">
										<img loading="lazy" src={user?.profilePhoto?.url} alt="" />
										<span>{user?.username}</span>
									</div>
								</td>
								<td>{user?.email}</td>
								<td>
									<div className="actions">
										<Link to={`/profile/${user?._id}`}>View Profile</Link>
										<button onClick={() => handleDelete(user?._id)}>Delete</button>
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

export default AdminUsers
