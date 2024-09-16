// AuthLayout is a layout component that wraps all pages under the (auth) route group.
// It provides a consistent layout for authentication-related pages like sign-in and sign-up.
export default function AuthLayout({ children }) {
    
    return (
        // A div that centers its content both vertically and horizontally using Tailwind CSS utilities.
        // "h-full" ensures the div takes up the full height of the viewport.
        <div className="flex items-center justify-center h-full">
            {/* The "children" prop represents the specific content of the current page (e.g., sign-in or sign-up page). */}
            {children}
        </div>
    );
}
