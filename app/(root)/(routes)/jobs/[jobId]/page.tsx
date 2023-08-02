import CreateJobButton from "@/components/create-job";
import { JobTable } from "@/components/job-table";
import { ResultTable } from "@/components/result-table";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


interface ResultsPageProps {
    params: {
      jobId: string;
    }
  }

const ResultPage: React.FC<ResultsPageProps> = async ({ params }) => {
    const { userId } = auth();

    if(!userId) {
        redirect("/sign-in");
    }

    const jobResults = await prismadb.jobResults.findFirst({
        where: {
            jobId: Number(params.jobId)
        },
    });

    const job = await prismadb.job.findFirst({
        where: {
            id: Number(params.jobId),
            userId
        }
    })

    if(!jobResults || !job)
        redirect("/jobs");

    return (
        <div className="flex flex-col mx-4 py-2">
            <h2 className="text-2xl py-2 font-bold">Provided Channels</h2>
            <ResultTable item={job} />
            <h2 className="text-2xl py-2 font-bold">Generated Channels</h2>
            <ResultTable item={jobResults} />
        </div>
    )
}

export default ResultPage;