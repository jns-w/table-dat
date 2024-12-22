"use client"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { InfoTooltip } from "@/components/tooltips/info-tooltip/info-tooltip"
import { TooltipButton } from "@/components/buttons"
import { useEffect, useState } from "react"
import { Card } from "@/components/cards"
import { format } from "date-fns"
import { clsx } from "clsx"

import statsStyle from "../stats.module.scss"
import style from "./gas-chart.module.scss"

const weekData = [
  {
    Date: new Date(new Date().setDate(new Date().getDate() - 7)),
    GAS: 620400,
  },
  {
    Date: new Date(new Date().setDate(new Date().getDate() - 6)),
    GAS: 333900,
  },
  {
    Date: new Date(new Date().setDate(new Date().getDate() - 5)),
    GAS: 809000,
  },
  {
    Date: new Date(new Date().setDate(new Date().getDate() - 4)),
    GAS: 452500,
  },
  {
    Date: new Date(new Date().setDate(new Date().getDate() - 3)),
    GAS: 1124000,
  },
  {
    Date: new Date(new Date().setDate(new Date().getDate() - 2)),
    GAS: 902400,
  },
  {
    Date: new Date(new Date().setDate(new Date().getDate() - 1)),
    GAS: 1432400,
  },
  {
    Date: new Date(),
    GAS: 1224000,
  },
]

const dayData = [
  // hours of the day starting from 00:00
  {
    Date: new Date(new Date().setHours(0, 0, 0, 0)),
    GAS: 123000,
  },
  {
    Date: new Date(new Date().setHours(1, 0, 0, 0)),
    GAS: 220000,
  },
  {
    Date: new Date(new Date().setHours(2, 0, 0, 0)),
    GAS: 320000,
  },
  {
    Date: new Date(new Date().setHours(3, 0, 0, 0)),
    GAS: 900000,
  },
  {
    Date: new Date(new Date().setHours(4, 0, 0, 0)),
    GAS: 1204000,
  },
  {
    Date: new Date(new Date().setHours(5, 0, 0, 0)),
    GAS: 1350000,
  },
  {
    Date: new Date(new Date().setHours(6, 0, 0, 0)),
    GAS: 1320000,
  },
  {
    Date: new Date(new Date().setHours(7, 0, 0, 0)),
    GAS: 854000,
  },
  {
    Date: new Date(new Date().setHours(8, 0, 0, 0)),
    GAS: 652000,
  },
  {
    Date: new Date(new Date().setHours(9, 0, 0, 0)),
    GAS: 1834000,
  },
  {
    Date: new Date(new Date().setHours(10, 0, 0, 0)),
    GAS: 2404000,
  },
  {
    Date: new Date(new Date().setHours(11, 0, 0, 0)),
    GAS: 2190000,
  },
  {
    Date: new Date(new Date().setHours(12, 0, 0, 0)),
    GAS: 1351000,
  },
  {
    Date: new Date(new Date().setHours(13, 0, 0, 0)),
    GAS: 1804000,
  },
  {
    Date: new Date(new Date().setHours(14, 0, 0, 0)),
    GAS: 1130000,
  },
  {
    Date: new Date(new Date().setHours(15, 0, 0, 0)),
    GAS: 1290000,
  },
  {
    Date: new Date(new Date().setHours(16, 0, 0, 0)),
    GAS: 1344000,
  },
  {
    Date: new Date(new Date().setHours(17, 0, 0, 0)),
    GAS: 1920000,
  },
  {
    Date: new Date(new Date().setHours(18, 0, 0, 0)),
    GAS: 2810000,
  },
  {
    Date: new Date(new Date().setHours(19, 0, 0, 0)),
    GAS: 2304000,
  },
  {
    Date: new Date(new Date().setHours(20, 0, 0, 0)),
    GAS: 2030000,
  },
  {
    Date: new Date(new Date().setHours(21, 0, 0, 0)),
    GAS: 1493100,
  },
  {
    Date: new Date(new Date().setHours(22, 0, 0, 0)),
    GAS: 224000,
  },
  {
    Date: new Date(new Date().setHours(23, 0, 0, 0)),
    GAS: 240000,
  },
  {
    Date: new Date(new Date().setHours(24, 0, 0, 0)),
    GAS: 84000,
  },
]

/**
 * Gas Chart Component
 * @description Displays a chart of gas usage over time
 * - Day mode: shows hourly gas usage
 * - Week mode: shows daily gas usage
 */

export function GasChart() {
  const [mode, setMode] = useState<"day" | "week">("week")
  const [chartData, setChartData] = useState<any[]>([])


  useEffect(() => {
    if (mode === "day") setChartData(dayData); else setChartData(weekData)
  }, [mode])

  return <Card className={clsx(statsStyle.statsDiv, "!py-[12px] !px-[10px]")}>
    <div className="flex flex-col w-full h-full gap-1">
      <div className="flex gap-2 items-center text-[var(--text-mild)]">
        <div className="flex w-full justify-between">
          <div className="flex items-center">
            <h4 className="font-light text-[14px] text-[var(--text-mild)] text-nowrap">Avg Gas Usage</h4>
            <TooltipButton className="ml-1">
              <InfoTooltip>
                <div className="w-[224px] text-left">
                  Hourly and daily average gas usage in cryptocurrency measures the average gas consumed by transactions
                  on a
                  blockchain network.
                </div>
              </InfoTooltip>
            </TooltipButton>
          </div>
          {/** Date header uses container query to decide display */}
          <div className={style.gasChartHeaderDateDiv}>
            {
              mode === "week" && <div className={style.gasChartHeaderDate}>
                {format(new Date(new Date().setDate(new Date().getDate() - 7)), "dd MMM yyyy")} - {format(new Date(), "dd MMM yyyy")}
              </div>
            }
          </div>
          <div className="flex gap-1">
            <button
              tabIndex={0}
              onClick={() => setMode("day")}
              className={clsx(
                style.modeButton,
                mode === "day" && style.selected,
              )}
            >
              Day
            </button>
            <button
              tabIndex={0}
              onClick={() => setMode("week")}
              className={clsx(
                style.modeButton,
                mode === "week" && style.selected,
              )}
            >Week
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-full block relative">
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="z-1 absolute overflow-hidden"
        >
          <AreaChart
            data={chartData}
            margin={{
              left: -23,
              right: 18,
              top: 8,
            }}
          >
            <defs>
              <linearGradient x1="0" y1="0" x2="0" y2="1" id="gradient">
                <stop offset="15%" stopOpacity={0.8} stopColor="var(--accent)" />
                <stop offset="98%" stopOpacity={0} stopColor="var(--accent-light)" />
              </linearGradient>
            </defs>
            <Tooltip content={<CustomTooltip mode={mode} />} />
            <XAxis
              interval={0}
              fontSize={12}
              dataKey="Date"
              tickMargin={10}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--text-mild)" }}
              tickFormatter={
                (value, i) => {
                  if (mode === "day") {
                    if (i % 2 === 0 && i % 3 === 0)
                      return format(value, "haaaaa'm'"); else return ""
                  }
                  if (i === 0 || i === (Math.floor((chartData.length - 1) / 2)) || i === chartData.length - 1)
                  return format(value, "dd MMM")
                  return ""
                }
              }
            />
            <YAxis
              width={70}
              interval={0}
              fontSize={12}
              tickCount={3}
              axisLine={false}
              allowDataOverflow={true}
              tick={{ fill: "var(--text-mild)" }}
              domain={[(dataMin: number) => (dataMin / 3), (dataMax: number) => (dataMax * 1.2)]}
              // tickLine={false}
              tickFormatter={(value) => {
                return (Math.round(value / 1000)).toLocaleString("en-US") + "k"
              }}
            />
            {/* there is currently a bug with the cartesian grid within recharts where certain ticks doesn't render the grid, a patch package to getTicks.js is needed */}
            <CartesianGrid
              vertical={false}
              syncWithTicks={true}
              strokeDasharray="2 2"
              stroke="var(--card-outline)"
            />
            <Area
              dot={false}
              dataKey="GAS"
              type="natural"
              strokeWidth={1}
              fill="url(#gradient)"
              isAnimationActive={false}
              activeDot={<CustomDot />}
              stroke="var(--chart-line)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  </Card>
}

type CustomTooltipProps = {
  active?: boolean,
  label?: string
  mode: "day" | "week"
  payload?: any,
}

function CustomTooltip({ active, label, mode, payload }: CustomTooltipProps) {
  if (active && payload && payload.length && label) {
    return (
      <div className={style.customTooltipDiv}>
        <h5>{mode === "week" ? format(label, "dd MMM yyyy") : format(label, "haaaaa'm'")}</h5>
        <p>Gas Usage: <span>{payload[0].value.toLocaleString("en-US")} GAS</span></p>
      </div>
    )
  }
  return null
}

function CustomDot({ cx, cy, payload, stroke }: any) {
  return (
    <svg width={20} x={cx - 10} y={cy - 10} height={20} fill="var(--accent)">
      <circle r={5} cx={10} cy={10} strokeWidth={2} fill="var(--chart-dot)" stroke="var(--chart-dot-stroke)" />
      <circle r={10} cx={10} cy={10} fillOpacity={0.2} fill="var(--text)" className="animate-pulse" />
    </svg>
  )
}