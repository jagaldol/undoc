import Image from "next/image"
import { ChatMessage } from "@/types/chat"
import { limitInputNumber, pressEnter } from "@/utils/utils"
import Mobile from "@/utils/mobile"

export default function MessageInputContainer({
  messages,
  onSendClick,
  onRegenerateClick,
  isGenerating,
}: {
  messages: ChatMessage[]
  onSendClick: () => void
  onRegenerateClick: () => void
  isGenerating: boolean
}) {
  const isMobile = Mobile()

  const resizeBox = () => {
    const userInputBox = document.querySelector<HTMLTextAreaElement>("#user-input-box")

    if (userInputBox !== null) {
      userInputBox.style.height = isMobile ? "20px" : "24px"
      userInputBox.style.height = `${Math.min(userInputBox.scrollHeight, 120)}px`
    }
  }

  const onSendButtonClick = () => {
    onSendClick()
    resizeBox()
  }

  return (
    <div className="sticky pb-6 max-md:pb-10 bottom-0 flex flex-col items-center bg-white">
      <div className="flex justify-center items-center mt-3 mb-6 max-md:mb-2 w-[800px] max-lg:w-[80%] max-md:w-[90%] border-2 border-solid border-main-theme rounded-full py-3 max-md:py-2 box-content focus-within:shadow-focus-main-theme-thin">
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
            pressEnter(e, onSendButtonClick)
          }}
          placeholder="메시지를 입력해주세요"
        />
        <button
          type="button"
          className={`w-10 pr-5 flex justify-center items-center${isGenerating ? " hover:cursor-default" : ""}`}
          onClick={onSendButtonClick}
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
