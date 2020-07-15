import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import useAuth, { ProtectRoute } from '../../contexts/auth'

const LogoutPage = () => {
	const { isAuthenticated, logout } = useAuth()
	useEffect(() => {
		if (isAuthenticated) {
			logout()
		}
	}, [])
	return (
    <RootContainer>
		Loggin out...
    </RootContainer>
  )
}

export default ProtectRoute(LogoutPage)

const RootContainer = styled.div`

`

const Form = styled.div`
	display: flex;
	flex-direction: column;
`

const Input = styled.input`
	width: 300px;
	height: 50px;
`

const SubmitButton = styled.button`
	width: 100px;
	height: 30px;
`