import { useState } from 'react'
import styled from 'styled-components'
import { ProtectRoute } from '../../contexts/auth'
import parseText from './parseText'
import buildHtml from './buildHtml'
import { createPost } from '../../common'

const PostPage = () => {
  const [url, setUrl] = useState('')
  const [post, setPost] = useState('')
  const [preview, setPreview] = useState('')
  const [message, setMessage] = useState('')
  const handlePreview = () => {
    try {
      const tags = parseText(post.trim().replace(/(\r\n|\n|\r)/gm,''))
      const html = buildHtml(tags)
      if (!html) {
        return
      }
      setPreview(
        <Preview>{html}</Preview>
      )
      setMessage('')
    } catch (err) {
      console.log(err)
      setMessage(err.message)
    }
  }
  const handleCreate = () => {
    try {
      if (url) {
        const nodes = parseText(post.trim().replace(/(\r\n|\n|\r)/gm,''))
        createPost({
          data: { url, nodes }, 
          callback: (message) => {
            setMessage(message)
          },
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  const closeTag = (e) => {
    if (e.keyCode === 8) {
      return
    }
    let text = e.target.value
    if (text.length >= 4) {
      const last4 = text.substr(text.length - 4)
      switch (last4) {
        case '<H1>':
            setPost(`${text}</H1>`)
            break     
        default:
          break
      }      
    }
    if (text.length >= 5) {
      const last5 = text.substr(text.length - 5)
      switch (last5) {
        case '<TXT>':
            setPost(`${text}</TXT>`)
            break
        case '<IMG>':
          setPost(`${text}</IMG>`)
          break        
        default:
          break
      }      
    }
    if (text.length >= 6) {
      const last6 = text.substr(text.length - 6)
      switch (last6) {
        case '<LINK>':
            setPost(`${text}</LINK>`)
            break      
        default:
          break
      }      
    }
  }
	return (
    <RootContainer>
        <H1>Create post</H1>
        <UrlInput type='text' value={url} onChange={(e) => setUrl(e.target.value)}  placeholder='Enter short name for url'/>
        <PostTextArea type='text' value={post} onChange={(e) => setPost(e.target.value)}  placeholder='Enter post text (with tags i.e. <TXT>, <IMG> etc.)' onKeyUp={closeTag}/>
        <ActionButton onClick={handlePreview}>Preview</ActionButton>
        <ActionButton onClick={handleCreate}>Create</ActionButton>
        {message && <MessageHeader>{message}</MessageHeader>}
        <Example>
          <ExampleHeader>{'Example of post text: '}</ExampleHeader>
          <ExampleRow>{'<H1>$NEBL short term setup</H1>'}</ExampleRow>
          <ExampleRow>{'<TXT>Hi traders!</TXT>'}</ExampleRow>
          <ExampleRow>{'<TXT>Showing you my $NEBL short term setup, chart looks ready for breakout try to me.</TXT>'}</ExampleRow>
          <ExampleRow>{'<IMG>https://www.tradingview.com/x/mPjdT0sd/</IMG>'}</ExampleRow>
          <ExampleRow>{`<TXT>As you can see on the chart, with this setup I am for some smaller % gains, 
            but still leaving room for a bigger 2x gain incase the chart and orderbook shows extreme bulishness.</TXT>`}
          </ExampleRow>
        </Example>
        <Preview>
          <PreviewHeader>
            Preview:
          </PreviewHeader>
          {preview}
        </Preview>

    </RootContainer>
  )
}

const RootContainer = styled.div`
  width: 100%;
  max-width: 1250px;
  padding: 50px;
`

const H1 = styled.h1`
  
`

const UrlInput = styled.input`
  width: 200px;
  height: 25px;
`

const PostTextArea = styled.textarea`
  width: 100%;
  height: 250px;
  white-space: pre-wrap;
`

const ActionButton = styled.button`
  width: 100px;
  height: 25px;
`

const MessageHeader = styled.h3`
  width: max-content;
`

const Preview = styled.div`
  margin-top: 50px;
  width: 100%;
  max-width: 1000px;
  height: min-content;
  display: flex;
  flex-direction: column;
`

const PreviewHeader = styled.h3`

`

const Example = styled.div`
  margin-top: 50px;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`
const ExampleHeader = styled.h3`
  margin-bottom: 25px;
`

const ExampleRow = styled.div`
  width: 500px;
`

export default ProtectRoute(PostPage)
  