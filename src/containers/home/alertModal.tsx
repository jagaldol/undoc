"use client"

import React, { useState } from "react"
import Image from "next/image"
import Logo from "@/static/logo.png"

export default function AlertModal() {
  const [isOpen, setIsOpen] = useState(true)
  return (
    isOpen && (
      <div className="bg-black/20 h-full w-full z-30 flex fixed left-0 top-0 items-center justify-center px-5">
        <div className="flex fixed flex-col w-[400px] bg-white shadow-[3px_3px_11px_0_rgba(0,0,0,0.1)] px-5 py-8 max-sm:w-4/5 rounded-3xl">
          <div role="presentation" className="flex justify-end" />
          <div className="flex flex-col justify-center">
            <div className="flex items-center justify-center">
              <Image src={Logo} alt="logo" className="w-8" />
              <p className="text-3xl max-md:text-2xl text-main-theme ml-1 font-bold font-GmarketSansMedium pt-1">
                AI 언닥
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center justify-center">
            <p className="text-lg">
              <b>서비스 일시 중지 안내</b>
            </p>
          </div>
          <div className="max-md:text-sm bg-gray-200 rounded-xl p-5 my-5 flex flex-col gap-3 break-keep">
            <p>
              현재 GPU 서버 비용 문제로 인해 서비스가 일시 중지되었습니다. 빠른 시일 내에 서비스를 재개할 수 있도록
              노력하겠습니다.
            </p>
            <p>불편을 드려 죄송합니다. 감사합니다.</p>
          </div>
          <button
            type="button"
            className="w-full h-11 rounded-xl bg-main-theme text-white max-md:text-sm"
            onClick={() => setIsOpen(false)}
          >
            확인
          </button>
        </div>
      </div>
    )
  )
}
