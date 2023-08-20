import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useSendResetPasswordLink } from '../../hooks/passwordHook'

const ForgetPassword = () => {
	const sendResetLink = useSendResetPasswordLink()

	const [email, setEmail] = useState('')

	const formHandler = e => {
		e.preventDefault()

		if (!email.trim()) return toast.error('Email is required!')
		sendResetLink.mutate({ email })
	}

	return (
		<section className="forget-page container">
			<div className="form-container">
				<h1>Froget Password?</h1>

				<form onSubmit={formHandler}>
					<div className="form-group">
						<label htmlFor="email">Your Email</label>
						<input
							value={email}
							onChange={e => setEmail(e.target.value)}
							type="email"
							id="email"
							placeholder="Enter your email"
						/>
					</div>

					<button type="submit">{sendResetLink.isLoading ? 'Loading...' : 'Submit'}</button>
				</form>
			</div>
		</section>
	)
}

export default ForgetPassword
