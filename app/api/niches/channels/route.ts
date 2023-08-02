import prismadb from "@/lib/prismadb";
import getChannel from "@/scraper/scraper";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST (req: Request) {
    try {
        const { userId } = auth();
        const { link, nicheId } = await req.json();

        if(!userId)
            return new NextResponse("Unauthorized", {status: 401});
        
        if(!link)
        return new NextResponse("Missing data", {status: 400});

        if(!nicheId) {
            return new NextResponse("Niche id is required", {status: 400});
        }

        const scraper_results = await getChannel({channelLink: link});

        const name = scraper_results.name || "null";
        const videos = scraper_results.videos || "null";
        const subscribers = scraper_results.subs || "null";

        const channel = await prismadb.channel.create({
            data: {
                link,
                name,
                number_of_videos: Number(videos),
                subscribers,
                nicheId
            }
        });

        console.log(channel);

        return NextResponse.json(channel)
        
    }catch (error) {
        console.log("Failed to add channel: ", error);
        return new NextResponse("Error", {status: 500});
    }
}