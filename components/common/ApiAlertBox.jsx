'use client';

import toast from "react-hot-toast"; // Importing toast for success messages
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"; // Custom Alert UI components
import { Copy, Server } from "lucide-react"; // Icons from lucide-react
import { Button } from "../ui/button"; // Custom button component
import { Badge } from "../ui/badge"; // Custom badge component

/**
 * Authorization map and button variant map for managing dynamic display of the badge
 * and button styles based on the `variant` prop.
 */
const authorizationMap = {
    public: "Public", // "Public" variant text
    admin: "Admin",   // "Admin" variant text
}

const buttonVariantMap = {
    public: "secondary",   // Button style variant for public
    admin: "destructive",  // Button style variant for admin
}

/**
 * ApiAlertBox component
 * 
 * This component renders an alert box to display API-related information (e.g., API route). 
 * It includes a title, description (API route), a copy button, and a dynamic badge indicating 
 * the authorization level (public/admin).
 * 
 * Props:
 * - `title`: Title of the alert (string)
 * - `description`: Description or API route to be displayed (string)
 * - `variant`: Determines the authorization level and button style (either 'public' or 'admin')
 * 
 * Functionality:
 * - Copy to clipboard: Clicking the copy button copies the API route (description) to the clipboard
 *   and shows a toast notification.
 */
const ApiAlertBox = ({ title, description, variant = "public" }) => {
    // Function to copy the API route (description) to the clipboard
    const onCopyApiRoute = (description) => {
        navigator.clipboard.writeText(description); // Copies the API route
        toast.success("API route copied to the clipboard."); // Shows a success toast message
    }

    return (
        <Alert>
            {/* Icon to indicate that the alert is related to the server or API */}
            <Server className="h-4 w-4"/>

            {/* Alert Title with dynamic Badge */}
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={buttonVariantMap[variant]}>
                    {authorizationMap[variant]} {/* Display public/admin based on variant */}
                </Badge>
            </AlertTitle>

            {/* Alert Description with API route and Copy button */}
            <AlertDescription className="mt-4 flex items-center justify-between">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    {description} {/* API route displayed in a styled code block */}
                </code>
                <Button 
                        variant="outline"
                        size="icon"
                        onClick={() => onCopyApiRoute(description)} // Copy the API route when button is clicked
                    >
                        <Copy className="h-4 w-4"/> {/* Copy Icon */}
                </Button>
            </AlertDescription>
        </Alert>
    )
}

export default ApiAlertBox;