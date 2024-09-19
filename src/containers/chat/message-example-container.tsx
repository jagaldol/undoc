import React from "react"
import { FaStethoscope } from "react-icons/fa6"
import { GiPill } from "react-icons/gi"
import { TbVaccine } from "react-icons/tb"
import { BsFillHeartPulseFill } from "react-icons/bs"

export default function MessageExampleContainer({ onClickExample }: { onClickExample: (example: string) => void }) {
  const exampleQuestions = [
    {
      title: "증상",
      icon: <FaStethoscope />,
      content:
        "두통이 자주 발생하는 이유가 궁금합니다. 스트레스 때문일까요, 아니면 다른 건강 문제일까요? 어떤 상황에서 두통이 심해지는지와 함께 주의할 점을 알고 싶어요.",
    },
    {
      title: "치료",
      icon: <GiPill />,
      content:
        "감기에 걸렸을 때 병원에 가기 전, 집에서 할 수 있는 치료법이 궁금해요. 어떤 음식을 먹어야 하고, 휴식을 취하는 방법에는 어떤 것이 있는지 알고 싶습니다.",
    },
    {
      title: "예방",
      icon: <TbVaccine />,
      content:
        "독감을 예방하기 위해 미리 준비할 수 있는 것들에 대해 알고 싶어요. 예방 접종 외에 생활 속에서 독감을 피할 수 있는 방법은 어떤 것들이 있을까요?",
    },
    {
      title: "건강",
      icon: <BsFillHeartPulseFill />,
      content:
        "체중 감량을 목표로 하고 있는데, 무리하지 않으면서도 효과적으로 체중을 줄일 수 있는 건강한 식단 구성 방법에 대해 알고 싶습니다. 또한, 적절한 운동 방법도 함께 알고 싶어요.",
    },
    //
    // "여드름을 관리하고 예방하려면 어떻게 해야 하나요?",
    // "소화불량이 발생할 때, 어떤 식습관을 개선해야 할까요?",
    // "사마귀 예방에 대해 어떤 방법이 있나요?",
    // "발목을 삐었을 때 어떻게 해야 하나요?",
  ]

  return (
    <div className="w-[800px] max-lg:w-[80%] max-md:w-[90%] flex flex-col gap-10 max-sm:gap-5 items-start">
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
        {exampleQuestions.map((example) => (
          <button
            type="button"
            key={example.title} // 고유한 값인 question을 key로 사용
            className="h-28 p-4 bg-bg-theme rounded-lg hover:bg-main-theme/20 max-md:text-xs text-sm flex transition-all"
            onClick={() => onClickExample(example.content)}
          >
            <div className="flex flex-col gap-2 w-full text-left">
              <div className="flex items-center gap-1 text-main-theme font-bold text-lg max-md:text-base">
                {example.icon}
                <p>{example.title}</p>
              </div>
              <p className="line-clamp-2 text-ellipsis">{example.content}</p>
            </div>
          </button>
        ))}
        <div />
      </div>
    </div>
  )
}
