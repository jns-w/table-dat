import { EllipsisCell } from "@/components/table/custom-cells/ellipsis-cell/ellipsis-cell"
import { DetailsCard } from "@/components/cards/details-card/details-card"

type TransactionCommandsProps = {
  commands: Command[]
}

type Command = {
  dataInput: DataInput[]
  type: string
}

type DataInput = {
  label: string
  value: string
}

export function TransactionCommands(props: TransactionCommandsProps) {

  return <DetailsCard collapsible>
    <DetailsCard.HDivider />

    <DetailsCard.RowsDiv>
      <DetailsCard.Header>
        Command #1 - Transfer
      </DetailsCard.Header>

      <DetailsCard.Row>
        <DetailsCard.Label className="self-start">
          Data Input
        </DetailsCard.Label>

        <DetailsCard.Item className="flex-col gap-[16px] border !items-start">
          <div className="flex border">
            <div>From</div>
            <EllipsisCell string={"GbGANSp_rHqQcc-cR_UZgq-fJZmtag-8lMMUKTKDsw"}/>
          </div>
          <div className="flex">
            <div>To</div>
            <EllipsisCell string={"aADQr9Al2XHcGgPHr76nYZyefXeRoHN98whi49KNyQE"}/>
          </div>
        </DetailsCard.Item>
      </DetailsCard.Row>
    </DetailsCard.RowsDiv>

    <DetailsCard.HDivider />

    <DetailsCard.RowsDiv>
      <DetailsCard.Header>
        Command #2 - Transfer
      </DetailsCard.Header>

      <DetailsCard.Row>
        <DetailsCard.Label className="self-start">
          Data Input
        </DetailsCard.Label>

        <DetailsCard.Item className="flex-col gap-[16px] border !items-start">
          <div className="flex border">
            <div>CBI Version</div>
            <div>0.4.1</div>
          </div>
        </DetailsCard.Item>
      </DetailsCard.Row>
    </DetailsCard.RowsDiv>
  </DetailsCard>
}

function DataInputGrid(props: { dataInputs: DataInput[] }) {
  return <div className="grid grid-cols-2 gap-4">
  </div>
}