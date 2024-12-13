<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CustomerNotificationMail extends Mailable
{
    use Queueable, SerializesModels;
    public $user;
    public $subject;
    public $message;

    /**
     * Create a new message instance.
     */
    public function __construct($user, $subject, $message)
    {
        $this->user = $user;
        $this->subject = $subject;
        $this->message = $message;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->to($this->user->email)
            ->subject($this->subject)   
            ->view('emails.customer-notification')
            ->with([
                'user' => $this->user,
                'content' => $this->message,
        ]);
    }
}
