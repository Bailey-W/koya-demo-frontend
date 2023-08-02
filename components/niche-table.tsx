import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { auth } from "@clerk/nextjs";
import { Niche } from "@prisma/client";
import { ViewButton } from "@/components/view-niche";
import { DeleteButton } from "./delete-button";

interface NicheTableProps {
    className?: string,
    items: Niche[]
}

export const NicheTable = ({className, items = []} : NicheTableProps) => {
    const { userId } = auth();

    return (
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Channels</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((niche) => (
            <TableRow key={niche.id}>
            <TableCell className="font-medium">{niche.name}</TableCell>
            <TableCell>{niche.updatedAt.toLocaleDateString()} {niche.updatedAt.toLocaleTimeString()}</TableCell>
            <TableCell>{niche.numChannels}</TableCell>
            <TableCell className="text-right">
              <ViewButton nicheId={niche.id}/>
              <DeleteButton id={niche.id} route="/api/niches"/>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}