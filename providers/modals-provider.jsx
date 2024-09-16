'use client' // This ensures that the component is client-side only in Next.js.

import { useEffect, useState } from "react";
import CreateStoreModal from "@/components/modals/CreateStoreModal"; // Importing the CreateStoreModal component.

export const ModalsProvider = () => {
    // State to track if the component is mounted on the client.
    const [isMounted, setIsMounted] = useState(false);

    // useEffect hook to set the "isMounted" state to true after the component has mounted.
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // If the component is not mounted, return null to prevent rendering during SSR.
    if (!isMounted) {
        return null;
    }

    // Render the modal once the component is mounted on the client.
    return (
        <>
            <CreateStoreModal />
        </>
    );
};