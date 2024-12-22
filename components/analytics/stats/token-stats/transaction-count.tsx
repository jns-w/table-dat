"use client"
import { SkeletonBlock } from "@/components/skeletons/text-block-skeleton/skeleton-block"
import { TooltipButton } from "@/components/buttons/info-button/tooltip-button"
import { InfoTooltip } from "@/components/tooltips/info-tooltip/info-tooltip"
import { getAPIClient } from "@/utils/api-clients"
import { useEffect, useState } from "react"
import { networkAtom } from "@/jotai/app"
import { useAtom } from "jotai/index"

import style from "../stats.module.scss"

/**
 * Transaction Count Component
 */

export function TransactionCount() {
  const [network] = useAtom(networkAtom)
  const client = getAPIClient(network)
  const [loading, setLoading] = useState(true)

  const [transactionCount, setTransactionCount] = useState<number | undefined>(undefined)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      await client.getMetricsTxCount()
        .then(data => setTransactionCount(data.toNumber()))
        .catch(err => console.log(err))
      setLoading(false)
    }

    fetchData()
  }, [network, client])


  return <>
    <label>Total Transactions
      <TooltipButton>
        <InfoTooltip overflowOffsetClassName="right-[-13px]">
          <div className="flex flex-col items-start">
            <p className={style.nowrap}>
              Total Transactions Counter
            </p>
            <p className={style.nowrap}>
              (Updated every hour)
            </p>
          </div>
        </InfoTooltip>
      </TooltipButton>
    </label>
    {loading ? <SkeletonBlock className="mt-1 my-1.5 max-w-[40px]" /> : transactionCount}
  </>
}
