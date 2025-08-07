<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Database\Seeder;

class ErpSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample students
        $students = Student::factory(50)
            ->state(['status' => 'active'])
            ->create();

        // Create some graduated and inactive students
        Student::factory(15)
            ->state(['status' => 'graduated'])
            ->create();

        Student::factory(5)
            ->state(['status' => 'inactive'])
            ->create();

        // Create sample teachers
        $teachers = Teacher::factory(20)
            ->state(['status' => 'active'])
            ->create();

        // Create some inactive teachers
        Teacher::factory(3)
            ->state(['status' => 'inactive'])
            ->create();

        // Create sample courses
        $courses = Course::factory(25)
            ->state(['status' => 'active'])
            ->create();

        // Create some inactive courses
        Course::factory(5)
            ->state(['status' => 'inactive'])
            ->create();

        // Assign teachers to courses
        $activeCourses = Course::where('status', 'active')->get();
        $activeTeachers = Teacher::where('status', 'active')->get();

        foreach ($activeCourses as $course) {
            // Assign 1-2 teachers per course
            $teachersToAssign = $activeTeachers->random(random_int(1, 2));
            
            foreach ($teachersToAssign as $index => $teacher) {
                $course->teachers()->attach($teacher->id, [
                    'role' => $index === 0 ? 'primary' : 'assistant',
                    'assigned_date' => now()->subDays(random_int(1, 365))->toDateString(),
                ]);
            }
        }

        // Create enrollments (students in courses)
        $activeStudents = Student::where('status', 'active')->get();
        
        foreach ($activeStudents as $student) {
            // Enroll each student in 2-6 courses
            $coursesToEnroll = $activeCourses->random(random_int(2, 6));
            
            foreach ($coursesToEnroll as $course) {
                // Avoid duplicate enrollments
                if (!$student->enrollments()->where('course_id', $course->id)->exists()) {
                    Enrollment::create([
                        'student_id' => $student->id,
                        'course_id' => $course->id,
                        'enrollment_date' => fake()->dateTimeBetween('-1 year', 'now')->format('Y-m-d'),
                        'status' => fake()->randomElement(['enrolled', 'completed', 'dropped']),
                        'grade' => fake()->optional(0.6)->randomFloat(2, 60, 100),
                        'notes' => fake()->optional(0.3)->sentence(),
                    ]);
                }
            }
        }
    }
}