<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Document>
 */
class DocumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true) . '.pdf',
            'file_path' => 'documents/' . fake()->uuid() . '.pdf',
            'file_type' => fake()->randomElement(['application/pdf', 'image/jpeg', 'image/png', 'text/plain']),
            'file_size' => fake()->numberBetween(1024, 5242880), // 1KB to 5MB
            'documentable_type' => fake()->randomElement(['App\Models\Student', 'App\Models\Teacher', 'App\Models\Course']),
            'documentable_id' => fake()->numberBetween(1, 50),
            'uploaded_by' => User::factory(),
            'description' => fake()->optional()->sentence(),
        ];
    }
}