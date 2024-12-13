<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;
use App\Mail\CustomerNotificationMail;
use App\Models\User;

class EmailService
{
    // Send an email to the user
    public function sendEmail($userId, $subject ,$message)
    {
        try{
            $user = User::findOrfail($userId);
            Mail::to($user->email)->send(new CustomerNotificationMail($user, $subject ,$message));
        }catch(\Exception $e){
            throw new \Exception($e->getMessage());
        }
        
    }
}
