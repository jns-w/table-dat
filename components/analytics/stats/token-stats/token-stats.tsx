import { TransactionCount } from "@/components/analytics/stats/token-stats/transaction-count"
import { InfoTooltip } from "@/components/tooltips/info-tooltip/info-tooltip"
import { TooltipButton } from "@/components/buttons"
import { Card } from "@/components/cards"
import Image from "next/image"
import { clsx } from "clsx"
import React from "react"

import { GasPriceIcon, MarketCapIcon, TotalTransactionsIcon, TokenPriceIcon } from "../stats-icons"
import style from "../stats.module.scss"

/**
 * Token Statistics
 */

export async function TokenStats() {
  const headers: HeadersInit = new Headers()
  headers.set("Content-Type", "application/json")
  headers.set("X-CMC_PRO_API_KEY", process.env.NEXT_PUBLIC_CMC_API_KEY || "")
  const priceData = await fetch("https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=ETH", {
    headers,
    next: {
      revalidate: 200,
    },
  }).then(res => {
    return res.json()
  }).catch(err => console.log(err))

  const price = await priceData.data.ETH[0].quote.USD.price
  const percentChange = await priceData.data.ETH[0].quote.USD.percent_change_1h

  const marketCap = await priceData.data.ETH[0].circulating_supply * price

  return <Card className={style.statsDiv}>
    <div className={style.rowsDiv}>
      <div className={style.row}>
        <TokenPriceIcon className={style.itemIcon} />
        <div className={style.rowItem}>
          <label>Eth Price
            <TooltipButton>
              <InfoTooltip>
                <div className="flex flex-col gap-[8px]">
                  <p>
                    Updated hourly
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="text-nowrap">
                      Price Data from CoinMarketCap
                    </p>
                    <div className="w-[16px] h-[16px]">
                      {/*<Image alt="" width={16} height={16} src="/logos/coingecko-logo.png" />*/}
                    </div>
                  </div>
                </div>
              </InfoTooltip>
            </TooltipButton></label>
          <p>
            ${parseFloat(price.toFixed(2))}{" "}
            {percentChange.toFixed(3) > 0 ?
              <span className="text-[color:var(--success)]">(+{percentChange.toFixed(3)}%)</span> :
              <span className="text-[color:var(--danger)]">({percentChange.toFixed(3)}%)</span>
            }
          </p>
        </div>
        <div className={clsx(style.rowItem, style.alignRight)}>
          <label>Gas Price
            <TooltipButton>
              <InfoTooltip overflowOffsetClassName="right-[-13px]">
                <div className="flex flex-col items-start">
                  <div className={style.nowrap}>Base Fee: 0.432 Gwei</div>
                  <div className={style.nowrap}>Priority Fee: 0.001 Gwei</div>
                </div>
              </InfoTooltip>
            </TooltipButton>
          </label>
          <p>200 <span className="font-light">Gwei</span></p>
        </div>
        <GasPriceIcon className={style.itemIcon} />
      </div>

      <hr className={style.divider} />

      <div className={style.row}>
        <MarketCapIcon className={style.itemIcon} />
        <div className={style.rowItem}>
          <label>Market Cap
            <TooltipButton>
              <InfoTooltip>
                <div className="flex flex-col items-start">
                  <p className={style.nowrap}>
                    The total market value of a
                  </p>
                  <p className={clsx(style.nowrap, "mb-2")}>
                    cryptocurrency&#39;s circulating supply.
                  </p>
                  <p className={style.nowrap}>
                    Market cap = Current price x
                  </p>
                  <p className={style.nowrap}>
                    Circulating supply
                  </p>
                </div>
              </InfoTooltip>
            </TooltipButton>
          </label>
          {marketCap.toLocaleString("en-US", { currency: "USD", style: "currency" })}
        </div>
        <div className={clsx(style.rowItem, style.alignRight)}>
          <TransactionCount />
        </div>
        <TotalTransactionsIcon className={style.itemIcon} />
      </div>
    </div>
  </Card>
}
