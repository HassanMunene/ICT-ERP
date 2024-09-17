import prismaClient from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import mongoose from "mongoose";

/**
 * DashboardPageLayout: Protected server component for dashboard access
 *
 * This server component retrieves the user ID from Clerk using `auth()`.
 * If the user is not authenticated, it redirects them to the sign-in page.
 *
 * It then fetches the store associated with the provided `storeId` and user ID
 * from the Prisma database. If no store exists, it redirects the user to the
 * home page to encourage store creation.
 *
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Content to be rendered within the layout
 * @param {string} props.params.storeId - ID of the store to be accessed
 * @returns {JSX.Element} The dashboard layout with the provided children
 */
export default async function DashboardPageLayout({ children, params }) {
  const { userId } = auth();

  // Authentication check: Redirect non-authenticated users
  if (!userId) {
    return redirect('/sign-in');
  }

  //validate that storedId provided is correct and follows objectId rules
  if (!isValidObjectId(params.storeId)) {
    return redirect('/');
  }

  // Store data fetching using Prisma
  const store = await prismaClient.store.findFirst({
    where: {
      id: params.storeId,
      userId, // Use the retrieved userId for secure data access
    },
  });

  // Redirect to home page if no store exists for the user
  if (!store) {
    return redirect('/');
  }

  return (
    <>
      <div>This will be navbar here</div>
      {children}
    </>
  );
};

// Helper function to validate ObjectIDs
function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}
