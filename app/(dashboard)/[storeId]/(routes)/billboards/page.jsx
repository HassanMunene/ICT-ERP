import BillboardClient from "./components/BillboardClient"; // Importing the BillboardClient component

// BillboardsPage component that renders the billboard management page
const BillboardsPage = () => {
    return (
        // Main container with flexbox for layout
        <div className="flex flex-col">
            {/* Inner container with padding and spacing, flex-1 makes it grow to fill available space */}
            <div className="flex-1 space-y-4 p-8 pt-6">
                {/* Renders the BillboardClient component, which handles the client-side billboard functionality */}
                <BillboardClient />
            </div>
        </div>
    );
}

export default BillboardsPage; // Export the BillboardsPage component as the default export