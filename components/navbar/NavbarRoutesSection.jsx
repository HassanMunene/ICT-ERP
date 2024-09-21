'use client'; 
// This directive indicates that the component is a "client-side" component in a Next.js application.

// Import necessary modules and utilities.
import { cn } from "@/lib/utils"; // Utility function for conditional classnames.
import Link from "next/link"; // Next.js component for client-side navigation.
import { useParams, usePathname } from "next/navigation"; // Hooks to get route parameters and current pathname.

// NavbarRoutesSection component definition.
// It takes `className` as a prop to allow additional styling.
const NavbarRoutesSection = ({ className }) => {
    // Get the current pathname (URL) and store ID from the route parameters.
    const pathname = usePathname(); // Retrieves the current path of the page.
    const params = useParams(); // Gets route parameters, such as `storeId`.

    // Define an array of route objects representing the navigation links.
    const routes = [
        {
            href: `/${params.storeId}`, // Dynamic URL for the store's dashboard.
            label: 'Dashboard', // The label shown in the navbar.
            active: pathname === `/${params.storeId}`, // Set `active` if the current path matches this route.
        },
        {
            href: `/${params.storeId}/billboards`, // Dynamic URL for the billboards page.
            label: 'Billboards', // The label shown in the navbar.
            active: pathname === `/${params.storeId}/billboards`, // Set `active` if the current path matches this route.
        },
        {
            href: `/${params.storeId}/settings`, // Dynamic URL for the settings page.
            label: 'Settings', // The label shown in the navbar.
            active: pathname === `/${params.storeId}/settings`, // Set `active` if the current path matches this route.
        },
    ];

    // Return the navigation menu with dynamic routes and styles.
    return (
        // `cn` is used to conditionally combine class names for the navigation element.
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
            {/* Loop through each route to render a Link component for navigation. */}
            {routes.map((route) => (
                <Link 
                    key={route.href} // Unique key for each route link.
                    href={route.href} // The URL to navigate to when clicked.
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary", // Base styles for the link.
                        route.active ? 'text-black dark:text-white' : 'text-muted-foreground' // Conditionally add active/inactive styles.
                    )}
                >
                    {route.label} {/* Display the label of the route */}
                </Link>
            ))}
        </nav>
    );
}

// Export the component for use in other parts of the application.
export default NavbarRoutesSection;