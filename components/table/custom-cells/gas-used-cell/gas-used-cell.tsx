import { useEffect } from "react"

export type GasUsedCellProps = {
  gasUsed: number
  target: number
}

export function GasUsedCell(props: GasUsedCellProps) {
  const percentage = (props.gasUsed / props.target) * 100
  return <div className="w-full gap-1">
    <p>{props.gasUsed} / {props.target} ({percentage.toFixed(2)}%)</p>
    <PercentBar percentage={percentage} />
  </div>
}

type PercentBarProps = {
  percentage: number
}

function PercentBar(props: PercentBarProps) {
  const percentage = Math.min(Math.round(props.percentage), 100)

  return <div className="w-full h-[0.125rem] bg-[var(--disabled)]">
    <div style={{
      width: `${percentage}%`,
    }} className={"h-[0.125rem] bg-[var(--accent-primary)]"} />
  </div>

}