import { TransactionsSummary } from "@/components/analytics/summaries/transactions-summary/transactions-summary"
import { BlocksSummary } from "@/components/analytics/summaries/blocks-summary/blocks-summary"

import style from "./summaries.module.scss"

/**
 * Summaries component
 * @description Displays summaries of blocks and transactions
 */

export function Summaries() {
  return <div className={style.summariesGrid}>
    <BlocksSummary />
    <TransactionsSummary />
  </div>
}