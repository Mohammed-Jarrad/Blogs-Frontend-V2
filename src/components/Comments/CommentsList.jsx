import './CommentsList.scss'
import React, { useState } from 'react'
import { UpdateCommentModal } from './UpdateCommentModal'
import Swal from 'sweetalert2'
import Moment from 'react-moment'
import { useUser } from '../../context/UserProvider'
import { useDeleteComment } from '../../hooks/commentHooks'
import { useQueryClient } from '@tanstack/react-query'
import { CircularProgress } from '@mui/material'

const CommentsList = ({ comments }) => {
	return (
		<div className="comments-list">
			<h3>
				<i className="bi bi-body-text"></i> {comments?.length} Comments
			</h3>

			<div className="list">
				{comments?.map(c => (
					<React.Fragment key={c?._id}>
						<Comment comment={c} key={c?._id} />
					</React.Fragment>
				))}
			</div>
		</div>
	)
}

const Comment = ({ comment }) => {
	const { user: currentUser } = useUser()
	const deleteCommentMutation = useDeleteComment()
	const client = useQueryClient()

	const [showCommentModal, setShowCommentModal] = useState(false)

	// Delete Comment Handler
	const deleteCommentHandler = async commentId => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
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
							client.setQueryData(['single-post', comment.postId], oldPost => ({
								...oldPost,
								comments: [...oldPost.comments].filter(c => c._id !== commentId),
							}))
						},
					},
				)
			}
		})
	}

	return (
		<div className="comment">
			<div className="comment-info">
				<div className="user">
					<img loading="lazy" src={comment?.user?.profilePhoto?.url} alt="" />
					<p>{comment?.username}</p>
				</div>
				<span>
					<Moment fromNow ago>
						{comment?.createdAt}
					</Moment>{' '}
					ago
				</span>
				{deleteCommentMutation.isLoading && <CircularProgress />}
			</div>

			<div className="content">{comment?.text}</div>

			<div className="controls">
				{currentUser?._id === comment?.user?._id && (
					<i className="bi bi-pencil-square" onClick={_ => setShowCommentModal(true)}></i>
				)}
				{(currentUser?.isAdmin || currentUser?._id === comment?.user?._id) && (
					<i className="bi bi-trash-fill" onClick={() => deleteCommentHandler(comment?._id)}></i>
				)}
			</div>

			{showCommentModal === true && (
				<UpdateCommentModal closeModal={_ => setShowCommentModal(false)} comment={comment} />
			)}
		</div>
	)
}

export default CommentsList
