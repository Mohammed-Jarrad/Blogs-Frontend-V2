import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Modal from '../Modal/Modal'
import { useUpdateComment } from '../../hooks/commentHooks'

export const UpdateCommentModal = ({ closeModal, comment }) => {
	const updateCommentMutation = useUpdateComment()
	const [text, setText] = useState(comment?.text)

	// form submit handler
	const formSubmitHandler = e => {
		e.preventDefault()

		if (!text.trim()) return toast.error('Please write something')

		updateCommentMutation.mutate(
			{ commentId: comment._id, text },
			{
				onSuccess: () => closeModal(),
			},
		)
	}

	return (
		<Modal closeModal={closeModal}>
			<form onClick={e => e.stopPropagation()} onSubmit={formSubmitHandler}>
				<abbr title="close">
					<i className="bi bi-x-circle-fill close" onClick={closeModal}></i>
				</abbr>

				<h1>Edit Comment</h1>

				<label htmlFor="">
					<span>Comment</span>
					<input
						autoFocus
						type="text"
						defaultValue={text}
						onChange={e => setText(e.target.value)}
					/>
				</label>

				<button type="submit">
					{updateCommentMutation.isLoading ? 'Loading...' : 'Edit Comment'}
				</button>
			</form>
		</Modal>
	)
}
