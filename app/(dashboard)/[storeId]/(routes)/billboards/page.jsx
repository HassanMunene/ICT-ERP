import prismaClient from "@/lib/prismadb"; // Import Prisma client for interacting with the database
import BillboardClient from "./components/BillboardClient"; // Importing the BillboardClient component for client-side display
import { format } from "date-fns"; // Importing format function to format dates

/**
 * BillboardsPage is a server-side component that fetches and renders billboard data
 * for a specific store. 
 * It queries the billboards from the database, formats the
 * data, and passes it to the BillboardClient component for rendering.
 */

const BillboardsPage = async ({ params }) => {
    // Fetch all billboards related to the given storeId from the database
    const billboards = await prismaClient.billboard.findMany({
        where: {
            storeId: params.storeId, // Filter by storeId from the URL params
        },
        orderBy: {
            createdAt: 'desc', // Order billboards by the creation date (most recent first)
        }
    });

    // Format the fetched billboard data for display (e.g., formatting the date)
    const formattedBillboards = billboards.map((billboard) => ({
        id: billboard.id, // Billboard ID
        label: billboard.label, // Billboard label
        createdAt: format(billboard.createdAt, "MMMM do, yyyy"), // Format creation date to 'Month Day, Year'
    }));

    return (
        // Main container with flexbox for layout
        <div className="flex flex-col">
            {/* Inner container with padding and spacing, flex-1 makes it grow to fill available space */}
            <div className="flex-1 space-y-4 p-8 pt-6">
                {/* Pass the formatted billboard data to the BillboardClient component for client-side rendering */}
                <BillboardClient data={formattedBillboards} />
            </div>
        </div>
    );
}

export default BillboardsPage; // Export the BillboardsPage component as the default export