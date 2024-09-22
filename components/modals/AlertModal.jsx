'use client';

import { useState, useEffect } from "react";
import BaseModal from "./BaseModal";
import { Button } from "@/components/ui/button";

/**
 * Alert Modal Component
 *
 * Displays a confirmation dialog before allowing the user to perform a potentially destructive action.
 *
 * Props:
 * - isOpen: Whether the modal is currently open (boolean).
 * - onClose: Callback function to close the modal.
 * - onConfirm: Callback function to execute when the user confirms the action.
 * - isLoading: Indicates whether a loading operation is in progress (boolean).
 */
const AlertModal = ({isOpen, onClose, onConfirm, isLoading, description="Delete store"}) => {
    /** Tracks whether the component has mounted to prevent premature rendering.*/
    const [isMounted, setIsMounted] = useState(false);

    /** Sets the isMounted state to true when the component mounts, ensuring the modal content is only rendered after initialization.*/
    useEffect(() => {
        setIsMounted(true);
    }, []);

    /** Prevents rendering the modal content before the component is mounted.*/
    if(!isMounted) {
        return null;
    }

    return (
        <BaseModal
            title="Are you sure?"
            description="This action cannot be undone!"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-6 flex items-center justify-end w-full">
                <Button
                    disabled={isLoading}
                    variant="outline"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    disabled={isLoading}
                    variant="destructive"
                    onClick={onConfirm}
                >
                    {description}
                </Button>
            </div>
        </BaseModal>
    )
};

export default AlertModal;