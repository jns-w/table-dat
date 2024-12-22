import { InfoTooltip } from "@/components/tooltips/info-tooltip/info-tooltip"
import { TooltipButton } from "@/components/buttons"
import { cn } from "@/utils/styling"
import { ReactNode } from "react"

import style from "./overview.module.scss"

export function Overview(props: { children: ReactNode }) {
  return <div className={style.overviewDiv}>
    {props.children}
  </div>
}

export function OverviewGrid(props: { children: ReactNode }) {
  return <div className={style.overviewGrid}>
    {props.children}
  </div>
}

type OverviewItemLabelProps = {
  children: ReactNode
  tooltipContent: ReactNode
}

export function OverviewItemLabel(props: OverviewItemLabelProps) {
  return <div className={style.overviewItemLabel}>
    {props.children}
    {props.tooltipContent &&
      <TooltipButton fromBottom>
        <InfoTooltip className={style.overviewLabelTooltip}>
          {props.tooltipContent}
        </InfoTooltip>
      </TooltipButton>
    }
  </div>
}

export function OverviewItemDetail(props: { children: ReactNode }) {
  return <div className={style.overviewItemDetail}>
    {props.children}
  </div>
}

export function OverviewDivider() {
  return <hr className={style.overviewDivider} />
}

type StatusChipProps = {
  statusCode: 0 | 1 | 1302 | 1303
}

export function StatusChip(props: StatusChipProps) {
  return <div className={cn(
    style.statusChip,
    props.statusCode === 0 && style.pending,
    props.statusCode === 1 && style.success,
    props.statusCode === 1302 || props.statusCode === 1303 && style.failed,
  )}>
    {props.statusCode === 0 ? "Pending" :
      props.statusCode === 1 ? "Success" :
        props.statusCode === 1302 ? "Failed" :
          props.statusCode === 1303 ? "Failed" : "Error"
    }
  </div>
}