import React from "react"
import { ChatMessage } from "@/types/chat"
import MessageBoxList from "@/containers/chat/message-box-list"

export default function MessageBoxListContainer({
  messages, // cursor,getMessages,
}: {
  messages: ChatMessage[]
  // cursor: Cursor
  // getMessages: (_cursor: Cursor) => void
}) {
  const exampleUserMessage: ChatMessage = {
    key: 1,
    content: "유당 불내증이란 무엇이며, 어떻게 치료할 수 있나요?",
    isFromChatbot: false,
  }

  const exampleChatbotMessage: ChatMessage = {
    key: 2,
    content:
      "유당 불내증은 유당을 소화하는 능력이 저하된 상태를 의미합니다.\n\n" +
      "유당 불내증은 우유 및 유제품에 포함된 유당을 효과적으로 소화하는 능력이 부족하여 우유나 유제품을 섭취해도 계속해서 체내에 남게 됩니다. 이로 인해 소화 흡수 기능이 저하되어 유당을 소화할 수 없게 됩니다. 유당 불내증은 개인마다 다르며, 아시아인의 약 40~60%에서 발생한다고 보고되고 있습니다. 일반적으로 유당 함유 식품의 섭취를 피하고, 유당을 분해하는 효소를 보충하는 치료법이 사용됩니다. 그러나 이는 일시적인 해결책일 뿐, 유당 불내증의 완치는 어렵습니다. 유당을 제한하는 음식을 섭취하면 소화 문제가 개선되고, 유당 불내증 증상을 완화할 수 있습니다.",
    isFromChatbot: true,
  }

  return (
    <div className="grow flex justify-center items-center h-auto">
      {messages.length === 0 ? (
        <MessageBoxList messages={[exampleUserMessage, exampleChatbotMessage]} />
      ) : (
        <MessageBoxList
          messages={messages}
          // cursor={cursor}
          // getMessages={getMessages}
        />
      )}
    </div>
  )
}
