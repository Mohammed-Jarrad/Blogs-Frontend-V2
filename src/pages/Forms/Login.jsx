import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useLogin } from '../../hooks/authHooks'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const loginMutation = useLogin()

	const login = e => {
		e.preventDefault()

		if (!email.trim()) return toast.error('Email is required!')
		if (!password.trim()) return toast.error('Password is required!')

		const user = { email, password }
		loginMutation.mutate(user)
	}

	return (
		<section className="login-page container">
			<div className="form-container">
				<h1>Login to your account</h1>

				<form onSubmit={login}>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							value={email}
							onChange={e => setEmail(e.target.value)}
							type="email"
							id="email"
							placeholder="Enter your email"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							value={password}
							onChange={e => setPassword(e.target.value)}
							type="password"
							id="password"
							placeholder="Enter your password"
						/>
					</div>

					<button type="submit">{loginMutation.isLoading ? 'Loading...' : 'Login'}</button>
				</form>

				<div className="form-footer">
					did you forget your password? <Link to={'/forget-password'}>forget password</Link>
				</div>
			</div>
		</section>
	)
}

export default Login
