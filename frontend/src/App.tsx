import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState, Suspense, lazy } from "react";

import './App.css'
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ThemeProvider } from "./lib/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";
import { useSidebar } from "./components/hooks/useSidebar";
import { Plus, Download, Users } from "lucide-react";
import { PageLoading, ContentSkeleton, AppLoading } from "./components/layout/Loading";
import { cn } from "./lib/utils";

// Lazy load pages for better performance
const MainDashboard = lazy(() => import('./pages/MainDashboard'));
const HRPage = lazy(() => import('./pages/HRPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const CRMPage = lazy(() => import('./pages/CRMPage'));
const FinancePage = lazy(() => import('./pages/FinancePage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <button
              className="px-4 py-2 bg-primary text-primary-foreground rounded"
              onClick={() => window.location.reload()}
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const { isCollapsed, isMobileOpen, toggleCollapse, toggleMobile } = useSidebar();
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [navigationState, setNavigationState] = useState<'idle' | 'navigating'>('idle');

  // Simulate Application Loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Handle navigation events for loading states.
  useEffect(() => {
    const handleStart = () => setNavigationState('navigating');
    const handleComplete = () => setNavigationState('idle');

    // Listen to navigation events (you might need to adapt this based on your routing)
    window.addEventListener('beforeunload', handleStart);
    window.addEventListener('load', handleComplete);

    return () => {
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('load', handleComplete);
    };
  }, [])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + B to toggle sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        toggleCollapse();
      }

      // Escape to close mobile sidebar
      if (e.key === 'Escape' && isMobileOpen) {
        toggleMobile();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen, toggleCollapse, toggleMobile]);

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

  // Sample notifications
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

  // Sample breadcrumbs (would normally come from router)
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard' }
  ];

  if (isAppLoading) {
    return <AppLoading />;
  }

  return (
    <ErrorBoundary>
      <TooltipProvider>
        <Router>
          <ThemeProvider>
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
                  title="Enterprise Dashboard"
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
                  {/* Global navigation loading indicator */}
                  {navigationState === 'navigating' && (
                    <div className="fixed top-16 left-0 right-0 h-1 z-50">
                      <div className="h-full bg-primary animate-pulse"></div>
                    </div>
                  )}
                  <Suspense fallback={<PageLoading />}>
                    <Routes>
                      <Route path="/" element={<MainDashboard />} />
                      <Route path="/hr/*" element={
                        <Suspense fallback={<ContentSkeleton />}>
                          <HRPage />
                        </Suspense>
                      } />
                      <Route path="/projects/*" element={
                        <Suspense fallback={<ContentSkeleton />}>
                          <ProjectsPage />
                        </Suspense>
                      } />
                      <Route path="/crm/*" element={
                        <Suspense fallback={<ContentSkeleton />}>
                          <CRMPage />
                        </Suspense>
                      } />
                      <Route path="/finance/*" element={
                        <Suspense fallback={<ContentSkeleton />}>
                          <FinancePage />
                        </Suspense>
                      } />
                      <Route path="/admin/*" element={
                        <Suspense fallback={<ContentSkeleton />}>
                          <AdminPage />
                        </Suspense>
                      } />

                      {/* 404 Page */}
                      <Route path="*" element={
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <h1 className="text-4xl font-bold mb-4">404</h1>
                            <p className="text-muted-foreground">Page not found</p>
                          </div>
                        </div>
                      } />
                    </Routes>
                  </Suspense>
                </main>
              </div>
            </div>
          </ThemeProvider>
        </Router>
      </TooltipProvider>
    </ErrorBoundary>
  );
}

export default App;