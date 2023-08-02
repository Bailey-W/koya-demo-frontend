"use client";

import { Button } from "@/components/ui/button"
import { useNicheModal } from "@/hooks/use-niche-modal";
import { Plus } from "lucide-react"

interface CreateNicheButtonProps {
    className?: string
}

export default function CreateNicheButton({ className }: CreateNicheButtonProps ) {
    const isOpen = useNicheModal((state) => state.isOpen);
    const onOpen = useNicheModal((state) => state.onOpen);

    const onClick = () => {
        if(!isOpen)
            onOpen();
    }

    return (
        <Button variant="outline" size="default" onClick={onClick}><Plus/> <p>New Niche</p></Button>
    )
}