import Image from "next/image"
import { useState } from "react"
import { ChatMessage } from "@/types/chat"
import { limitInputNumber, pressEnter } from "@/utils/utils"
import Mobile from "@/utils/mobile"

export default function MessageInputContainer({
  messages,
  handleStreamMessage,
  endStreamMessage,
  addUserMessage,
  prepareRegenerate,
}: {
  messages: ChatMessage[]
  handleStreamMessage: (message: string) => void
  endStreamMessage: () => void
  addUserMessage: (message: string) => void
  prepareRegenerate: () => void
}) {
  const [isGenerating, setIsGenerating] = useState(false)

  const isMobile = Mobile()

  const resizeBox = () => {
    const userInputBox = document.querySelector<HTMLTextAreaElement>("#user-input-box")

    if (userInputBox !== null) {
      userInputBox.style.height = isMobile ? "20px" : "24px"
      userInputBox.style.height = `${Math.min(userInputBox.scrollHeight, 120)}px`
    }
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
    const newEventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}?query=${query}`)

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
      addUserMessage(userInputValue)
      setIsGenerating(true)
      generateAIResponse(userInputValue, false).then(() => {})
      userInputBox!.value = ""
      resizeBox()
    }
  }

  const exampleQuestions = [
    "여드름을 관리하고 예방하려면 어떻게 해야 하나요?",
    "소화불량이 발생할 때, 어떤 식습관을 개선해야 할까요?",
    "사마귀 예방에 대해 어떤 방법이 있나요?",
    "발목을 삐었을 때 어떻게 해야 하나요?",
  ]

  const renderExampleButtons = () => {
    const maxButtons = isMobile ? 2 : exampleQuestions.length
    return exampleQuestions.slice(0, maxButtons).map((question) => (
      <button
        type="button"
        key={question} // 고유한 값인 question을 key로 사용
        className="px-4 py-2 text-main-theme rounded-lg border border-main-theme hover:bg-main-theme hover:text-white hover:border-white max-md:text-sm"
        onClick={() => {
          addUserMessage(question)
          setIsGenerating(true)
          generateAIResponse(question, false).then(() => {})
        }}
      >
        {question}
      </button>
    ))
  }

  return (
    <div className="sticky bottom-6 max-md:bottom-10 flex flex-col items-center bg-white">
      {messages.length === 0 && (
        <div
          className={`justify-center w-[50%] max-lg:w-[70%] max-md:w-[90%] grid ${
            isMobile ? "grid-cols-1" : "grid-cols-2"
          } gap-4 mb-2 `}
        >
          {renderExampleButtons()}
        </div>
      )}
      <div className="flex justify-center items-center mt-3 mb-6 max-md:mb-2 w-[50%] max-lg:w-[70%] max-md:w-[90%] border-2 border-solid border-main-theme rounded-full py-3 max-md:py-2 box-content focus-within:shadow-focus-main-theme-thin">
        <button
          type="button"
          className={`px-8 border bg-white border-gray-400 rounded flex justify-center items-center py-1.5 mb-4 absolute -top-9 opacity-70 hover:opacity-100 transition${
            messages.length !== 0 && !isGenerating ? "" : " invisible"
          }`}
          onClick={onRegenerateClick}
        >
          <Image
            src="/svg/refresh.svg"
            alt=""
            width="16"
            height="16"
            style={{ width: "16px", height: "16px" }}
            className="max-md:h-3.5 max-md:w-3.5"
          />
          <p className="ml-2 text-sm max-md:text-xs">답변 재생성</p>
        </button>
        <textarea
          className="w-full focus:outline-none pl-5 mr-5 custom-scroll-bar-4px overflow-y scroll resize-none h-6 max-md:text-sm max-md:h-5 rounded-full"
          id="user-input-box"
          onChange={(e) => {
            limitInputNumber(e, 500)
            resizeBox()
          }}
          onKeyDown={(e) => {
            pressEnter(e, onSendClick)
          }}
          placeholder="메시지를 입력해주세요"
        />
        <button
          type="button"
          className={`w-10 pr-5 flex justify-center items-center${isGenerating ? " hover:cursor-default" : ""}`}
          onClick={onSendClick}
        >
          {isGenerating ? (
            <div className="-translate-x-2">
              <div className="dot-elastic" />
            </div>
          ) : (
            <Image src="/svg/send.svg" alt="전송" width="16" height="16" />
          )}
        </button>
      </div>
    </div>
  )
}
