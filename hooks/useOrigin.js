import { useEffect, useState } from "react"

/**
 * useOrigin hook
 * 
 * This hook retrieves the origin (base URL) of the current web page.
 * 
 * It first ensures the component is mounted (client-side) before accessing
 * `window.location.origin`. This prevents issues with server-side rendering (SSR),
 * where `window` is not available.
 * 
 * Returns:
 * - The origin URL (e.g., 'http://localhost:3000') when the component is mounted.
 * - An empty string if the component is still mounting or rendering server-side.
 */
export const useOrigin = () => {
    const [origin, setOrigin] = useState(''); // Store the origin URL

    useEffect(() => {
        if (typeof window !== "undefined") { // Ensure we're on the client-side
            setOrigin(window.location.origin); // Set the origin URL
        }
    }, []); // Run once after the component mounts

    return origin;
}