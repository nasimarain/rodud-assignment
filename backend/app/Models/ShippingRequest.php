<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'pickup_location',
        'delivery_location', 
        'size', 
        'weight', 
        'pickup_time', 
        'delivery_time', 
        'status',
        'order_id'
    ];

    /**
     * Get the user that owns the shipping request.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}