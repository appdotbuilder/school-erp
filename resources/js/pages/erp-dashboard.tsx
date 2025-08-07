import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { router } from '@inertiajs/react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  ClipboardList,
  Plus,
  TrendingUp,
  BarChart3,
  Calendar
} from 'lucide-react';

interface Props {
    stats: {
        total_students: number;
        total_teachers: number;
        total_courses: number;
        total_enrollments: number;
        active_students: number;
        active_teachers: number;
        active_courses: number;
    };
    recent_enrollments: Array<{
        id: number;
        student: {
            full_name: string;
            student_id: string;
        };
        course: {
            name: string;
            course_code: string;
        };
        enrollment_date: string;
        status: string;
    }>;
    [key: string]: unknown;
}

export default function ErpDashboard({ stats, recent_enrollments }: Props) {
    const handleNavigate = (route: string) => {
        router.get(route);
    };

    const quickActions = [
        {
            label: 'Add Student',
            route: '/students/create',
            icon: Users,
            color: 'bg-blue-500 hover:bg-blue-600'
        },
        {
            label: 'Add Teacher',
            route: '/teachers/create',
            icon: GraduationCap,
            color: 'bg-green-500 hover:bg-green-600'
        },
        {
            label: 'Add Course',
            route: '/courses/create',
            icon: BookOpen,
            color: 'bg-purple-500 hover:bg-purple-600'
        },
        {
            label: 'New Enrollment',
            route: '/enrollments/create',
            icon: ClipboardList,
            color: 'bg-orange-500 hover:bg-orange-600'
        }
    ];

    const modules = [
        {
            title: 'Student Management',
            description: 'Manage student records, profiles, and academic information',
            route: '/students',
            icon: Users,
            count: stats.total_students,
            active: stats.active_students,
            color: 'text-blue-600'
        },
        {
            title: 'Teacher Management',
            description: 'Manage teacher profiles, assignments, and departments',
            route: '/teachers',
            icon: GraduationCap,
            count: stats.total_teachers,
            active: stats.active_teachers,
            color: 'text-green-600'
        },
        {
            title: 'Course Management',
            description: 'Create and manage courses, schedules, and requirements',
            route: '/courses',
            icon: BookOpen,
            count: stats.total_courses,
            active: stats.active_courses,
            color: 'text-purple-600'
        },
        {
            title: 'Enrollment Management',
            description: 'Handle student enrollments and course assignments',
            route: '/enrollments',
            icon: ClipboardList,
            count: stats.total_enrollments,
            active: stats.total_enrollments,
            color: 'text-orange-600'
        }
    ];

    return (
        <AppShell>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">🏫 ERP School Management</h1>
                        <p className="text-muted-foreground mt-2">
                            Comprehensive school administration system
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                            {new Date().toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </span>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action) => {
                        const Icon = action.icon;
                        return (
                            <Button
                                key={action.route}
                                onClick={() => handleNavigate(action.route)}
                                className={`h-16 ${action.color} text-white flex items-center gap-3 text-left justify-start`}
                            >
                                <Icon className="h-6 w-6" />
                                <div>
                                    <div className="font-medium">{action.label}</div>
                                    <div className="text-xs opacity-90">Quick Add</div>
                                </div>
                            </Button>
                        );
                    })}
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-2xl font-bold text-blue-600">
                                {stats.total_students}
                            </CardTitle>
                            <CardDescription>Total Students</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                                <span className="text-sm text-green-600 font-medium">
                                    {stats.active_students} Active
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-2xl font-bold text-green-600">
                                {stats.total_teachers}
                            </CardTitle>
                            <CardDescription>Total Teachers</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                                <span className="text-sm text-green-600 font-medium">
                                    {stats.active_teachers} Active
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-2xl font-bold text-purple-600">
                                {stats.total_courses}
                            </CardTitle>
                            <CardDescription>Total Courses</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4 text-green-600" />
                                <span className="text-sm text-green-600 font-medium">
                                    {stats.active_courses} Active
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-2xl font-bold text-orange-600">
                                {stats.total_enrollments}
                            </CardTitle>
                            <CardDescription>Total Enrollments</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <ClipboardList className="h-4 w-4 text-blue-600" />
                                <span className="text-sm text-blue-600 font-medium">
                                    This Academic Year
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Modules */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {modules.map((module) => {
                        const Icon = module.icon;
                        return (
                            <Card key={module.route} className="hover:shadow-lg transition-shadow cursor-pointer">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <Icon className={`h-8 w-8 ${module.color}`} />
                                        <div className="flex-1">
                                            <CardTitle className="text-xl">{module.title}</CardTitle>
                                            <CardDescription className="mt-1">
                                                {module.description}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold">{module.count}</div>
                                                <div className="text-xs text-muted-foreground">Total</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-green-600">{module.active}</div>
                                                <div className="text-xs text-muted-foreground">Active</div>
                                            </div>
                                        </div>
                                        <Button 
                                            onClick={() => handleNavigate(module.route)}
                                            variant="outline"
                                        >
                                            Manage
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Recent Enrollments */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ClipboardList className="h-5 w-5" />
                            Recent Enrollments
                        </CardTitle>
                        <CardDescription>Latest student course enrollments</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {recent_enrollments.length > 0 ? (
                            <div className="space-y-4">
                                {recent_enrollments.slice(0, 5).map((enrollment) => (
                                    <div key={enrollment.id} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <Users className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium">
                                                    {enrollment.student.full_name}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {enrollment.student.student_id}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-medium">
                                                {enrollment.course.name}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {enrollment.course.course_code}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Badge 
                                                variant={enrollment.status === 'enrolled' ? 'default' : 'secondary'}
                                            >
                                                {enrollment.status}
                                            </Badge>
                                            <div className="text-xs text-muted-foreground mt-1">
                                                {new Date(enrollment.enrollment_date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                <ClipboardList className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>No recent enrollments found</p>
                                <Button
                                    onClick={() => handleNavigate('/enrollments/create')}
                                    className="mt-4"
                                    variant="outline"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create First Enrollment
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}