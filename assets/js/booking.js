// Booking Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('bookingModal');
    const openBtn = document.getElementById('openBooking');
    const closeBtn = document.getElementById('closeModal');
    const bookingForm = document.getElementById('bookingForm');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');

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

        // Calculate total days
        const startDate = new Date(formData.checkIn);
        const endDate = new Date(formData.checkOut);
        const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

        // Simple price calculation (you can modify this according to your needs)
        const basePrice = 100; // Base price per day
        const adultPrice = basePrice * totalDays * parseInt(formData.adults);
        const childPrice = (basePrice * 0.5) * totalDays * parseInt(formData.children);
        const totalPrice = adultPrice + childPrice;

        // Show booking confirmation
        const confirmationMessage = `
            Booking Summary:
            Destination: ${formData.destination}
            Check-in: ${formData.checkIn}
            Check-out: ${formData.checkOut}
            Duration: ${totalDays} days
            Adults: ${formData.adults}
            Children: ${formData.children}
            Tour Type: ${formData.tourType}
            Total Price: $${totalPrice}

            Thank you for booking with us!
        `;

        alert(confirmationMessage);
        closeModal();
        bookingForm.reset();
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
