import { cn } from "@/utils/styling";

import style from "./text-block-skeleton.module.scss"

type SkeletonBlockProps = {
  className?: string;
}

/**
 * Skeleton Block
 * @description Displays a generic loading skeleton, pass className to customise
 * @param props.className - string
 */

export function SkeletonBlock(props: SkeletonBlockProps) {
  return <div className={cn(
    style.container,
    "animate-pulse",
    props.className
  )}>
    <div className={style.block}></div>
  </div>
}