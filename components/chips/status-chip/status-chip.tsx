import type { TransactionStatusCode } from "@/types/status-codes";

import { cn } from "@/utils/styling";

import style from "./status-chip.module.scss";

type StatusChipProps = {
  statusCode: TransactionStatusCode
}

export function StatusChip(props: StatusChipProps) {
  return <div className={cn(
    style.statusChip,
    props.statusCode === 0 && style.pending,
    props.statusCode === 1 && style.success,
    props.statusCode === 1302 || props.statusCode === 1303 && style.failed,
  )}>
    {props.statusCode === 0 ? "Pending" :
      props.statusCode === 1 ? "Success" :
        props.statusCode === 1302 ? "Failed" :
          props.statusCode === 1303 ? "Failed" : "Error"
    }
  </div>
}
