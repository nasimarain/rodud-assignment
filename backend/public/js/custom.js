// This file contains custom JavaScript code that is used in the backend of the application.

document.addEventListener('DOMContentLoaded', function () {
    const emailModal = document.getElementById('emailModal');
    const modalOrderId = document.getElementById('modalOrderId');
    const modalUserId = document.getElementById('modalUserId');
    const emailForm = document.getElementById('emailForm');
    
    // When the "Send Email" button is clicked, pass the order_id and user_email to the modal
    document.querySelectorAll('.btn-secondary[data-bs-toggle="modal"]').forEach(button => {
        button.addEventListener('click', () => {
            const orderId = button.getAttribute('data-order-id');
            const userId = button.getAttribute('data-user-id');
            const sendEmailButton = document.getElementById('sendEmailButton');

            modalOrderId.value = orderId;
            modalUserId.value = userId;
            emailForm.reset();
    
        });
    });
    
    // When the "Send Email" button is clicked, send the email
    sendEmailButton.addEventListener('click', function () {
        // Gather form data
        const orderId = document.getElementById('modalOrderId').value;
        const userId = document.getElementById('modalUserId').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validation
        if (!message.trim() || !subject.trim()) {
            alert('Please enter a subject/message before sending.');
            return;
        }

        const emailFormData = new FormData(emailForm);
        // AJAX Request
        fetch(emailForm.getAttribute('action'), {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': '{{ csrf_token() }}',
            },
            body: emailFormData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Something went wrong please try again later.');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Email sent successfully!');
                //Close the modal
                const modalElement = document.querySelector('#emailModal');
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                modalInstance.hide();
            } else {
                alert('Failed to send email: ' + data.message);
            }
        })
        .catch(error => {
            alert('An error occurred while sending the email.');
        });
    });

    // When the status form is submitted, update the status via AJAX
    document.querySelectorAll('form[id^="statusForm-"]').forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission

            const formData = new FormData(form); // Gather form data
            // Perform the AJAX request
            fetch(form.getAttribute('action'), {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': '{{ csrf_token() }}',
                },
                body: formData, // Send the form data
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Update the status and show a success message
                    alert('Status updated successfully!');
                } else {
                    alert('Failed to update status: ' + data.message);
                }
            })
            .catch(error => {
                alert('An error occurred while updating the status.');
            });
        });
    });
});