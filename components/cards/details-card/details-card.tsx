import { InfoTooltip } from "@/components/tooltips/info-tooltip/info-tooltip"
import { AnimatePresence, motion } from "motion/react"
import { TooltipButton } from "@/components/buttons"
import { ChevronDown } from "@/components/icons"
import { Card } from "@/components/cards/card"
import { ReactNode, useState } from "react"
import { cn } from "@/utils/styling"

import style from "./details-card.module.scss"

type DetailsCardProps = {
  children: ReactNode | ReactNode[];
  className?: string;
  collapsible?: boolean;
}


/**
 * Details Card Component
 * @description A card component that displays details, uses container query to adjust layout
 * @param props.children The children to display in the card
 * @param props.collapsible Whether the card is collapsible
 **/

export function DetailsCard(props: DetailsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return <Card>
    <motion.div
      className={cn(style.detailsDiv, props.className)}
    >
      {
        props.collapsible && <DetailsCard.Row>
          <DetailsCard.Label>
            Details
            <TooltipButton fromBottom>
              <InfoTooltip><p>Test</p></InfoTooltip>
            </TooltipButton>
          </DetailsCard.Label>
          <DetailsCard.Item className="justify-end">
            <DetailsCard.ExpandBtn isExpanded={isExpanded} onClick={() => setIsExpanded(prev => !prev)} />
          </DetailsCard.Item>
        </DetailsCard.Row>
      }
      <AnimatePresence>
        {
          isExpanded && <motion.div
            exit={{ height: 0 }}
            initial={{ height: 0 }}
            className="overflow-hidden w-full"
            animate={{
              height: "auto",
              opacity: 1,
            }}
            transition={{
              height: {
                damping: 40,
                stiffness: 400,
                type: "spring",
              },
            }}
          >
            {props.children}
          </motion.div>
        }
      </AnimatePresence>
      <div className={style.bottomFaderDiv} />
    </motion.div>
  </Card>
}

DetailsCard.Grid = DetailsGrid
DetailsCard.RowsDiv = DetailRowsDiv
DetailsCard.Row = DetailRow
DetailsCard.Header = DetailHeader
DetailsCard.Label = DetailLabel
DetailsCard.Item = DetailItem
DetailsCard.HDivider = DetailsHDivider
DetailsCard.VDivider = DetailsVDivider
DetailsCard.ExpandBtn = DetailsExpandBtn

function DetailsGrid(props: { children: ReactNode }) {
  return <div className={style.detailsGrid}>
    {props.children}
  </div>
}

function DetailRowsDiv(props: { children: ReactNode | ReactNode[], className?: string }) {
  return <div className={cn(style.detailRowsDiv, props.className)}>
    {props.children}
  </div>
}

function DetailRow(props: { children: ReactNode | ReactNode[], className?: string }) {
  return <div className={cn(style.detailRow, props.className)}>
    {props.children}
  </div>
}

function DetailHeader(props: { children: ReactNode, className?: string }) {
  return <div className={cn(style.detailHeader, props.className)}>
    {props.children}
  </div>
}

function DetailLabel(props: { children: ReactNode, className?: string }) {
  return <div className={cn(style.detailLabel, props.className)}>
    {props.children}
  </div>
}

function DetailItem(props: {
  children: ReactNode,
  className?: string,
}) {
  return <div className={cn(style.detailItem, props.className)}>
    {props.children}
  </div>
}

function DetailsHDivider(props: { className?: string }) {
  return <hr className={cn(style.detailsHDivider, props.className)} />
}

function DetailsVDivider() {
  return <div className={style.detailsVDivider} />
}

function DetailsExpandBtn(props: {
  isExpanded: boolean
  onClick: () => void,
}) {
  return <button
    {...props.onClick && { onClick: props.onClick }}
    className={style.detailsExpandBtn}>
    <AnimatePresence mode="popLayout">
      {props.isExpanded ?
        <motion.span
          key="less"
          exit={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.12, type: "easeOut" }}
        >Click to show less</motion.span> :
        <motion.span
          key="more"
          exit={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.12, type: "easeOut" }}
        >Click to show more
        </motion.span>}
    </AnimatePresence>
    <ChevronDown
      className={cn(style.chevron, props.isExpanded && style.expanded)}
    />
  </button>
}