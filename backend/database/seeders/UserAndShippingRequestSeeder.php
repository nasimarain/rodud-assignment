<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\ShippingRequest;

class UserAndShippingRequestSeeder extends Seeder
{
    public function run()
    {
        // Create dummy users using a factory
        $users = User::factory()->count(2)->create();

        // Create shipping requests for each user using a factory
        $users->each(function ($user) {
            ShippingRequest::factory()->count(1)->create([
                'user_id' => $user->id
            ]);
        });
    }
}
