// Import the Prisma client instance from the `prismadb` module
import prismaClient from "@/lib/prismadb";

// Import authentication functionality from Clerk Next.js server library
import { auth } from "@clerk/nextjs/server";

// Import the `redirect` function for navigation from Next.js
import { redirect } from "next/navigation";

// Import the SettingsForm component from the `components` directory
import SettingsForm from "./components/SettingsForm";

/**
 * SettingsPage component for managing a user's store settings.
 *
 * This component fetches the store data based on the URL parameter
 * (`storeId`) and the authenticated user's ID. It then renders the
 * SettingsForm component with the retrieved store data as initial values.
 *
 * @param {object} props - Component props
 * @param {string} props.params.storeId - ID of the store to be edited
 * @returns {JSX.Element} The SettingsPage component
 */
const SettingsPage = async ({ params }) => {
  // Get the authenticated user's ID using Clerk
  const { userId } = auth();

  // Check if the user is authenticated
  if (!userId) {
    // If not authenticated, redirect to sign-in page
    redirect("/sign-in");
  }

  // Fetch the store data from the database
  const store = await prismaClient.store.findFirst({
    where: {
      id: params.storeId, // Match the ID from the URL parameter
      userId: userId, // Ensure only the user's store is accessed
    },
  });

  // Check if the store was found
  if (!store) {
    // If store not found, redirect to the homepage
    redirect("/");
  }

  // Return the JSX for the SettingsPage
  return (
    <div className="flex flex-col">
      {/* Container for the settings form */}
      <div className="p-8 flex-1 space-y-4 pt-6">
        <SettingsForm initialData={store} /> {/* Pass the retrieved store data to the form */}
      </div>
    </div>
  );
};

export default SettingsPage;