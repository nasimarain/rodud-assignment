<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShippingRequestStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // You can modify this to check user authorization logic if needed
        return true; // For now, returning true means the user is authorized to make the request
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'pickup_location' => 'required|string|max:255',
            'delivery_location' => 'required|string|max:255',
            'size' => 'required|string|max:100',
            'weight' => 'required|numeric|min:0',
            'pickup_time' => 'required|date|after_or_equal:now',
            'delivery_time' => 'required|date|after:pickup_time',
        ];
    }

    /**
     * Get the custom attributes for the validator errors.
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'location' => 'Shipping location',
            'size' => 'Shipment size',
            'weight' => 'Shipment weight',
            'pickup_time' => 'Pickup time',
            'delivery_time' => 'Delivery time',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'location.required' => 'Please provide the shipping location.',
            'size.required' => 'Please specify the size of the cargo.',
            'weight.required' => 'Please provide the weight of the cargo.',
            'pickup_time.required' => 'Please select a pickup time.',
            'pickup_time.after_or_equal' => 'Pickup time must be a future date.',
            'delivery_time.required' => 'Please select a delivery time.',
            'delivery_time.after' => 'Delivery time must be after the pickup time.',
        ];
    }
}
