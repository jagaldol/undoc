import "@/styles/globals.css"
import { ReactNode } from "react"
import { Viewport } from "next"
import Header from "@/containers/home/header"
import ConfirmModal from "@/containers/home/confirmModal"
import Footer from "@/containers/home/footer"
import RecoilRootWrapper from "@/wrappers/RecoilRootWrapper"

export const metadata = {
  title: "AI UnDoc | 언제 어디서든지 닥터",
  description: "AI 언닥: '언제 어디서든지 닥터'에게 물어보세요",
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
        <main className="flex grow flex-col">
          <RecoilRootWrapper>
            <Header />
            <section className="grow">{children}</section>
            <ConfirmModal />
            <Footer />
          </RecoilRootWrapper>
        </main>
      </body>
    </html>
  )
}
