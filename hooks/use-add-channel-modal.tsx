import { create } from "zustand";

interface useAddChannelModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useAddChannelModal = create<useAddChannelModalStore>((set) => ({
    isOpen: false,
    onOpen: () => {
        set({isOpen: true})
        console.log("opening!");
    },
    onClose: () => set({isOpen: false})
}));