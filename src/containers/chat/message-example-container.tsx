import React from "react"
import { FaStethoscope } from "react-icons/fa6"
import { GiPill } from "react-icons/gi"
import { TbVaccine } from "react-icons/tb"
import { BsFillHeartPulseFill } from "react-icons/bs"
import { Swiper, SwiperSlide } from "swiper/react"
import { Grid, Pagination } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/grid"
import "swiper/css/pagination"

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
  ]

  return (
    <div className="w-[800px] max-lg:w-[700px] max-md:w-[600px] max-sm:w-[350px] flex flex-col gap-10 max-sm:gap-5 items-start">
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
      <div className="w-full">
        <Swiper
          slidesPerView={1}
          spaceBetween={10} // 각 슬라이드 간 간격
          pagination={{ clickable: true }}
          grid={{
            rows: 2,
            fill: "row",
          }}
          modules={[Grid, Pagination]}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
              grid: {
                rows: 2,
                fill: "row",
              },
            },
          }}
        >
          {exampleQuestions.map((example) => (
            <SwiperSlide key={example.title}>
              <button
                type="button"
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
