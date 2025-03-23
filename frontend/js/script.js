function showLoginForm() {
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('admin-login-form').classList.add('hidden');
}

function showSignupForm() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
    document.getElementById('admin-login-form').classList.add('hidden');
}

function showAdminLogin() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('admin-login-form').classList.remove('hidden');
}

function signup() {
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (username && email.includes('@') && password.length >= 6) {
        localStorage.setItem('user', JSON.stringify({ username, email, password }));
        alert('Sign-up successful! Redirecting to home page...');
        window.location.href = 'home.html';
    } else {
        document.getElementById('signup-error').textContent = 'Please fill all fields correctly.';
    }
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
        alert('Login successful! Redirecting to home page...');
        window.location.href = 'home.html';
    } else {
        document.getElementById('login-error').textContent = 'Invalid username or password.';
    }
}

function adminLogin() {
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;

    const adminAccount = { username: "admin", password: "admin123" };

    if (username === adminAccount.username && password === adminAccount.password) {
        alert('Admin login successful! Redirecting to admin dashboard...');
        window.location.href = 'admin.html';
    } else {
        document.getElementById('admin-error').textContent = 'Invalid admin credentials.';
    }
}
