"use client";

import { Button } from "@/components/ui/button"
import { useJobModal } from "@/hooks/use-job-modal";
import { Plus } from "lucide-react"

interface CreateJobButtonProps {
    className?: string
}

export default function CreateJobButton({ className }: CreateJobButtonProps ) {
    const isOpen = useJobModal((state) => state.isOpen);
    const onOpen = useJobModal((state) => state.onOpen);

    const onClick = () => {
        if(!isOpen)
            onOpen();
    }

    return (
        <Button variant="outline" size="default" onClick={onClick}><Plus/> <p>New Job</p></Button>
    )
}