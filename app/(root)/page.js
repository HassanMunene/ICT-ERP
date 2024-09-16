'use client';

import { useCreateStoreModal } from "@/hooks/useCreateStoreModal"
import { useEffect } from "react";

export default function Home() {
  const isOpen = useCreateStoreModal((state) => state.isOpen);
  const onOpen = useCreateStoreModal((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <div>DASHBOARD HELLO!</div>
  )
}
