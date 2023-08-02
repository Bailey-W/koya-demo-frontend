import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { auth } from "@clerk/nextjs";
import { Job } from "@prisma/client";
import prismadb from "@/lib/prismadb";
import { Status } from "./ui/status";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

interface JobTableProps {
    className?: string,
    items: Job[]
}

export const JobTable = async ({className, items = []} : JobTableProps) => {
    const { userId } = auth();

    const getNiche = async ({job} : {job: Job}) => {
      const niche = await prismadb.niche.findFirst({
        where: {
          id: job.nicheId
        }
      })
      if(!niche)
        return "null";

      return niche.name;
    }

    const formattedItems = await Promise.all(items.map(async (item) => {
      return {
        id: item.id,
        createdAt: item.createdAt,
        status: item.status,
        niche: await getNiche({job: item})
      }
    }));

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Created</TableHead>
            <TableHead>Niche</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formattedItems.map(async (job) => (
            <TableRow key={job.id}>
            <TableCell className="font-medium">{job.createdAt.toLocaleString()}</TableCell>
            <TableCell>{job.niche}</TableCell>
            <TableCell><Status status={job.status}/></TableCell>
            <TableCell className="text-right">
              <Link href={'/jobs/' + job.id}>
                <Button variant="outline" size="icon" disabled={job.status !== "Complete"}>
                  <Eye />
                </Button>
              </Link>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}