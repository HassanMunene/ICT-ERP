import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Loader2, ArrowLeft, Building2, Shield, Mail, Clock } from 'lucide-react';
import { toast } from 'sonner';

// Validation schema - Removed roles and department fields
const formSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    terms: z.boolean().refine(val => val, 'You must accept the terms and conditions'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords Do not match",
    path: ["ConfirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

export function RegistrationForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: false,
        },
    });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        form.setValue('password', password);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        form.setValue('confirmPassword', e.target.value, { shouldValidate: true });
    };

    async function onSubmit(values: FormValues) {
        setIsLoading(true);
        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Registration successful! Please wait for admin approval.');
                // Redirect to waiting approval page
                setTimeout(() => {
                    window.location.href = '/waiting-approval';
                }, 2000);
            } else {
                toast.error(data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            toast.error('An error occurred during registration. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                {/* Back Button */}
                <Button variant="ghost" className="mb-6" asChild>
                    <Link to="/">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </Link>
                </Button>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column - Branding and Info */}
                    <div className="hidden md:flex flex-col justify-center space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
                                <span className="text-white font-bold text-lg">S</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">ServiceERP</h1>
                                <p className="text-sm text-muted-foreground">Multi-Service Firm</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold">
                            Join Our <span className="text-primary">Business Platform</span>
                        </h2>

                        <p className="text-lg text-muted-foreground">
                            Create your account to request access. An administrator will review your request and assign appropriate permissions.
                        </p>

                        <div className="space-y-4">
                            {[
                                { icon: Shield, text: 'Secure account creation' },
                                { icon: Clock, text: 'Quick admin approval process' },
                                { icon: Building2, text: 'Enterprise-grade platform' },
                                { icon: Mail, text: 'Get notified when approved' },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <item.icon className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="text-sm">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Registration Form */}
                    <Card className="border-0 shadow-xl">
                        <CardHeader className="text-center space-y-2">
                            <CardTitle className="text-2xl font-bold">Request Access</CardTitle>
                            <CardDescription>
                                Create your account. Admin will assign roles and department after approval.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Name Fields */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="John" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Last Name *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Doe" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Email */}
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Work Email *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="john.doe@company.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Password with Strength Indicator */}
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password *</FormLabel>
                                                <FormControl>
                                                    <div className="space-y-2">
                                                        <div className="relative">
                                                            <Input
                                                                type={showPassword ? 'text' : 'password'}
                                                                placeholder="Create a strong password"
                                                                {...field}
                                                                onChange={handlePasswordChange}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                            >
                                                                {showPassword ? (
                                                                    <EyeOff className="h-4 w-4" />
                                                                ) : (
                                                                    <Eye className="h-4 w-4" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Confirm Password */}
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password *</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type={showConfirmPassword ? 'text' : 'password'}
                                                            placeholder="Confirm your password"
                                                            {...field}
                                                            onChange={handleConfirmPasswordChange}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        >
                                                            {showConfirmPassword ? (
                                                                <EyeOff className="h-4 w-4" />
                                                            ) : (
                                                                <Eye className="h-4 w-4" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Terms and Conditions */}
                                    <FormField
                                        control={form.control}
                                        name="terms"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel className="text-sm font-normal">
                                                        I agree to the{' '}
                                                        <a href="#" className="text-primary hover:underline">
                                                            Terms of Service
                                                        </a>{' '}
                                                        and{' '}
                                                        <a href="#" className="text-primary hover:underline">
                                                            Privacy Policy
                                                        </a>
                                                    </FormLabel>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Creating Account...
                                            </>
                                        ) : (
                                            'Request Access'
                                        )}
                                    </Button>
                                </form>
                            </Form>

                            <div className="mt-6 text-center text-sm">
                                <p className="text-muted-foreground">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-primary hover:underline font-medium">
                                        Sign in here
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}