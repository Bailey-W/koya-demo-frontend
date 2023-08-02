import CreateNicheButton from "@/components/create-niche";
import { NicheTable } from "@/components/niche-table";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default async function Niches() {
    const { userId } = auth();

    if(!userId) {
        redirect("/sign-in");
    }

    const niches = await prismadb.niche.findMany({
        where: {
            userId
        },
    });

    return (
        <div className="flex flex-col mx-4 py-2">
            <NicheTable items={niches} />
            <div className="py-6">
                <CreateNicheButton />
            </div>
        </div>
    )
}