import React, { useState } from 'react'
import { toast } from 'react-toastify'
import './AddComment.scss'
import { useCreateComment } from '../../hooks/commentHooks'

const AddComment = ({ postId }) => {
	const createCommentMutation = useCreateComment()
	const { isLoading } = createCommentMutation
	const [text, setText] = useState('')

	// Add Comment Handler
	const submitHandler = e => {
		e.preventDefault()
		if (!text) {
			return toast.error('please write something')
		}
		const comment = { postId, text }
		createCommentMutation.mutate({ comment }, {})
		setText('')
	}

	return (
		<form onSubmit={submitHandler} className="add-comment-form">
			<input
				type="text"
				placeholder="Add a Comment"
				value={text}
				onChange={e => {
					setText(e.target.value)
				}}
			/>
			<button type="submit">{isLoading ? 'Loading...' : 'Comment'}</button>
		</form>
	)
}

export default AddComment
