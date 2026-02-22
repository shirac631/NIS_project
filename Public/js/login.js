

document.addEventListener("DOMContentLoaded", function () {
    const togglePass = document.getElementById('togglePass');
    const passwordInput = document.getElementById('password');

    togglePass.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    const form = document.getElementById("loginForm");
    form.addEventListener("submit", function () {
        localStorage.setItem("firstName", document.getElementById("firstName").value);
        localStorage.setItem("lastName", document.getElementById("lastName").value);
    });

    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('msg');
    if (message) {
        const modalElement = document.getElementById('statusModal');
        if (modalElement) {
            document.getElementById('modalTitle').innerText = "התחברות";
            document.getElementById('modalBody').innerText = decodeURIComponent(message);
            const bsModal = new bootstrap.Modal(modalElement);
            bsModal.show();
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
});

