<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('course_code')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('credits');
            $table->string('department');
            $table->integer('max_students')->default(30);
            $table->decimal('fee', 8, 2);
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->json('schedule')->nullable()->comment('Days and times for the course');
            $table->text('prerequisites')->nullable();
            $table->timestamps();
            
            $table->index('course_code');
            $table->index('department');
            $table->index('status');
            $table->index(['department', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};