import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "@/components/icons"
import { cn } from "@/utils/styling";

import style from "./pagination.module.scss"

type PaginationProps = {
  className?: string
  currentPage: number
  setCurrentPage: Function
  totalPages: number
}

export function Pagination(props: PaginationProps) {
  return <div className={cn(style.paginationDiv, props.className)}>
    <button
      onClick={() => props.setCurrentPage(1)}
      className={props.currentPage === 1 ? style.disabled : ""}>
      <ChevronFirst size={24} />
    </button>
    <button
      className={props.currentPage === 1 ? style.disabled : ""}
      onClick={() => props.setCurrentPage(Math.max(props.currentPage - 1, 1))}>
      <ChevronLeft size={24} />
    </button>
    <div className={style.paginationTextDiv}>
      <p className="text-nowrap">
        Page {props.currentPage}{" of " + props.totalPages.toLocaleString("en-US")}
      </p>
    </div>
    <button
      onClick={() => props.setCurrentPage(props.currentPage + 1)}
      className={props.currentPage === props.totalPages ? style.disabled : ""}>
      <ChevronRight size={24} />
    </button>
    <button
      onClick={() => props.setCurrentPage(props.totalPages)}
      className={props.currentPage === props.totalPages ? style.disabled : ""}>
      <ChevronLast size={24} />
    </button>
  </div>
}