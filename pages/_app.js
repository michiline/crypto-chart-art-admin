import { useState } from 'react'
import App from 'next/app'
import { AuthProvider } from '../contexts/auth'

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>

	)
}

// MyApp.getInitialProps = async (appContext) => {
// 	const request = appContext.ctx.req;
// 	let isAuthenticated = false
// 	if (request) {
// 	  if (request.headers.cookie.startsWith('sessionId')) {
// 		  isAuthenticated = true
// 	  }	  
// 	}
//   	// calls page's `getInitialProps` and fills `appProps.pageProps`
//   	const appProps = await App.getInitialProps(appContext);

//   	return { ...appProps, isAuthenticated }
// }

export default MyApp