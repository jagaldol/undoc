"use client"

import Image from "next/image"
import { useRecoilValue } from "recoil"
import Logo from "@/static/logo.png"
import messagesState from "@/states/messagesState"

export default function Header() {
  const messages = useRecoilValue(messagesState)

  return (
    messages.length !== 0 && (
      <>
        <div className="w-full h-4 bg-white/90" />
        <header className="z-10 sticky top-0 py-1 bg-white/90 backdrop-blur flex items-center w-full">
          <div className="w-full flex flex-col justify-center">
            <a className="flex items-center justify-center" href="/">
              <Image src={Logo} alt="logo" className="w-10 max-md:w-6" />
              <h1 className="text-4xl max-md:text-2xl text-main-theme font-bold ml-1 font-GmarketSansMedium pt-1">
                AI 언닥
              </h1>
            </a>
            <p className="text-sm max-md:text-xs text-center whitespace-nowrap">
              <b>언닥: 언제 어디서든 닥터</b>에게 물어보세요.
            </p>
          </div>
        </header>
      </>
    )
  )
}
