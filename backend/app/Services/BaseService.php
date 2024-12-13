<?php
namespace App\Services;

use Symfony\Component\HttpFoundation\Response;

class BaseService
{

    public function sendSuccessResponseJson($message = 'Record saved successfully', $data = [], $code = Response::HTTP_OK): \Illuminate\Http\JsonResponse
    {
        return response()->json(['success' => true, 'data' => $data,'message' => $message], $code);
    }
 
    public function sendErrorResponseJson($message = '', $code = Response::HTTP_NOT_FOUND): \Illuminate\Http\JsonResponse
    {
        return response()->json(['success' => false,'message' => $message], $code);
    }
}
