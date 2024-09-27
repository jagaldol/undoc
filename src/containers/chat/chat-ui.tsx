"use client"

import React, { useRef, useState } from "react"
import { useRecoilState } from "recoil"
import MessageInputContainer from "@/containers/chat/message-input-container"
import { ChatMessage } from "@/types/chat"
import MessageExampleContainer from "@/containers/chat/message-example-container"
import MessageBoxList from "@/containers/chat/message-box-list"
import messagesState from "@/states/messagesState"

export default function ChatUi() {
  const [messages, setMessages] = useRecoilState(messagesState)
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
    setMessages((prevState) => {
      const chatMessage: ChatMessage = {
        key: 0,
        content: message,
        isFromChatbot,
      }
      return [...prevState, ...toChatMessageFormat([chatMessage])]
    })
  }

  const handleStreamMessage = (message: string) => {
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

  const endStreamMessage = () => {
    setMessages((prevState) => {
      const lastMessage = prevState[prevState.length - 1]
      return [...prevState.slice(0, -1), { ...lastMessage, content: lastMessage.content.trim() }]
    })
  }

  const prepareRegenerate = () => {
    setMessages((prevState) => prevState.slice(0, -1))
  }

  const makeHistory = () => {
    const messages38 = messages.slice(-18)
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

    return formattedMessages.slice(-18)
  }

  async function generateAIResponse(userInputValue: string, regenerate: boolean) {
    let history = makeHistory()
    const query = regenerate ? history[history.length - 2] : userInputValue
    history = regenerate ? history.slice(0, -2) : history

    // 요청 본문 설정
    const requestBody = {
      query,
      // history, // history 값을 그대로 전달
    }

    // 스트리밍 데이터를 처리하는 비동기 함수
    try {
      // POST 요청으로 SSE 데이터를 수신합니다.
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      // 에러 발생 시 예외 처리
      if (!response.ok) {
        alert("채팅 서버에 연결할 수 없습니다!")
        setIsGenerating(false)
        return
      }

      // 스트림을 처리하기 위한 리더를 생성합니다.
      const reader = response.body!.getReader()
      const decoder = new TextDecoder("utf-8")

      // 스트림 읽기 및 메시지 처리
      // eslint-disable-next-line no-constant-condition
      while (true) {
        // eslint-disable-next-line no-await-in-loop
        const { done, value } = await reader.read()
        // 스트림 데이터를 디코딩하여 처리합니다.

        const chunk = decoder.decode(value, { stream: true })

        chunk.split("data: ").forEach((token) => {
          // 토큰 포맷을 적절히 변환하여 처리
          let formattedToken = token.replace(/\s+/g, "").trim()
          formattedToken = formattedToken.replaceAll(/<enter_token>/g, "\n")
          formattedToken = formattedToken.replaceAll(/<space_token>/g, " ")
          handleStreamMessage(formattedToken)
        })

        if (done) {
          setIsGenerating(false)
          endStreamMessage()
          break
        }
      }
    } catch (error) {
      // 에러 발생 시 연결 종료 및 알림
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
      <div className="grow flex justify-center items-center h-auto mb-10">
        {messages.length === 0 ? (
          <MessageExampleContainer
            onClickExample={(message) => {
              addMessage(message, false)
              setIsGenerating(true)
              generateAIResponse(message, false).then(() => {})
            }}
          />
        ) : (
          <MessageBoxList />
        )}
      </div>
      <MessageInputContainer
        onSendClick={onSendClick}
        onRegenerateClick={onRegenerateClick}
        isGenerating={isGenerating}
      />
    </div>
  )
}
