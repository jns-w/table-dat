"use client"
import { EllipsisCell } from "@/components/table/custom-cells/ellipsis-cell/ellipsis-cell";
import { SkeletonBlock } from "@/components/skeletons/text-block-skeleton/skeleton-block";
import { InfoTooltip } from "@/components/tooltips/info-tooltip/info-tooltip";
import { CopyButton } from "@/components/buttons/copy-button/copy-button";
import { ChevronLeft, ChevronRight } from "@/components/icons";
import { TooltipButton } from "@/components/buttons";
import { formatDistanceToNowStrict } from "date-fns";
import { getAPIClient } from "@/utils/api-clients";
import { formatInTimeZone } from "date-fns-tz";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { networkAtom } from "@/jotai/app";
import { cn } from "@/utils/styling";
import { useAtom } from "jotai";
import Link from "next/link";

import style from "../overview.module.scss"

type BlockOverviewProps = BlockOverviewWithHashProps | BlockOverviewWithHeightProps

interface BlockOverviewWithHeightProps {
  height: string
  hash?: never
}

interface BlockOverviewWithHashProps {
  height?: never
  hash: string
}

export function BlockOverview(props: BlockOverviewProps) {
  const router = useRouter()
  const [network] = useAtom(networkAtom)
  const client = getAPIClient(network)
  const [details, setDetails] = useState<any>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    /** check if hash or height is provided */
    async function fetchData() {
      if (props.height) {
        await client.getBlockSummariesBy("block_number", props.height, 1)
          .then(data => {
            setDetails(data[0])
            setLoading(false)
          })
          .catch(err => {
            console.log(err)
          })
      } else if (props.hash) {
        await client.getBlockSummariesBy("block_hash", props.hash, 1)
          .then(data => {
            console.log("data", data)
            setDetails(data[0])
            setLoading(false)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }

    fetchData()
  }, [client, props.hash, props.height])

  if (loading) return <BlockOverviewSkeleton />

  return <div className={style.overviewDiv}>
    <div className={style.overviewGrid}>
      <div className={style.overviewItemLabel}>
        Block Height
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            Block height refers to the number of blocks added to the
            blockchain since the Genesis Block, indicating the chain&#39;s length and the position of a specific block
            within it.
          </InfoTooltip>
        </TooltipButton>
      </div>
      <div className={style.overviewItemDetail}>
        <p className="font-[500] text-[15px]">{details?.height}</p>
        <CopyButton className="ml-[8px]" textToCopy={details?.height} />
        <Link
          className={style.navigationButton}
          href={`/block/height/${details?.height - 1}`}
        >
          <ChevronLeft size={24} />
        </Link>
        <Link
          className={style.navigationButton}
          href={`/block/height/${details?.height + 1}`}
        >
          <ChevronRight size={24} />
        </Link>
      </div>

      <div className={style.overviewItemLabel}>
        Timestamp
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>This indicates how long ago the block was added to the blockchain, giving insight into the block’s
              relevance. Older blocks are usually more established in the network.
            </p>
            <br />
            <p>UTC (Coordinated Universal Time) format displays the Date & Time for transaction timestamps. It provides
              a standard time reference and ensures synchronisation, while preventing double-spending globally.
            </p>
          </InfoTooltip>
        </TooltipButton>
      </div>
      <div className={cn(style.overviewItemDetail, style.timestamp, "gap-[12px]")}>
        <span>
          {formatDistanceToNowStrict(details?.timestamp * 1000)} ago
        </span>
        <span className="border-r border-[var(--card-outline)] h-full"></span>
        <span
          className="text-[var(--text-mild)]"> {formatInTimeZone(details?.timestamp * 1000, "UTC", "dd MMMM, yyyy HH:mm:ss")} +UTC
        </span>
      </div>

      <div className={style.overviewItemLabel}>
        Block Hash
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>
              A block hash is a unique string created by a cryptographic algorithm that represents block data and links
              it to the previous block.
            </p>
            <br />
            <p>
              Block hashes are used during transactions to verify the integrity of the blockchain, ensure that the
              transaction is recorded and confirm that the block hasn’t been altered.
            </p>
          </InfoTooltip>
        </TooltipButton>
      </div>
      <div className={style.overviewItemDetail}>
        <EllipsisCell className={style.hash} string={details?.block_hash} />
          <CopyButton className="ml-[8px]" textToCopy={details?.block_hash} />
      </div>

      <div className={style.overviewItemLabel}>
        Proposed On
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>This shows information on when the Block was proposed, specifically which Epoch it was suggested in.</p>
            <br />
            <p>An epoch is a defined time period for proposing and validating blocks, facilitating network functions
              such as staking and distributing rewards.</p>
          </InfoTooltip>
        </TooltipButton>
      </div>
      <div className={style.overviewItemDetail}>
        <p>
          Block proposed on epoch <Link href="">512</Link>
        </p>
      </div>

      <div className={style.overviewItemLabel}>
        Transactions
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>The total number of transactions included in this block, which were verified and recorded by the network.
              Each transaction represents an action, such as asset transfers or smart contract interactions, that
              contributes to the block’s data.</p>
          </InfoTooltip>
        </TooltipButton>
      </div>
      <div className={style.overviewItemDetail}>
        <p>
          Total of <Link href="">{details?.tx_count} transactions</Link> in this block
        </p>
      </div>
    </div>

    <hr className="w-full border-[var(--card-outline)]" />

    <div className={style.overviewGrid}>
      <div className={style.overviewItemLabel}>
        Proposer
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>The proposer of a block is the entity that creates and broadcasts a new block, compiling valid
              transactions and adding it to the blockchain, ensuring network integrity.</p>
          </InfoTooltip>
        </TooltipButton>
      </div>
      <div className={style.overviewItemDetail}>
        <EllipsisCell className={style.hash} string={`${details?.proposer}`}
                      url={`/address/${details?.proposer}`} />
        <CopyButton className="ml-[8px]" textToCopy={details?.proposer} />
      </div>


      <div className={style.overviewItemLabel}>
        Epoch Reward
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>Epoch reward refers to the incentives distributed to validators for their participation and contribution
              during an Epoch.</p>
          </InfoTooltip>
        </TooltipButton>
      </div>
      <div className={style.overviewItemDetail}>
        100 Gwei
      </div>


      <div className={style.overviewItemLabel}>
        Previous Block Hash
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>The previous block hash is a unique identifier of the block added to the blockchain just before the
              current block.</p>
          </InfoTooltip>
        </TooltipButton>
      </div>
      <div className={style.overviewItemDetail}>
        <EllipsisCell className={style.hash} string="4znXKBN8ZKhVNPx3rUHeDnU9YNnyqcey9NVx1nwapUEb"/>
        <CopyButton className="ml-[8px]" textToCopy="4znXKBN8ZKhVNPx3rUHeDnU9YNnyqcey9NVx1nwapUEb" />
      </div>

    </div>

    <hr className="w-full border-[var(--card-outline)]" />

    <div className={style.overviewGrid}>


      <div className={style.overviewItemLabel}>
        Gas Used
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>Gas used in a block represents the computational effort required to execute transactions and smart
              contracts, measured in units. This influences fees and resource allocation within the ParallelChain
              blockchain network.</p>
            <br />
            <p>
              Gas Used % =
            </p>
            <p>
              (Gas used in this block) / (Target gas usage in this block)
            </p>
          </InfoTooltip>
        </TooltipButton>
      </div>
      <div className={style.overviewItemDetail}>
        {details?.gas_used} Gray (51.17%)
      </div>


      <div className={style.overviewItemLabel}>
        Gas Limit
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>The gas limit of a block defines the maximum amount of gas that all transactions inside the block are
              allowed to consume.</p>
          </InfoTooltip>
        </TooltipButton>
      </div>
      <div className={style.overviewItemDetail}>
        2000
      </div>

      <div className={style.overviewItemLabel}>
        Base Fee
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>The minimum number of Grays that a transaction must pay for every gas used to be included in this block.
              It is adjusted based on the network demand to optimise transaction processing.</p>
          </InfoTooltip>
        </TooltipButton>
      </div>
      <div className={style.overviewItemDetail}>
        {details?.base_fee} Gray / GAS
      </div>

      <div className={style.overviewItemLabel}>
        Gas Fee Burnt
        <TooltipButton fromBottom>
          <InfoTooltip className={style.overviewLabelTooltip}>
            <p>The gas fee burnt in a block refers to the portion of transaction fees permanently removed from
              circulation.</p>
          </InfoTooltip>
        </TooltipButton>
      </div>
      <div className={style.overviewItemDetail}>
        0.012 XPLL
      </div>
    </div>
  </div>
}

function BlockOverviewSkeleton() {

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