"use client"

import React, { useRef, useState } from "react"
import MessageInputContainer from "@/containers/chat/message-input-container"
import { ChatMessage } from "@/types/chat"
import MessageExampleContainer from "@/containers/chat/message-example-container"
import MessageBoxList from "@/containers/chat/message-box-list"

export default function ChatUi() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const messageNextKey = useRef<number>(1)

  const [isGenerating, setIsGenerating] = useState(false)

  const toChatMessageFormat = (messageList: ChatMessage[]): ChatMessage[] => {
    return messageList.map((message) => {
      const newMessage = { ...message }
      newMessage.key = messageNextKey.current
      messageNextKey.current += 1
      return newMessage
    })
  }
  const addMessage = (message: string, isFromChatbot: boolean) => {
    setMessages((messagesState) => {
      const chatMessage: ChatMessage = {
        key: 0,
        content: message,
        isFromChatbot,
      }
      return [...messagesState, ...toChatMessageFormat([chatMessage])]
    })
  }

  const handleStreamMessage = async (message: string) => {
    setMessages((prevState) => {
      const lastMessage = prevState[prevState.length - 1]
      if (lastMessage && lastMessage.isFromChatbot) {
        const updatedMessage: ChatMessage = { ...lastMessage, content: lastMessage.content + message }
        return [...prevState.slice(0, -1), updatedMessage]
      }
      const chatMessage: ChatMessage = {
        key: 0,
        content: message,
        isFromChatbot: true,
      }
      return [...prevState, ...toChatMessageFormat([chatMessage])]
    })
  }

  const endStreamMessage = async () => {
    setMessages((prevState) => {
      const lastMessage = prevState[prevState.length - 1]
      return [...prevState.slice(0, -1), { ...lastMessage, content: lastMessage.content.trim() }]
    })
  }

  const prepareRegenerate = () => {
    setMessages((prevState) => prevState.slice(0, -1))
  }

  const makeHistory = () => {
    const messages38 = messages.slice(-38)
    const formattedMessages: string[] = []
    messages38.forEach((message) => {
      const isChatbotTurn = formattedMessages.length % 2 === 1

      if (isChatbotTurn && !message.isFromChatbot) {
        formattedMessages.push("")
      }
      if (!isChatbotTurn && message.isFromChatbot) {
        formattedMessages.push("")
      }
      formattedMessages.push(message.content)
    })

    if (formattedMessages.length % 2 === 1) formattedMessages.push("")

    const formattedMessages38 = formattedMessages.slice(-38)

    const history: string[][] = []
    for (let i = 0; i < formattedMessages38.length; i += 2) {
      history.push([formattedMessages38[i], formattedMessages38[i + 1]])
    }
    return history
  }

  async function generateAIResponse(userInputValue: string, regenerate: boolean) {
    const history = makeHistory()
    const query = regenerate ? history[history.length - 1][0] : userInputValue

    // 새로운 EventSource 연결 생성
    const newEventSource = new EventSource(`/api/chat?query=${query}`)

    // 메시지 수신 핸들러 설정
    newEventSource.onmessage = (event) => {
      if (event.data === "<stream_end_token>") {
        setIsGenerating(false)
        endStreamMessage()
        newEventSource.close()
        return
      }
      const formattedToken = event.data.replace(/<enter_token>/g, "\n")
      handleStreamMessage(formattedToken)
    }

    // 에러 핸들러 설정
    newEventSource.onerror = () => {
      newEventSource.close() // 연결 종료
      alert("채팅 서버에 연결할 수 없습니다!")
      setIsGenerating(false)
    }
  }

  const onRegenerateClick = () => {
    if (isGenerating) return
    setIsGenerating(true)
    prepareRegenerate()
    generateAIResponse("", true).then(() => {})
  }

  const onSendClick = () => {
    if (isGenerating) return
    const userInputBox = document.querySelector<HTMLTextAreaElement>("#user-input-box")

    const userInputValue = userInputBox!.value
    if (userInputValue) {
      addMessage(userInputValue, false)
      setIsGenerating(true)
      generateAIResponse(userInputValue, false).then(() => {})
      userInputBox!.value = ""
    }
  }

  return (
    <div className="flex flex-col min-h-full">
      <div className="grow flex justify-center items-center h-auto">
        {messages.length === 0 ? (
          <MessageExampleContainer
            onClickExample={(message) => {
              addMessage(message, false)
              setIsGenerating(true)
              generateAIResponse(message, false).then(() => {})
            }}
          />
        ) : (
          <MessageBoxList
            messages={messages}
            // cursor={cursor}
            // getMessages={getMessages}
          />
        )}
      </div>
      <MessageInputContainer
        messages={messages}
        onSendClick={onSendClick}
        onRegenerateClick={onRegenerateClick}
        isGenerating={isGenerating}
      />
    </div>
  )
}
