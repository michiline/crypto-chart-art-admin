import { useState, useContext } from 'react'
import styled from 'styled-components'
import useAuth, { RedirectRoute } from '../../contexts/auth'

const LoginPage = () => {
	const { login } = useAuth()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const handleLogin = () => {
		if (username && password) {
			login({ username, password })
		}
	}
	return (
    <RootContainer>
		<Form>
			<Input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter username...'/>
			<Input type='text' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password...'/>
			<SubmitButton onClick={handleLogin}>Login</SubmitButton>
		</Form>
    </RootContainer>
  )
}

export default RedirectRoute(LoginPage)

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