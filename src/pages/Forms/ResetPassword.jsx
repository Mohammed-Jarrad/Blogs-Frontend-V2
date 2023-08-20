import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CircularProgress } from '@mui/material'
import { useCheckResetLink, useResetPassword } from '../../hooks/passwordHook'

const ResetPassword = () => {
	const { userId, token } = useParams()

	const checkPassword = useCheckResetLink(userId, token)
	const resetPasswordMutation = useResetPassword()

	const [password, setPassword] = useState('')

	const submitHandler = e => {
		e.preventDefault()

		if (!password.trim()) return toast.error('Password is required!')
		resetPasswordMutation.mutate({ userId, token, password })
	}

	if (checkPassword.status === 'error') {
		return (
			<section className="login-page container">
				<h1>Not Found</h1>
			</section>
		)
	}

	return (
		<section className="login-page container">
			<div className="form-container">
				<h1>Reset Password</h1>

				<form onSubmit={submitHandler}>
					<div className="form-group">
						<label htmlFor="password">Enter New Password</label>
						<input
							value={password}
							onChange={e => setPassword(e.target.value)}
							type="password"
							id="password"
							placeholder="Enter New password"
						/>
					</div>

					<button type="submit">
						{resetPasswordMutation.isLoading ? (
							<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
								Loading
								<CircularProgress size={20} />
							</div>
						) : (
							'Submit'
						)}
					</button>
				</form>
			</div>
		</section>
	)
}

export default ResetPassword
