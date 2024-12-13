# Truck Request Application

This project implements a Truck Request Application with a React Native frontend and a Laravel backend. It allows users to register, log in, create truck requests, and view their dashboard. Admins can manage shipping requests through a web interface.

## Project Structure

Backend: The backend of the project is built using Laravel and is located in the backend directory.

Frontend: The frontend is developed with React Native and is stored in the frontend directory.

## Features

### Frontend
Frontend is in
- User registration and login
- Truck request form
- User dashboard

### Backend
- RESTful API for truck requests
- User authentication
- Admin functionality for managing shipping requests
- Admin can communicate to the customers via email
- Admin gets laravel notification (email) about the new request

---

## Requirements

- PHP 8.1
- Composer
- Node.js
- Laravel 10.x
- React Native environment setup (Expo CLI or React Native CLI)

---

## Backend Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   composer install
   ```

3. Set up the `.env` file:

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your database credentials and other configurations.

4. Generate an application key:

   ```bash
   php artisan key:generate
   ```

5. Run migrations:

   ```bash
   php artisan migrate
   ```

   Run Seeders

   php artisan db:seed --class=RoleSeeder (required)
   php artisan db:seed --class=AdminUserSeeder (required)
   php artisan db:seed --class=UserAndShippingRequestSeeder (optional)

6. Serve the application:

   ```bash
   php artisan serve
   ```

---

## Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   For React Native CLI, use:

   ```bash
   react-native run-android
   react-native run-ios
   ```
   For testing with Expo Go, scan the QR code in the terminal using the Expo Go app on your mobile device to preview the application.
---

## Seeders
`RoleSeeder` is required to set user roles

To ease the assignment reviewer’s testing process, the `AdminSeeder` creates a default admin user. The credentials are:

- **Email**: `admin@example.com`
- **Password**: `password`

You can modify these credentials in the `AdminSeeder` file if necessary. 
It is recommended to change admin user's credentials(valid email) so admin can receive notification email about new requesr 

Another `UserAndShippingRequestSeeder` is optional to have dummy users and shipping requests for the user ease.

---

## Middleware

### Role Middleware

This project uses a custom `RoleMiddleware` to ensure role-based access control for routes.

#### Example Usage:

- Protect admin routes:
  Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
      Route::get('/shipping-requests', [ShippingRequestController::class, 'index'])->name('shipping_requests.index');
  });

- Protect API routes based on roles:

  Route::middleware(['auth:sanctum', 'role:customer'])->group(function () {
      Route::apiResource('shipping-requests', ShippingRequestController::class);
  });
  ```

### Gates and Policies
This application uses Gates and Policies to implement fine-grained access control for shipping requests.

Policy Usage
A ShippingRequestPolicy is used to define user permissions for interacting with shipping requests. It ensures that users can only view or modify requests they own.

## Project Structure

### Frontend

- **`src`**: Contains all React Native components and screens
- **`api`**: API integration logic

### Backend

- **`app/Http/Controllers`**: API and admin controllers
- **`app/Http/Middleware`**: Custom middleware, including `RoleMiddleware`
- **`routes`**: Route definitions for web and API

---

## API Endpoints

### Authentication

- **POST** `/register` – Register a new user
- **POST** `/login` – Log in and retrieve a token
- **POST** `/logout` – Log out (requires `auth:sanctum` middleware)

### Shipping Requests

- **GET** `/shipping-requests` – List shipping requests (authenticated users)
- **POST** `/shipping-requests` – Create a new shipping request
- **GET** `/shipping-requests/{id}` – View details of a specific request

---

## Notes

- The project is tested on PHP 8.1 and Laravel 10.x.
- Ensure the correct environment variables are set in `.env` for both frontend and backend.

This version now mentions the use of Expo Go for testing the frontend in addition to the React Native CLI.

