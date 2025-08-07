<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Welcome page
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Main ERP Dashboard (replace the default dashboard)
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// ERP Modules - Protected routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Student Management
    Route::resource('students', StudentController::class);
    
    // Teacher Management  
    Route::resource('teachers', TeacherController::class);
    
    // Course Management
    Route::resource('courses', CourseController::class);
    
    // Enrollment Management
    Route::resource('enrollments', EnrollmentController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
