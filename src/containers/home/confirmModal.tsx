"use client"

import React, { useState } from "react"
import Image from "next/image"
import titleFont from "@/styles/TitleFont"

export default function ConfirmModal() {
  const [isOpen, setIsOpen] = useState(true)
  return (
    isOpen && (
      <div className="bg-black/20 h-full w-full z-30 flex fixed left-0 top-0 items-center justify-center px-5">
        <div className="flex fixed flex-col w-[400px] bg-white shadow-[3px_3px_11px_0_rgba(0,0,0,0.1)] px-5 py-8 max-md:w-4/5 rounded-3xl">
          <div role="presentation" className="flex justify-end" />
          <div className="flex flex-col justify-center">
            <div className="flex items-center justify-center">
              <Image src="/svg/logo.png" alt="logo" width={35} height={35} />
              <p className={`text-3xl max-md:text-2xl text-main-theme ml-1 font-bold ${titleFont.className}`}>
                AI 언닥
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center justify-center">
            <p className="text-lg">
              <b>서비스 이용 동의(필수) 안내</b>
            </p>
            <p>아래 내용 동의 후 이용 가능합니다.</p>
          </div>
          <div className="max-md:text-sm bg-gray-200 rounded-xl p-5 my-5">
            <ul className="flex flex-col gap-2">
              <li>- 본 AI 챗봇이 제공하는 답변은 참고용 정보이며, 의료 전문가의 조언을 대체할 수 없습니다.</li>
              <li>
                - AI가 생성하는 답변은 의료적으로 정확하지 않을 수 있으므로, 중요한 건강 관련 결정을 내리기 전에 반드시
                의사나 약사 등 전문 의료인과 상담하시기 바랍니다.
              </li>
            </ul>
          </div>
          <button
            type="button"
            className="w-full h-11 rounded-xl bg-main-theme text-white max-md:text-sm"
            onClick={() => setIsOpen(false)}
          >
            서비스 이용에 동의합니다
          </button>
        </div>
      </div>
    )
  )
}
