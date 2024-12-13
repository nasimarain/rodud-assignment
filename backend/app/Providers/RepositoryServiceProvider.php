<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Interfaces\ShippingRequestRepositoryInterface;
use App\Repositories\ShippingRequestRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(ShippingRequestRepositoryInterface::class, ShippingRequestRepository::class);
    }

    public function boot()
    {
        //
    }
}
