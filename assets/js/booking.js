// Booking Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('bookingModal');
    const openBtn = document.getElementById('openBooking');
    const closeBtn = document.getElementById('closeModal');
    const bookingForm = document.getElementById('bookingForm');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const confirmationDiv = document.getElementById('bookingConfirmation');

    // Set minimum date for check-in to today
    const today = new Date().toISOString().split('T')[0];
    checkInInput.min = today;

    // Update check-out minimum date when check-in is selected
    checkInInput.addEventListener('change', function() {
        checkOutInput.min = checkInInput.value;
        if (checkOutInput.value && checkOutInput.value < checkInInput.value) {
            checkOutInput.value = checkInInput.value;
        }
    });

    // Close confirmation function
    window.closeConfirmation = function() {
        confirmationDiv.classList.remove('show');
    };

    // Open modal
    openBtn.addEventListener('click', function() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close modal functions
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Close confirmation function
    window.closeConfirmation = function() {
        const confirmation = document.getElementById('bookingConfirmation');
        confirmation.classList.remove('show');
    }

    // Handle form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const formData = {
            destination: document.getElementById('destination').value,
            checkIn: document.getElementById('checkIn').value,
            checkOut: document.getElementById('checkOut').value,
            adults: document.getElementById('adults').value,
            children: document.getElementById('children').value,
            tourType: document.getElementById('tourType').value
        };

        // Format dates
        const checkInDate = new Date(formData.checkIn);
        const checkOutDate = new Date(formData.checkOut);
        const formattedCheckIn = checkInDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        const formattedCheckOut = checkOutDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        // Calculate price
        const basePrice = 100;
        const days = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        const totalPrice = basePrice * days * (parseInt(formData.adults) + parseInt(formData.children) * 0.5);

        // Get confirmation elements
        const confirmationElement = document.getElementById('bookingConfirmation');
        const confirmationContent = document.querySelector('.confirmation-content');

        // Update confirmation content
        confirmationContent.innerHTML = `
            <ion-icon name="checkmark-circle-outline" class="confirmation-icon"></ion-icon>
            <div class="confirmation-title">Booking Confirmed!</div>
            <div class="confirmation-message">Great choice! Your amazing journey awaits.</div>
            <div class="booking-summary">
                <div class="summary-header">Booking Details</div>
                <div class="summary-details">
                    <div class="detail-item">
                        <ion-icon name="location-outline"></ion-icon>
                        <span>${formData.destination.charAt(0).toUpperCase() + formData.destination.slice(1)}</span>
                    </div>
                    <div class="detail-item">
                        <ion-icon name="calendar-outline"></ion-icon>
                        <span>${formattedCheckIn} - ${formattedCheckOut}</span>
                    </div>
                    <div class="detail-item">
                        <ion-icon name="people-outline"></ion-icon>
                        <span>${formData.adults} ${formData.adults > 1 ? 'Adults' : 'Adult'}${formData.children > 0 ? `, ${formData.children} ${formData.children > 1 ? 'Children' : 'Child'}` : ''}</span>
                    </div>
                    <div class="detail-item">
                        <ion-icon name="airplane-outline"></ion-icon>
                        <span>${formData.tourType}</span>
                    </div>
                </div>
                <div class="price-summary">
                    <div class="total-price">Total Amount: $${totalPrice}</div>
                </div>
            </div>
            <div class="confirmation-footer">
                <p class="email-notification">
                    <ion-icon name="mail-outline"></ion-icon>
                    Confirmation details have been sent to your email
                </p>
                <p class="contact-info">
                    <ion-icon name="call-outline"></ion-icon>
                    Our team will contact you shortly
                </p>
            </div>
            <button class="btn btn-primary" onclick="closeConfirmation()">Done</button>
        `;

        // Show confirmation and close modal
        closeModal();
        confirmationElement.classList.add('show');
        bookingForm.reset();

        // Auto-hide confirmation after 10 seconds
        setTimeout(() => {
            confirmationElement.classList.remove('show');
        }, 10000);
    });

    // Input validation for adults and children
    const adultsInput = document.getElementById('adults');
    const childrenInput = document.getElementById('children');

    function validateNumberInput(input, min) {
        input.addEventListener('input', function() {
            if (this.value < min) {
                this.value = min;
            }
        });
    }

    validateNumberInput(adultsInput, 1);
    validateNumberInput(childrenInput, 0);
});
