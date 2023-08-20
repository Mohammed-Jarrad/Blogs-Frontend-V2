import React, { createContext, useContext, useState } from 'react'

export const UserContext = createContext(null)

export const useUser = () => {
	return useContext(UserContext)
}

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null)

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserProvider
