<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Course;
use App\Models\Teacher;
use Inertia\Inertia;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::with(['teachers', 'enrollments.student'])
            ->latest()
            ->paginate(15);
        
        return Inertia::render('courses/index', [
            'courses' => $courses
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $teachers = Teacher::active()->get(['id', 'first_name', 'last_name']);
        
        return Inertia::render('courses/create', [
            'teachers' => $teachers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        $data = $request->validated();
        
        // Generate unique course code
        if (!isset($data['course_code'])) {
            $data['course_code'] = $this->generateCourseCode($data['department']);
        }
        
        $course = Course::create($data);

        return redirect()->route('courses.show', $course)
            ->with('success', 'Course created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        $course->load([
            'teachers',
            'enrollments.student',
            'documents.uploadedBy'
        ]);
        
        return Inertia::render('courses/show', [
            'course' => $course
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        $teachers = Teacher::active()->get(['id', 'first_name', 'last_name']);
        
        return Inertia::render('courses/edit', [
            'course' => $course,
            'teachers' => $teachers
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course)
    {
        $course->update($request->validated());

        return redirect()->route('courses.show', $course)
            ->with('success', 'Course updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $course->delete();

        return redirect()->route('courses.index')
            ->with('success', 'Course deleted successfully.');
    }

    /**
     * Generate a unique course code.
     *
     * @param string $department
     * @return string
     */
    protected function generateCourseCode(string $department): string
    {
        $departmentCode = strtoupper(substr($department, 0, 3));
        $year = date('Y');
        
        $lastCourse = Course::where('course_code', 'like', $departmentCode . $year . '%')
            ->orderBy('course_code', 'desc')
            ->first();
        
        if (!$lastCourse) {
            return $departmentCode . $year . '001';
        }
        
        $lastNumber = (int) substr($lastCourse->course_code, -3);
        $newNumber = str_pad((string)($lastNumber + 1), 3, '0', STR_PAD_LEFT);
        
        return $departmentCode . $year . $newNumber;
    }
}