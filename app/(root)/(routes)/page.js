'use client';

import { useCreateStoreModal } from "@/hooks/useCreateStoreModal";
import { useEffect } from "react";

/**
 * Home: Component for the Home page
 *
 * This component uses the `useCreateStoreModal` hook to manage the visibility
 * of the create store modal. It ensures that the modal is always open unless
 * the user has already created a store.
 *
 * @returns {JSX.Element} The Home page content
 */
export default function Home() {
  const isOpen = useCreateStoreModal((state) => state.isOpen);
  const onOpen = useCreateStoreModal((state) => state.onOpen);

  // Ensure the modal is always open if the user hasn't created a store
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}