import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST (req: Request) {
    try {
        const { userId } = auth();
        const { niche, channel1, channel2, channel3, channel4, channel5 } = await req.json();

        if(!userId)
            return new NextResponse("Unauthorized", {status: 401});
        
        if(!niche || !channel1 || !channel2 || !channel3 || !channel4 || !channel5)
            return new NextResponse("Missing data", {status: 400});

        const nicheObj = await prismadb.niche.findFirst({
            where: {
                name: niche,
                userId
            }
        })

        if(!nicheObj)
            return new NextResponse("Invalid niche selected", {status: 400});

        const job = await prismadb.job.create({
            data: {
                nicheId: nicheObj.id,
                channel1,
                channel2,
                channel3,
                channel4,
                channel5,
                status: "Queued",
                userId
            }
        });

        return NextResponse.json(job)
        
    }catch (error) {
        console.log("Failed to create new job: ", error);
        return new NextResponse("Error", {status: 500});
    }
}