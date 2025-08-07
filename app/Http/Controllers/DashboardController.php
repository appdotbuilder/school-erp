<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\Teacher;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the ERP dashboard.
     */
    public function index()
    {
        $stats = [
            'total_students' => Student::count(),
            'total_teachers' => Teacher::count(),
            'total_courses' => Course::count(),
            'total_enrollments' => Enrollment::count(),
            'active_students' => Student::where('status', 'active')->count(),
            'active_teachers' => Teacher::where('status', 'active')->count(),
            'active_courses' => Course::where('status', 'active')->count(),
        ];

        $recent_enrollments = Enrollment::with(['student', 'course'])
            ->latest()
            ->limit(10)
            ->get()
            ->map(function ($enrollment) {
                return [
                    'id' => $enrollment->id,
                    'student' => [
                        'full_name' => $enrollment->student->full_name,
                        'student_id' => $enrollment->student->student_id,
                    ],
                    'course' => [
                        'name' => $enrollment->course->name,
                        'course_code' => $enrollment->course->course_code,
                    ],
                    'enrollment_date' => $enrollment->enrollment_date->toDateString(),
                    'status' => $enrollment->status,
                ];
            });

        return Inertia::render('erp-dashboard', [
            'stats' => $stats,
            'recent_enrollments' => $recent_enrollments,
        ]);
    }
}