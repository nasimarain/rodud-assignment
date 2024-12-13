<?php
namespace App\Repositories;

use App\Models\ShippingRequest;
use App\Repositories\Interfaces\ShippingRequestRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class ShippingRequestRepository implements ShippingRequestRepositoryInterface
{
    public function getAllPaginated(int $perPage = 10): LengthAwarePaginator
    {
        return ShippingRequest::paginate($perPage);
    }

    public function getUserRequests($user, int $perPage = 10): LengthAwarePaginator
    {
        return ShippingRequest::where('user_id', $user->id)->paginate($perPage);
    }

    public function updateStatus(int $id, string $status): bool
    {
        $shippingRequest = ShippingRequest::findOrFail($id);
        $shippingRequest->status = $status;
        return $shippingRequest->save();
    }

    public function create(array $data)
    {
        return ShippingRequest::create($data);
    }

    public function getById(int $id): ShippingRequest
    {
        return ShippingRequest::with('user')->findOrFail($id);
    }
}
