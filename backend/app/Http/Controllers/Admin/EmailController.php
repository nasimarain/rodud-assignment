<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\EmailService;
use App\Services\BaseService;
use App\Http\Requests\SendEmailRequest;

class EmailController extends Controller
{
    protected $service;
    protected $baseService;

    public function __construct(EmailService $emailService, BaseService $baseService)
    {
        $this->service = $emailService;
        $this->baseService = $baseService;
    }

    public function sendEmail(SendEmailRequest $request)
    {
        try {
            $this->service->sendEmail($request->user_id, $request->subject, $request->message);
            return $this->baseService->sendSuccessResponseJson('Email sent successfully.');
        } catch (\Exception $e) {
            return $this->baseService->sendErrorResponseJson('Failed to send email');
        }

    }
}
