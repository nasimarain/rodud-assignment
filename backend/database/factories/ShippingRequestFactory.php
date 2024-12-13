<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\ShippingRequest;

class ShippingRequestFactory extends Factory
{
    protected $model = ShippingRequest::class;

    public function definition()
    {
        return [
            'user_id' => null, // Should be assigned when calling factory
            'pickup_location' => $this->faker->address(),
            'delivery_location' => $this->faker->address(),
            'size' => $this->faker->randomElement(['small', 'medium', 'large']),
            'weight' => $this->faker->randomFloat(2, 1, 100),
            'pickup_time' => $this->faker->dateTimeBetween('-1 week', 'now'),
            'delivery_time' => $this->faker->dateTimeBetween('now', '+1 week'),
            'status' => 'pending',
            'order_id' => generateOrderId(), 
        ];
    }
}
