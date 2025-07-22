// Login Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeLoginSystem();
    } catch (error) {
        console.error('Error initializing login system:', error);
    }
});

function initializeLoginSystem() {
    // Get all necessary elements
    const loginBtn = document.querySelector('#openLogin');
    const loginModal = document.querySelector('.login-modal');
    const closeModal = document.querySelector('#closeModal');
    const loginForm = document.querySelector('#loginForm');
    const signupForm = document.querySelector('#signupForm');
    const loginConfirmation = document.querySelector('#loginConfirmation');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');

    // Verify all elements are found
    if (!loginBtn || !loginModal || !closeModal || !loginForm) {
        throw new Error('Required login elements not found');
    }

    // Open login modal
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        loginModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Close login modal
    closeModal.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        loginModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside
    loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Prevent modal content clicks from closing the modal
    loginModal.querySelector('.modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            if (btn.dataset.tab === 'login') {
                loginForm.classList.add('active');
                signupForm.classList.remove('active');
            } else {
                signupForm.classList.add('active');
                loginForm.classList.remove('active');
            }
        });
    });

    // Password visibility toggle
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const input = e.target.closest('.input-icon').querySelector('input');
            const icon = e.target.closest('button').querySelector('ion-icon');
            
            if (input && icon) {
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.setAttribute('name', 'eye-off-outline');
                } else {
                    input.type = 'password';
                    icon.setAttribute('name', 'eye-outline');
                }
            }
        });
    });

    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('#email').value;
        const password = this.querySelector('#password').value;
        const remember = this.querySelector('#remember').checked;

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Here you would typically handle the login with a backend server
        console.log('Login attempt:', { email, password, remember });

        // Show success message
        showConfirmation('Login Successful!', 'Welcome back to Tourvista!');
    });

    // Handle signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fullName = this.querySelector('#fullName').value;
            const email = this.querySelector('#signupEmail').value;
            const password = this.querySelector('#signupPassword').value;
            const confirmPassword = this.querySelector('#confirmPassword').value;
            const terms = this.querySelector('#terms').checked;

            if (!fullName || !email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            if (!terms) {
                alert('Please accept the Terms of Service and Privacy Policy');
                return;
            }

            // Here you would typically handle the signup with a backend server
            console.log('Signup attempt:', { fullName, email, password, terms });

            // Show success message
            showConfirmation('Registration Successful!', 'Welcome to Tourvista!');
        });
    }

    function showConfirmation(title, message) {
        loginModal.style.display = 'none';
        document.body.style.overflow = '';
        
        if (loginConfirmation) {
            const titleEl = loginConfirmation.querySelector('.confirmation-title');
            const messageEl = loginConfirmation.querySelector('.confirmation-message');
            
            if (titleEl) titleEl.textContent = title;
            if (messageEl) messageEl.textContent = message;
            
            loginConfirmation.style.display = 'flex';
            
            setTimeout(() => {
                loginConfirmation.style.display = 'none';
            }, 3000);
        }
    }

    // Initialize social login buttons
    const socialBtns = {
        google: document.querySelector('.social-btn.google'),
        facebook: document.querySelector('.social-btn.facebook')
    };

    if (socialBtns.google) {
        socialBtns.google.addEventListener('click', () => {
            console.log('Google login clicked');
            // Implement Google OAuth login
        });
    }

    if (socialBtns.facebook) {
        socialBtns.facebook.addEventListener('click', () => {
            console.log('Facebook login clicked');
            // Implement Facebook OAuth login
        });
    }
}
