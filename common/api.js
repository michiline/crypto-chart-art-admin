export const registerRequest = (data) => {
	return postRequest({
		url: '/user/register',
		data
	})
}

export const loginRequest = (data) => {
	return postRequest({
		url: '/user/login',
		data
	})
}

export const checkSessionRequest = (data) => {
	return getRequest({
		url: '/user/checkSession'
	})
}

export const logoutRequest = (data) => {
	return getRequest({
		url: '/user/logout'
	})
}

const postRequest = async ({ url, data = {} }) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
	  method: 'POST',
	  credentials: 'include',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(data)
	})
	return response.json()
  }

export const getRequest = async ({ url }) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
		method: 'GET',
		credentials: 'include'
	})
	return response.json()
}
