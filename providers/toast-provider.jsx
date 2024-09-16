'use client' // Next.js directive to indicate this component is for client-side rendering only.

import { Toaster } from "react-hot-toast"; // Import the Toaster component from react-hot-toast to display notifications.

export const ToasterProvider = () => {
    // The Toaster component is a notification system that displays toast messages to the user.
    // This component acts as a provider that can be used throughout the app to show toast messages.
    // It is added to root layout.js
    return (
        <Toaster />
    );
};