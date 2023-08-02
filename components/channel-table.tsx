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
import { DeleteButton } from "./delete-button";
import { Channel } from "@prisma/client";

interface ChannelTableProps {
    className?: string,
    items: Channel[]
}

export const ChannelTable = ({className, items = []} : ChannelTableProps) => {
    const { userId } = auth();

    return (
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Subscribers</TableHead>
            <TableHead>Videos</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((channel) => (
            <TableRow key={channel.id}>
            <TableCell className="font-medium"><a href={channel.link} target="_blank">{channel.name}</a></TableCell>
            <TableCell>{channel.subscribers}</TableCell>
            <TableCell>{channel.number_of_videos}</TableCell>
            <TableCell className="text-right">
              <DeleteButton id={channel.id.toString()} route="/api/niches/channels"/>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}