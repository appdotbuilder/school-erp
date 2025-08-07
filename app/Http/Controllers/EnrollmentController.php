<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEnrollmentRequest;
use App\Http\Requests\UpdateEnrollmentRequest;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Student;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $enrollments = Enrollment::with(['student', 'course'])
            ->latest()
            ->paginate(20);
        
        return Inertia::render('enrollments/index', [
            'enrollments' => $enrollments
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $students = Student::active()
            ->get(['id', 'student_id', 'first_name', 'last_name']);
            
        $courses = Course::active()
            ->get(['id', 'course_code', 'name']);
        
        return Inertia::render('enrollments/create', [
            'students' => $students,
            'courses' => $courses
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEnrollmentRequest $request)
    {
        $data = $request->validated();
        $data['enrollment_date'] = now()->toDateString();
        
        $enrollment = Enrollment::create($data);

        return redirect()->route('enrollments.show', $enrollment)
            ->with('success', 'Student enrolled successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Enrollment $enrollment)
    {
        $enrollment->load(['student', 'course']);
        
        return Inertia::render('enrollments/show', [
            'enrollment' => $enrollment
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Enrollment $enrollment)
    {
        $enrollment->load(['student', 'course']);
        
        return Inertia::render('enrollments/edit', [
            'enrollment' => $enrollment
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEnrollmentRequest $request, Enrollment $enrollment)
    {
        $enrollment->update($request->validated());

        return redirect()->route('enrollments.show', $enrollment)
            ->with('success', 'Enrollment updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Enrollment $enrollment)
    {
        $enrollment->delete();

        return redirect()->route('enrollments.index')
            ->with('success', 'Enrollment deleted successfully.');
    }
}