import React, { createContext, useState, useContext, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { loginRequest, checkSessionRequest, logoutRequest, registerRequest } from '../common'
import Cookies from 'js-cookie'

const AuthContext = createContext({
	isAuthenticated: false,
	isLoading: true,
	setAuthenticated: () => {}
})

const useAuth = () => {
	const context = useContext(AuthContext)
	return context
}

export const AuthProvider = ({ children }) => {

	const [isAuthenticated, setAuthenticated] = useState(false)
	const [isLoading, setLoading] = useState(true)

	useEffect(() => {
		const initializeAuth = async () => {
			try {
				const response = await checkSessionRequest() 
				if (response.ok) {
					setAuthenticated(true)
					setLoading(false)
				} else {
					setAuthenticated(false)
					setLoading(false)
				}
			} catch (err) {
				console.log(err)
				setAuthenticated(false)
				setLoading(false)
			}

			// if (data.message && data.message === 'UNAUTHORIZED') {
			// 	setAuthenticated(false)
			// 	setLoading(false)
			// } else {
			// 	setAuthenticated(true)
			// 	setLoading(false)
			// }
		}
		initializeAuth()
	}, [])

	const login = async ({ username, password }) => {
		const response = await loginRequest({ username, password }) 
		if (response.ok) {
			setAuthenticated(true)
			setLoading(false)
			Router.push('/')
		} else {
			setAuthenticated(false)
			setLoading(false)
		}
	}

	const register = async ({ username, password }) => {
		const response = await registerRequest({ username, password }) 
		if (response.ok) {
			setAuthenticated(true)
			setLoading(false)
			Router.push('/')
		} else {
			setAuthenticated(false)
			setLoading(false)
		}
	}

	const logout = async () => {
		await logoutRequest() 
		setAuthenticated(false)
		setLoading(false)
		Router.push('/')
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, isLoading, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const ProtectRoute = (Component) => {
	return () => {
		const { isLoading, isAuthenticated } = useAuth()
		const router = useRouter()

		// useEffect(() => {
		// 	if (!isAuthenticated && !isLoading) {
		// 		router.push('/login')
		// 	}
		// }, [isLoading, isAuthenticated])
		if (!isAuthenticated && !isLoading) {
			router.push('/login')
		}
		if (isLoading) {
			return <div>Loading...</div>
		}
		return (<Component {...arguments} />)
	}
}

export const RedirectRoute = (Component) => {
	return () => {
		const { isLoading, isAuthenticated } = useAuth()
		const router = useRouter()

		// useEffect(() => {
		// 	if (isAuthenticated && !isLoading) {
		// 		router.push('/')
		// 	}
		// }, [isLoading, isAuthenticated])
		if (isAuthenticated && !isLoading) {
			router.push('/')
		}
		if (isLoading) {
			return <div>Loading...</div>
		}
		return (<Component {...arguments} />)
	}
}

export const HomeRoute = (Component) => {
	return () => {
		const { isLoading, isAuthenticated } = useAuth()
		const router = useRouter()

		if (isLoading) {
			return <div>Loading...</div>
		}
		return (<Component {...arguments} isAuthenticated={isAuthenticated} />)
	}
}


export default useAuth