"use client"
import { EllipsisCell } from "@/components/table/custom-cells/ellipsis-cell/ellipsis-cell";
import { SkeletonBlock } from "@/components/skeletons/text-block-skeleton/skeleton-block";
import { InfoTooltip } from "@/components/tooltips/info-tooltip/info-tooltip";
import { CopyButton } from "@/components/buttons/copy-button/copy-button";
import { CheckCircle, Clock4, XCircle } from "@/components/icons";
import { TooltipButton } from "@/components/buttons";
import { formatDistanceToNowStrict } from "date-fns";
import { getAPIClient } from "@/utils/api-clients";
import { formatInTimeZone } from "date-fns-tz";
import { Sha256Hash } from "pchain-types-js";
import { gweiToETH } from "@/utils/numbers";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { networkAtom } from "@/jotai/app";
import { cn } from "@/utils/styling";
import { useAtom } from "jotai";
import Link from "next/link";

import style from "../overview.module.scss"
import { placeholderTransactions } from "@/data/transactions"

type TransactionOverviewProps = {
  hash: string
}

/** Transaction Overview
 * @description This component displays the overview of a transaction.
 * */

export function TransactionOverview(props: TransactionOverviewProps) {
  const router = useRouter()
  const [network] = useAtom(networkAtom)
  const client = getAPIClient(network)
  const [details, setDetails] = useState<any>()
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   /** check if hash or height is provided */
  //   async function fetchData() {
  //     await client.getTxsBy(
  //       [{ param: "tx_hash", value: new Sha256Hash(props.hash) }],
  //       [],
  //       "summary_only",
  //       1,
  //       "asc")
  //       .then(data => {
  //         if (data) setDetails(data[0]);
  //         setLoading(false)
  //       })
  //       .catch(err => {
  //         console.log(err)
  //         setLoading(false)
  //       })
  //   }
  //
  //   fetchData()
  // }, [client, props.hash])

  useEffect(() => {
    setDetails(placeholderTransactions[0])
    setLoading(false)
  }, [])

  if (loading) return <TransactionOverviewSkeleton />

  return <div className={style.overviewDiv}>
    <div className={style.overviewGrid}>
      <div className={style.overviewItemLabel}>
        Transaction Hash
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>Transaction hash is a unique alphanumeric string that is generated whenever a transaction is
              performed.</p>
            <p>It is a unique identifier that is used to track the transaction on the blockchain.</p>
          </InfoTooltip>
        </TooltipButton>
      </div>
      <div className={style.overviewItemDetail}>
        <EllipsisCell string={details?.hash} className={cn(style.hash, "font-[500]")} />
        <CopyButton className="ml-[8px]" textToCopy={details?.hash} />
      </div>


      <div className={style.overviewItemLabel}>
        Status
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>Hover or click on the icons in this column to see the status of any transaction. The
              states of transaction include:</p>
            <br />
            <ol type="1" className="list-outside list-decimal block ml-[18px] marker:text-[var(--text-mild)]">
              <li>
                <span className="text-[var(--text-mild)]">Committed:</span> Transaction has been successfully added to
                the
                blockchain.
              </li>
              <li>
                <span className="text-[var(--warning)]">Pending:</span> Transaction is awaiting the required number of
                network confirmations
                to be
                reached. This may vary based on the fee paid by the sender, the asset involved, and
                network traffic.
              </li>
              <li>
                <span className="text-[var(--danger)]">Failed:</span> Transaction was not executed due to factors such
                as
                low fees or
                errors.
              </li>
            </ol>
          </InfoTooltip>
        </TooltipButton>
      </div>
      <div className={cn(style.overviewItemDetail, "gap-[12px]")}>
        <StatusChip
          statusCode={details?.status} />
        {(details?.status === 1301 || details?.status === 1302 || details?.status === 1303) &&
          <>
            <hr className="border-l border-[var(--card-outline)] h-full" />
            <span className="text-[var(--text-danger)]">Custom Program Error: &#39;InsufficientToken ()&#39;</span>
          </>
        }
      </div>


      <div className={style.overviewItemLabel}>
        Block
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>This shows the Block that contains this particular transaction.</p>
            <br />
            <p>Blocks are bundles of transactions recorded on the blockchain. Each block includes transaction data, a
              timestamp, and a link to the previous block for security.</p>
          </InfoTooltip>
        </TooltipButton>
      </div>
      <div className={style.overviewItemDetail}>
        <EllipsisCell className={style.hash} string={details?.block_hash}
                      url={`/block/hash/${details?.block_hash}`} />
        <CopyButton className="ml-[8px]" textToCopy={details?.block_hash} />
      </div>


      <div className={style.overviewItemLabel}>
        Timestamp
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>The Date and Time displayed in UTC (Coordinated Universal Time) in which the transaction is produced.
            </p>
          </InfoTooltip>
        </TooltipButton>
      </div>

      <div className={cn(style.overviewItemDetail, style.timestamp, "gap-[12px]")}>
        <span>
          {formatDistanceToNowStrict(details?.timestamp, {addSuffix: true})}
        </span>
        <span className="border-r border-[var(--card-outline)] h-full"></span>
        <span
          className="text-[var(--text-mild)]"> {formatInTimeZone(details?.timestamp, "UTC", "dd MMMM, yyyy HH:mm:ss")} +UTC
        </span>
      </div>
    </div>

    <hr className="w-full border-[var(--card-outline)]" />

    <div className={style.overviewGrid}>
      <div className={style.overviewItemLabel}>
        Signer
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>Signer refers to the originating account that authorised a transaction with their private key.</p>
          </InfoTooltip>
        </TooltipButton>
      </div>
      <div className={style.overviewItemDetail}>
        <EllipsisCell className={style.hash} string={`${details?.signer}`}
                      url={`/address/${details?.signer}`} />
        <CopyButton className="ml-[8px]" textToCopy={details?.signer} />
      </div>


      <div className={style.overviewItemLabel}>
        Amount
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>This displays the command specified in the transaction by the signer.</p>
          </InfoTooltip>
        </TooltipButton>
      </div>
      <div className={style.overviewItemDetail}>
        {details?.amount} ETH
      </div>
    </div>

    <hr className="w-full border-[var(--card-outline)]" />

    <div className={style.overviewGrid}>
      <div className={style.overviewItemLabel}>
        Commands
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>This displays the command specified in the transaction by the signer.</p>
          </InfoTooltip>
        </TooltipButton>
      </div>
      <div className={style.overviewItemDetail}>
        Transfer 1
      </div>
    </div>

    <hr className="w-full border-[var(--card-outline)]" />

    <div className={style.overviewGrid}>
      <div className={style.overviewItemLabel}>
        Transaction Fee
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>Amount paid in ETH to process and verify a transaction on the blockchain.</p>
          </InfoTooltip>
        </TooltipButton>
      </div>
      <div className={style.overviewItemDetail}>
        0.3 ETH
      </div>

      <div className={style.overviewItemLabel}>
        Gas Price
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>Gas price is the fee for processing transactions. </p>
            <br/>
            <p>Factors affecting it include network congestion, transaction complexity, market demand, and competition among users for quicker confirmations.</p>
          </InfoTooltip>
        </TooltipButton>
      </div>
      <div className={cn(style.overviewItemDetail, "gap-2")}>
        0.025 ETH
        <span className="border-r border-[var(--card-outline)] h-full"></span>
        Base Fee: {8} Gwei / GAS
        <span className="border-r border-[var(--card-outline)] h-full"></span>
        Priority Fee: {0} Gwei / GAS
      </div>

      <div className={style.overviewItemLabel}>
        Gas Used by Txn
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>The amount of gas consumed by this transaction.</p>
          </InfoTooltip>
        </TooltipButton>
        <hr className="border-l border-[var(--card-outline)] h-full" />
        Gas Limit
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>The maximum amount of gas allocated for the transaction.</p>
          </InfoTooltip>
        </TooltipButton>
      </div>
      <div className={cn(style.overviewItemDetail, "gap-2")}>
        2000 GAS
        <span className="border-r border-[var(--card-outline)] h-full"></span>
        10000 GAS (20%)
      </div>
    </div>
  </div>
}

function StatusChip(props: { statusCode: number }) {

  if (props.statusCode === 0) {
    return <div
      className={cn(
        style.statusChip,
        style.pending,
      )}>
      <Clock4 size={16} />
      Pending
    </div>
  }

  if (props.statusCode === 1) {
    return <div
      className={cn(
        style.statusChip,
        style.committed,
      )}>
      <CheckCircle size={16} /> Committed
    </div>
  }

  if (props.statusCode === 1302 || props.statusCode === 1303) {
    return <div
      className={cn(
        style.statusChip,
        style.failed,
      )}>
      <XCircle size={16} />
      Failed
    </div>
  }
}

function TransactionOverviewSkeleton() {

  const commonStyles = "!h-[20px] !my-[2px] !rounded-[6px]"

  return <div className={style.overviewDiv}>
    <div className={style.overviewGrid}>
      <div className={style.overviewItemLabel}>
        <SkeletonBlock className={cn("!w-[150px]", commonStyles)} />
      </div>
      <div className={style.overviewItemDetail}>
        <SkeletonBlock className={cn("!w-[150px]", commonStyles)} />
      </div>

      <div className={style.overviewItemLabel}>
        <SkeletonBlock className={cn("!w-[130px]", commonStyles)} />
      </div>
      <div className={cn(style.overviewItemDetail, "gap-[12px]")}>
        <SkeletonBlock className={cn("!w-[380px]", commonStyles)} />
      </div>

      <div className={style.overviewItemLabel}>
        <SkeletonBlock className={cn("!w-[130px]", commonStyles)} />
      </div>
      <div className={style.overviewItemDetail}>
        <SkeletonBlock className={cn("!w-[410px]", commonStyles)} />
      </div>

      <div className={style.overviewItemLabel}>
        <SkeletonBlock className={cn("!w-[120px]", commonStyles)} />
      </div>
      <div className={style.overviewItemDetail}>
        <SkeletonBlock className={cn("!w-[220px]", commonStyles)} />
      </div>

      <div className={style.overviewItemLabel}>
        <SkeletonBlock className={cn("!w-[150px]", commonStyles)} />
      </div>
      <div className={style.overviewItemDetail}>
        <SkeletonBlock className={cn("!w-[280px]", commonStyles)} />
      </div>
    </div>

    <hr className="w-full border-[var(--card-outline)]" />

    <div className={style.overviewGrid}>
      <SkeletonBlock className={cn("!w-[110px]", commonStyles)} />
      <div className={style.overviewItemDetail}>
        <SkeletonBlock className={cn("!w-[400px]", commonStyles)} />
      </div>


      <div className={style.overviewItemLabel}>
        <SkeletonBlock className={cn("!w-[135px]", commonStyles)} />
      </div>
      <div className={style.overviewItemDetail}>
        <SkeletonBlock className={cn("!w-[80px]", commonStyles)} />
      </div>


      <div className={style.overviewItemLabel}>
        <SkeletonBlock className={cn("!w-[155px]", commonStyles)} />
      </div>
      <div className={style.overviewItemDetail}>
        <SkeletonBlock className={cn("!w-[400px]", commonStyles)} />
      </div>

    </div>

    <hr className="w-full border-[var(--card-outline)]" />

    <div className={style.overviewGrid}>


      <div className={style.overviewItemLabel}>
        <SkeletonBlock className={cn("!w-[105px]", commonStyles)} />
      </div>
      <div className={style.overviewItemDetail}>
        <SkeletonBlock className={cn("!w-[150px]", commonStyles)} />
      </div>


      <div className={style.overviewItemLabel}>
        <SkeletonBlock className={cn("!w-[90px]", commonStyles)} />
      </div>
      <div className={style.overviewItemDetail}>
        <SkeletonBlock className={cn("!w-[150px]", commonStyles)} />
      </div>

      <div className={style.overviewItemLabel}>
        <SkeletonBlock className={cn("!w-[70px]", commonStyles)} />
      </div>
      <div className={style.overviewItemDetail}>
        <SkeletonBlock className={cn("!w-[180px]", commonStyles)} />
      </div>

      <div className={style.overviewItemLabel}>
        <SkeletonBlock className={cn("!w-[120px]", commonStyles)} />
      </div>
      <div className={style.overviewItemDetail}>
        <SkeletonBlock className={cn("!w-[120px]", commonStyles)} />
      </div>
    </div>
  </div>
}
