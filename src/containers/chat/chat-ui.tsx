"use client"

import React, { useRef, useState } from "react"
import MessageInputContainer from "@/containers/chat/message-input-container"
import MessageBoxListContainer from "@/containers/chat/message-box-list-container"
import { ChatMessage } from "@/types/chat"

export default function ChatUi() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const messageNextKey = useRef<number>(1)

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

  return (
    <div className="flex flex-col min-h-full">
      <MessageBoxListContainer messages={messages} />
      <MessageInputContainer
        messages={messages}
        handleStreamMessage={handleStreamMessage}
        endStreamMessage={endStreamMessage}
        addUserMessage={(message: string) => addMessage(message, false)}
        prepareRegenerate={prepareRegenerate}
      />
    </div>
  )
}
