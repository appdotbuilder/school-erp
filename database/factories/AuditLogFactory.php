<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AuditLog>
 */
class AuditLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'action' => fake()->randomElement(['create', 'update', 'delete']),
            'model_type' => fake()->randomElement(['Student', 'Teacher', 'Course', 'Enrollment']),
            'model_id' => fake()->numberBetween(1, 100),
            'old_data' => fake()->optional()->randomElements(['field1' => 'old_value']),
            'new_data' => fake()->optional()->randomElements(['field1' => 'new_value']),
            'ip_address' => fake()->ipv4(),
            'user_agent' => fake()->userAgent(),
        ];
    }
}