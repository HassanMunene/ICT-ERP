import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
    Users,
    Briefcase,
    DollarSign,
    FileText,
    TrendingUp,
    Calendar,
    AlertCircle,
    CheckCircle,
    Clock,
    ArrowUpRight,
    Eye,
    Download,
    MoreHorizontal,
    Target,
    BarChart3,
    Activity
} from 'lucide-react';
import { 
    dashboardStats,
    formatCurrency,
    mockProjects,
    mockOpportunities,
    mockInvoices,
    mockLeaveRequests,
    getStatusColor,
    mockRecentActivity,
    mockTeamPerformance,
    mockFinancialMetrics } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    description?: string;
    trend?: string;
    trendUp?: boolean;
    onClick?: () => void;
}

function StatCard({ title, value, icon: Icon, description, trend, trendUp, onClick }: StatCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {description && (
                    <p className="text-xs text-muted-foreground mt-1">{description}</p>
                )}
                {trend && (
                    <div className={`flex items-center mt-1 text-xs ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                        <TrendingUp className={`h-3 w-3 mr-1 ${!trendUp ? 'rotate-180' : ''}`} />
                        {trend}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

interface ProjectCardProps {
    project: any;
    onViewDetails: (id: string) => void;
}

function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
    return (
        <div className="space-y-3 p-4 border rounded-lg hover:border-primary transition-colors">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="font-medium text-sm">{project.name}</h4>
                    <p className="text-xs text-muted-foreground">
                        PM: {project.projectManager}
                    </p>
                </div>
                <Badge className={getStatusColor(project.status)}>
                    {project.status.replace('_', ' ')}
                </Badge>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
            </div>

            <div className="flex justify-between text-xs text-muted-foreground">
                <span>Budget: {formatCurrency(project.budget)}</span>
                <span>Spent: {formatCurrency(project.spent)}</span>
            </div>

            <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                    {project.deadline}
                </span>
                <Button variant="ghost" size="sm" onClick={() => onViewDetails(project.id)}>
                    <Eye className="h-3 w-3 mr-1" />
                    View
                </Button>
            </div>
        </div>
    );
}

export default function MainDashboard() {
    type Project = {
        id: string;
        name: string;
        projectManager: string;
        status: string;
        progress: number;
        budget: number;
        spent: number;
        deadline: string;
    };
    type Opportunity = {
        id: string;
        title: string;
        companyName: string;
        stage: string;
        value: number;
        probability: number;
        owner: string;
        closeDate: string;
    };
    type Invoice = {
        id: string;
        status: string;
        amount: number;
    };
    type LeaveRequest = {
        id: string;
        status: string;
        employee: string;
        days: number;
    };
    type ActivityItem = {
        type: string;
        icon: string;
        message: string;
        time: string;
    };
    type TeamMember = {
        id: string;
        name: string;
        role: string;
        performance: number;
        initials: string;
    };
    type FinancialMetrics = {
        totalRevenue: number;
        expenses: number;
        netProfit: number;
        cashFlow: number;
    };

    const [activeProjects, setActiveProjects] = useState<Project[]>([]);
    const [recentOpportunities, setRecentOpportunities] = useState<Opportunity[]>([]);
    const [pendingInvoices, setPendingInvoices] = useState<Invoice[]>([]);
    const [pendingLeaves, setPendingLeaves] = useState<LeaveRequest[]>([]);
    const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
    const [financialMetrics, setFinancialMetrics] = useState<FinancialMetrics>({ totalRevenue: 0, expenses: 0, netProfit: 0, cashFlow: 0 });
    const [teamPerformance, setTeamPerformance] = useState<TeamMember[]>([]);

    useEffect(() => {
        // Simulate data loading
        setActiveProjects(mockProjects.filter(p => p.status === 'in_progress'));
        setRecentOpportunities(mockOpportunities.slice(0, 3));
        setPendingInvoices(mockInvoices.filter(i => i.status !== 'paid'));
        setPendingLeaves(mockLeaveRequests.filter(l => l.status === 'pending'));
        setRecentActivity(mockRecentActivity);
        setFinancialMetrics(mockFinancialMetrics);
        setTeamPerformance(mockTeamPerformance);
    }, []);

    const handleViewProject = (projectId: string) => {
        // Navigate to project details
        console.log('View project:', projectId);
    };

    const handleViewAll = (section: string) => {
        // Navigate to section overview
        console.log('View all:', section);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Welcome back! Here's what's happening with your business today.
                    </p>
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                    </Button>
                    <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Employees"
                    value={dashboardStats.totalEmployees + dashboardStats.totalContractors}
                    icon={Users}
                    description={`${dashboardStats.totalEmployees} employees, ${dashboardStats.totalContractors} contractors`}
                    trend="+12% from last month"
                    trendUp={true}
                    onClick={() => handleViewAll('employees')}
                />
                <StatCard
                    title="Active Projects"
                    value={dashboardStats.activeProjects}
                    icon={Briefcase}
                    description={`${dashboardStats.completedProjects} completed this quarter`}
                    trend="+8% from last month"
                    trendUp={true}
                    onClick={() => handleViewAll('projects')}
                />
                <StatCard
                    title="Monthly Revenue"
                    value={formatCurrency(dashboardStats.totalRevenue)}
                    icon={DollarSign}
                    description="Paid invoices this month"
                    trend="+23% from last month"
                    trendUp={true}
                    onClick={() => handleViewAll('finance')}
                />
                <StatCard
                    title="Pending Approvals"
                    value={dashboardStats.pendingApprovals}
                    icon={AlertCircle}
                    description="Awaiting your review"
                    trend="-5% from last month"
                    trendUp={false}
                    onClick={() => handleViewAll('approvals')}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">

                {/* Projects Overview - 2 cols */}
                <Card className="lg:col-span-4">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5" />
                            <CardTitle>Active Projects</CardTitle>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleViewAll('projects')}>
                            View All <ArrowUpRight className="h-4 w-4 ml-1" />
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            {activeProjects.slice(0, 4).map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onViewDetails={handleViewProject}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Financial Summary - 1 col */}
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5" />
                            <CardTitle>Financial Summary</CardTitle>
                        </div>
                        <CardDescription>This month's performance</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Total Revenue</span>
                                <span className="font-semibold">{formatCurrency(financialMetrics.totalRevenue)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Expenses</span>
                                <span className="text-red-600 font-semibold">
                                    {formatCurrency(financialMetrics.expenses)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Net Profit</span>
                                <span className="text-green-600 font-semibold">
                                    {formatCurrency(financialMetrics.netProfit)}
                                </span>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">Cash Flow</span>
                                <span className={cn(
                                    "text-xs font-medium",
                                    financialMetrics.cashFlow > 0 ? "text-green-600" : "text-red-600"
                                )}>
                                    {financialMetrics.cashFlow > 0 ? "+" : ""}{formatCurrency(financialMetrics.cashFlow)}
                                </span>
                            </div>
                            <Progress
                                value={Math.abs(financialMetrics.cashFlow) / financialMetrics.totalRevenue * 100}
                                className={cn(
                                    "h-2",
                                    financialMetrics.cashFlow > 0 ? "bg-green-100" : "bg-red-100"
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Sales Pipeline - 2 cols */}
                <Card className="lg:col-span-3">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            <CardTitle>Sales Pipeline</CardTitle>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleViewAll('sales')}>
                            View All <ArrowUpRight className="h-4 w-4 ml-1" />
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recentOpportunities.map((opportunity) => (
                            <div key={opportunity.id} className="space-y-2 p-3 border rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium text-sm">{opportunity.title}</h4>
                                        <p className="text-xs text-muted-foreground">
                                            {opportunity.companyName}
                                        </p>
                                    </div>
                                    <Badge className={getStatusColor(opportunity.stage)}>
                                        {opportunity.stage.replace('_', ' ')}
                                    </Badge>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>{formatCurrency(opportunity.value)}</span>
                                    <span className="text-muted-foreground">{opportunity.probability}%</span>
                                </div>
                                <Progress value={opportunity.probability} className="h-1" />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Owner: {opportunity.owner}</span>
                                    <span>Close: {opportunity.closeDate}</span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Team Performance - 2 cols */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            <CardTitle>Team Performance</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {teamPerformance.map((member) => (
                            <div key={member.id} className="flex items-center justify-between p-2">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="text-xs font-medium">{member.initials}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{member.name}</p>
                                        <p className="text-xs text-muted-foreground">{member.role}</p>
                                    </div>
                                </div>
                                <Badge variant={member.performance >= 80 ? "default" : "secondary"}>
                                    {member.performance}%
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Recent Activity - 2 cols */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            <CardTitle>Recent Activity</CardTitle>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleViewAll('activity')}>
                            View All <ArrowUpRight className="h-4 w-4 ml-1" />
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-start space-x-3">
                                <div className={cn(
                                    "w-6 h-6 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0",
                                    activity.type === 'success' && "bg-green-100 text-green-600",
                                    activity.type === 'info' && "bg-blue-100 text-blue-600",
                                    activity.type === 'warning' && "bg-yellow-100 text-yellow-600",
                                    activity.type === 'error' && "bg-red-100 text-red-600"
                                )}>
                                    {activity.icon === 'check' && <CheckCircle className="h-3 w-3" />}
                                    {activity.icon === 'users' && <Users className="h-3 w-3" />}
                                    {activity.icon === 'briefcase' && <Briefcase className="h-3 w-3" />}
                                </div>
                                <div className="space-y-1 flex-1 min-w-0">
                                    <p className="text-sm leading-none">{activity.message}</p>
                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Quick Actions - 1 col */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5" />
                            <CardTitle>Quick Actions</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button variant="outline" className="w-full justify-start" onClick={() => handleViewAll('invoices')}>
                            <FileText className="h-4 w-4 mr-2" />
                            Review Invoices ({pendingInvoices.length})
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={() => handleViewAll('leaves')}>
                            <Calendar className="h-4 w-4 mr-2" />
                            Approve Leaves ({pendingLeaves.length})
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={() => handleViewAll('timesheets')}>
                            <Clock className="h-4 w-4 mr-2" />
                            Review Timesheets
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={() => handleViewAll('reports')}>
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Generate Reports
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}