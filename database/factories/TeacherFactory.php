<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Teacher>
 */
class TeacherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $departments = ['Mathematics', 'Science', 'English', 'History', 'Computer Science', 'Art', 'Music', 'Physical Education'];
        
        return [
            'teacher_id' => 'TEA' . date('Y') . str_pad((string)fake()->unique()->numberBetween(1, 999), 3, '0', STR_PAD_LEFT),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'department' => fake()->randomElement($departments),
            'specialization' => fake()->words(2, true),
            'salary' => fake()->numberBetween(40000, 120000),
            'hire_date' => fake()->dateTimeBetween('-10 years', '-1 year'),
            'status' => fake()->randomElement(['active', 'inactive', 'terminated']),
            'bio' => fake()->paragraph(),
        ];
    }
}