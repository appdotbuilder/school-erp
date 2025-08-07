<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $departments = ['Mathematics', 'Science', 'English', 'History', 'Computer Science', 'Art', 'Music', 'Physical Education'];
        $department = fake()->randomElement($departments);
        $departmentCode = strtoupper(substr($department, 0, 3));
        
        return [
            'course_code' => $departmentCode . date('Y') . str_pad((string)fake()->unique()->numberBetween(1, 999), 3, '0', STR_PAD_LEFT),
            'name' => fake()->words(3, true) . ' Course',
            'description' => fake()->paragraph(),
            'credits' => fake()->numberBetween(1, 6),
            'department' => $department,
            'max_students' => fake()->numberBetween(15, 50),
            'fee' => fake()->numberBetween(500, 5000),
            'status' => fake()->randomElement(['active', 'inactive']),
            'schedule' => [
                'days' => fake()->randomElements(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], random_int(1, 3)),
                'time' => fake()->time('H:i') . ' - ' . fake()->time('H:i'),
                'room' => 'Room ' . fake()->numberBetween(101, 501)
            ],
            'prerequisites' => fake()->optional()->words(5, true),
        ];
    }
}