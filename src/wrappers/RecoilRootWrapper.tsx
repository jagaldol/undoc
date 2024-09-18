"use client"

import { RecoilRoot } from "recoil"
import { ReactNode } from "react"

export default function RecoilRootWrapper({ children }: { children: ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>
}
