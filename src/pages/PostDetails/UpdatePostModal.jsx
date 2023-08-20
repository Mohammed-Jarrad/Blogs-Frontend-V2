import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Modal from '../../components/Modal/Modal'
import { useGetAllCategories } from '../../hooks/categoryHooks'
import { useUpdatePostDetails } from '../../hooks/postHooks'

export const UpdatePostModal = ({ closeModal, post }) => {
	const { data: categories } = useGetAllCategories()
	const updatePostMutation = useUpdatePostDetails()

	const [title, setTitle] = useState(post?.title)
	const [description, setDescription] = useState(post?.description)
	const [category, setCategory] = useState(post?.category)

	// form submit handler
	const formSubmitHandler = e => {
		e.preventDefault()

		if (!title.trim()) return toast.error('Post Title is required')
		if (!category.trim()) return toast.error('Post Category is required')
		if (!description.trim()) return toast.error('Post Description is required')

		const updatedPost = { title, category, description }

		updatePostMutation.mutate(
			{ postDetails: updatedPost, postId: post._id },
			{
				onSuccess: () => closeModal(),
			},
		)
	}

	return (
		<Modal closeModal={closeModal}>
			<form onClick={e => e.stopPropagation()} onSubmit={formSubmitHandler}>
				<h1>Update Post</h1>

				<label htmlFor="">
					<span>Post Title</span>
					<input
						autoFocus
						type="text"
						defaultValue={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</label>

				<label htmlFor="">
					<span>Post Category</span>
					<select defaultValue={post?.category} onChange={e => setCategory(e.target.value)}>
						{categories?.map(c => (
							<option value={c?.title} key={c?._id}>
								{c?.title}
							</option>
						))}
					</select>
				</label>

				<label htmlFor="">
					<span>Post Description</span>
					<textarea
						defaultValue={description}
						onChange={e => setDescription(e.target.value)}
						rows={6}
					/>
				</label>

				<button type="submit">{updatePostMutation.isLoading ? 'Loading...' : 'Edit Post'}</button>
			</form>
		</Modal>
	)
}
