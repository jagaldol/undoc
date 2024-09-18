import { atom } from "recoil"
import { ChatMessage } from "@/types/chat"

const messagesState = atom<ChatMessage[]>({
  key: "messagesState",
  default: [],
})

export default messagesState
