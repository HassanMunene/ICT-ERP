import React from 'react';
import { cn } from '@/lib/utils';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useSidebar } from '../hooks/useSidebar';
import { Plus, Download, Users } from 'lucide-react';

interface DashboardLayoutProps {
    children: React.ReactNode;
    title?: string;
    breadcrumbs?: Array<{ label: string; href?: string }>;
}

export function DashboardLayout({ children, title = 'Dashboard', breadcrumbs }: DashboardLayoutProps) {
    const { isCollapsed, isMobileOpen, toggleCollapse, toggleMobile } = useSidebar();

    const quickActions = [
        {
            label: 'New Project',
            icon: Plus,
            onClick: () => console.log('New project'),
            variant: 'default' as const
        },
        {
            label: 'Export Report',
            icon: Download,
            onClick: () => console.log('Export'),
            variant: 'outline' as const
        },
        {
            label: 'Add User',
            icon: Users,
            onClick: () => console.log('Add user'),
            variant: 'outline' as const
        }
    ];

    const notifications = [
        {
            id: '1',
            title: 'New Project Assignment',
            description: 'You have been assigned to the Phoenix project',
            time: '2 hours ago',
            read: false,
            type: 'info' as const,
            action: {
                label: 'View',
                onClick: () => console.log('View project')
            }
        },
        {
            id: '2',
            title: 'Approval Required',
            description: '3 invoices need your approval',
            time: '5 hours ago',
            read: false,
            type: 'warning' as const
        }
    ];

    return (
        <div className="flex h-screen bg-background">
            <Sidebar
                isCollapsed={isCollapsed}
                onToggleCollapse={toggleCollapse}
                isMobileOpen={isMobileOpen}
                onMobileToggle={toggleMobile}
                userPermissions={['admin']}
            />

            {/* Main content area */}
            <div className={cn("flex-1 flex flex-col overflow-hidden transition-all duration-300")}>
                <Header
                    title={title}
                    onMenuToggle={toggleMobile}
                    showMobileMenu={isMobileOpen}
                    onSidebarToggle={toggleCollapse}
                    sidebarCollapsed={isCollapsed}
                    quickActions={quickActions}
                    notifications={notifications}
                    breadcrumbs={breadcrumbs}
                    user={{
                        name: 'John Doe',
                        email: 'john.doe@company.com',
                        role: 'Project Manager',
                        department: 'Engineering',
                        status: 'online'
                    }}
                />

                <main className="flex-1 overflow-auto p-6 bg-muted/20">
                    {children}
                </main>
            </div>
        </div>
    );
}