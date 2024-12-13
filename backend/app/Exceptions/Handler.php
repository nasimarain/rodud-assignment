<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Routing\Exceptions\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Response; // Add this for Response constants
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the input types that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for your application.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Throwable $exception)
    {
        
        // Handle ModelNotFoundException
        if ($exception instanceof ModelNotFoundException) {
            return response()->json(['error' => 'Resource not found'], Response::HTTP_NOT_FOUND);
        }

        // Handle ValidationException
        if ($exception instanceof ValidationException) {
            return response()->json([
                'errors' => $exception->errors(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Handle AuthorizationException
        if ($exception instanceof AuthorizationException) {
            return response()->json(['error' => 'Unauthorized'], Response::HTTP_FORBIDDEN);
        }

        // Handle AuthenticationException
        if ($exception instanceof AuthenticationException) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Your session has expired. Please log in again.'], Response::HTTP_UNAUTHORIZED);
            }
            return redirect()->route('login')->with('error', 'Your session has expired. Please log in again.');
        }

        // Handle MethodNotAllowedHttpException
        if ($exception instanceof MethodNotAllowedHttpException) {
            return response()->json(['error' => 'Method Not Allowed'], Response::HTTP_METHOD_NOT_ALLOWED);
        }

        // Handle NotFoundHttpException
        if ($exception instanceof NotFoundHttpException) {
            return response()->json(['error' => 'Not Found'], Response::HTTP_NOT_FOUND);
        }

        // Handle QueryException (Database errors)
        if ($exception instanceof QueryException) {
            return response()->json(['error' => 'Database error', 'message' => $exception->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        if ($exception instanceof \TypeError) {
            if ($request->expectsJson()) {
                return response()->json(['error' => 'Data Type Error', 'message' => $exception->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
            return redirect()->back()->with('error', 'Invalid data type');
        }
    
        // Handle General Exception
        if ($exception instanceof Exception) {
            return response()->json(['error' => 'An unexpected error occurred', 'message' => $exception->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        // If the request is not expecting JSON, return a 500 response
        if (!$request->expectsJson()) {
            return response()->view('errors.500', ['message' => 'Something went wrong on our end. Please try again later.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        // Fallback to default rendering
        return parent::render($request, $exception);
    }
}
