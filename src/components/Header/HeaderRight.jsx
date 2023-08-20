import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLogout } from '../../hooks/authHooks'
import { useUser } from '../../context/UserProvider'

const HeaderRight = () => {
	const logoutMutation = useLogout()
	const { user } = useUser()
	const { pathname: path } = useLocation()

	const [showDropMenu, setShowDropMenu] = useState(false)

	const toggleDropMenu = () => setShowDropMenu(p => !p)
	const closeMenu = () => setShowDropMenu(false)

	const logout = () => {
		closeMenu()
		logoutMutation.mutate()
	}

	return (
		<div className="header-right">
			{user ? (
				<div className="header-right-user-info">
					<div className="user-info" onClick={toggleDropMenu}>
						<span>{user?.username}</span>
						<img loading="lazy" src={user?.profilePhoto?.url} alt="" />
					</div>

					<div className={`dropmenu ${showDropMenu ? 'show-dropmenu' : ''}`}>
						<Link className="item" to={`/profile/${user?._id}`} onClick={closeMenu}>
							<span>Profile</span>
							<i className="bi bi-file-person"></i>
						</Link>
						<div
							className="item"
							onClick={() => {
								logout()
							}}
						>
							<span>Logout</span>
							<i className="bi bi-box-arrow-right"></i>
						</div>
					</div>
				</div>
			) : (
				<>
					<Link to={'/login'} className={`header-right-link ${path === '/login' ? 'active' : ''}`}>
						<i className="bi bi-box-arrow-in-right"></i>
						<span>Login</span>
					</Link>
					<Link
						to={'/signup'}
						className={`header-right-link signup ${path === '/signup' ? 'active' : ''}`}
					>
						<i className="bi bi-person-plus"></i>
						<span>Signup</span>
					</Link>
				</>
			)}
		</div>
	)
}

export default HeaderRight
