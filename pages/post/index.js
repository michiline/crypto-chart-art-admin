import { useState } from 'react'
import styled from 'styled-components'
import { ProtectRoute } from '../../contexts/auth'

const HomePage = () => {
  const [post, setPost] = useState('')
  const [preview, setPreview] = useState('')
  const buildPreview = (post) => {
    try {
      const tags = parseText(post.trim().replace(/(\r\n|\n|\r)/gm,''))
      const html = buildHtml(tags)
      if (!html) {
        return
      }
      setPreview(
        <div>{html}</div>
      )
    } catch (err) {
      console.log(err)
    }
  }
	return (
    <RootContainer>
        <PostInput type='text' onBlur={(e) => setPost(e.target.value)}/>
        <PreviewButton onClick={() => buildPreview(post)}>Preview</PreviewButton>
        {preview}
    </RootContainer>
  )
}



const STATE = {
	OPEN_TAG: 'OPEN_TAG',
	CHECK_TAG: 'CHECK_TAG',
	TXT: 'TXT'
}

const TAGS = ['H1', 'H2', 'TXT', 'IMG', 'LINK']

const parseText = (text) => {
	let currentState = STATE.OPEN_TAG
	let currentTag = ''
	let tags = []
	while (text.length > 0) {
		switch (currentState) {
			case STATE.OPEN_TAG:
				if (text.charAt(0) !== '<') {
					throw new Error('Invalid opening tag.')
				}
				currentState = STATE.CHECK_TAG
				text = text.substr(1)
				break
			case STATE.CHECK_TAG: 
				currentTag = text.substr(0, text.indexOf('>'))
				if (!TAGS.includes(currentTag)) {
					throw new Error('Invalid tag name.')
				}
				if (text.length === 0) {
					throw new Error('Invalid opening tag.')
				}
				text = text.substr(text.indexOf('>') + 1)
				currentState = STATE.TAG
				break
			case STATE.TAG:
				if (text.indexOf(`</${currentTag}>`) === -1) {
					throw new Error(`Invalid closing ${currentTag} tag.`)
				}
				const data = text.substr(0, text.indexOf(`</${currentTag}>`))
				tags.push({
					name: currentTag,
					data
				})
				text = text.substr(text.indexOf(`</${currentTag}>`) + currentTag.length + 3)
				currentState = STATE.OPEN_TAG
				break
			default: 
				break
		}
	}
	if (currentState !== STATE.OPEN_TAG) {
		throw new Error('Invalid tag structure.')
	}
	return tags
}

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
          <img src={data} key={index}/>
        )
      default: 
        return (
          <div key={index}>{data}</div>
        )
    }
  })
}
  

const RootContainer = styled.div`
  width: 100%;
`

const PostInput = styled.textarea`
  width: 100%;
  height: 250px;
`

const PreviewButton = styled.button`
  width: 100px;
  height: 25px;
`

const Preview = styled.div`
  width: 100%;
  height: min-content;
`

export default ProtectRoute(HomePage)
  