import { useEffect } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { useRecoilValue } from "recoil"
import Image from "next/image"
import { ChatMessage } from "@/types/chat"
import messagesState from "@/states/messagesState"
import Logo from "@/static/logo.png"

function CodeBlock(props: any) {
  const { children, className, node, ref, ...rest } = props
  const match = /language-(\w+)/.exec(className || "")
  return match ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SyntaxHighlighter {...rest} PreTag="div" language={match[1]} style={materialDark}>
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <code {...rest} className={className}>
      {children}
    </code>
  )
}

function MessageBox({ message }: { message: ChatMessage }) {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [])

  return (
    <div className="flex flex-col gap-1">
      {message.isFromChatbot && (
        <div className="flex items-center">
          <Image src={Logo} alt="icon" className="w-8 mx-2" />
          <span className="text-lg pt-1 text-main-theme font-GmarketSansMedium">AI 언닥</span>
        </div>
      )}
      <div
        className={`${
          message.isFromChatbot ? "bg-indigo-50" : "bg-bg-theme"
        } px-10 py-7 flex flex-col justify-center w-full rounded-3xl`}
      >
        <div className="break-all max-md:text-sm text-container">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              code: CodeBlock,
            }}
          >
            {message.content}
          </Markdown>
        </div>
      </div>
    </div>
  )
}

export default function MessageBoxList() {
  const messages = useRecoilValue(messagesState)
  const scrollTraceDownChatBox = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 30) {
      window.scrollTo(0, document.body.scrollHeight)
    }
  }

  useEffect(() => {
    scrollTraceDownChatBox()
  }, [messages])

  return (
    <div className="w-full h-full flex flex-col gap-10" id="chat-main">
      {messages.map((message) => {
        return <MessageBox message={message} key={message.key} />
      })}
    </div>
  )
}
