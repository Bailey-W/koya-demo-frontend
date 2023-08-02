"use client"

import { useEffect, useState } from "react";

import { NicheModal } from "@/components/modals/niche-modal";
import { AddChannelModal } from "@/components/modals/add-channel-modal";
import { JobModal } from "@/components/modals/job-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return null;
    }

    return (
        <>
            <NicheModal />
            <AddChannelModal />
            <JobModal />
        </>
    )
}