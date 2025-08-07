<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\Student;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::with('enrollments.course')
            ->latest()
            ->paginate(15);
        
        return Inertia::render('students/index', [
            'students' => $students
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('students/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        $data = $request->validated();
        
        // Generate unique student ID
        $data['student_id'] = $this->generateStudentId();
        
        $student = Student::create($data);

        return redirect()->route('students.show', $student)
            ->with('success', 'Student created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        $student->load([
            'enrollments.course',
            'documents.uploadedBy'
        ]);
        
        return Inertia::render('students/show', [
            'student' => $student
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        return Inertia::render('students/edit', [
            'student' => $student
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        $student->update($request->validated());

        return redirect()->route('students.show', $student)
            ->with('success', 'Student updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->delete();

        return redirect()->route('students.index')
            ->with('success', 'Student deleted successfully.');
    }

    /**
     * Generate a unique student ID.
     *
     * @return string
     */
    protected function generateStudentId(): string
    {
        $year = date('Y');
        $prefix = 'STU' . $year;
        
        $lastStudent = Student::where('student_id', 'like', $prefix . '%')
            ->orderBy('student_id', 'desc')
            ->first();
        
        if (!$lastStudent) {
            return $prefix . '001';
        }
        
        $lastNumber = (int) substr($lastStudent->student_id, -3);
        $newNumber = str_pad((string)($lastNumber + 1), 3, '0', STR_PAD_LEFT);
        
        return $prefix . $newNumber;
    }
}