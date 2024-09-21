'use client'; // This ensures the component is rendered on the client side in Next.js

import Heading from "@/components/common/Heading"; // Importing a common Heading component, likely for titles and descriptions
import { Button } from "@/components/ui/button"; // Importing a Button component from your UI library
import { Separator } from "@/components/ui/separator"; // Importing a Separator component to visually separate sections
import { Plus } from "lucide-react"; // Importing the Plus icon from the lucide-react icon library
import { useParams, useRouter } from "next/navigation"; // Importing hooks to access router and URL parameters in Next.js

const BillboardClient = () => {
    const router = useRouter(); // Getting the router object to navigate programmatically
    const params = useParams(); // Getting the URL parameters, such as storeId

    return (
        <>
            {/* Container for the header with title and "Add New" button */}
            <div className="flex items-center justify-between">
                {/* Heading for the billboards page, showing total count (currently 0) */}
                <Heading 
                    title="Billboard (0)"
                    description="Manage billboards for your store"
                />
                {/* Button to add a new billboard, redirects to a new billboard creation page */}
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    {/* Icon inside the button with some spacing */}
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            {/* Separator for a visual break between sections */}
            <Separator />
        </>
    );
}

export default BillboardClient; // Export the BillboardClient component as the default export