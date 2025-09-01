import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState, Suspense, lazy } from "react";

import './App.css'
import { ThemeProvider } from "./lib/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";
import { PageLoading, ContentSkeleton, AppLoading } from "./components/layout/Loading";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { MinimalLayout } from "./components/layout/MinimalLayout";

// Lazy load pages for better performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const MainDashboard = lazy(() => import('./pages/MainDashboard'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const CRMPage = lazy(() => import('./pages/CRMPage'));
const FinancePage = lazy(() => import('./pages/FinancePage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

const HREmployeesPage = lazy(() => import('./pages/HR/HREmployeesPage'));
const LeaveRequestsPage = lazy(() => import('./pages/HR/LeaveRequestsPage'));

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
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [navigationState, setNavigationState] = useState<'idle' | 'navigating'>('idle');

  // Simulate Application Loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Handle navigation events for loading states
  useEffect(() => {
    const handleStart = () => setNavigationState('navigating');
    const handleComplete = () => setNavigationState('idle');

    // Listen to navigation events
    window.addEventListener('beforeunload', handleStart);
    window.addEventListener('load', handleComplete);

    return () => {
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('load', handleComplete);
    };
  }, []);

  if (isAppLoading) {
    return <AppLoading />;
  }

  return (
    <ErrorBoundary>
      <TooltipProvider>
        <Router>
          <ThemeProvider>
            {/* Global navigation loading indicator */}
            {navigationState === 'navigating' && (
              <div className="fixed top-0 left-0 right-0 h-1 z-50">
                <div className="h-full bg-primary animate-pulse"></div>
              </div>
            )}

            <Suspense fallback={<PageLoading />}>
              <Routes>
                {/* Landing Page Route */}
                <Route path="/" element={
                  <MinimalLayout>
                    <LandingPage />
                  </MinimalLayout>
                } />

                {/* Auth Pages (No Sidebar/Header) */}
                <Route path="/login" element={
                  <MinimalLayout>
                    <div>Login Page</div>
                  </MinimalLayout>
                } />

                <Route path="/register" element={
                  <MinimalLayout>
                    <div>Register Page</div>
                  </MinimalLayout>
                } />

                {/* Dashboard Routes (With Sidebar/Header) */}
                <Route path="/dashboard" element={
                  <DashboardLayout title="Dashboard">
                    <MainDashboard />
                  </DashboardLayout>
                } />

                <Route path="/hr/employees" element={
                  <DashboardLayout title="Employee Management">
                    <HREmployeesPage />
                  </DashboardLayout>
                } />

                <Route path="/hr/leave" element={
                  <DashboardLayout title="Leave Management">
                    <LeaveRequestsPage />
                  </DashboardLayout>
                } />

                <Route path="/projects/*" element={
                  <DashboardLayout title="Projects">
                    <Suspense fallback={<ContentSkeleton />}>
                      <ProjectsPage />
                    </Suspense>
                  </DashboardLayout>
                } />

                <Route path="/crm/*" element={
                  <DashboardLayout title="CRM">
                    <Suspense fallback={<ContentSkeleton />}>
                      <CRMPage />
                    </Suspense>
                  </DashboardLayout>
                } />

                <Route path="/finance/*" element={
                  <DashboardLayout title="Finance">
                    <Suspense fallback={<ContentSkeleton />}>
                      <FinancePage />
                    </Suspense>
                  </DashboardLayout>
                } />

                <Route path="/admin/*" element={
                  <DashboardLayout title="Administration">
                    <Suspense fallback={<ContentSkeleton />}>
                      <AdminPage />
                    </Suspense>
                  </DashboardLayout>
                } />

                {/* 404 Page */}
                <Route path="*" element={
                  <MinimalLayout>
                    <div className="flex items-center justify-center h-screen">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">404</h1>
                        <p className="text-muted-foreground">Page not found</p>
                      </div>
                    </div>
                  </MinimalLayout>
                } />
              </Routes>
            </Suspense>
          </ThemeProvider>
        </Router>
      </TooltipProvider>
    </ErrorBoundary>
  );
}

export default App;