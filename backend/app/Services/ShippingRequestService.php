<?php
namespace App\Services;

use App\Repositories\Interfaces\ShippingRequestRepositoryInterface;
use App\Services\NotificationService;
use Symfony\Component\HttpFoundation\Response;
use App\Utils\OrderUtils;
use Illuminate\Support\Facades\Log;

class ShippingRequestService extends BaseService
{
    protected $repository;
    protected $notificationService;

    public function __construct(ShippingRequestRepositoryInterface $repository,NotificationService $notificationService)
    {
        $this->repository = $repository;
        $this->notificationService = $notificationService;
    }

    public function getAllRequests(int $perPage = 10)
    {
        return $this->repository->getAllPaginated($perPage);
    }

    public function getUserRequests($user)
    {
        return $this->repository->getUserRequests($user);
    }

    public function storeRequest(array $data, $user)
    {
        try {
            $data['user_id'] = $user->id;
            $data['order_id'] = OrderUtils::generateOrderId();

            $data['pickup_time'] = \Carbon\Carbon::parse($data['pickup_time'])->format('Y-m-d H:i:s');
            $data['delivery_time'] = \Carbon\Carbon::parse($data['delivery_time'])->format('Y-m-d H:i:s');

            $shippingRequest = $this->repository->create($data);

            // If record is successfully created, return success response
            if ($shippingRequest) {
                // Send notification to the admin
                $this->notificationService->sendNewShippingRequestNotification($shippingRequest);
                return $this->sendSuccessResponseJson('Shipping request created successfully');
            }

            // If the record creation fails, return error response
            return $this->sendErrorResponseJson('Failed to create shipping request', Response::HTTP_BAD_REQUEST);

        } catch (\Exception $e) {
            Log::error('Error creating shipping request: ' . $e->getMessage());

            return $this->sendErrorResponseJson('An unexpected error occurred', Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateRequestStatus(int $id, string $status) 
    {
        try {
            $this->repository->updateStatus($id, $status);
            return $this->sendSuccessResponseJson('Status updated successfully.');
        } catch (\Exception $e) {
            return $this->sendErrorResponseJson('An unexpected error occurred');
        }
    }

    public function getRequestById(int $id)
    {
        return $this->repository->getById($id);
    }
}
