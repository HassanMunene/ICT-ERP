import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Search,
    Filter,
    MoreHorizontal,
    Download,
    Mail,
    Phone,
    MapPin,
    Calendar,
    User,
    Building,
    Clock,
    Edit,
    Eye,
    Trash2,
    Users,
    PlusCircle
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
import { formatDate } from '@/lib/utils';

// Mock data - In real app, this would come from API
const mockEmployees = [
    {
        id: '1',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@company.com',
        phone: '+1234567890',
        department: 'Engineering',
        position: 'Senior Developer',
        location: 'New York, NY',
        hireDate: '2022-03-15',
        status: 'active',
        salary: 95000,
        manager: 'Michael Chen'
    },
    {
        id: '2',
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'michael.chen@company.com',
        phone: '+1234567891',
        department: 'Engineering',
        position: 'Engineering Manager',
        location: 'San Francisco, CA',
        hireDate: '2020-08-10',
        status: 'active',
        salary: 125000,
        manager: 'Lisa Wong'
    },
    {
        id: '3',
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@company.com',
        phone: '+1234567892',
        department: 'Design',
        position: 'UX Designer',
        location: 'Chicago, IL',
        hireDate: '2023-01-20',
        status: 'active',
        salary: 85000,
        manager: 'Robert Kim'
    },
    {
        id: '4',
        firstName: 'David',
        lastName: 'Wilson',
        email: 'david.wilson@company.com',
        phone: '+1234567893',
        department: 'Sales',
        position: 'Account Executive',
        location: 'Boston, MA',
        hireDate: '2021-11-05',
        status: 'on_leave',
        salary: 75000,
        manager: 'Jennifer Lopez'
    },
    {
        id: '5',
        firstName: 'Lisa',
        lastName: 'Wong',
        email: 'lisa.wong@company.com',
        phone: '+1234567894',
        department: 'Engineering',
        position: 'Director of Engineering',
        location: 'San Francisco, CA',
        hireDate: '2019-05-12',
        status: 'active',
        salary: 165000,
        manager: 'CEO'
    }
];

const departments = ['All', 'Engineering', 'Design', 'Sales', 'Marketing', 'HR', 'Finance'];
const statuses = ['All', 'active', 'on_leave', 'terminated'];

export default function HREmployeesPage() {
    const [employees, setEmployees] = useState(mockEmployees);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [isLoading, setIsLoading] = useState(true);

    setEmployees;

    useEffect(() => {
        // Simulate API loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const filteredEmployees = employees.filter(employee => {
        const matchesSearch = searchTerm === '' ||
            employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.position.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDepartment = selectedDepartment === 'All' || employee.department === selectedDepartment;
        const matchesStatus = selectedStatus === 'All' || employee.status === selectedStatus;

        return matchesSearch && matchesDepartment && matchesStatus;
    });

    const handleAddEmployee = () => {
        // Navigate to add employee form
        console.log('Add new employee');
    };

    const handleViewEmployee = (employeeId: string) => {
        // Navigate to employee details
        console.log('View employee:', employeeId);
    };

    const handleEditEmployee = (employeeId: string) => {
        // Navigate to edit employee
        console.log('Edit employee:', employeeId);
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'active': return 'default';
            case 'on_leave': return 'secondary';
            case 'terminated': return 'destructive';
            default: return 'outline';
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
                    {[1, 2, 3, 4, 5].map(i => (
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
                    <h1 className="text-3xl font-bold tracking-tight">Employee Management</h1>
                    <p className="text-muted-foreground">
                        Manage your organization's employees, departments, and HR operations
                    </p>
                </div>
                <Button onClick={handleAddEmployee} className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Add Employee
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{employees.length}</div>
                        <p className="text-xs text-muted-foreground">Across all departments</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {employees.filter(e => e.status === 'active').length}
                        </div>
                        <p className="text-xs text-muted-foreground">Currently working</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">On Leave</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {employees.filter(e => e.status === 'on_leave').length}
                        </div>
                        <p className="text-xs text-muted-foreground">On vacation or leave</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Departments</CardTitle>
                        <Building className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">7</div>
                        <p className="text-xs text-muted-foreground">Active departments</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <Card>
                <CardHeader>
                    <CardTitle>Employee Directory</CardTitle>
                    <CardDescription>
                        Search and filter through your organization's employees
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search employees by name, email, or position..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                                <SelectTrigger className="w-[180px]">
                                    <Filter className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map(dept => (
                                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statuses.map(status => (
                                        <SelectItem key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Employees Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Hire Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredEmployees.map((employee) => (
                                    <TableRow key={employee.id} className="hover:bg-muted/50">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <span className="font-semibold text-primary">
                                                        {employee.firstName[0]}{employee.lastName[0]}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="font-medium">{employee.firstName} {employee.lastName}</div>
                                                    <div className="text-sm text-muted-foreground">{employee.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>{employee.position}</div>
                                            <div className="text-sm text-muted-foreground">{employee.manager}</div>
                                        </TableCell>
                                        <TableCell>{employee.department}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                                {employee.location}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                                {formatDate(employee.hireDate)}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusVariant(employee.status)}>
                                                {employee.status.replace('_', ' ')}
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
                                                    <DropdownMenuItem onClick={() => handleViewEmployee(employee.id)}>
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleEditEmployee(employee.id)}>
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Edit Employee
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <Mail className="h-4 w-4 mr-2" />
                                                        Send Email
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Phone className="h-4 w-4 mr-2" />
                                                        Contact
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600">
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Terminate
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {filteredEmployees.length === 0 && (
                        <div className="text-center py-12">
                            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium">No employees found</h3>
                            <p className="text-muted-foreground">
                                Try adjusting your search or filter criteria
                            </p>
                        </div>
                    )}

                    {/* Table Footer */}
                    <div className="flex items-center justify-between pt-4">
                        <div className="text-sm text-muted-foreground">
                            Showing {filteredEmployees.length} of {employees.length} employees
                        </div>
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export CSV
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}