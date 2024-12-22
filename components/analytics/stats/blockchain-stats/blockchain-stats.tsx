"use client"

import { SkeletonBlock } from "@/components/skeletons/text-block-skeleton/skeleton-block"
import { TooltipButton } from "@/components/buttons/info-button/tooltip-button"
import { InfoTooltip } from "@/components/tooltips/info-tooltip/info-tooltip"
import { getAPIClient } from "@/utils/api-clients"
import React, { useEffect, useState } from "react"
import { Card } from "@/components/cards"
import { networkAtom } from "@/jotai/app"
import { useAtom } from "jotai"
import { clsx } from "clsx"

import { CirculatingSupplyIcon, CurrentEpochIcon, TotalStakedIcon, TotalSupplyIcon } from "../stats-icons"
import style from "../stats.module.scss"

type BlockchainStatsProps = {
  tokenData: {
    circulating_supply: number,
    total_supply: number,
  }
}

/**
 * Blockchain Statistics
 */

export function BlockchainStats(props: BlockchainStatsProps) {
  console.log("props", props)
  return <Card className={clsx(style.statsDiv)}>
    <div className={style.rowsDiv}>
      <div className={style.row}>
        <TotalSupplyIcon className={style.itemIcon} />
        <TotalSupply value={props.tokenData.total_supply} />
        <CirculatingSupply value={props.tokenData.circulating_supply} />
        <CirculatingSupplyIcon className={style.itemIcon} />
      </div>
      <hr className={style.divider} />
      <div className={style.row}>
        <TotalStakedIcon className={style.itemIcon} />
        <TotalStaked />
        <CurrentEpoch />
        <CurrentEpochIcon className={style.itemIcon} />
      </div>
    </div>
  </Card>
}

function TotalSupply(props: { value: number }) {

  return <div className={style.rowItem}>
    <label>
      Total supply
      <TooltipButton>
        <InfoTooltip>
          <div className="flex flex-col items-start mb-2">
            <p className={style.nowrap}>
              Circulating Supply:
            </p>
            <p className={style.nowrap}>
              {props.value.toLocaleString("en-US", { maximumFractionDigits: 0 })} ETH
            </p>
          </div>
          <div className="flex flex-col items-start">
            <p className={style.nowrap}>
              Non-Circulating Supply:
            </p>
            <p className={style.nowrap}>
              {props.value.toLocaleString("en-US", { maximumFractionDigits: 0 })} ETH
            </p>
          </div>
        </InfoTooltip>
      </TooltipButton>
    </label>
    <p>
      {props.value.toLocaleString("en-US", { maximumFractionDigits: 0 })}
      <span className="font-light"> ETH</span>
    </p>
  </div>
}


function CirculatingSupply(props: { value: number }) {


  return <div className={clsx(style.rowItem, style.alignRight)}>
    <label>
      Circulating supply
      <TooltipButton>
        <InfoTooltip overflowOffsetClassName="right-[-13px]">
          <div className="flex flex-col items-start">
            <p className={style.nowrap}>
              The amount of coins that
            </p>
            <p className={style.nowrap}>
              are circulating in the
            </p>
            <p className={style.nowrap}>
              market and are in public
            </p>
            <p className={style.nowrap}>
              hands.
            </p>
          </div>
        </InfoTooltip>
      </TooltipButton>
    </label>
    <p>
      {props.value.toLocaleString("en-US", { maximumFractionDigits: 0 })}
      <span className="font-light"> ETH</span>
    </p>
  </div>
}

function TotalStaked() {
  const [network] = useAtom(networkAtom)
  const client = getAPIClient(network)
  const [loading, setLoading] = useState(false)

  const [totalStaked, setTotalStaked] = useState<number | undefined>(30391038)

  return <div className={style.rowItem}>
    <label>
      Total staked
      <TooltipButton>
        <InfoTooltip>
          <div className="flex flex-col items-start">
            <p className={style.nowrap}>
              The total amount of ETH
            </p>
            <p className={style.nowrap}>
              staked with the current
            </p>
            <p className={style.nowrap}>
              validators.
            </p>
          </div>
        </InfoTooltip>
      </TooltipButton>
    </label>
    {loading ? <SkeletonBlock className="mt-1 my-1.5 max-w-[100px]" /> :
      <p>
        {totalStaked && totalStaked.toLocaleString("en-US")}
        <span className="font-light"> ETH</span>
      </p>
    }
  </div>
}

function CurrentEpoch() {
  const [loading, setLoading] = useState(false)

  const [currentEpoch, setCurrentEpoch] = useState<number | undefined>(293092)

  return <div className={clsx(style.rowItem, style.alignRight)}>
    <label>
      Current epoch
      <TooltipButton>
        <InfoTooltip overflowOffsetClassName="right-[-13px]">
          <div className="flex flex-col items-start">
            <p className={style.nowrap}>
              Epoch is a protocol-defined period for
            </p>
            <p className={style.nowrap}>
              measuring performance of operators
            </p>
            <p className={style.nowrap}>
              on the network. There are 8640 blocks
            </p>
            <p className={style.nowrap}>
              in 1 epoch.
            </p>
          </div>
        </InfoTooltip>
      </TooltipButton>
    </label>
    {loading ? <SkeletonBlock className="mt-1 my-1.5 max-w-[100px]" /> :
      <>
        {currentEpoch}
      </>
    }
  </div>
}
