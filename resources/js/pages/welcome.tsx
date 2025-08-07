import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  ClipboardList,
  Shield,
  FileText,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Trophy,
  Target,
  Zap
} from 'lucide-react';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        } | null;
    };
    laravelVersion: string;
    phpVersion: string;
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    const features = [
        {
            icon: Users,
            title: 'Student Management',
            description: 'Complete student lifecycle management with profiles, enrollment tracking, and academic records',
            color: 'text-blue-600 bg-blue-50'
        },
        {
            icon: GraduationCap,
            title: 'Teacher Management',
            description: 'Comprehensive teacher profiles, department assignments, and performance tracking',
            color: 'text-green-600 bg-green-50'
        },
        {
            icon: BookOpen,
            title: 'Course Management',
            description: 'Dynamic course creation, scheduling, prerequisites, and curriculum management',
            color: 'text-purple-600 bg-purple-50'
        },
        {
            icon: ClipboardList,
            title: 'Enrollment System',
            description: 'Streamlined student-course enrollment with automated capacity management',
            color: 'text-orange-600 bg-orange-50'
        },
        {
            icon: Shield,
            title: 'Role-Based Access',
            description: 'Secure multi-role authentication for Administrators, Teachers, and Students',
            color: 'text-red-600 bg-red-50'
        },
        {
            icon: FileText,
            title: 'Document Management',
            description: 'Secure file upload and document management for all system entities',
            color: 'text-cyan-600 bg-cyan-50'
        },
        {
            icon: BarChart3,
            title: 'Audit Logging',
            description: 'Comprehensive activity tracking and audit trails for all system operations',
            color: 'text-indigo-600 bg-indigo-50'
        },
        {
            icon: Zap,
            title: 'Real-time Dashboard',
            description: 'Live analytics and insights with interactive charts and key metrics',
            color: 'text-yellow-600 bg-yellow-50'
        }
    ];

    const benefits = [
        {
            icon: Target,
            title: 'Streamlined Operations',
            description: 'Automate administrative tasks and reduce manual paperwork by 80%'
        },
        {
            icon: Trophy,
            title: 'Enhanced Performance',
            description: 'Track student progress and teacher effectiveness with detailed analytics'
        },
        {
            icon: Sparkles,
            title: 'Modern Interface',
            description: 'Intuitive, responsive design that works perfectly on any device'
        }
    ];

    const mockData = [
        { metric: '2,847', label: 'Students Enrolled', trend: '+12%' },
        { metric: '156', label: 'Teachers Active', trend: '+8%' },
        { metric: '89', label: 'Courses Offered', trend: '+15%' },
        { metric: '99.9%', label: 'System Uptime', trend: 'Reliable' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <header className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-5"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                        <div className="flex justify-start lg:w-0 lg:flex-1">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                        <GraduationCap className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <div className="text-xl font-bold text-gray-900">ERP School</div>
                                    <div className="text-sm text-gray-500">Management System</div>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                            {auth.user ? (
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-600">Welcome, {auth.user.name}</span>
                                    <Link
                                        href="/dashboard"
                                        className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                                    >
                                        Dashboard
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Link
                                        href="/login"
                                        className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                                    >
                                        Sign in
                                    </Link>
                                    <Link href="/register">
                                        <Button>
                                            Get Started
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative py-16 sm:py-24 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
                            <Sparkles className="h-4 w-4 mr-2" />
                            Modern School Management Solution
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            🏫 Complete ERP School
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                {' '}Management System
                            </span>
                        </h1>
                        
                        <p className="max-w-3xl mx-auto text-xl text-gray-600 mb-10">
                            Streamline your educational institution with our comprehensive ERP solution. 
                            Manage students, teachers, courses, and enrollments with powerful role-based 
                            access control and real-time analytics.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {auth.user ? (
                                <Link href="/dashboard">
                                    <Button size="lg" className="text-lg px-8 py-4">
                                        <BarChart3 className="mr-2 h-5 w-5" />
                                        Go to Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/register">
                                        <Button size="lg" className="text-lg px-8 py-4">
                                            Start Free Trial
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </Link>
                                    <Link href="/login">
                                        <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                                            Sign In
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {mockData.map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                    {item.metric}
                                </div>
                                <div className="text-sm text-gray-600 mb-1">{item.label}</div>
                                <Badge variant="secondary" className="text-xs">
                                    {item.trend}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            🚀 Powerful Features for Modern Schools
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Everything you need to manage your educational institution efficiently and effectively
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <CardHeader>
                                        <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-sm leading-relaxed">
                                            {feature.description}
                                        </CardDescription>
                                    </CardContent>
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-50 to-transparent opacity-50"></div>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            ✨ Transform Your Institution
                        </h2>
                        <p className="text-xl text-gray-600">
                            Join hundreds of schools already benefiting from our ERP solution
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-6">
                                        <Icon className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        🎓 Ready to Modernize Your School?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of educators who trust our ERP system for their daily operations
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {auth.user ? (
                            <Link href="/dashboard">
                                <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                                    <BarChart3 className="mr-2 h-5 w-5" />
                                    Access Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href="/register">
                                    <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                                        Get Started Now
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button 
                                        size="lg" 
                                        variant="outline" 
                                        className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600"
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center mb-4">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mr-3">
                                    <GraduationCap className="h-5 w-5 text-white" />
                                </div>
                                <div className="text-lg font-bold">ERP School Management</div>
                            </div>
                            <p className="text-gray-400 mb-4">
                                Comprehensive school management solution with modern features 
                                for educational institutions of all sizes.
                            </p>
                            <div className="flex items-center space-x-4">
                                <Badge variant="secondary">🔒 Secure</Badge>
                                <Badge variant="secondary">⚡ Fast</Badge>
                                <Badge variant="secondary">📱 Responsive</Badge>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold mb-4">Features</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li className="flex items-center">
                                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                    Student Management
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                    Teacher Management
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                    Course Management
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                    Enrollment System
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold mb-4">Security</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li className="flex items-center">
                                    <Shield className="h-4 w-4 mr-2 text-blue-500" />
                                    Role-Based Access
                                </li>
                                <li className="flex items-center">
                                    <Shield className="h-4 w-4 mr-2 text-blue-500" />
                                    Audit Logging
                                </li>
                                <li className="flex items-center">
                                    <Shield className="h-4 w-4 mr-2 text-blue-500" />
                                    Data Encryption
                                </li>
                                <li className="flex items-center">
                                    <Shield className="h-4 w-4 mr-2 text-blue-500" />
                                    Secure File Upload
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                        <p>&copy; 2024 ERP School Management System. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}