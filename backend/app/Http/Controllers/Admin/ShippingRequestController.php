<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ShippingRequestService;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateStatusRequest;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class ShippingRequestController extends Controller
{
    protected $service;

    public function __construct(ShippingRequestService $service)
    {
        $this->service = $service;
    }

    public function index()
    {  
        $shippingRequests = $this->service->getAllRequests();
        return view('admin.shipping_requests.index', compact('shippingRequests'));
    }

    public function show(int $id)
    {
        try {
            $shippingRequest = $this->service->getRequestById($id);
            return view('admin.shipping_requests.show', compact('shippingRequest'));
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An unexpected error occurred');
        }
    }

    public function updateStatus(UpdateStatusRequest $request, $id)
    {
        return $this->service->updateRequestStatus($id, $request->status);
    }

}
