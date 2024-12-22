import { ThemeToggleButtonSkeleton } from "@/components/topbar/theme-toggle/theme-toggle-button"
import { TooltipTrigger } from "@/components/tooltips/tooltip-wrapper/tooltip-trigger"
import { InfoTooltip } from "@/components/tooltips/info-tooltip/info-tooltip"
import { cn } from "@/utils/styling"
import dynamic from "next/dynamic"

import style from "./topbar.module.scss"

const ThemeToggleButton = dynamic(
  () => import("@/components/topbar/theme-toggle/theme-toggle-button").then(mod => mod.ThemeToggleButton),
  {
    loading: () => <ThemeToggleButtonSkeleton />,
    ssr: false,
  },
)

export async function Topbar() {
  const headers: HeadersInit = new Headers()
  headers.set("Content-Type", "application/json")
  headers.set("X-CMC_PRO_API_KEY", process.env.NEXT_PUBLIC_CMC_API_KEY || "")
  const response = await fetch("https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=ETH", {
    headers,
    next: {
      revalidate: 200,
    },
  }).then(res => {
    return res.json()
  }).catch(err => console.log(err))

  const price = await response.data.ETH[0].quote.USD.price
  const percentageChange = await response.data.ETH[0].quote.USD.percent_change_1h

  return <div className={style.topBarWrapper}>
    <div className={style.topBarDiv}>
      <div className="flex gap-4 h-max items-center">
        <TooltipTrigger
          fromBottom
          tooltipContent={
            <InfoTooltip fromBottom className="z-[10] top-[30px]">
              <div className="flex flex-col gap-[8px]">
                <p>
                  Updated every 24 hours
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-nowrap">
                    Price Data from CoinMarketCap
                  </p>
                </div>
              </div>
            </InfoTooltip>
          }>
          <div className="font-[600]">
            <span className="text-[color:var(--accent-primary)]">ETH Price:</span> ${price.toFixed(2)}
            <span className={cn(
              percentageChange > 0 ? "text-[color:var(--success)]" : "text-[color:var(--danger)]",
            )}>
          {" "}({percentageChange.toFixed(3)}%)
        </span>
          </div>
        </TooltipTrigger>

        <TooltipTrigger
          fromBottom
          tooltipContent={<InfoTooltip fromBottom className="z-[10] top-[30px]">
            <div className="flex flex-col items-start">
              <div className="text-nowrap">Base Fee: 0.432 Gwei</div>
              <div className="text-nowrap">Priority Fee: 0.001 Gwei</div>
            </div>
          </InfoTooltip>
          }
        >
          <div className="font-semibold">
            <span className="text-[color:var(--accent-primary)]">Gas: </span>
            200 Gwei
          </div>
        </TooltipTrigger>
      </div>
      <div className="flex gap-4 items-center">
        <ThemeToggleButton />
      </div>
    </div>
  </div>
}

