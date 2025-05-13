"use client"
import { TransactionStatusTooltip } from "@/components/tooltips/transaction-status-tooltips/transaction-status-tooltip"
import { EllipsisCell } from "@/components/table/custom-cells/ellipsis-cell/ellipsis-cell"
import { SkeletonBlock } from "@/components/skeletons/text-block-skeleton/skeleton-block"
import { TooltipTrigger } from "@/components/tooltips/tooltip-wrapper/tooltip-trigger"
import { InfoTooltip } from "@/components/tooltips/info-tooltip/info-tooltip"
import { useCallback, useEffect, useRef, useState } from "react"
import { placeholderTransactions } from "@/data/transactions"
import { Clock4, Eye, XCircle } from "@/components/icons"
import { formatDistanceToNowStrict } from "date-fns"
import { getAPIClient } from "@/utils/api-clients"
import { gweiToETH } from "@/utils/numbers"
import { Card } from "@/components/cards"
import { networkAtom } from "@/jotai/app"
import { ArrowRight } from "lucide-react"
import { cn } from "@/utils/styling"
import { useAtom } from "jotai"
import Link from "next/link"
import { clsx } from "clsx"

import style from "../summaries.module.scss"


type TransactionsSummaryData = {
  amount: number
  gas_consumed: number
  hash: string
  signer: string
  status: number
  timestamp: number
}[]

type TransactionsSummaryOutput = {
  amount: string
  gas_consumed: number
  hash: string
  signer: string
  status: number
  timestamp: string
}[]

/**
 * Transactions Summary Component
 * @description Displays a summary data of the latest 6 transactions
 */

export function TransactionsSummary() {
  const [network] = useAtom(networkAtom)
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const APIClient = getAPIClient(network)

  const parse = useCallback((data: TransactionsSummaryData): TransactionsSummaryOutput => {
    // if (!data) return []

    const rows: TransactionsSummaryOutput = []

    for (let i = 0; i < data.length; i++) {
      let { amount, gas_consumed, hash, signer, status, timestamp } = data[i]
      // const amountStr = amount === 0 ? "-" : gweiToETH(amount).toString()
      const amountStr = amount === 0 ? "-" : amount.toFixed(4).toString()
      const timestampStr = formatDistanceToNowStrict(timestamp, { addSuffix: true })
      rows.push({ amount: amountStr, gas_consumed, hash, signer, status, timestamp: timestampStr })
    }
    return rows
  }, [])

  // useEffect(() => {
  //   async function fetchData() {
  //     setLoading(true)
  //     await APIClient.getTxsBy([{ param: "latest" }], [], "summary_only", 6, "desc")
  //       .then(data => {
  //         setData(parse(data as TransactionsSummaryData))
  //       }).catch(err => console.log(err))
  //     setLoading(false)
  //   }
  //
  //   fetchData()
  // }, [APIClient, network, parse])

  useEffect(() => {
    setData(parse(placeholderTransactions.slice(0, 6)))
    setLoading(false)
  }, [parse])

  return <Card className={style.summaryContainer}>
    <h2 className={style.summaryHeader}>Latest Transactions</h2>
    <div className={style.summaryRowsDiv}>
      {
        loading ? Array(6)
            .fill(null)
            .map(((_, index) => <TransactionRowSkeleton key={`transaction-skeleton-${index}`} />)) :
          data.map((el: any, index: number) => {
            return <div className={style.summaryRow} key={`transaction-${el.hash}`}>

              {/** Transaction Hash */}
              <div className={style.itemDiv}>
                <span className={style.itemPrefixText}> Transaction&nbsp;</span>
                <span className={style.itemPrefixTextMobileS}>Txn#&nbsp;</span>
                <EllipsisCell string={el.hash} url={`/transaction/${el.hash}`}
                              className={cn(style.itemLink, "!w-auto")} />
              </div>

              {/** Timestamp */}
              <div className={style.timestampDiv}>
                <p>{el.timestamp}</p>
              </div>

              {/** Signed By */}
              <div className={style.byDiv}>
                <p className={style.byDescriptionText}>Signed By&nbsp;</p>
                <EllipsisCell string={el.signer} className={style.byLink} url={`/address/${el.signer}`} />
              </div>

              {/** Amount Chip */}
              <div className={style.amountDiv}>
                <TooltipTrigger
                  tabIndex={-1}
                  tooltipContent={
                    <InfoTooltip className="!bottom-[37px]"
                    >
                      <p>Amount</p>
                    </InfoTooltip>
                  }>
                  <div className={style.tokenChip}>
                    {el.amount} ETH
                  </div>
                </TooltipTrigger>
                <StatusTag status={el.status} />
              </div>
            </div>
          })
      }
    </div>
    <div className={style.summaryFooter}>
      <Link href="/transactions">
        View All Transactions <ArrowRight size={16} />
      </Link>
    </div>
  </Card>
}


type StatusTagProps = {
  status: number
}

/**
 * Status tag component
 * @param props.status - number
 * @constructor
 */

function StatusTag(props: StatusTagProps) {
  const [showInfo, setShowInfo] = useState(false)
  const [width, setWidth] = useState(0)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (buttonRef.current) {
      setWidth(buttonRef.current.getBoundingClientRect().width)
    }
  }, [])


  const statusString = props.status === 0 ? "Pending" : props.status === 1 ? "Committed" : "Failed to Commit"

  return <div className={style.statusTagWrapper}
  >
    <button
      ref={buttonRef}
      className={style.statusTagButton}
      onMouseOver={() => setShowInfo(true)}
      onMouseOut={() => setShowInfo(false)}
    >
      <TooltipTrigger
        tabIndex={0}
        allowTooltipHover
        tooltipContent={
          <TransactionStatusTooltip status={statusString} />
        }>
        <div className={style.statusTagIcon}>
          {
            props.status === 0 ? <Clock4 size={24} color="var(--warning)" /> :
              props.status === 1 ? <Eye size={24} color="var(--icon)" /> :
                <XCircle size={24} color="var(--danger)" />
          }
        </div>
      </TooltipTrigger>
      <div className={cn(
        style.statusTagText,
        props.status === 0 ? style.pending : props.status === 1 ? style.committed : style.failed,
      )}>
        {statusString}
      </div>
    </button>
  </div>
}

function TransactionRowSkeleton() {
  return <div className={style.summaryRow}>
    <div className={style.itemDiv}>
      <SkeletonBlock className="!h-[20px] !w-full" />
    </div>
    <div className={style.timestampDiv}>
      <SkeletonBlock className="!h-[20px] !w-[80px]" />
    </div>
    <div className={cn(style.byDiv, "w-full")}>
      <SkeletonBlock className="!h-[20px] !w-[80px]" />
      <SkeletonBlock className="!h-[20px]" />
    </div>
    <div className={style.amountDiv}>
      <SkeletonBlock className="!rounded-full !h-[22px] !w-[100px]" />
      <SkeletonBlock className="!rounded-full !h-[20px] !w-[20px]" />
    </div>
  </div>
}
