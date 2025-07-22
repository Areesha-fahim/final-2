// Login Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all necessary elements
    const loginBtn = document.getElementById('openLogin');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginConfirmation = document.getElementById('loginConfirmation');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');

    console.log('Elements found:', {
        loginBtn: loginBtn,
        loginModal: loginModal,
        closeModal: closeModal,
        loginForm: loginForm
    });

    // Tab switching functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs and forms
            tabBtns.forEach(b => b.classList.remove('active'));
            loginForm.classList.remove('active');
            signupForm.classList.remove('active');
            
            // Add active class to clicked tab and corresponding form
            btn.classList.add('active');
            if (btn.dataset.tab === 'login') {
                loginForm.classList.add('active');
            } else {
                signupForm.classList.add('active');
            }
        });
    });

    // Password visibility toggle
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const input = e.target.closest('.input-icon').querySelector('input');
            const icon = btn.querySelector('ion-icon');
            if (input.type === 'password') {
                input.type = 'text';
                icon.setAttribute('name', 'eye-off-outline');
            } else {
                input.type = 'password';
                icon.setAttribute('name', 'eye-outline');
            }
        });
    });

    // Open login modal
    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'flex';
    });

    // Close login modal
    closeModal.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = loginForm.querySelector('#email').value;
        const password = loginForm.querySelector('#password').value;
        const remember = loginForm.querySelector('#remember').checked;
        
        // Here you would typically handle the login with a backend server
        console.log('Login attempt:', { email, password, remember });
        
        loginModal.style.display = 'none';
        loginConfirmation.style.display = 'flex';
        
        // Hide confirmation after 3 seconds
        setTimeout(function() {
            loginConfirmation.style.display = 'none';
        }, 3000);
    });

    // Handle signup form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const fullName = signupForm.querySelector('#fullName').value;
        const email = signupForm.querySelector('#signupEmail').value;
        const password = signupForm.querySelector('#signupPassword').value;
        const confirmPassword = signupForm.querySelector('#confirmPassword').value;
        const terms = signupForm.querySelector('#terms').checked;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Here you would typically handle the signup with a backend server
        console.log('Signup attempt:', { fullName, email, password, terms });
        
        loginModal.style.display = 'none';
        loginConfirmation.style.display = 'flex';
        loginConfirmation.querySelector('.confirmation-title').textContent = 'Registration Successful!';
        loginConfirmation.querySelector('.confirmation-message').textContent = 'Welcome to Tourvista!';
        
        // Hide confirmation after 3 seconds
        setTimeout(function() {
            loginConfirmation.style.display = 'none';
        }, 3000);
    });

    // Social login handlers
    document.querySelector('.social-btn.google').addEventListener('click', function() {
        console.log('Google login clicked');
        // Implement Google OAuth login
    });

    document.querySelector('.social-btn.facebook').addEventListener('click', function() {
        console.log('Facebook login clicked');
        // Implement Facebook OAuth login
    });
});
});
