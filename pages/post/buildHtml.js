import styled from 'styled-components'

const buildHtml = (tags) => {
	return tags.map(({ name, data }, index) => {
	  switch(name) {
		case 'H1': {
		  return (
			<h1 key={index}>{data}</h1>
		  )
		}
		case 'TXT':
		  return (
			<p key={index}>{data}</p>
		  )
		case 'IMG': 
		  return (
			<Image src={data} key={index}/>
		  )
		default: 
		  return (
			<div key={index}>{data}</div>
		  )
	  }
	})
  }

const Image = styled.img`
  width: 100%;
`
export default buildHtml