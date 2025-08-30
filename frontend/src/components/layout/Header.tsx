import React, { useState, useMemo, memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, Settings, User, LogOut, Sun, Moon, X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/theme-provider';

type Notification = {
    id: string;
    title: string;
    description: string;
    time: string;
    read: boolean;
    type: 'info' | 'warning' | 'error' | 'success';
};

interface HeaderProps {
    title?: string;
    onMenuToggle?: () => void;
    showMobileMenu?: boolean;
    user?: {
        name: string;
        email: string;
        avatar?: string;
        role: string;
    };
    notifications?: Notification[];
    onSearch?: (query: string) => void;
    className?: string;
}

// Notification item component
const NotificationItem = memo(({ notification, onMarkAsRead }: {
    notification: Notification;
    onMarkAsRead: (id: string) => void;
}) => {
    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'warning':
                return <Bell className="h-4 w-4 text-yellow-500" />;
            case 'error':
                return <Bell className="h-4 w-4 text-red-500" />;
            case 'success':
                return <Bell className="h-4 w-4 text-green-500" />;
            default:
                return <Bell className="h-4 w-4 text-blue-500" />;
        }
    };

    return (
        <div
            className={cn(
                "flex items-start space-x-3 p-3 rounded-lg transition-colors",
                !notification.read && "bg-accent/50",
                "hover:bg-accent cursor-pointer"
            )}
            onClick={() => onMarkAsRead(notification.id)}
        >
            <div className="flex-shrink-0 mt-0.5">
                {getNotificationIcon(notification.type)}
            </div>
            <div className="flex-1 space-y-1 min-w-0">
                <p className="text-sm font-medium leading-none truncate">
                    {notification.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                    {notification.description}
                </p>
                <p className="text-xs text-muted-foreground">
                    {notification.time}
                </p>
            </div>
        </div>
    );
});

NotificationItem.displayName = 'NotificationItem';

// Main header component
export function Header({
    title = 'Dashboard',
    onMenuToggle,
    showMobileMenu = false,
    user = {
        name: 'Admin User',
        email: 'admin@company.com',
        role: 'Administrator'
    },
    notifications = [],
    onSearch,
    className
}: HeaderProps) {
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState(
        notifications.filter(n => !n.read).length
    );

    // Debounced search
    useEffect(() => {
        if (onSearch) {
            const timer = setTimeout(() => {
                onSearch(searchQuery);
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [searchQuery, onSearch]);

    // Filter notifications based on read status
    const { unreadNotificationsList, readNotificationsList } = useMemo(() => {
        const unread = notifications.filter(n => !n.read);
        const read = notifications.filter(n => n.read);
        return { unreadNotificationsList: unread, readNotificationsList: read };
    }, [notifications]);

    // Mark notification as read
    const handleMarkAsRead = useCallback((id: string) => {
        // In a real app, this would call an API
        setUnreadNotifications(prev => Math.max(0, prev - 1));
    }, []);

    // Mark all notifications as read
    const handleMarkAllAsRead = useCallback(() => {
        // In a real app, this would call an API
        setUnreadNotifications(0);
    }, []);

    // Handle theme toggle
    const toggleTheme = useCallback(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }, [theme, setTheme]);

    // Handle user menu actions
    const handleUserAction = useCallback((action: string) => {
        switch (action) {
            case 'profile':
                navigate('/profile');
                break;
            case 'settings':
                navigate('/settings');
                break;
            case 'logout':
                // Handle logout logic
                console.log('Logging out...');
                break;
            default:
                break;
        }
    }, [navigate]);

    return (
        <header className={cn(
            "flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6 sticky top-0 z-30",
            "transition-colors duration-200",
            className
        )}>
            {/* Left section */}
            <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Mobile menu button */}
                {onMenuToggle && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={onMenuToggle}
                        aria-label={showMobileMenu ? "Close menu" : "Open menu"}
                    >
                        {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                )}

                <h1 className="text-xl font-semibold truncate max-w-[140px] sm:max-w-none">
                    {title}
                </h1>
            </div>

            {/* Center section - Search */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-6">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search across the platform..."
                        className="pl-9 pr-4"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                    {searchQuery && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2"
                            onClick={() => setSearchQuery('')}
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    )}
                </div>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-1 sm:space-x-2">
                {/* Mobile search button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => {/* Implement mobile search modal */ }}
                    aria-label="Search"
                >
                    <Search className="h-5 w-5" />
                </Button>

                {/* Theme toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {theme === 'dark' ? (
                        <Sun className="h-5 w-5" />
                    ) : (
                        <Moon className="h-5 w-5" />
                    )}
                </Button>

                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            {unreadNotifications > 0 && (
                                <Badge
                                    variant="destructive"
                                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                                >
                                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                                </Badge>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80 p-0" align="end" forceMount>
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="font-semibold">Notifications</h3>
                            {unreadNotifications > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleMarkAllAsRead}
                                >
                                    Mark all as read
                                </Button>
                            )}
                        </div>

                        <div className="max-h-96 overflow-y-auto">
                            {unreadNotificationsList.length > 0 ? (
                                <>
                                    <div className="p-2">
                                        {unreadNotificationsList.map(notification => (
                                            <NotificationItem
                                                key={notification.id}
                                                notification={notification}
                                                onMarkAsRead={handleMarkAsRead}
                                            />
                                        ))}
                                    </div>
                                    {readNotificationsList.length > 0 && (
                                        <DropdownMenuSeparator />
                                    )}
                                </>
                            ) : (
                                <div className="p-4 text-center text-muted-foreground">
                                    No unread notifications
                                </div>
                            )}

                            {readNotificationsList.length > 0 && (
                                <div className="p-2">
                                    {readNotificationsList.map(notification => (
                                        <NotificationItem
                                            key={notification.id}
                                            notification={notification}
                                            onMarkAsRead={handleMarkAsRead}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {notifications.length > 0 && (
                            <div className="p-2 border-t">
                                <Button variant="ghost" className="w-full" asChild>
                                    <div>View all notifications</div>
                                </Button>
                            </div>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Settings */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate('/settings')}
                    aria-label="Settings"
                >
                    <Settings className="h-5 w-5" />
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                            {user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="h-8 w-8 rounded-full"
                                />
                            ) : (
                                <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                                    <User className="h-4 w-4" />
                                </div>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal p-4">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {user.email}
                                </p>
                                <p className="text-xs leading-none text-muted-foreground capitalize">
                                    {user.role}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleUserAction('profile')}>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUserAction('settings')}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleUserAction('logout')}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}

// Header skeleton loader for better UX
export function HeaderSkeleton() {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-background px-6 sticky top-0 z-30">
            <div className="flex items-center space-x-4">
                <div className="h-7 w-40 bg-muted rounded animate-pulse"></div>
            </div>

            <div className="flex items-center space-x-4">
                <div className="h-9 w-9 rounded-full bg-muted animate-pulse"></div>
                <div className="h-9 w-9 rounded-full bg-muted animate-pulse"></div>
                <div className="h-9 w-9 rounded-full bg-muted animate-pulse"></div>
            </div>
        </header>
    );
}