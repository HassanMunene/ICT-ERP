'use client' // Ensures this component is rendered on the client side (Next.js directive).

import { z } from "zod"; // Zod is used to define validation rules for the form.
import { zodResolver } from "@hookform/resolvers/zod"; // Integrates Zod with React Hook Form for validation.
import { useForm } from "react-hook-form"; // React Hook Form manages form state and validation.
import { useState } from "react";
import axios from "axios";


import { useCreateStoreModal } from "@/hooks/useCreateStoreModal"; // Custom hook to manage modal open/close state.
import BaseModal from "./BaseModal"; // The reusable modal component to display the form.
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"; // Components for building accessible forms with React Hook Form.
import { Input } from "@/components/ui/input"; // Input component for form fields.
import { Button } from "../ui/button"; // Button component.
import toast from "react-hot-toast";


// Define form validation schema using Zod
// Ensures the "name" field has at least 2 characters with a custom error message.
const formSchema = z.object({
    name: z.string().min(2, { message: "Store name must be at least 2 letters" })
});

const CreateStoreModal = () => {
    // Access the modal state (open/close) using the custom Zustand hook.
    const createStoreModal = useCreateStoreModal();
    const [isLoading, setIsLoading] = useState(false);

    // Initialize the form using React Hook Form with Zod validation.
    const form = useForm({
        resolver: zodResolver(formSchema), // Connects Zod schema to the form.
        defaultValues: {
            name: "", // Default value for the "name" input field.
        },
    });

    // Handler for form submission
    // This function is called when the form is successfully submitted.
    const onSubmit = async (values) => {
        try {
            setIsLoading(true);
            const response = await axios.post('/api/stores', values);
            window.location.assign(`/${response.data.id}`);
            console.log(response.data);
        } catch (error) {
            toast.error('something went wrong!');
            console.log("[STORE AXIOS POST SECTION]", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // Render the modal with a title and description.
        <BaseModal
            title="Create store"
            description="Add a new store to manage products and categories"
            isOpen={createStoreModal.isOpen} // Modal visibility controlled by Zustand state.
            onClose={createStoreModal.onClose} // Close modal handler.
        >
            <div>
                <div className="py-2 space-y-4 pb-4">
                    {/* React Hook Form wrapper to manage form state and handle submission */}
                    <Form {...form}>
                        {/* The actual form element. When submitted, it calls the onSubmit handler. */}
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            {/* FormField connects the "name" field to the form state and validation */}
                            <FormField
                                control={form.control} // Connect form control.
                                name="name" // Name of the field being handled.
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel> {/* Label for the input field */}
                                        <FormControl>
                                            {/* Input field connected to the form using {...field} */}
                                            <Input 
                                                disabled={isLoading}
                                                placeholder="E-commerce" 
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormMessage /> {/* Displays validation error message */}
                                    </FormItem>
                                )}
                            />
                            {/* Buttons for submitting or canceling the form */}
                            <div className="flex items-center justify-end pt-6 space-x-2">
                                <Button 
                                    disabled={isLoading}
                                    variant="outline" 
                                    onClick={createStoreModal.onClose}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isLoading}>
                                    Continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </BaseModal>
    );
};

export default CreateStoreModal;