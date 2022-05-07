import type { FC as RFC, PropsWithChildren } from "react"

export type FCWC<T> = RFC<PropsWithChildren<T>>

export type FC<T> = RFC<T>
