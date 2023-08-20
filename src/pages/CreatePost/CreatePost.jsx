import React, { useState } from 'react'
import './CreatePost.scss'
import { toast } from 'react-toastify'
import { PropagateLoader } from 'react-spinners'
import Resizer from 'react-image-file-resizer'
import { useGetAllCategories } from '../../hooks/categoryHooks'
import { useCreatePost } from '../../hooks/postHooks'

const CreatePost = () => {
	const resizeFile = async file => {
		let resized = null
		Resizer.imageFileResizer(
			file,
			1000, // max width
			1000, // max height
			'JPEG', // compress format
			100, // quality
			0, // rotation
			uri => {
				resized = uri
			},
			'base64', // output type
		)

		// Waiting until the resized variable is set
		while (!resized) {
			await new Promise(resolve => setTimeout(resolve, 100))
		}

		return resized
	}

	const handleChangeImage = async e => {
		const selectedFile = e.target.files[0]
		const resizedImage = await resizeFile(selectedFile)

		if (resizedImage) {
			// Convert base64 image to file object
			const byteCharacters = atob(resizedImage.split(',')[1])
			const byteNumbers = new Array(byteCharacters.length)
			for (let i = 0; i < byteCharacters.length; i++) {
				byteNumbers[i] = byteCharacters.charCodeAt(i)
			}
			const byteArray = new Uint8Array(byteNumbers)
			const imageFile = new Blob([byteArray], { type: 'image/jpeg' })

			setFile(imageFile)
		}
	}

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [category, setCategory] = useState('')
	const [file, setFile] = useState(null)

	const categoriesQuery = useGetAllCategories()
	const createPostMutation = useCreatePost()
	const { isLoading } = createPostMutation

	// From handler
	const formSubmitHandler = e => {
		e.preventDefault()
		if (!title.trim()) return toast.error('Post Title is required')
		if (!category.trim()) return toast.error('Post Category is required')
		if (!description.trim()) return toast.error('Post Description is required')
		if (!file) return toast.error('Post Image is required')

		let formData = new FormData()
		formData.append('image', file)
		formData.append('title', title)
		formData.append('description', description)
		formData.append('category', category)

		createPostMutation.mutate(formData)
	}

	return (
		<div className="craete-post container">
			<h1>Create Post Form</h1>

			<form onSubmit={formSubmitHandler}>
				<input
					autoFocus
					type="text"
					placeholder="Post Title"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>

				<select value={category} onChange={e => setCategory(e.target.value)}>
					<option disabled value={''}>
						Select Category
					</option>
					{categoriesQuery.data?.map(c => (
						<option value={c?.title} key={c?._id}>
							{c?.title}
						</option>
					))}
				</select>

				<textarea
					rows={5}
					placeholder="Post Description"
					value={description}
					onChange={e => setDescription(e.target.value)}
				></textarea>

				<input
					type="file"
					onChange={e => {
						handleChangeImage(e)
					}}
				/>

				{file ? <img loading="lazy" src={URL.createObjectURL(file)} alt="" /> : null}

				{isLoading ? <PropagateLoader color="#36d7b7" /> : <button type="submit">Create</button>}
			</form>
		</div>
	)
}

export default CreatePost
