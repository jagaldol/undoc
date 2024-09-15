import "@/styles/globals.css"
import { ReactNode } from "react"
import { Noto_Sans_KR } from "next/font/google"
import Header from "@/containers/home/header"
import ConfirmModal from "@/containers/home/confirmModal"
import Footer from "@/containers/home/footer"

const notoSans = Noto_Sans_KR({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Malgun Gothic", "Roboto", "sans-serif"],
})

export const metadata = {
  title: "AI UnDoc | 언제 어디서든지 닥터",
  description: "AI 언닥: '언제 어디서든지 닥터'에게 물어보세요",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body
        className={`${notoSans.className} flex box-border`}
        style={{
          minHeight: "calc(var(--vh, 1vh) * 100)",
          margin: 0,
          padding: 0,
        }}
      >
        <main className="flex grow flex-col">
          <Header />
          <section className="grow">{children}</section>
          <ConfirmModal />
          <Footer />
        </main>
      </body>
    </html>
  )
}
