import { useState, useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { HomeRoute } from '../contexts/auth'

const HomePage = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return (
			<RootContainer>
				<ul>
					<li>
						<Link href="/post">
						<a>Post</a>
						</Link>
					</li>
					<li>
						<Link href="/logout">
						<a>Logout</a>
						</Link>
					</li>
				</ul>
			</RootContainer>
		)
	}
	if (!isAuthenticated) {
		return (
			<ul>
				<li>
					<Link href="/login">
					<a>Login</a>
					</Link>
				</li>
				<li>
					<Link href="/register">
					<a>Register</a>
					</Link>
				</li>	
			</ul>
		)
	}
}

export default HomeRoute(HomePage)

const RootContainer = styled.div`

`