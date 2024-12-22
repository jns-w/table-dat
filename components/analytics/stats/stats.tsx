import { BlockchainStats } from "@/components/analytics/stats/blockchain-stats/blockchain-stats"
import { TokenStats } from "@/components/analytics/stats/token-stats/token-stats"
import { GasChart } from "@/components/analytics/stats/gas-chart/gas-chart"

import style from "./stats.module.scss"

/**
 * Stats Component
 * @description Displays token stats, blockchain stats and gas chart
 */

export async function Stats() {
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

  return <div className={style.statsGrid}>
    <TokenStats />
    <BlockchainStats tokenData={response.data.ETH[0]} />
    <GasChart />
  </div>
}