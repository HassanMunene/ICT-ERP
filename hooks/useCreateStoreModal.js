// Importing the "create" function from the Zustand library.
// Zustand is used to manage the modal's state (open/closed) in a simple and efficient way.

import { create } from "zustand";

// Creating a Zustand store for controlling the "Create Store Modal".
export const useCreateStoreModal = create((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false}),
}));