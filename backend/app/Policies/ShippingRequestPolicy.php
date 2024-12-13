<?php

namespace App\Policies;

use App\Models\ShippingRequest;
use App\Models\User;

class ShippingRequestPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function view(User $user, ShippingRequest $shippingRequest)
    {
        return $shippingRequest->user_id === $user->id;
    }
}
