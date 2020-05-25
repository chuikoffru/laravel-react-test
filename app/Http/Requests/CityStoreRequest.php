<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CityStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'bail|required|unique:cities|max:100',
            'population' => 'bail|required',
            'lat' => 'bail|required|regex:/^([-+]?)([\d]{1,2})(\.)(\d{6,10})/',
            'lng' => 'bail|required|regex:/^([-+]?)([\d]{1,3})(\.)(\d{6,10})/'
        ];
    }

    /**
     * Custom message for validation
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required' => 'Имя обязательно для заполнения',
            'name.unique' => 'Такой город уже есть в списке',
            'name.max' => 'Максимум символов: 100',
            'population.required' => 'Численность населения обязательна для заполнения',
            'lat.required' => 'Широта обязательная для заполнения',
            'lng.required' => 'Долгота обязательная для заполнения',
            'lat.regex' => 'Широта указана не верно',
            'lng.regex' => 'Долгота указана не верно'
        ];
    }
}
