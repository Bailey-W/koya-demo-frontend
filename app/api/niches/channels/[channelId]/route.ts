import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE (_req: Request, { params }: {params: {channelId: string}}) {
    try {
        const {userId} = auth();

        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401});
        }
        
        if(!params.channelId) {
            return new NextResponse("Niche id is required", {status: 400});
        }

        const niche = await prismadb.channel.deleteMany({
            where: {
                id: Number(params.channelId)
            }
        });

        return NextResponse.json(niche);

    } catch (error) {
        console.log("Error when deleting niche");
        return new NextResponse("Internal error", {status: 500});
    }
}