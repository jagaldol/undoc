import Image from "next/image"
import titleFont from "@/styles/TitleFont"

export default function Header() {
  return (
    <header className="z-10 sticky top-0 pt-5 bg-white flex items-center">
      <div className="w-full flex flex-col justify-center">
        <a className="flex items-center justify-center" href="/">
          <Image src="/svg/logo.png" alt="logo" width={45} height={45} className="max-md:h-6 max-md:w-6" />
          <h1
            className={`text-5xl max-lg:text-4xl max-md:text-2xl text-main-theme font-bold ml-1 ${titleFont.className}`}
          >
            AI 언닥
          </h1>
        </a>
        <p className="text-sm max-md:text-[10px] text-center whitespace-nowrap">
          <b>언닥: 언제 어디서든지 닥터</b>에게 물어보세요.
        </p>
      </div>
    </header>
  )
}
