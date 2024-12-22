import { InfoTooltip } from "@/components/tooltips/info-tooltip/info-tooltip";
import { cn } from "@/utils/styling";
import Link from "next/link";

import style from "./transaction-status-tooltip.module.scss";

type StatusTooltipProps = {
  commands?: string[]
  status: string
}

/**
 * Tooltip for the status tag
 * @param props.commands - string[]
 * @param props.status - string
 * @constructor
 */

export function TransactionStatusTooltip(props: StatusTooltipProps) {
  return <InfoTooltip className={style.transactionStatusTooltipDiv}>
    <div className="flex flex-col items-start text-left gap-3">
      <h3 className={cn(
        style.transactionStatusHeader,
        props.status === "Pending" ? style.pending : props.status === "Committed" ? style.committed : style.failed,
      )}>
        {props.status}
      </h3>
      <hr className="border-t w-full" />
      <div className="font-[300] text-[14px] leading-[130%]">
        <h3>Commands:</h3>
        <br />
        <p>Transfer 1 (Success)</p>
        <p>Transfer 2 (Failed)</p>
      </div>
      <hr className="border-t w-full" />
      <Link href={`/`} className="font-[500] text-[15px]">See More Details</Link>
    </div>
  </InfoTooltip>
}
