import { ReactNode } from "react"
import { clsx } from "clsx"

import style from "./card.module.scss"

type CardProps = {
  children: ReactNode;
  className?: string;
}

export function Card(props: CardProps) {
  return <div
    className={clsx(
      style.container,
      props.className && props.className)}>
    {props.children}
  </div>
}