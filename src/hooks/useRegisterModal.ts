import { create } from "zustand";

interface RegisterModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ onClose: false}),
}));

export default useRegisterModal;