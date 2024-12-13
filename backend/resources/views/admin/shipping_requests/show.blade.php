@extends('layouts.admin')

@section('content')
<div class="container">
    <h1>Shipping Request Details</h1>
    <table class="table table-bordered">
        <tr>
            <th>Order ID</th>
            <td>{{ $shippingRequest->order_id }}</td>
        </tr>
        <tr>
            <th>Customer Name</th>
            <td>{{ $shippingRequest->user->name }}</td>
        </tr>
        <tr>
            <th>Pickup Time</th>
            <td>{{ $shippingRequest->pickup_time }}</td>
        </tr>
        <tr>
            <th>Delivery Time</th>
            <td>{{ $shippingRequest->delivery_time }}</td>
        </tr>
        <tr>
            <th>Status</th>
            <td>{{ $shippingRequest->status }}</td>
        </tr>
    </table>

    <a href="{{ route('admin.shipping_requests.index') }}" class="btn btn-primary">Back to List</a>
</div>
@endsection
