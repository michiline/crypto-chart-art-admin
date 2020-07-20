import { useState } from 'react'
import styled from 'styled-components'
import { ProtectRoute } from '../../contexts/auth'
import { parseText, buildHtml, createPost } from '../../common'

const PostPage = () => {
  const [title, setTitle] = useState('')
  const [longTitle, setLongTitle] = useState()
  const [description, setDescription] = useState('')
  const [coverImg, setCoverImg] = useState('')
  const [text, setText] = useState(`<TXT>Hello traders!</TXT><TXT>Today a setup for $IOST, it recently had some major news announcement so I expect hthis one to progress upwards in price in the comming future.</TXT><IMG>https://images.hive.blog/DQmZy4i25cccwSFQA6TbAzeZgpsomw3pdUeUEKSg8NrUiTX/nebl.png</IMG><TXT>Marked some support/resistance lines already with the purple lines on the weekly, now zooming into the daily chart on the more recent timeframe.</TXT><IMG>https://images.hive.blog/DQmTQk98wT6JS6ZpFvB78EGcsnfbsuCGCfXwsU6M7NqVrj9/iostdlines.png</IMG><TXT>Lets start from the bottom up. First on the list the 50 satoshi line, played a role as a major support line in late 19' and early 20', thereafter, for a short while, it acted as a hard resistance level which the price used to make a new all time low, right after making it, it broke the 50 satoshi line on the upside, possibly marking the start of an longer term uptrend.</TXT>`)
  const [preview, setPreview] = useState('')
  const [message, setMessage] = useState('')

  const handlePreview = () => {
    try {
      const tags = parseText(text.trim().replace(/(\r\n|\n|\r)/gm,''))
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
      if (title && longTitle && description && coverImg) {
        const nodes = parseText(text.trim().replace(/(\r\n|\n|\r)/gm,''))
        createPost({
          data: { title, longTitle, description, coverImg, nodes }, 
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
            setText(`${text}</H1>`)
            break     
        default:
          break
      }      
    }
    if (text.length >= 5) {
      const last5 = text.substr(text.length - 5)
      switch (last5) {
        case '<TXT>':
            setText(`${text}</TXT>`)
            break
        case '<IMG>':
          setText(`${text}</IMG>`)
          break        
        default:
          break
      }      
    }
    if (text.length >= 6) {
      const last6 = text.substr(text.length - 6)
      switch (last6) {
        case '<LINK>':
            setText(`${text}</LINK>`)
            break      
        default:
          break
      }      
    }
  }
	return (
    <RootContainer>
        <H1>Create post</H1>
        <TitleInput type='text' value={title} onChange={(e) => setTitle(e.target.value)}  placeholder='Enter short title for url'/>
        <TitleInput type='text' value={longTitle} onChange={(e) => setLongTitle(e.target.value)}  placeholder='Enter long title for text'/>
        <TitleInput type='text' value={description} onChange={(e) => setDescription(e.target.value)}  placeholder='Enter description for social'/>
        <TitleInput type='text' value={coverImg} onChange={(e) => setCoverImg(e.target.value)}  placeholder='Enter cover img url'/>
        <PostTextArea type='text' value={text} onChange={(e) => setText(e.target.value)}  placeholder='Enter post text (with tags i.e. <TXT>, <IMG> etc.)' onKeyUp={closeTag}/>
        <ActionButton onClick={handlePreview}>Preview</ActionButton>
        <ActionButton onClick={handleCreate}>Create</ActionButton>
        {message && <MessageHeader>{message}</MessageHeader>}
        <Example>
          <ExampleHeader>{'Example of tag usage: '}</ExampleHeader>
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
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1250px;
  padding: 50px;
`

const H1 = styled.h1`
  
`

const TitleInput = styled.input`
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
  