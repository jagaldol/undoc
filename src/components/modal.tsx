import React, { ReactNode } from "react"
import Image from "next/image"
import titleFont from "@/styles/TitleFont"

export default function Modal({ children, onClickClose }: { children: ReactNode; onClickClose(): void }) {
  return (
    <div className="bg-black/5 h-full w-full z-30 flex fixed left-0 top-0 items-center justify-center">
      <div className="flex fixed flex-col w-[500px] h-[650px] bg-white shadow-[3px_3px_11px_0_rgba(0,0,0,0.1)] p-5 max-md:w-[348px] max-md:h-[540px] max-md:p-3">
        <div role="presentation" className="flex justify-end">
          <Image
            src="/svg/close.svg"
            alt="close"
            height={36}
            width={36}
            className="hover:cursor-pointer"
            onClick={onClickClose}
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-center">
            <Image src="/svg/logo.png" alt="logo" width={30} height={30} />
            <p className={`text-3xl max-md:text-1x1 text-main-theme ml-1 font-bold ${titleFont.className}`}>AI 언닥</p>
          </div>
        </div>
        <div className="flex flex-col grow">{children}</div>
      </div>
    </div>
  )
}
