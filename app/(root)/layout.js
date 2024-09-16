import prismaClient from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/**
 * HomePageLayout: Server component for the Home page
 *
 * This server component retrieves the user ID from Clerk using `auth()`.
 * If the user is not authenticated, it redirects them to the sign-in page.
 *
 * It then fetches the store associated with the logged-in user from the
 * Prisma database. If a store exists, it redirects the user to the dashboard
 * with the store ID. Otherwise, it renders the provided children content
 * (presumably the "create store modal").
 *
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Content to be rendered on the Home page
 * @returns {JSX.Element} The Home page layout with the provided children
 */
export default async function HomePageLayout({ children }) {
  const { userId } = auth();

  // Authentication check: Redirect non-authenticated users
  if (!userId) {
    return redirect('/sign-in');
  }

  // Store data fetching using Prisma
  const store = await prismaClient.store.findFirst({
    where: {
      userId, // Use the retrieved userId for secure data access
    },
  });

  // Redirect to dashboard if store exists for the user
  if (store) {
    return redirect(`/${store.id}`);
  }

  return (
    <>
      {children}
    </>
  );
}