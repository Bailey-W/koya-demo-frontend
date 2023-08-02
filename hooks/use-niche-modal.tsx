import { create } from "zustand";

interface useNicheModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useNicheModal = create<useNicheModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}));