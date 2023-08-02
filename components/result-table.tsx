import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { JobResults, Job } from "@prisma/client";

interface ResultTableProps {
    className?: string,
    item: JobResults | Job
}

export const ResultTable = async ({className, item } : ResultTableProps) => {
    const formattedItems: string[] = [
        item.channel1,
        item.channel2,
        item.channel3,
        item.channel4,
        item.channel5
    ]

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Channel</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formattedItems.map(async (link) => (
            <TableRow key={link}>
                <TableCell className="font-medium"><a href={link} target="_blank">{link}</a></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}