import CreateJobButton from "@/components/create-job";
import { JobTable } from "@/components/job-table";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default async function Niches() {
    const { userId } = auth();

    if(!userId) {
        redirect("/sign-in");
    }

    const jobs = await prismadb.job.findMany({
        where: {
            userId
        },
    });

    return (
        <div className="flex flex-col mx-4 py-2">
            <JobTable items={jobs} />
            <div className="py-6">
                <CreateJobButton />
            </div>
        </div>
    )
}