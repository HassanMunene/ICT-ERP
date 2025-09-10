import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState, Suspense, lazy } from "react";
import { Toaster } from "sonner";

import './App.css'
import { ThemeProvider } from "./lib/theme-provider";
import { AuthProvider } from "./context/AuthContext";
import { TooltipProvider } from "./components/ui/tooltip";
import { ContentSkeleton } from "./components/layout/Loading";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { MinimalLayout } from "./components/layout/MinimalLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RoleBasedRedirect } from "./components/RoleBasedRedirect";

// Lazy load pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));
const WaitingApproval = lazy(() => import('./pages/WaitingApproval'));
const UnauthorizedPage = lazy(() => import('./pages/UnauthorizedPage'));
const MainDashboard = lazy(() => import('./pages/MainDashboard'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const CRMPage = lazy(() => import('./pages/CRMPage'));
const FinancePage = lazy(() => import('./pages/FinancePage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const EmployeeDashboard = lazy(() => import('./pages/EmployeeDashboard'));

const HREmployeesPage = lazy(() => import('./pages/HR/HREmployeesPage'));
const LeaveRequestsPage = lazy(() => import('./pages/HR/LeaveRequestsPage'));

// In your AppRoutes component
function AppRoutes() {
	return (
		<Routes>
			{/* Public Routes */}
			<Route path="/" element={<MinimalLayout><LandingPage /></MinimalLayout>} />
			<Route path="/login" element={<MinimalLayout><LoginPage /></MinimalLayout>} />
			<Route path="/register" element={<MinimalLayout><RegistrationPage /></MinimalLayout>} />
			<Route path="/waiting-approval" element={<MinimalLayout><WaitingApproval /></MinimalLayout>} />
			<Route path="/unauthorized" element={<MinimalLayout><UnauthorizedPage /></MinimalLayout>} />

			{/* Role-based dashboard redirect */}
			<Route path="/dashboard" element={
				<ProtectedRoute>
					<RoleBasedRedirect />
				</ProtectedRoute>
			} />

			{/* Admin Dashboard */}
			<Route path="/admin/*" element={
				<ProtectedRoute allowedRoles={['ADMIN']}>
					<DashboardLayout title="Administration">
						<Suspense fallback={<ContentSkeleton />}>
							<AdminPage />
						</Suspense>
					</DashboardLayout>
				</ProtectedRoute>
			} />

			{/* HR Dashboard - Use nested routes */}
			<Route path="/hr/*" element={
				<ProtectedRoute allowedRoles={['HR', 'ADMIN']}>
					<DashboardLayout title="Human Resources">
						<Routes>
							<Route index element={<div>HR</div>} />
							<Route path="employees" element={<HREmployeesPage />} />
							<Route path="leave" element={<LeaveRequestsPage />} />
						</Routes>
					</DashboardLayout>
				</ProtectedRoute>
			} />

			{/* Finance Dashboard */}
			<Route path="/finance/*" element={
				<ProtectedRoute allowedRoles={['FINANCE', 'ADMIN']}>
					<DashboardLayout title="Finance">
						<Suspense fallback={<ContentSkeleton />}>
							<FinancePage />
						</Suspense>
					</DashboardLayout>
				</ProtectedRoute>
			} />

			{/* Projects Dashboard */}
			<Route path="/projects/*" element={
				<ProtectedRoute allowedRoles={['CONTRACTOR', 'EMPLOYEE', 'ADMIN']}>
					<DashboardLayout title="Projects">
						<Suspense fallback={<ContentSkeleton />}>
							<ProjectsPage />
						</Suspense>
					</DashboardLayout>
				</ProtectedRoute>
			} />

			{/* Employee Dashboard */}
			<Route path="/employee/*" element={
				<ProtectedRoute allowedRoles={['EMPLOYEE']}>
					<DashboardLayout title="My Dashboard">
						<Suspense fallback={<ContentSkeleton />}>
							<EmployeeDashboard />
						</Suspense>
					</DashboardLayout>
				</ProtectedRoute>
			} />

			{/* CRM Dashboard */}
			<Route path="/crm/*" element={
				<ProtectedRoute allowedRoles={['HR', 'ADMIN']}>
					<DashboardLayout title="CRM">
						<Suspense fallback={<ContentSkeleton />}>
							<CRMPage />
						</Suspense>
					</DashboardLayout>
				</ProtectedRoute>
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
	);
}

function App() {
	const [navigationState, setNavigationState] = useState<'idle' | 'navigating'>('idle');

	useEffect(() => {
		const handleStart = () => setNavigationState('navigating');
		const handleComplete = () => setNavigationState('idle');

		window.addEventListener('beforeunload', handleStart);
		window.addEventListener('load', handleComplete);

		return () => {
			window.removeEventListener('beforeunload', handleStart);
			window.removeEventListener('load', handleComplete);
		};
	}, []);

	return (
		<Router>
			<TooltipProvider>
				<ThemeProvider>
					{/* Global navigation loading indicator */}
					{navigationState === 'navigating' && (
						<div className="fixed top-0 left-0 right-0 h-1 z-50">
							<div className="h-full bg-primary animate-pulse"></div>
						</div>
					)}
					<Toaster position="top-center" />
					<AuthProvider>
						<div className="min-h-screen bg-background">
							<AppRoutes />
						</div>
					</AuthProvider>
				</ThemeProvider>
			</TooltipProvider>
		</Router>
	);
}

export default App;