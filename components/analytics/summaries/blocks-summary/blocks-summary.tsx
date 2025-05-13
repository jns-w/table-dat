"use client"
import { EllipsisCell } from "@/components/table/custom-cells/ellipsis-cell/ellipsis-cell"
import { SkeletonBlock } from "@/components/skeletons/text-block-skeleton/skeleton-block"
import { TooltipTrigger } from "@/components/tooltips/tooltip-wrapper/tooltip-trigger"
import { InfoTooltip } from "@/components/tooltips/info-tooltip/info-tooltip"
import { useCallback, useEffect, useState } from "react"
import { getAPIClient } from "@/utils/api-clients"
import { formatDistanceToNow } from "date-fns"
import { Card } from "@/components/cards"
import { networkAtom } from "@/jotai/app"
import { ArrowRight } from "lucide-react"
import { cn } from "@/utils/styling";
import { useAtom } from "jotai"
import Link from "next/link"

import style from "../summaries.module.scss"
import { placeholderBlocks } from "@/data/blocks"


type BlocksSummaryData = {
  base_fee: number
  block_hash: string
  gas_used: number
  height: number
  proposer: string
  timestamp: number
  tx_count: number
}[]

type BlocksSummaryOutput = {
  base_fee: number
  block_hash: string
  gas_used: number
  height: number
  proposer: string
  timestamp: string
  tx_count: number
}[]

/**
 * Blocks Summary Component
 * @description Displays a summary data of the latest 6 blocks
 */

export function BlocksSummary() {
  const [network] = useAtom(networkAtom)
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const APIClient = getAPIClient(network)

  const parse = useCallback((data: BlocksSummaryData) => {
    if (!data) return []

    let rows: BlocksSummaryOutput = []
    for (let i = 0; i < data.length; i++) {
      let { base_fee, block_hash, gas_used, height, proposer, timestamp, tx_count } = data[i]
      const timestampStr = formatDistanceToNow(timestamp, { addSuffix: true})
      rows.push({ base_fee, block_hash, gas_used, height, proposer, timestamp: timestampStr, tx_count })
    }
    return rows
  }, [])

  // useEffect(() => {
  //   async function fetchData() {
  //     setLoading(true)
  //     await APIClient.getBlockSummariesBy("latest", "", 6, "desc")
  //       .then(data => setData(parse(data)))
  //       .catch(err => console.log(err))
  //     setLoading(false)
  //   }
  //
  //   fetchData()
  // }, [APIClient, network, parse])

  useEffect(() => {
    setLoading(true)
    setData(parse(placeholderBlocks.slice(0, 6)))
    setLoading(false)
  }, [parse])

  return <Card className={style.summaryContainer}>
    <h2 className={style.summaryHeader}>Latest Blocks</h2>
    <div className={style.summaryRowsDiv}>
      {loading ? Array(6)
          .fill(null)
          .map(((_, index) => <BlockRowSkeleton key={`block-skeleton-${index}`} />)) :
        data.map((el: any, index: number) => {
          /** Row is styled with Grid Layout Module*/
          return <div key={`block-${el.height}`} className={style.summaryRow}>

            {/** Block Height */}
            <div className={style.itemDiv}>
              <span className={style.itemPrefixText}>Block&nbsp;</span>
                <TooltipTrigger className="float-left" tooltipContent={
                  <InfoTooltip className="left-[-12px] !bottom-[24px]">
                    <p className="text-nowrap whitespace-nowrap">Click to Open</p>
                  </InfoTooltip>
                }>
                  <Link tabIndex={0} className={style.itemLink} href={`/block/height/${el.height}`}>
                    {el.height}
                  </Link>
                </TooltipTrigger>
            </div>

            {/** Timestamp */}
            <div className={style.timestampDiv}>
              <p>{el.timestamp}</p>
            </div>

            {/** Proposed by */}
            <div className={style.byDiv}>
              <p className={style.byDescriptionText}>Proposed by&nbsp;</p>
              <EllipsisCell string={el.proposer} className={style.byLink} url={`/address/${el.proposer}`} />
            </div>

            {/** Amount Chip */}
            <div className={style.amountDiv}>
              <TooltipTrigger tooltipContent={
                <InfoTooltip className="top-[-40px]">
                  <p className="text-nowrap">Base Fee</p>
                </InfoTooltip>
              }>
                <div className={style.tokenChip}>
                  {el.base_fee} ETH
                </div>
              </TooltipTrigger>
            </div>
          </div>
        })
      }
    </div>
    <div className={style.summaryFooter}>
      <Link href="/blocks">
        View All Blocks <ArrowRight size={16} />
      </Link>
    </div>
  </Card>
}

/**
 * Skeleton for a row in the Blocks Summary
 */

function BlockRowSkeleton() {
  return <div className={style.summaryRow}>
    <div className={style.itemDiv}>
      <SkeletonBlock className="!h-[20px] !w-[60px]" />
    </div>
    <div className={style.timestampDiv}>
      <SkeletonBlock className="!h-[20px] !w-[80px]" />
    </div>
    <div className={cn(style.byDiv, "w-full")}>
      <SkeletonBlock className="!h-[20px] !w-[95px]" />
      <SkeletonBlock className="!h-[20px]" />
    </div>
    <div className={style.amountDiv}>
      <SkeletonBlock className="!rounded-full !h-[22px] !w-[60px]" />
    </div>
  </div>
}
