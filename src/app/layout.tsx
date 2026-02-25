import "@/styles/globals.css"
import { ReactNode } from "react"
import { Viewport } from "next"
import Header from "@/containers/home/header"
import Footer from "@/containers/home/footer"
import AlertModal from "@/containers/home/alertModal"
import { MessagesProvider } from "@/states/messagesState"

export const metadata = {
  title: "AI UnDoc | 언제 어디서든 닥터",
  description: "AI 언닥: '언제 어디서든 닥터'에게 물어보세요",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body
        className="flex box-border"
        style={{
          minHeight: "calc(var(--vh, 1vh) * 100)",
          margin: 0,
          padding: 0,
        }}
      >
        <main className="flex grow flex-col justify-center items-center">
          <MessagesProvider>
            <Header />
            <section className="grow w-[800px] max-lg:w-[80%] max-md:w-[90%]">{children}</section>
            {/* <ConfirmModal /> */}
            <AlertModal />
            <Footer />
          </MessagesProvider>
        </main>
      </body>
    </html>
  )
}
