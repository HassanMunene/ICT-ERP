'use client';

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import AlertModal from "@/components/modals/AlertModal";

/**
 * CellAction component
 * 
 * This component provides a dropdown menu with multiple actions (Copy, Edit, Delete) 
 * for managing billboards. Each action interacts with the billboard, such as copying 
 * the billboard ID to the clipboard, editing the billboard, or deleting it.
 *
 * Features:
 * - Copy the billboard ID to the clipboard.
 * - Edit the billboard by navigating to the edit page.
 * - Delete the billboard after confirmation through a modal.
 *
 * Props:
 * - `billboardData`: Object containing the billboard's details like `id`, which is used for the actions.
 */
const CellAction = ({ billboardData }) => {
    const router = useRouter();
    const params = useParams(); // Retrieve route parameters like storeId
    const [isLoading, setIsLoading] = useState(false); // Loading state for deletion
    const [open, setOpen] = useState(false); // Modal open state for deletion confirmation
    
    // Function to copy the billboard ID to the clipboard
    const onCopyBillboardId = (id) => {
        navigator.clipboard.writeText(id); // Copy the id to the clipboard
        toast.success("Billboard id copied."); // Show success toast notification
    };

    // Function to handle billboard deletion
    const onDeleteBillboard = async () => {
        try {
            setIsLoading(true); // Set loading state while deleting
            // Send DELETE request to delete the billboard
            await axios.delete(`/api/stores/${params.storeId}/billboards/${billboardData.id}`);
            router.refresh(); // Refresh the page to reflect deletion
            toast.success("Billboard deleted."); // Show success toast notification
        } catch (error) {
            console.log('[ERROR_DELETING_BILLBOARD]', error); // Log any error
            toast.error('Make sure you have removed all categories using this billboard.'); // Error notification
        } finally {
            setIsLoading(false); // Reset loading state
            setOpen(false); // Close the confirmation modal
        }
    };

    return (
        <>
            {/* AlertModal component for confirming deletion */}
            <AlertModal 
                isOpen={open} // Whether the modal is open
                onClose={() => setOpen(false)} // Close the modal
                onConfirm={onDeleteBillboard} // Confirm deletion action
                isLoading={isLoading} // Loading state for the confirm button
                description="Delete billboard" // Description of the action
            />
            
            {/* Dropdown menu for managing the billboard */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span> {/* Accessible label */}
                        <MoreHorizontal className="h-4 w-4"/> {/* Icon for the dropdown */}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel> {/* Label for the dropdown */}

                    {/* Copy billboard ID action */}
                    <DropdownMenuItem onClick={() => onCopyBillboardId(billboardData.id)}>
                        <Copy className="mr-2 h-4 w-4"/> {/* Icon for the copy action */}
                        Copy billboard id
                    </DropdownMenuItem>

                    {/* Edit billboard action */}
                    <DropdownMenuItem
                        onClick={() => router.push(`/${params.storeId}/billboards/${billboardData.id}`)}
                    >
                        <Edit className="mr-2 h-4 w-4"/> {/* Icon for the edit action */}
                        Edit billboard
                    </DropdownMenuItem>

                    {/* Delete billboard action, opens the confirmation modal */}
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4"/> {/* Icon for the delete action */}
                        Delete billboard
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default CellAction;