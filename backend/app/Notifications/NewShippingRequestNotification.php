<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Bus\Queueable;

class NewShippingRequestNotification extends Notification implements ShouldQueue
{
    use Queueable;
    public $shippingRequest;

    public function __construct($shippingRequest)
    {
        $this->shippingRequest = $shippingRequest;
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('New Shipping Request Created')
            ->line('A new shipping request has been created.')
            ->action('View Request', url('/admin/shipping-requests/' . $this->shippingRequest->id))
            ->line('Thank you for using our application!');
    }

    public function toDatabase($notifiable)
    {
        return [
            'message' => 'A new shipping request has been created.',
            'shipping_request_id' => $this->shippingRequest->id,
        ];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'message' => 'A new shipping request has been created.',
            'shipping_request_id' => $this->shippingRequest->id,
        ]);
    }
}
