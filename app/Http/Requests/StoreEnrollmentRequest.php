<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreEnrollmentRequest extends FormRequest
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
            'student_id' => [
                'required',
                'exists:students,id',
                Rule::unique('enrollments')->where(function ($query) {
                    return $query->where('course_id', $this->course_id);
                })
            ],
            'course_id' => 'required|exists:courses,id',
            'status' => 'sometimes|in:enrolled,completed,dropped,failed',
            'grade' => 'nullable|numeric|min:0|max:100',
            'notes' => 'nullable|string',
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
            'student_id.required' => 'Please select a student.',
            'student_id.exists' => 'The selected student does not exist.',
            'student_id.unique' => 'This student is already enrolled in the selected course.',
            'course_id.required' => 'Please select a course.',
            'course_id.exists' => 'The selected course does not exist.',
            'grade.numeric' => 'Grade must be a number.',
            'grade.min' => 'Grade cannot be negative.',
            'grade.max' => 'Grade cannot exceed 100.',
        ];
    }
}