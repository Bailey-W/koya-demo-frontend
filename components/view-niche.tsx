"use client";

import { Button } from "./ui/button"
import { Eye } from "lucide-react"
import Link from "next/link";

interface ViewButtonProps {
    nicheId: string
};

export const ViewButton: React.FC<ViewButtonProps> = ({ nicheId }: ViewButtonProps)  => {
    return(
        <Link href={`/niches/${nicheId}`} >
            <Button variant="outline" onClick={() => {}} size="icon">
                <Eye />
            </Button>
        </Link>
    )
}