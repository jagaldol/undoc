import React from "react"

export default function MessageExampleContainer({ onClickExample }: { onClickExample: (example: string) => void }) {
  const exampleQuestions = [
    "여드름을 관리하고 예방하려면 어떻게 해야 하나요?",
    "소화불량이 발생할 때, 어떤 식습관을 개선해야 할까요?",
    "사마귀 예방에 대해 어떤 방법이 있나요?",
    "발목을 삐었을 때 어떻게 해야 하나요?",
  ]

  return (
    <div className="w-[800px] max-lg:w-[80%] max-md:w-[90%] flex flex-col gap-10 items-start">
      <div className="flex flex-col gap-5 items-start">
        <p className="font-bold text-sm relative after:content-[''] after:w-full after:h-1 after:bg-main-theme/40 after:absolute after:left-0 after:bottom-0">
          24시간 의료 Q&A 서비스
        </p>
        <div className="text-3xl max-md:text-xl font-bold">
          <p>
            <span className="text-main-theme font-GmarketSansMedium">언닥: 언제 어디서든 닥터</span>
          </p>
          <p>진단, 증상 무엇이든 물어보세요.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3 w-full">
        {exampleQuestions.map((question) => (
          <button
            type="button"
            key={question} // 고유한 값인 question을 key로 사용
            className="p-4 bg-bg-theme rounded-lg hover:bg-main-theme/20 max-md:text-xs text-sm"
            onClick={() => onClickExample(question)}
          >
            {question}
          </button>
        ))}
        <div />
      </div>
    </div>
  )
}
