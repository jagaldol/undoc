"use client"

import { createContext, useContext, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from "react"
import { ChatMessage } from "@/types/chat"

type MessagesContextValue = {
  messages: ChatMessage[]
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>
}

const MessagesContext = createContext<MessagesContextValue | null>(null)

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const value = useMemo(() => ({ messages, setMessages }), [messages])
  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>
}

function useMessagesContext() {
  const context = useContext(MessagesContext)

  if (!context) {
    throw new Error("useMessagesContext must be used within MessagesProvider")
  }

  return context
}

export function useMessages() {
  return useMessagesContext().messages
}

export function useMessagesState() {
  const { messages, setMessages } = useMessagesContext()
  return [messages, setMessages] as const
}
