import { useState, useCallback, useEffect } from "react";

// Hook for managing sidebar state 
export function useSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleCollapse = useCallback(() => {
        setIsCollapsed(prev => !prev);
        // Save to localStorage
        localStorage.setItem('sidebarCollapsed', JSON.stringify(!isCollapsed));

    }, []);

    const toggleMobile = useCallback(() => {
        setIsMobileOpen(prev => !prev);
    }, []);

    // Load saved state from localStorage
    useEffect(() => {
        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState) {
            setIsCollapsed(JSON.parse(savedState));
        }
    }, []);

    // Close mobile sidebar when window is resized to desktop size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        isCollapsed,
        isMobileOpen,
        toggleCollapse,
        toggleMobile
    };
}