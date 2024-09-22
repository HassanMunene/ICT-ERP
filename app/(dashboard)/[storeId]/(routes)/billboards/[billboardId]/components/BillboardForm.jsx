'use client';

import Heading from "@/components/common/Heading";
import ImageUploadComponent from "@/components/common/ImageUploadComponent";
import AlertModal from "@/components/modals/AlertModal";
import { Button } from "@/components/ui/button";
import {
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

/**
 * BillboardForm is a form component used for creating or editing a billboard.
 * 
 * It dynamically handles both creating a new billboard or updating an existing one
 * based on whether `initialData` is provided. 
 * 
 * Key Features:
 * - Handles form validation using Zod and React Hook Form.
 * - Allows uploading and removing billboard images with the `ImageUploadComponent`.
 * - Supports deleting an existing billboard using a modal confirmation (via `AlertModal`).
 * - Changes its title, button labels, and actions based on the presence of initial data (for edit vs. create mode).
 */

// Define form schema using Zod for validation
const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
})

// BillboardForm Component
const BillboardForm = ({ initialData = null }) => {
    const params = useParams(); // Access route parameters
    const router = useRouter(); // Access the router for navigation
    const [open, setOpen] = useState(false); // Modal state for deleting a billboard
    const [isLoading, setIsLoading] = useState(false); // Loading state

    // Set up form handling with React Hook Form and Zod validation
    const form = useForm({
        resolver: zodResolver(formSchema), // Zod schema for validation
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        }
    });

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            setIsLoading(true); // Set loading state to true while processing the request

            // Check if there's initial data (i.e., editing an existing billboard)
            if (initialData) {
                // If editing, send a PATCH request to update the existing billboard
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
            } else {
                // If creating a new billboard, send a POST request to create it
                await axios.post(`/api/${params.storeId}/billboards`, data);
            }

            router.refresh(); // Refresh the page to reflect changes
            router.push(`/${params.storeId}/billboards`);
            toast.success(toastMessage); // Show success notification

        } catch (error) {
            console.log('[ERROR SUBMITTING BILLBOARD FORM DATA]', error); // Log any error that occurs during submission
            toast.error('Something went wrong.'); // Show error notification

        } finally {
            setIsLoading(false); // Always reset the loading state, whether successful or not
        }
    };


    // Handle billboard deletion
    const onDelete = async () => {
        try {
            setIsLoading(true); // Set loading state to true to disable actions while processing
            
            // Send a DELETE request to remove the billboard based on the storeId and billboardId
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
            
            router.refresh(); // Refresh the current page to reflect the changes
            router.push('/'); // Navigate to dashboard homepage after deletion
            toast.success("Billboard deleted"); // Show success notification to the user

        } catch (error) {
            console.log('[ERROR DELETING BILLBOARD]', error); // Log error details in the console

            // Display an error message with instructions if there is a problem
            toast.error('Make sure you remove all categories using this billboard first.');
        } finally {
            setIsLoading(false); // Reset loading state after the request is complete
            setOpen(false); // Close the deletion confirmation modal
        }
    };


    // Dynamic content based on whether initial data exists (edit vs. create)
    const title = initialData ? "Edit billboard" : "Create a new billboard";
    const description = initialData ? "Edit a billboard" : "Add a new billboard";
    const toastMessage = initialData ? "Billboard updated." : "Billboard created.";
    const action = initialData ? "Save changes" : "Create";

    return (
        <>
            {/* Modal for confirming billboard deletion */}
            <AlertModal 
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                isLoading={isLoading}
                description="Delete billboard"
            />
            
            {/* Form Header with Title and Delete Button */}
            <div className="flex items-center justify-between">
                <Heading title={title} description={description}/>
                {initialData && (
                    <Button
                        disabled={isLoading}
                        variant="destructive"
                        size="icon"
                        onClick={() => setOpen(true)} // Open the delete confirmation modal
                    >
                        <Trash className="h-4 w-4"/>
                    </Button>
                )}
            </div>
            <Separator />
            
            {/* Form for creating or editing the billboard */}
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    {/* Image Upload Field */}
                    <FormField 
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Background image</FormLabel>
                                <FormControl>
                                    <ImageUploadComponent 
                                        disabled={isLoading}
                                        onChange={(url) => field.onChange(url)} // Handle image upload
                                        onRemoveImage={() => field.onChange("")} // Handle image removal
                                        value={field.value ? [field.value] : []} // Display current image
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    {/* Label Input Field */}
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Billboard label</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Billboard label"
                                            {...field} // Bind input to form state
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    {/* Submit Button */}
                    <Button
                        disabled={isLoading}
                        className="ml-auto"
                        type="submit"
                    >
                        {action} {/* Display either "Save changes" or "Create" based on context */}
                    </Button>
                </form>
            </Form>
        </>
    );
}

export default BillboardForm;