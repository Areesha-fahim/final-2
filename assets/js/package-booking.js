document.addEventListener('DOMContentLoaded', function() {
  const bookButtons = document.querySelectorAll('.book-btn');
  const bookingModal = document.getElementById('bookingModal');
  const tourTypeSelect = document.getElementById('tourType');

  bookButtons.forEach(button => {
    button.addEventListener('click', function() {
      const packageType = this.dataset.package;
      // Set the tour type in the modal
      tourTypeSelect.value = packageType;
      // Show the modal
      bookingModal.style.display = 'flex';
    });
  });
});
