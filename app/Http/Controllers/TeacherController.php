<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;
use App\Models\Teacher;
use Inertia\Inertia;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teachers = Teacher::with('courses')
            ->latest()
            ->paginate(15);
        
        return Inertia::render('teachers/index', [
            'teachers' => $teachers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('teachers/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeacherRequest $request)
    {
        $data = $request->validated();
        
        // Generate unique teacher ID
        $data['teacher_id'] = $this->generateTeacherId();
        
        $teacher = Teacher::create($data);

        return redirect()->route('teachers.show', $teacher)
            ->with('success', 'Teacher created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Teacher $teacher)
    {
        $teacher->load([
            'courses',
            'documents.uploadedBy'
        ]);
        
        return Inertia::render('teachers/show', [
            'teacher' => $teacher
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Teacher $teacher)
    {
        return Inertia::render('teachers/edit', [
            'teacher' => $teacher
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeacherRequest $request, Teacher $teacher)
    {
        $teacher->update($request->validated());

        return redirect()->route('teachers.show', $teacher)
            ->with('success', 'Teacher updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Teacher $teacher)
    {
        $teacher->delete();

        return redirect()->route('teachers.index')
            ->with('success', 'Teacher deleted successfully.');
    }

    /**
     * Generate a unique teacher ID.
     *
     * @return string
     */
    protected function generateTeacherId(): string
    {
        $year = date('Y');
        $prefix = 'TEA' . $year;
        
        $lastTeacher = Teacher::where('teacher_id', 'like', $prefix . '%')
            ->orderBy('teacher_id', 'desc')
            ->first();
        
        if (!$lastTeacher) {
            return $prefix . '001';
        }
        
        $lastNumber = (int) substr($lastTeacher->teacher_id, -3);
        $newNumber = str_pad((string)($lastNumber + 1), 3, '0', STR_PAD_LEFT);
        
        return $prefix . $newNumber;
    }
}