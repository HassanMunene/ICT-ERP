// lib/mock-data.ts
export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

export const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
        'in_progress': 'bg-blue-100 text-blue-800',
        'completed': 'bg-green-100 text-green-800',
        'pending': 'bg-yellow-100 text-yellow-800',
        'on_hold': 'bg-gray-100 text-gray-800',
        'cancelled': 'bg-red-100 text-red-800',
        'prospect': 'bg-purple-100 text-purple-800',
        'qualified': 'bg-blue-100 text-blue-800',
        'proposal': 'bg-orange-100 text-orange-800',
        'negotiation': 'bg-yellow-100 text-yellow-800',
        'closed_won': 'bg-green-100 text-green-800',
        'closed_lost': 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
};

export const dashboardStats = {
    totalEmployees: 47,
    totalContractors: 12,
    activeProjects: 8,
    completedProjects: 15,
    totalRevenue: 125000,
    pendingCommissions: 8500,
    pendingApprovals: 7
};

export const mockProjects = [
    {
        id: '1',
        name: 'Website Redesign',
        projectManager: 'Sarah Johnson',
        status: 'in_progress',
        progress: 75,
        budget: 25000,
        spent: 18750,
        deadline: '2024-03-15'
    },
    {
        id: '2',
        name: 'Mobile App Development',
        projectManager: 'Mike Chen',
        status: 'in_progress',
        progress: 45,
        budget: 50000,
        spent: 22500,
        deadline: '2024-05-20'
    },
    {
        id: '3',
        name: 'CRM Implementation',
        projectManager: 'Emily Davis',
        status: 'in_progress',
        progress: 90,
        budget: 35000,
        spent: 31500,
        deadline: '2024-02-28'
    }
];

export const mockOpportunities = [
    {
        id: '1',
        title: 'Enterprise Software License',
        companyName: 'Global Tech Inc.',
        stage: 'proposal',
        value: 75000,
        probability: 65,
        owner: 'John Smith',
        closeDate: '2024-03-10'
    },
    {
        id: '2',
        title: 'Consulting Services',
        companyName: 'Nexus Solutions',
        stage: 'negotiation',
        value: 45000,
        probability: 80,
        owner: 'Lisa Wong',
        closeDate: '2024-02-25'
    }
];

export const mockInvoices = [
    { id: '1', status: 'pending', amount: 5000 },
    { id: '2', status: 'paid', amount: 7500 },
    { id: '3', status: 'overdue', amount: 3000 }
];

export const mockLeaveRequests = [
    { id: '1', status: 'pending', employee: 'John Doe', days: 5 },
    { id: '2', status: 'approved', employee: 'Jane Smith', days: 3 }
];

export const mockRecentActivity = [
    {
        type: 'success',
        icon: 'check',
        message: 'Invoice INV-2024-001 was paid successfully',
        time: '2 hours ago'
    },
    {
        type: 'info',
        icon: 'users',
        message: 'New team member onboarded: Michael Chen',
        time: '5 hours ago'
    },
    {
        type: 'warning',
        icon: 'briefcase',
        message: 'Project deadline approaching: Website Redesign',
        time: '1 day ago'
    }
];

export const mockFinancialMetrics = {
    totalRevenue: 125000,
    expenses: 87500,
    netProfit: 37500,
    cashFlow: 12500
};

export const mockTeamPerformance = [
    { id: '1', name: 'Sarah Johnson', role: 'Project Manager', performance: 92, initials: 'SJ' },
    { id: '2', name: 'Mike Chen', role: 'Developer', performance: 88, initials: 'MC' },
    { id: '3', name: 'Emily Davis', role: 'Designer', performance: 95, initials: 'ED' },
    { id: '4', name: 'John Smith', role: 'Sales Exec', performance: 78, initials: 'JS' }
];