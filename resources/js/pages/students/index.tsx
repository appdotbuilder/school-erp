import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { router } from '@inertiajs/react';
import { Plus, Users, Mail, Phone, Calendar } from 'lucide-react';

interface Student {
    id: number;
    student_id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    phone: string | null;
    date_of_birth: string;
    enrollment_date: string;
    status: string;
    enrollments_count?: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
}

interface Props {
    students: {
        data: Student[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    [key: string]: unknown;
}

export default function StudentsIndex({ students }: Props) {
    const handleCreateNew = () => {
        router.get('/students/create');
    };

    const handleViewStudent = (studentId: number) => {
        router.get(`/students/${studentId}`);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'graduated':
                return 'bg-blue-100 text-blue-800';
            case 'inactive':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <Users className="h-8 w-8 text-blue-600" />
                            Student Management
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Manage student records and academic information
                        </p>
                    </div>
                    <Button onClick={handleCreateNew} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Student
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-2xl font-bold text-blue-600">
                                {students.meta.total}
                            </CardTitle>
                            <CardDescription>Total Students</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-2xl font-bold text-green-600">
                                {students.data.filter(s => s.status === 'active').length}
                            </CardTitle>
                            <CardDescription>Active Students</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-2xl font-bold text-purple-600">
                                {students.data.filter(s => s.status === 'graduated').length}
                            </CardTitle>
                            <CardDescription>Graduated Students</CardDescription>
                        </CardHeader>
                    </Card>
                </div>

                {/* Students List */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Students</CardTitle>
                        <CardDescription>
                            Complete list of all registered students
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {students.data.length > 0 ? (
                            <div className="space-y-4">
                                {students.data.map((student) => (
                                    <div 
                                        key={student.id} 
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                        onClick={() => handleViewStudent(student.id)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                                <Users className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-lg">
                                                    {student.full_name || `${student.first_name} ${student.last_name}`}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    ID: {student.student_id}
                                                </div>
                                                <div className="flex items-center gap-4 mt-1">
                                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                                        <Mail className="h-3 w-3" />
                                                        {student.email}
                                                    </div>
                                                    {student.phone && (
                                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                                            <Phone className="h-3 w-3" />
                                                            {student.phone}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Badge 
                                                variant="secondary"
                                                className={getStatusColor(student.status)}
                                            >
                                                {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                                            </Badge>
                                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                                                <Calendar className="h-3 w-3" />
                                                Enrolled: {new Date(student.enrollment_date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Users className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    No students found
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Get started by adding your first student to the system.
                                </p>
                                <Button onClick={handleCreateNew}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add First Student
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {students.links && students.links.length > 3 && (
                    <div className="flex justify-center gap-2">
                        {students.links.map((link: PaginationLink, index: number) => (
                            <Button
                                key={index}
                                variant={link.active ? "default" : "outline"}
                                size="sm"
                                onClick={() => link.url && router.get(link.url)}
                                disabled={!link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}