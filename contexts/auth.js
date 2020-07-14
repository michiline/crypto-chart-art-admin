import React, { createContext, useState, useContext, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { loginRequest, checkSessionRequest, logoutRequest } from '../common'
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
			const data = await checkSessionRequest() 
			console.log(data)
			if (data.message && data.message === 'UNAUTHORIZED') {
				setAuthenticated(false)
				setLoading(false)
			} else {
				setAuthenticated(true)
				setLoading(false)
			}
		}
		initializeAuth()
	}, [])

	const login = async ({ username, password }) => {
		await loginRequest({ username, password }) 
		setAuthenticated(true)
		setLoading(false)
		Router.push('/')
	}

	const logout = async () => {
		await logoutRequest() 
		setAuthenticated(false)
		setLoading(false)
		Router.push('/')
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const ProtectRoute = (Component) => {
	return () => {
		const { isLoading, isAuthenticated } = useAuth()
		const router = useRouter()

		useEffect(() => {
			console.log(`isLoading: ${isLoading}`)
			console.log(`isAuthenticated: ${isAuthenticated}`)
			if (!isAuthenticated && !isLoading) {
				router.push('/login')
			}
		}, [isLoading, isAuthenticated])
		// console.log(isLoading)
		// console.log(isAuthenticated)
		// if (!isAuthenticated && !isLoading) {
		// 	router.push('/login')
		// }
		// if (isLoading) {
		// 	return <div>Loading...</div>
		// }
		return (<Component {...arguments} />)
	}
}

export const RedirectRoute = (Component) => {
	return () => {
		const { isLoading, isAuthenticated } = useAuth()
		const router = useRouter()

		useEffect(() => {
			if (isAuthenticated && !isLoading) {
				router.push('/')
			}
		}, [isLoading, isAuthenticated])
		// if (isAuthenticated && !isLoading) {
		// 	router.push('/')
		// }
		// if (isLoading) {
		// 	return <div>Loading...</div>
		// }
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