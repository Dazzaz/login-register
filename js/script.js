// Lógica de login dinámico

document.addEventListener('DOMContentLoaded', function() {
    // Función para mostrar error debajo de un input
    function showInputError(input, message) {
        let error = input.parentElement.querySelector('.input-error');
        if (!error) {
            error = document.createElement('div');
            error.className = 'input-error';
            error.style.color = '#f87171';
            error.style.fontSize = '0.95em';
            error.style.marginTop = '0.2em';
            error.style.fontWeight = '500';
            input.parentElement.appendChild(error);
        }
        error.textContent = message;
        input.classList.add('input-error-border');
    }
    function clearInputError(input) {
        let error = input.parentElement.querySelector('.input-error');
        if (error) error.textContent = '';
        input.classList.remove('input-error-border');
    }

    // LOGIN
    const form = document.getElementById('login-form');
    const messageDiv = document.getElementById('login-message');
    if (form && messageDiv) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username');
            const password = document.getElementById('password');
            let valid = true;
            clearInputError(username);
            clearInputError(password);
            if (username.value.trim().length < 3) {
                showInputError(username, 'El usuario debe tener al menos 3 caracteres.');
                valid = false;
            }
            if (password.value.trim().length < 4) {
                showInputError(password, 'La contraseña debe tener al menos 4 caracteres.');
                valid = false;
            }
            if (!valid) return;
            // Simulación de validación (usuario: admin, contraseña: 1234)
            if (username.value.trim() === 'admin' && password.value.trim() === '1234') {
                messageDiv.textContent = '¡Inicio de sesión exitoso!';
                messageDiv.style.color = 'green';
                form.reset();
            } else {
                messageDiv.textContent = 'Usuario o contraseña incorrectos.';
                messageDiv.style.color = 'red';
            }
        });
        // Limpiar errores al escribir
        form.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => clearInputError(input));
        });
    }

    // Alternar entre login y registro con animación
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const goRegister = document.getElementById('go-register');
    const goLogin = document.getElementById('go-login');

    function showRegister() {
        if (loginSection) loginSection.classList.remove('active');
        if (registerSection) registerSection.classList.add('active');
    }
    function showLogin() {
        if (registerSection) registerSection.classList.remove('active');
        if (loginSection) loginSection.classList.add('active');
    }
    if (goRegister) goRegister.addEventListener('click', showRegister);
    if (goLogin) goLogin.addEventListener('click', showLogin);

    // REGISTRO
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const user = document.getElementById('reg-username');
            const email = document.getElementById('reg-email');
            const pass = document.getElementById('reg-password');
            const repeat = document.getElementById('reg-repeat-password');
            let regMsg = document.getElementById('register-message');
            if (!regMsg) {
                regMsg = document.createElement('div');
                regMsg.id = 'register-message';
                regMsg.style.marginTop = '1rem';
                registerForm.appendChild(regMsg);
            }
            let valid = true;
            clearInputError(user);
            clearInputError(email);
            clearInputError(pass);
            clearInputError(repeat);
            regMsg.textContent = '';
            if (user.value.trim().length < 3) {
                showInputError(user, 'El usuario debe tener al menos 3 caracteres.');
                valid = false;
            }
            // Validación de email
            const emailVal = email.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailVal || !emailRegex.test(emailVal)) {
                showInputError(email, 'Introduce un email válido.');
                valid = false;
            }
            if (pass.value.trim().length < 4) {
                showInputError(pass, 'La contraseña debe tener al menos 4 caracteres.');
                valid = false;
            }
            if (pass.value !== repeat.value) {
                showInputError(repeat, 'Las contraseñas no coinciden.');
                valid = false;
            }
            if (!valid) return;
            regMsg.textContent = '¡Registro exitoso! Ahora puedes iniciar sesión.';
            regMsg.style.color = 'green';
            registerForm.reset();
            setTimeout(() => {
                regMsg.textContent = '';
                showLogin();
            }, 1200);
        });
        // Limpiar errores al escribir
        registerForm.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => clearInputError(input));
        });
    }

    // Menú hamburguesa
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const closeMenu = document.getElementById('close-menu');

    function openMenu() {
        if (sideMenu) sideMenu.classList.remove('translate-x-full');
    }
    function hideMenu() {
        if (sideMenu) sideMenu.classList.add('translate-x-full');
    }
    if (menuToggle) menuToggle.addEventListener('click', openMenu);
    if (closeMenu) closeMenu.addEventListener('click', hideMenu);
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (sideMenu && !sideMenu.classList.contains('translate-x-full')) {
            if (!sideMenu.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
                hideMenu();
            }
        }
    });
    // Cerrar menú al hacer clic en un enlace
    if (sideMenu) {
        sideMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', hideMenu);
        });
    }
}); 