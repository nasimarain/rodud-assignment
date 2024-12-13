<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ShippingRequestStoreRequest;
use App\Services\ShippingRequestService;
use App\Services\BaseService;
use Illuminate\Http\Request;

class ShippingRequestController extends Controller
{
    protected $service;
    protected $baseService;

    public function __construct(ShippingRequestService $service, BaseService $baseService)
    {
        $this->service = $service;
        $this->baseService = $baseService;
    }

    /**
     * Display a listing of the user's shipping requests (dashboard view).
     */
    public function index(Request $request)
    {
        return $this->service->getUserRequests($request->user());
    }

    /**
     * Store a newly created shipping request.
     */
    public function store(ShippingRequestStoreRequest $request)
    {   
        return $this->service->storeRequest($request->validated(), $request->user());
    }

    /**
     * Display the specified shipping request.
     */
    public function show(int $id)
    {
        try {
            $shippingRequest = $this->service->getRequestById($id);
            // Use the policy for authorization else it throws an exception
            $this->authorize('view', $shippingRequest);

            return $this->baseService->sendSuccessResponseJson('Record retreived successfully',$shippingRequest);
        }catch (\Illuminate\Auth\Access\AuthorizationException $e) {
            return $this->baseService->sendErrorResponseJson('Unauthorized access',403);
        } catch (\Exception $e) {
            return $this->baseService->sendErrorResponseJson('An unexpected error occurred');
        }

    }
}
