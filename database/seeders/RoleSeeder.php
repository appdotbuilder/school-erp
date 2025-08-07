<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'administrator',
                'display_name' => 'Administrator',
                'description' => 'Full system access with all administrative privileges'
            ],
            [
                'name' => 'teacher',
                'display_name' => 'Teacher',
                'description' => 'Access to teaching-related features and student management'
            ],
            [
                'name' => 'student',
                'display_name' => 'Student',
                'description' => 'Limited access to personal academic information'
            ]
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(
                ['name' => $role['name']],
                $role
            );
        }
    }
}