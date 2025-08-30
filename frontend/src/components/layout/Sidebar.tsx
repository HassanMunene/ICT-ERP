'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    DollarSign,
    FileText,
    Target,
    FolderOpen,
    Shield,
    Building2,
    Calendar,
    Clock,
    ChevronDown,
    Settings
} from 'lucide-react';

interface SidebarItem {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
    {
        title: 'Dashboard',
        href: '/',
        icon: LayoutDashboard,
    },
    {
        title: 'Human Resources',
        href: '/hr',
        icon: Users,
        badge: '12',
        children: [
            { title: 'Employees', href: '/hr/employees', icon: Users },
            { title: 'Leave Requests', href: '/hr/leave', icon: Calendar },
            { title: 'Timesheets', href: '/hr/timesheets', icon: Clock },
            { title: 'Performance', href: '/hr/performance', icon: Target },
        ],
    },
    {
        title: 'Projects',
        href: '/projects',
        icon: Briefcase,
        badge: '8',
        children: [
            { title: 'All Projects', href: '/projects', icon: Briefcase },
            { title: 'Tasks', href: '/projects/tasks', icon: Target },
            { title: 'Time Tracking', href: '/projects/time', icon: Clock },
        ],
    },
    {
        title: 'CRM',
        href: '/crm',
        icon: Building2,
        badge: '5',
        children: [
            { title: 'Leads', href: '/crm/leads', icon: Target },
            { title: 'Opportunities', href: '/crm/opportunities', icon: DollarSign },
            { title: 'Companies', href: '/crm/companies', icon: Building2 },
            { title: 'Contacts', href: '/crm/contacts', icon: Users },
        ],
    },
    {
        title: 'Finance',
        href: '/finance',
        icon: DollarSign,
        badge: '3',
        children: [
            { title: 'Invoices', href: '/finance/invoices', icon: FileText },
            { title: 'Expenses', href: '/finance/expenses', icon: DollarSign },
            { title: 'Reports', href: '/finance/reports', icon: FileText },
        ],
    },
    {
        title: 'Commissions',
        href: '/commissions',
        icon: Target,
        badge: '2',
        children: [
            { title: 'Rules', href: '/commissions/rules', icon: Settings },
            { title: 'Payouts', href: '/commissions/payouts', icon: DollarSign },
            { title: 'Reports', href: '/commissions/reports', icon: FileText },
        ],
    },
    {
        title: 'Documents',
        href: '/documents',
        icon: FolderOpen,
    },
    {
        title: 'Admin',
        href: '/admin',
        icon: Shield,
        children: [
            { title: 'Users & Roles', href: '/admin/users', icon: Users },
            { title: 'System Settings', href: '/admin/settings', icon: Settings },
            { title: 'Audit Logs', href: '/admin/audit', icon: FileText },
        ],
    },
];

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();

    return (
        <div className={cn('flex h-full w-64 flex-col bg-white border-r', className)}>
            <div className="flex h-16 items-center border-b px-6">
                <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-lg bg-primary" />
                    <div>
                        <h1 className="text-lg font-semibold">ServiceERP</h1>
                        <p className="text-xs text-muted-foreground">Multi-Service Firm</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 space-y-1 p-4">
                {sidebarItems.map((item) => (
                    <div key={item.href}>
                        <Link
                            href={item.href}
                            className={cn(
                                'flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                                pathname === item.href
                                    ? 'bg-accent text-accent-foreground'
                                    : 'text-muted-foreground'
                            )}
                        >
                            <div className="flex items-center space-x-3">
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                            </div>
                            {item.badge && (
                                <Badge variant="secondary" className="h-5 text-xs">
                                    {item.badge}
                                </Badge>
                            )}
                            {item.children && (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </Link>

                        {item.children && (
                            <div className="ml-6 mt-1 space-y-1 border-l pl-4">
                                {item.children.map((child) => (
                                    <Link
                                        key={child.href}
                                        href={child.href}
                                        className={cn(
                                            'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                                            pathname === child.href
                                                ? 'bg-accent text-accent-foreground'
                                                : 'text-muted-foreground'
                                        )}
                                    >
                                        <child.icon className="h-3 w-3" />
                                        <span>{child.title}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            <div className="border-t p-4">
                <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-accent" />
                    <div className="flex-1">
                        <p className="text-sm font-medium">Admin User</p>
                        <p className="text-xs text-muted-foreground">admin@company.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}