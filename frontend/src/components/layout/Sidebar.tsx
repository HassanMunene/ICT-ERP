import React, { useState, useMemo, memo, useCallback, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
    LayoutDashboard, Users, Briefcase, DollarSign, FileText, Target,
    FolderOpen, Shield, Building2, Calendar, Clock, ChevronDown, ChevronUp,
    Settings, LogOut, User, Search, X, ChevronRight
} from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

// Types
interface SidebarItem {
    id: string;
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    children?: SidebarItem[];
    permissions?: string[];
    isSectionHeader?: boolean;
}

interface SidebarProps {
    className?: string;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
    userPermissions?: string[];
    isMobileOpen?: boolean;
    onMobileToggle?: () => void;
}

interface SidebarItemProps {
    item: SidebarItem;
    isActive: boolean;
    isExpanded: boolean;
    hasActiveChild: boolean;
    onItemClick: (item: SidebarItem) => void;
    onToggleExpand: (itemId: string) => void;
    onTemporaryExpand: (shouldExpand: boolean) => void;
    userPermissions?: string[];
    depth?: number;
    isCollapsed?: boolean;
    isTemporarilyExpanded?: boolean;
}

// Memoized sidebar item component
const SidebarItemComponent = memo(({
    item,
    isActive,
    isExpanded,
    hasActiveChild,
    onItemClick,
    onToggleExpand,
    onTemporaryExpand,
    userPermissions = [],
    depth = 0,
    isCollapsed = false,
    isTemporarilyExpanded = false
}: SidebarItemProps) => {
    const location = useLocation();
    const hasChildren = item.children && item.children.length > 0;
    const canAccess = !item.permissions || item.permissions.some(p => userPermissions.includes(p));

    // Skip rendering if user doesn't have permission
    if (!canAccess) return null;

    // Handle section headers differently
    if (item.isSectionHeader) {
        if (isCollapsed && !isTemporarilyExpanded) return null;
        return (
            <div className={cn(
                "px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                depth > 0 && "mt-4"
            )}>
                {item.title}
            </div>
        );
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (hasChildren) {
            if (isCollapsed && !isTemporarilyExpanded) {
                // if is collapsed and has children, request temporary expansion
                onTemporaryExpand(true);
                // small delay to allow expansion animation before showing children
                setTimeout(() => onToggleExpand(item.id), 50);
            } else {
                onToggleExpand(item.id);
            }
        } else {
            onItemClick(item);
            // collapse temporary expansion after selection
            if (isTemporarilyExpanded) {
                onTemporaryExpand(false);
            }
        }
    };

    // Create the link element first
    const linkElement = (
        <Link
            to={item.href}
            onClick={handleClick}
            className={cn(
                'flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                'hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                isActive || hasActiveChild
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground',
                depth > 0 && 'ml-2 py-1.5 text-xs',
                (isCollapsed && !isTemporarilyExpanded) && 'justify-center px-2'
            )}
            aria-current={isActive ? 'page' : undefined}
        >
            <div className={cn("flex items-center space-x-3 overflow-hidden", (isCollapsed && !isTemporarilyExpanded) && "space-x-0")}>
                <item.icon className={cn("h-4 w-4 flex-shrink-0", depth > 0 && "h-3.5 w-3.5")} />
                {(!isCollapsed || isTemporarilyExpanded) && <span className="truncate">{item.title}</span>}
            </div>

            {(!isCollapsed || isTemporarilyExpanded) && (
                <div className="flex items-center space-x-1">
                    {item.badge !== undefined && item.badge !== '' && (
                        <Badge
                            variant={isActive ? "default" : "secondary"}
                            className="h-5 min-w-[20px] text-xs flex items-center justify-center"
                        >
                            {item.badge}
                        </Badge>
                    )}

                    {hasChildren && (
                        <div className="ml-1">
                            {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </div>
                    )}
                </div>
            )}
        </Link>
    );

    // Wrap with tooltip only when collapsed
    if (isCollapsed && !isTemporarilyExpanded) {
        return (
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    {linkElement}
                </TooltipTrigger>
                <TooltipContent side="right" align="center" className="flex items-center gap-1">
                    {item.title}
                    {item.badge && (
                        <Badge variant="secondary" className="h-4 px-1 text-xs">
                            {item.badge}
                        </Badge>
                    )}
                    {hasChildren && <ChevronRight className='h-3 w-3 ml-1' />}
                </TooltipContent>
            </Tooltip>
        );
    }

    return (
        <div>
            {linkElement}

            {hasChildren && isExpanded && (!isCollapsed || isTemporarilyExpanded) && (
                <div className={cn("mt-1 space-y-1", depth > 0 ? 'ml-4' : 'ml-6 border-l pl-4')}>
                    {item.children!.map((child) => (
                        <SidebarItemComponent
                            key={child.id}
                            item={child}
                            isActive={location.pathname === child.href}
                            hasActiveChild={false}
                            isExpanded={false}
                            onItemClick={onItemClick}
                            onToggleExpand={onToggleExpand}
                            onTemporaryExpand={onTemporaryExpand}
                            userPermissions={userPermissions}
                            depth={depth + 1}
                            isCollapsed={isCollapsed}
                            isTemporarilyExpanded={isTemporarilyExpanded}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

SidebarItemComponent.displayName = 'SidebarItemComponent';

// Main sidebar component
export function Sidebar({
    className,
    isCollapsed,
    userPermissions = [],
    isMobileOpen = false,
    onMobileToggle
}: SidebarProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    const [searchTerm, setSearchTerm] = useState('');
    const [isTemporarilyExpanded, setIsTemporarilyExpanded] = useState(false);

    // Generate sidebar items with unique IDs
    const sidebarItems: SidebarItem[] = useMemo(() => [
        {
            id: 'dashboard',
            title: 'Dashboard',
            href: '/',
            icon: LayoutDashboard,
        },
        {
            id: 'section-hr',
            title: 'Human Resources',
            isSectionHeader: true,
            href: '#',
            icon: Users,
        },
        {
            id: 'hr',
            title: 'Human Resources',
            href: '/hr',
            icon: Users,
            badge: 12,
            children: [
                { id: 'employees', title: 'Employees', href: '/hr/employees', icon: Users },
                { id: 'leave-requests', title: 'Leave Requests', href: '/hr/leave', icon: Calendar, badge: 5 },
                { id: 'timesheets', title: 'Timesheets', href: '/hr/timesheets', icon: Clock },
                { id: 'performance', title: 'Performance', href: '/hr/performance', icon: Target },
            ],
        },
        {
            id: 'section-projects',
            title: 'Projects',
            isSectionHeader: true,
            href: '#',
            icon: Briefcase,
        },
        {
            id: 'projects',
            title: 'Projects',
            href: '/projects',
            icon: Briefcase,
            badge: 8,
            children: [
                { id: 'all-projects', title: 'All Projects', href: '/projects', icon: Briefcase },
                { id: 'tasks', title: 'Tasks', href: '/projects/tasks', icon: Target, badge: 23 },
                { id: 'time-tracking', title: 'Time Tracking', href: '/projects/time', icon: Clock },
            ],
        },
        {
            id: 'section-crm',
            title: 'CRM',
            isSectionHeader: true,
            href: '#',
            icon: Building2,
        },
        {
            id: 'crm',
            title: 'CRM',
            href: '/crm',
            icon: Building2,
            badge: 5,
            children: [
                { id: 'leads', title: 'Leads', href: '/crm/leads', icon: Target, badge: 12 },
                { id: 'opportunities', title: 'Opportunities', href: '/crm/opportunities', icon: DollarSign },
                { id: 'companies', title: 'Companies', href: '/crm/companies', icon: Building2 },
                { id: 'contacts', title: 'Contacts', href: '/crm/contacts', icon: Users, badge: 124 },
            ],
        },
        {
            id: 'section-finance',
            title: 'Finance',
            isSectionHeader: true,
            href: '#',
            icon: DollarSign,
        },
        {
            id: 'finance',
            title: 'Finance',
            href: '/finance',
            icon: DollarSign,
            badge: 3,
            children: [
                { id: 'invoices', title: 'Invoices', href: '/finance/invoices', icon: FileText, badge: 7 },
                { id: 'expenses', title: 'Expenses', href: '/finance/expenses', icon: DollarSign },
                { id: 'reports', title: 'Reports', href: '/finance/reports', icon: FileText },
            ],
        },
        {
            id: 'commissions',
            title: 'Commissions',
            href: '/commissions',
            icon: Target,
            badge: 2,
            children: [
                { id: 'rules', title: 'Rules', href: '/commissions/rules', icon: Settings },
                { id: 'payouts', title: 'Payouts', href: '/commissions/payouts', icon: DollarSign },
                { id: 'reports', title: 'Reports', href: '/commissions/reports', icon: FileText },
            ],
        },
        {
            id: 'documents',
            title: 'Documents',
            href: '/documents',
            icon: FolderOpen,
            badge: 'NEW',
        },
        {
            id: 'section-admin',
            title: 'Administration',
            isSectionHeader: true,
            href: '#',
            icon: Shield,
            permissions: ['admin', 'super_admin'],
        },
        {
            id: 'admin',
            title: 'Admin',
            href: '/admin',
            icon: Shield,
            permissions: ['admin', 'super_admin'],
            children: [
                { id: 'users-roles', title: 'Users & Roles', href: '/admin/users', icon: Users, permissions: ['super_admin'] },
                { id: 'system-settings', title: 'System Settings', href: '/admin/settings', icon: Settings },
                { id: 'audit-logs', title: 'Audit Logs', href: '/admin/audit', icon: FileText },
            ],
        },
    ], []);

    // Filter items based on search term
    const filteredItems = useMemo(() => {
        if (!searchTerm || (isCollapsed && !isTemporarilyExpanded)) return sidebarItems;

        const searchLower = searchTerm.toLowerCase();
        return sidebarItems.filter(item => {
            // Section headers are always shown if they have matching children
            if (item.isSectionHeader) {
                const hasMatchingChildren = item.children?.some(child =>
                    child.title.toLowerCase().includes(searchLower)
                );
                return hasMatchingChildren;
            }

            const matches = item.title.toLowerCase().includes(searchLower) ||
                item.children?.some(child => child.title.toLowerCase().includes(searchLower));

            return matches;
        });
    }, [sidebarItems, searchTerm, isCollapsed]);

    // Check if an item has an active child
    const hasActiveChild = useCallback((item: SidebarItem): boolean => {
        if (item.children) {
            return item.children.some(child =>
                location.pathname === child.href || hasActiveChild(child)
            );
        }
        return false;
    }, [location.pathname]);

    // Handle item click
    const handleItemClick = useCallback((item: SidebarItem) => {
        navigate(item.href);
        // Auto-collapse sidebar on mobile after selection
        if (window.innerWidth < 768 && onMobileToggle) {
            onMobileToggle();
        }
        // Collapse temporary expansion after selection
        if (isTemporarilyExpanded) {
            setIsTemporarilyExpanded(false);
        }
    }, [navigate, onMobileToggle, isTemporarilyExpanded]);

    // Toggle expanded state for items with children
    const handleToggleExpand = useCallback((itemId: string) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    }, []);

    // Handle temporary expansion
    const handleTemporaryExpand = useCallback((shouldExpand: boolean) => {
        setIsTemporarilyExpanded(shouldExpand);
    }, []);



    // Auto-expand parent when child is active
    useEffect(() => {
        if (isCollapsed && !isTemporarilyExpanded) return; // Don't auto-expand when collapsed

        const findParentWithActiveChild = (items: SidebarItem[]): string | null => {
            for (const item of items) {
                if (item.children && item.children.some(child =>
                    location.pathname === child.href || hasActiveChild(child)
                )) {
                    return item.id;
                }

                if (item.children) {
                    const parentId = findParentWithActiveChild(item.children);
                    if (parentId) return parentId;
                }
            }
            return null;
        };

        const parentId = findParentWithActiveChild(sidebarItems);
        if (parentId) {
            setExpandedItems(prev => new Set(prev).add(parentId));
        }
    }, [location.pathname, sidebarItems, hasActiveChild, isCollapsed, isTemporarilyExpanded]);

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const sidebar = document.querySelector('[data-sidebar]');
            const trigger = document.querySelector('[data-sidebar-trigger]');

            if (isMobileOpen &&
                sidebar &&
                !sidebar.contains(event.target as Node) &&
                trigger &&
                !trigger.contains(event.target as Node)) {
                onMobileToggle?.();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileOpen, onMobileToggle]);

    // Prevent body scroll when mobile sidebar is open
    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileOpen]);

    // Auto-collapse temporary expansion after delay
    useEffect(() => {
        if (isTemporarilyExpanded) {
            const timer = setTimeout(() => {
                setIsTemporarilyExpanded(false);
            }, 5000); // Collapse after 5 seconds of inactivity

            return () => clearTimeout(timer);
        }
    }, [isTemporarilyExpanded]);

    // Reset temporary expansion when mouse leaves sidebar
    const handleMouseLeave = () => {
        if (isTemporarilyExpanded) {
            setIsTemporarilyExpanded(false);
        }
    };

    return (
        <>
            {/* Mobile overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
                    onClick={onMobileToggle}
                />
            )}

            <aside
                data-sidebar
                className={cn(
                    'fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r bg-background transition-all duration-300 ease-in-out',
                    'md:relative',
                    // Use temporary expanded width if temporarily expanded
                    isTemporarilyExpanded ? 'w-64' : isCollapsed ? 'w-16' : 'w-64',
                    isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
                    className
                )}
                onMouseLeave={handleMouseLeave}
            >
                {/* Header with logo and collapse button */}
                <div className={cn(
                    "flex h-16 items-center border-b px-4",
                    (isCollapsed && !isTemporarilyExpanded) ? "justify-center" : "justify-between"
                )}>
                    {(!isCollapsed || isTemporarilyExpanded) ? (
                        <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                                <span className="text-white font-bold text-sm">S</span>
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold">ServiceERP</h1>
                                <p className="text-xs text-muted-foreground">Multi-Service Firm</p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-white font-bold text-sm">S</span>
                        </div>
                    )}

                    <button
                        onClick={onMobileToggle}
                        className="rounded-md p-1.5 hover:bg-accent md:hidden"
                        aria-label="Close sidebar"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Search bar - hidden when collapsed */}
                {(!isCollapsed || isTemporarilyExpanded) && (
                    <div className="border-b p-4">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search navigation..."
                                className="w-full rounded-lg border pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {/* Navigation items */}
                <nav className="flex-1 overflow-y-auto overflow-x-hidden p-4">
                    <div className="space-y-1">
                        {filteredItems.map((item) => (
                            <SidebarItemComponent
                                key={item.id}
                                item={item}
                                isActive={location.pathname === item.href}
                                hasActiveChild={hasActiveChild(item)}
                                isExpanded={expandedItems.has(item.id)}
                                onItemClick={handleItemClick}
                                onToggleExpand={handleToggleExpand}
                                onTemporaryExpand={handleTemporaryExpand}
                                userPermissions={userPermissions}
                                isCollapsed={isCollapsed}
                                isTemporarilyExpanded={isTemporarilyExpanded}
                            />
                        ))}
                    </div>
                </nav>

                {/* User footer */}
                <div className="border-t p-4">
                    <div className={cn(
                        "flex items-center",
                        (isCollapsed && !isTemporarilyExpanded) ? "justify-center" : "justify-between"
                    )}>
                        <div className={cn(
                            "flex items-center",
                            (isCollapsed && !isTemporarilyExpanded) ? "space-x-0" : "space-x-3"
                        )}>
                            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                                <User className="h-4 w-4" />
                            </div>
                            {(!isCollapsed || isTemporarilyExpanded) && (
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-medium truncate">Admin User</p>
                                    <p className="text-xs text-muted-foreground truncate">admin@company.com</p>
                                </div>
                            )}
                        </div>

                        {(!isCollapsed || isTemporarilyExpanded) && (
                            <button
                                className="rounded-md p-1.5 hover:bg-accent"
                                aria-label="Logout"
                            >
                                <LogOut className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}