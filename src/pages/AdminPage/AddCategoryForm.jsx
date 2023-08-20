import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useCreateCategory } from '../../hooks/categoryHooks'
import { CircularProgress } from '@mui/material'

const AddCategoryForm = () => {
	const [title, setTitle] = useState('')
	const createCategoryMutation = useCreateCategory()

	// handle form Submit
	const formSubmitHandler = e => {
		e.preventDefault()

		if (!title.trim()) return toast.error('please enter a category')

		createCategoryMutation.mutate({ title })
		setTitle('')
	}

	return (
		<div className="add-category-form">
			<form onSubmit={formSubmitHandler}>
				<h2>Add New Category</h2>
				<label htmlFor="">
					<span>category title</span>
					<input
						type="text"
						placeholder="Enter a new category..."
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</label>

				<button type="submit">
					{createCategoryMutation.isLoading ? <CircularProgress /> : 'Add Category'}
				</button>
			</form>
		</div>
	)
}

export default AddCategoryForm
