<?php
namespace App\Repositories\Interfaces;

use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\User;

interface ShippingRequestRepositoryInterface
{
    public function getAllPaginated(int $perPage = 10): LengthAwarePaginator;
    public function getUserRequests(User $user, int $perPage = 10);
    public function create(array $data);
    public function updateStatus(int $id, string $status): bool;
    public function getById(int $id);
}
