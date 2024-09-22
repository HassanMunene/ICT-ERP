import prismaClient from "@/lib/prismadb"; // Import Prisma client for database interaction
import BillboardForm from "./components/BillboardForm";

// Async component that handles the billboard page
const BillboardPage = async ({ params }) => {
    // Check if the 'billboardId' is 'new', which signals creating a new billboard
    if (params.billboardId === 'new') {
        return (
            <div className="flex flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    {/* Render the BillboardForm for creating a new billboard */}
                    <BillboardForm />
                </div>
            </div>
        );
    }

    // Fetch an existing billboard from the database using Prisma based on the 'billboardId' param
    const billboard = await prismaClient.billboard.findUnique({
        where: {
            id: params.billboardId, // Query the database for this specific ID
        },
    });

    // Handle case where no billboard is found for the given ID
    if (!billboard) {
        return (
            <div>No billboard found!</div> // Display a message when no billboard exists
        );
    }

    // If a billboard is found, pass it as 'initialData' to the BillboardForm for editing
    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                {/* Render the form with the fetched billboard's initial data */}
                <BillboardForm initialData={billboard} />
            </div>
        </div>
    );
};

export default BillboardPage;