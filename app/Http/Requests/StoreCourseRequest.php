<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'course_code' => 'sometimes|string|unique:courses,course_code|max:20',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'credits' => 'required|integer|min:1|max:10',
            'department' => 'required|string|max:255',
            'max_students' => 'required|integer|min:1|max:200',
            'fee' => 'required|numeric|min:0',
            'status' => 'sometimes|in:active,inactive',
            'schedule' => 'nullable|array',
            'prerequisites' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Course name is required.',
            'credits.required' => 'Credits are required.',
            'credits.integer' => 'Credits must be a number.',
            'credits.min' => 'Credits must be at least 1.',
            'credits.max' => 'Credits cannot exceed 10.',
            'department.required' => 'Department is required.',
            'max_students.required' => 'Maximum students limit is required.',
            'max_students.integer' => 'Maximum students must be a number.',
            'max_students.min' => 'Maximum students must be at least 1.',
            'max_students.max' => 'Maximum students cannot exceed 200.',
            'fee.required' => 'Course fee is required.',
            'fee.numeric' => 'Fee must be a number.',
            'fee.min' => 'Fee cannot be negative.',
            'course_code.unique' => 'This course code is already taken.',
        ];
    }
}