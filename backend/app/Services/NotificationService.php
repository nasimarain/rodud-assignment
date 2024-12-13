<?php

namespace App\Services;

use App\Models\User;
use App\Notifications\NewShippingRequestNotification;
use Illuminate\Support\Facades\Notification;

class NotificationService
{
    public function sendNewShippingRequestNotification($shippingRequest)
    {
        // Get the admin user(s)
        $adminUsers = User::GetAdminUser()->get();

        // Send notification to admin user
        Notification::send($adminUsers, new NewShippingRequestNotification($shippingRequest));
    }
}
