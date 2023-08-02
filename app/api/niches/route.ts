import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST (req: Request) {
    try {
        const { userId } = auth();
        const { name } = await req.json();

        if(!userId)
            return new NextResponse("Unauthorized", {status: 401});
        
        if(!name)
        return new NextResponse("Missing data", {status: 400});

        const niche = await prismadb.niche.create({
            data: {
                name,
                userId
            }
        });

        return NextResponse.json(niche)
        
    }catch (error) {
        console.log("Failed to create new niche: ", error);
        return new NextResponse("Error", {status: 500});
    }
}