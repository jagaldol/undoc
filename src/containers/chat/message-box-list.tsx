import Image from "next/image"
import { useEffect } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { ChatMessage } from "@/types/chat"

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
    <div
      className={`${message.isFromChatbot ? "bg-bg-theme " : ""}pt-10 pb-14 flex justify-center items-center w-full`}
    >
      <div className="w-[800px] max-lg:w-[80%] max-md:w-[90%] flex">
        <div className={`${message.isFromChatbot ? "" : ""} min-w-[30px] mr-10 max-md:mr-5 h-fit`}>
          <Image
            src={`${message.isFromChatbot ? "/svg/logo.png" : "/svg/user.svg"}`}
            alt="icon"
            width={40}
            height={40}
            style={{ height: "40px" }}
          />
        </div>
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

export default function MessageBoxList({
  messages, // cursor, getMessages,
}: {
  messages: ChatMessage[]
  // cursor: Cursor
  // getMessages: (_cursor: Cursor) => void
}) {
  // const [prevScrollHeight, setPrevScrollHeight] = useState(0)

  const scrollTraceDownChatBox = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 30) {
      window.scrollTo(0, document.body.scrollHeight)
    }
  }

  useEffect(() => {
    scrollTraceDownChatBox()
  }, [messages])

  // useEffect(() => {
  //   const instance = chatBox.current!
  //   const handleScroll = () => {
  //     const { scrollTop, scrollHeight } = instance
  //
  //     if (scrollTop === 0 && chatroomId !== 0) {
  //       getMessages(cursor)
  //       // TODO: 위에 메시지들 끼워넣고 올바른 위치로 스크롤 옮기기
  //       instance.scrollTop = scrollHeight - prevScrollHeight
  //       setPrevScrollHeight(scrollHeight)
  //     }
  //   }
  //
  //   instance.addEventListener("scroll", handleScroll)
  //
  //   return () => {
  //     instance.removeEventListener("scroll", handleScroll)
  //   }
  // }, [prevScrollHeight, chatroomId, cursor, getMessages])

  return (
    <div className="w-full h-full" id="chat-main">
      {messages.map((message) => {
        return <MessageBox message={message} key={message.key} />
      })}
    </div>
  )
}
