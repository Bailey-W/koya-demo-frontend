import { create } from "zustand";

interface useJobModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useJobModal = create<useJobModalStore>((set) => ({
    isOpen: false,
    onOpen: () => {
        set({isOpen: true})
    },
    onClose: () => set({isOpen: false})
}));