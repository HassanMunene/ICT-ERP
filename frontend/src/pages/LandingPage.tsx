import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ArrowRight, BarChart3, Users, Building2, DollarSign,
    FileText, Briefcase, ChevronDown, Star, Award,
    Globe, Lock, MoveUp
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

const LandingPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const activeTab = 'business';

    // Refs for section navigation
    const featuresRef = useRef<HTMLDivElement>(null);
    const testimonialsRef = useRef<HTMLDivElement>(null);
    const pricingRef = useRef<HTMLDivElement>(null);

    const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const features = [
        {
            icon: BarChart3,
            title: "Real-time Analytics",
            description: "Get instant insights into your business performance with live dashboards and reports."
        },
        {
            icon: Users,
            title: "HR Management",
            description: "Streamline employee management, payroll, attendance, and performance tracking."
        },
        {
            icon: DollarSign,
            title: "Financial Suite",
            description: "Comprehensive accounting, invoicing, expense tracking, and financial reporting."
        },
        {
            icon: Building2,
            title: "CRM Integration",
            description: "Manage customer relationships, sales pipelines, and marketing campaigns in one place."
        },
        {
            icon: Briefcase,
            title: "Project Management",
            description: "Plan, execute, and track projects with advanced task management and collaboration tools."
        },
        {
            icon: FileText,
            title: "Document Management",
            description: "Centralized document storage with version control and advanced security features."
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "CFO, TechGrowth Inc.",
            content: "ServiceERP transformed our financial operations. We've reduced reporting time by 65% and improved accuracy significantly.",
            avatar: "SJ"
        },
        {
            name: "Michael Chen",
            role: "Operations Director, Global Services",
            content: "The project management module alone has increased our team productivity by 40%. Incredible platform for service-based businesses.",
            avatar: "MC"
        },
        {
            name: "Elena Rodriguez",
            role: "HR Manager, Enterprise Solutions",
            content: "From onboarding to payroll, ServiceERP handles all our HR needs seamlessly. The employee self-service portal is a game-changer.",
            avatar: "ER"
        }
    ];

    const stats = [
        { value: "500+", label: "Enterprise Clients" },
        { value: "98%", label: "Customer Satisfaction" },
        { value: "24/7", label: "Support Availability" },
        { value: "45%", label: "Average Efficiency Gain" }
    ];

    const userTypes = [
        {
            id: 'business',
            title: 'Business Owner/Manager',
            description: 'Complete access to all modules and administrative controls',
            icon: Building2
        },
        {
            id: 'hr',
            title: 'HR Manager/Staff',
            description: 'Access to HR, payroll, and employee management modules',
            icon: Users
        },
        {
            id: 'finance',
            title: 'Finance Team',
            description: 'Financial reporting, invoicing, and accounting features',
            icon: DollarSign
        },
        {
            id: 'contractor',
            title: 'Contractor/Freelancer',
            description: 'Project collaboration and time tracking tools',
            icon: Briefcase
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
            {/* Navigation */}
            <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-white font-bold text-sm">S</span>
                    </div>
                    <div className="hidden sm:block">
                        <h1 className="text-lg font-semibold">ServiceERP</h1>
                        <p className="text-xs text-muted-foreground">Multi-Service Firm</p>
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-6">
                    <button onClick={() => scrollToSection(featuresRef)} className="text-sm font-medium hover:text-primary transition-colors">Features</button>
                    <button onClick={() => scrollToSection(testimonialsRef)} className="text-sm font-medium hover:text-primary transition-colors">Testimonials</button>
                    <button onClick={() => scrollToSection(pricingRef)} className="text-sm font-medium hover:text-primary transition-colors">Pricing</button>
                    <Button variant="ghost" asChild>
                        <Link to="/login">Sign In</Link>
                    </Button>
                    <Button asChild>
                        <Link to="/register">Get Started</Link>
                    </Button>
                </div>

                <div className="md:hidden">
                    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem>Features</DropdownMenuItem>
                            <DropdownMenuItem>Testimonials</DropdownMenuItem>
                            <DropdownMenuItem>Pricing</DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="/login">Sign In</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-primary font-semibold" asChild>
                                <Link to="/register">Get Started</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto px-4 sm:px-6 py-12 md:py-20 lg:py-24">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    <div className="flex-1 space-y-6 text-center lg:text-left">
                        <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-primary/10 text-primary mx-auto lg:mx-0">
                            <Award className="h-4 w-4 mr-2" />
                            Enterprise Grade ERP Solution
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                            Transform Your <span className="text-primary">Service Business</span> Operations
                        </h1>

                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                            All-in-one ERP platform designed for multi-service firms. Streamline operations, boost productivity, and drive growth with our comprehensive solution.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                            <Button size="lg" className="text-base sm:text-lg py-6 px-8" asChild>
                                <Link to="/register">
                                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="text-base sm:text-lg py-6 px-8">
                                Watch Demo
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 sm:flex gap-6 pt-8 justify-center lg:justify-start">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-xl sm:text-2xl font-bold text-primary">{stat.value}</div>
                                    <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hero Image/Illustration Placeholder */}
                    <div className="w-full lg:max-w-md">
                        <Card className="shadow-xl border-0 bg-gradient-to-br from-primary/5 to-primary/10 p-8">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl">
                                    Ready to Get Started?
                                </CardTitle>
                                <CardDescription>
                                    Join thousands of businesses that trust our ERP platform
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 text-center">
                                <div className="space-y-2">
                                    <Building2 className="h-12 w-12 mx-auto text-primary" />
                                    <h3 className="font-semibold">Complete Business Solution</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Everything you need to manage your service business in one place
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <Button asChild variant="outline">
                                        <Link to="/login">Sign In</Link>
                                    </Button>
                                    <Button asChild>
                                        <Link to="/register">Register</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section ref={featuresRef} className="bg-muted/50 py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Everything You Need in One Platform</h2>
                        <p className="text-base sm:text-lg text-muted-foreground">
                            ServiceERP combines all essential business tools into a single, seamless experience
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <CardHeader>
                                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                                        <feature.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* User Types Section */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Designed for Every Role</h2>
                        <p className="text-base sm:text-lg text-muted-foreground">
                            Customized experiences for different users across your organization
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {userTypes.map((type) => (
                            <Card key={type.id} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardHeader>
                                    <div className="flex justify-center mb-4">
                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                            <type.icon className="h-8 w-8 text-primary" />
                                        </div>
                                    </div>
                                    <CardTitle className="text-lg">{type.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{type.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section ref={testimonialsRef} className="py-16 md:py-20 bg-muted/30">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
                        <p className="text-base sm:text-lg text-muted-foreground">
                            See what our customers say about their experience with ServiceERP
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="border-0 shadow-lg">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                                            <span className="font-semibold text-primary">{testimonial.avatar}</span>
                                        </div>
                                        <div>
                                            <div className="font-semibold">{testimonial.name}</div>
                                            <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground text-sm">"{testimonial.content}"</p>
                                    <div className="flex mt-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Transform Your Business?
                    </h2>
                    <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                        Join thousands of service businesses that use ServiceERP to streamline operations and drive growth
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="text-base sm:text-lg py-4 sm:py-6 px-6 sm:px-8" asChild>
                            <Link to="/register">Start Free Trial</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-base sm:text-lg py-4 sm:py-6 px-6 sm:px-8 bg-transparent text-white border-white hover:bg-white hover:text-primary">
                            Schedule Demo
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-background border-t py-12">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">S</span>
                                </div>
                                <div>
                                    <h1 className="text-lg font-semibold">ServiceERP</h1>
                                    <p className="text-xs text-muted-foreground">Multi-Service Firm</p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Enterprise-grade ERP solution for modern service businesses.
                            </p>
                        </div>

                        {['Product', 'Company', 'Support', 'Legal'].map((category) => (
                            <div key={category}>
                                <h3 className="font-semibold mb-4">{category}</h3>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    {['Features', 'Pricing', 'Case Studies', 'API'].map((item) => (
                                        <li key={item}>
                                            <a href="#" className="hover:text-primary transition-colors">{item}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-muted-foreground">
                            © 2024 ServiceERP. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</a>
                            <a href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</a>
                            <a href="#" className="text-sm text-muted-foreground hover:text-primary">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Scroll to top button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
                aria-label="Scroll to top"
            >
                <MoveUp className="h-5 w-5" />
            </button>
        </div>
    );
};

export default LandingPage;