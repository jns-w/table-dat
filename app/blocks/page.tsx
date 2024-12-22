import { BlocksTable } from "@/app/blocks/blocks-table"
import { Suspense } from "react";

export default function BlocksPage() {

  return <main className="flex flex-col w-full items-center mt-[48px] mb-[64px]">
    <div className="w-full max-w-[var(--max-width)] flex justify-center px-[var(--global-padding)]">
      <div className="flex flex-col justify-center gap-10 w-full">
        <Suspense>
          <BlocksTable />
        </Suspense>
      </div>
    </div>
  </main>
}