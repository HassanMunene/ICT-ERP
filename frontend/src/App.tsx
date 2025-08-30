import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import './App.css'
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import MainDashboard from './pages/MainDashboard';
import { ThemeProvider } from "./lib/theme-provider";
import { useSidebar } from "./components/hooks/useSidebar";
import { Plus, Download, Users, Settings, FileText, Building } from "lucide-react";
import { cn } from "./lib/utils";

// Mock pages for demonstration
const HRPage = () => <div className="p-6">Human Resources Dashboard</div>;
const ProjectsPage = () => <div className="p-6">Projects Dashboard</div>;
const CRMPage = () => <div className="p-6">CRM Dashboard</div>;
const FinancePage = () => <div className="p-6">Finance Dashboard</div>;
const AdminPage = () => <div className="p-6">Admin Dashboard</div>;

// Error Boundary Component (simplified)
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

// Loading Component
const AppLoading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

function App() {
  const { isCollapsed, isMobileOpen, toggleCollapse, toggleMobile } = useSidebar();

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

  return (
    <ErrorBoundary>
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
                <Routes>
                  <Route path="/" element={<MainDashboard />} />
                  <Route path="/hr/*" element={<HRPage />} />
                  <Route path="/projects/*" element={<ProjectsPage />} />
                  <Route path="/crm/*" element={<CRMPage />} />
                  <Route path="/finance/*" element={<FinancePage />} />
                  <Route path="/admin/*" element={<AdminPage />} />

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
              </main>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;