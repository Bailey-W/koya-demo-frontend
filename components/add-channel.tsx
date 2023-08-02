"use client";

import { Button } from "@/components/ui/button"
import { useAddChannelModal } from "@/hooks/use-add-channel-modal";
import { useNicheModal } from "@/hooks/use-niche-modal";
import { Plus } from "lucide-react"

interface AddChannelButtonProps {
    className?: string
}

export default function AddChannelButton({ className }: AddChannelButtonProps ) {
    const isOpen = useAddChannelModal((state) => state.isOpen);
    const onOpen = useAddChannelModal((state) => state.onOpen);

    const onClick = () => {
        if(!isOpen)
            onOpen();
    }

    return (
        <Button variant="outline" size="default" onClick={onClick}><Plus/> <p>Add Channel</p></Button>
    )
}