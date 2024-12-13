@extends('layouts.admin')

@section('content')
    <div class="container">
        <h1>Shipping Requests</h1>

        @if(session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif
        @if(session('error'))
            <div class="alert alert-danger">{{ session('error') }}</div>
        @endif

        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Customer Email</th>
                    <th>Pickup Time</th>
                    <th>Delivery Time</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($shippingRequests as $request)
                    <tr>
                        <td>{{ $request->order_id }}</td>
                        <td>{{ $request->user->name }}</td>
                        <td>{{ $request->user->email }}</td>
                        <td>{{ $request->pickup_time }}</td>
                        <td>{{ $request->delivery_time }}</td>
                        <td>
                            <!-- Update Status Form -->
                            <form id="statusForm-{{ $request->id }}" action="{{ route('admin.shipping_requests.update_status', $request->id) }}" method="POST">
                                @csrf
                                @method('PATCH')
                                <select name="status" required>
                                    <option value="pending" @if($request->status == 'pending') selected @endif>Pending</option>
                                    <option value="in_progress" @if($request->status == 'in_progress') selected @endif>In Progress</option>
                                    <option value="delivered" @if($request->status == 'delivered') selected @endif>Delivered</option>
                                </select>
                                <button type="submit" class="btn btn-primary">Update</button>
                            </form>
                        </td>
                        <td>
                            <!-- View Request Button -->
                            <a href="{{ route('admin.shipping_requests.show', $request->id) }}" class="btn btn-info mt-2">View</a>
                            <!-- Send Email Button -->
                            <button class="btn btn-secondary mt-2" data-bs-toggle="modal" data-bs-target="#emailModal" 
                                    data-order-id="{{ $request->order_id }}"
                                    data-user-id="{{ $request->user->id }}">
                                Send Email
                            </button>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        
        {{ $shippingRequests->links('pagination::bootstrap-4') }}

    </div>
    <!-- Modal for sending email -->
    <div class="modal fade" id="emailModal" tabindex="-1" aria-labelledby="emailModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="emailModalLabel">Send Email</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="emailForm" method="POST" action="{{ route('admin.shipping_requests.send_email') }}">
                        @csrf
                        <input type="hidden" name="order_id" id="modalOrderId">
                        <input type="hidden" name="user_id" id="modalUserId">
                        <div class="mb-3">
                            <label for="subject" class="form-label">Subject</label>
                            <input type="text" class="form-control" id="subject" name="subject" rows="4" required>
                        </div>
                        <div class="mb-3">
                            <label for="message" class="form-label">Message</label>
                            <textarea class="form-control" id="message" name="message" rows="4" required></textarea>
                        </div>
                        <button type="button" class="btn btn-primary" id="sendEmailButton">Send Email</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
