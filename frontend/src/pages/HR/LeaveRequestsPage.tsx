import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
    Search,
    MoreHorizontal,
    Download,
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Eye,
    Edit,
    Trash2,
    PlusCircle,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { formatDate, calculateBusinessDays } from '@/lib/utils';

// Types
interface LeaveRequest {
    id: string;
    employeeId: string;
    employeeName: string;
    employeeEmail: string;
    department: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    duration: number;
    reason: string;
    status: 'pending' | 'approved' | 'rejected' | 'cancelled';
    submittedDate: string;
    approvedBy?: string;
    approvedDate?: string;
    rejectionReason?: string;
}

interface LeaveBalance {
    annual: number;
    sick: number;
    personal: number;
    other: number;
}

// Mock data
const mockLeaveRequests: LeaveRequest[] = [
    {
        id: '1',
        employeeId: 'EMP001',
        employeeName: 'Sarah Johnson',
        employeeEmail: 'sarah.johnson@company.com',
        department: 'Engineering',
        leaveType: 'annual',
        startDate: '2024-03-15',
        endDate: '2024-03-18',
        duration: 3,
        reason: 'Family vacation',
        status: 'approved',
        submittedDate: '2024-03-01',
        approvedBy: 'Michael Chen',
        approvedDate: '2024-03-02'
    },
    {
        id: '2',
        employeeId: 'EMP002',
        employeeName: 'Michael Chen',
        employeeEmail: 'michael.chen@company.com',
        department: 'Engineering',
        leaveType: 'sick',
        startDate: '2024-03-10',
        endDate: '2024-03-10',
        duration: 1,
        reason: 'Medical appointment',
        status: 'approved',
        submittedDate: '2024-03-05',
        approvedBy: 'Lisa Wong',
        approvedDate: '2024-03-06'
    },
    {
        id: '3',
        employeeId: 'EMP003',
        employeeName: 'Emily Davis',
        employeeEmail: 'emily.davis@company.com',
        department: 'Design',
        leaveType: 'annual',
        startDate: '2024-03-20',
        endDate: '2024-03-22',
        duration: 3,
        reason: 'Personal time off',
        status: 'pending',
        submittedDate: '2024-03-10'
    },
    {
        id: '4',
        employeeId: 'EMP004',
        employeeName: 'David Wilson',
        employeeEmail: 'david.wilson@company.com',
        department: 'Sales',
        leaveType: 'other',
        startDate: '2024-03-25',
        endDate: '2024-03-27',
        duration: 3,
        reason: 'Team building event',
        status: 'rejected',
        submittedDate: '2024-03-12',
        approvedBy: 'Jennifer Lopez',
        approvedDate: '2024-03-13',
        rejectionReason: 'Conflict with quarterly sales meeting'
    }
];

const leaveTypes = [
    { value: 'annual', label: 'Annual Leave' },
    { value: 'sick', label: 'Sick Leave' },
    { value: 'personal', label: 'Personal Leave' },
    { value: 'other', label: 'Other' }
];

const statusOptions = ['All', 'pending', 'approved', 'rejected', 'cancelled'];

export default function LeaveRequestsPage() {
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
    const [filteredRequests, setFilteredRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedLeaveType, setSelectedLeaveType] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newRequest, setNewRequest] = useState({
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: ''
    });
    const [leaveBalance, setLeaveBalance] = useState<LeaveBalance>({
        annual: 15,
        sick: 10,
        personal: 5,
        other: 3
    });

    setLeaveBalance;

    useEffect(() => {
        // Simulate API loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        filterRequests();
    }, [searchTerm, selectedStatus, selectedLeaveType, leaveRequests]);

    const filterRequests = () => {
        let filtered = leaveRequests;

        if (searchTerm) {
            filtered = filtered.filter(request =>
                request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.department.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedStatus !== 'All') {
            filtered = filtered.filter(request => request.status === selectedStatus);
        }

        if (selectedLeaveType !== 'All') {
            filtered = filtered.filter(request => request.leaveType === selectedLeaveType);
        }

        setFilteredRequests(filtered);
    };

    const handleCreateRequest = () => {
        if (!newRequest.leaveType || !newRequest.startDate || !newRequest.endDate) {
            alert('Please fill in all required fields');
            return;
        }

        const startDate = new Date(newRequest.startDate);
        const endDate = new Date(newRequest.endDate);
        const duration = calculateBusinessDays(startDate, endDate);

        const newLeaveRequest: LeaveRequest = {
            id: `LR-${Date.now()}`,
            employeeId: 'EMP001', // Current user's ID
            employeeName: 'Sarah Johnson', // Current user's name
            employeeEmail: 'sarah.johnson@company.com', // Current user's email
            department: 'Engineering', // Current user's department
            leaveType: newRequest.leaveType,
            startDate: newRequest.startDate,
            endDate: newRequest.endDate,
            duration,
            reason: newRequest.reason,
            status: 'pending',
            submittedDate: new Date().toISOString().split('T')[0]
        };

        setLeaveRequests(prev => [newLeaveRequest, ...prev]);
        setIsDialogOpen(false);
        setNewRequest({ leaveType: '', startDate: '', endDate: '', reason: '' });
    };

    const handleApprove = (requestId: string) => {
        setLeaveRequests(prev =>
            prev.map(request =>
                request.id === requestId
                    ? {
                        ...request,
                        status: 'approved',
                        approvedBy: 'Current User', // Would be current manager/admin
                        approvedDate: new Date().toISOString().split('T')[0]
                    }
                    : request
            )
        );
    };

    const handleReject = (requestId: string) => {
        const rejectionReason = prompt('Please provide a reason for rejection:');
        if (rejectionReason) {
            setLeaveRequests(prev =>
                prev.map(request =>
                    request.id === requestId
                        ? {
                            ...request,
                            status: 'rejected',
                            approvedBy: 'Current User',
                            approvedDate: new Date().toISOString().split('T')[0],
                            rejectionReason
                        }
                        : request
                )
            );
        }
    };

    const handleCancel = (requestId: string) => {
        if (confirm('Are you sure you want to cancel this leave request?')) {
            setLeaveRequests(prev =>
                prev.map(request =>
                    request.id === requestId
                        ? { ...request, status: 'cancelled' }
                        : request
                )
            );
        }
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'approved': return 'default';
            case 'rejected': return 'destructive';
            case 'pending': return 'outline';
            case 'cancelled': return 'secondary';
            default: return 'secondary';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved': return <CheckCircle className="h-4 w-4" />;
            case 'rejected': return <XCircle className="h-4 w-4" />;
            case 'pending': return <Clock className="h-4 w-4" />;
            case 'cancelled': return <AlertCircle className="h-4 w-4" />;
            default: return <Clock className="h-4 w-4" />;
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-muted rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
                <div className="grid gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="animate-pulse">
                            <div className="h-20 bg-muted rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
                    <p className="text-muted-foreground">
                        Request and manage employee leave applications
                    </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <PlusCircle className="h-4 w-4" />
                            Request Leave
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Request New Leave</DialogTitle>
                            <DialogDescription>
                                Fill out the form below to submit a new leave request.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Leave Type *</label>
                                    <Select
                                        value={newRequest.leaveType}
                                        onValueChange={(value) => setNewRequest(prev => ({ ...prev, leaveType: value }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select leave type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {leaveTypes.map(type => (
                                                <SelectItem key={type.value} value={type.value}>
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Available Balance</label>
                                    <Input
                                        value={newRequest.leaveType ? leaveBalance[newRequest.leaveType as keyof LeaveBalance] + ' days' : '-'}
                                        disabled
                                        className="bg-muted"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Start Date *</label>
                                    <Input
                                        type="date"
                                        value={newRequest.startDate}
                                        onChange={(e) => setNewRequest(prev => ({ ...prev, startDate: e.target.value }))}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">End Date *</label>
                                    <Input
                                        type="date"
                                        value={newRequest.endDate}
                                        onChange={(e) => setNewRequest(prev => ({ ...prev, endDate: e.target.value }))}
                                        min={newRequest.startDate || new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                            </div>

                            {newRequest.startDate && newRequest.endDate && (
                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                        Duration: {calculateBusinessDays(
                                            new Date(newRequest.startDate),
                                            new Date(newRequest.endDate)
                                        )} business days
                                    </p>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Reason *</label>
                                <Textarea
                                    placeholder="Please provide a reason for your leave request..."
                                    value={newRequest.reason}
                                    onChange={(e) => setNewRequest(prev => ({ ...prev, reason: e.target.value }))}
                                    rows={3}
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleCreateRequest}>
                                Submit Request
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Leave Balance Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Object.entries(leaveBalance).map(([type, balance]) => (
                    <Card key={type}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium capitalize">
                                {type} Leave
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{balance} days</div>
                            <p className="text-xs text-muted-foreground">Remaining balance</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Filters and Requests Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Leave Requests</CardTitle>
                    <CardDescription>
                        Manage and review all leave requests in your organization
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by employee name, reason, or department..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statusOptions.map(status => (
                                        <SelectItem key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={selectedLeaveType} onValueChange={setSelectedLeaveType}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Leave Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Types</SelectItem>
                                    {leaveTypes.map(type => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Leave Requests Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Leave Type</TableHead>
                                    <TableHead>Dates</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Reason</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredRequests.map((request) => (
                                    <TableRow key={request.id} className="hover:bg-muted/50">
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{request.employeeName}</div>
                                                <div className="text-sm text-muted-foreground">{request.department}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="capitalize">{request.leaveType}</TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                {formatDate(request.startDate)} - {formatDate(request.endDate)}
                                            </div>
                                        </TableCell>
                                        <TableCell>{request.duration} days</TableCell>
                                        <TableCell className="max-w-[200px] truncate">{request.reason}</TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusVariant(request.status)} className="gap-1">
                                                {getStatusIcon(request.status)}
                                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        View Details
                                                    </DropdownMenuItem>

                                                    {request.status === 'pending' && (
                                                        <>
                                                            <DropdownMenuItem onClick={() => handleApprove(request.id)}>
                                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                                Approve
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleReject(request.id)}>
                                                                <XCircle className="h-4 w-4 mr-2" />
                                                                Reject
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}

                                                    {(request.status === 'pending' || request.status === 'approved') && (
                                                        <DropdownMenuItem onClick={() => handleCancel(request.id)}>
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Cancel
                                                        </DropdownMenuItem>
                                                    )}

                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {filteredRequests.length === 0 && (
                        <div className="text-center py-12">
                            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium">No leave requests found</h3>
                            <p className="text-muted-foreground">
                                {searchTerm || selectedStatus !== 'All' || selectedLeaveType !== 'All'
                                    ? 'Try adjusting your search or filter criteria'
                                    : 'No leave requests have been submitted yet'}
                            </p>
                        </div>
                    )}

                    {/* Table Footer */}
                    <div className="flex items-center justify-between pt-4">
                        <div className="text-sm text-muted-foreground">
                            Showing {filteredRequests.length} of {leaveRequests.length} requests
                        </div>
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export Report
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}