document.addEventListener("DOMContentLoaded", function () {

    if (window.USER_LOGGED_IN) {
        if (typeof showStatusModal === "function") {
            showStatusModal("הנך מחובר", "כבר קיים משתמש מחובר במערכת, הנך מועבר לאזור האישי...", false);
        }
        
        setTimeout(() => {
            window.location.href = '/personal_area';
        }, 2000);
                return; 
    }

    const togglePass = document.getElementById('togglePass');
    const passwordInput = document.getElementById('password');
    if (togglePass && passwordInput) {
        togglePass.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            let errorMessages = [];
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const idNumber = document.getElementById('idNumber').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const dob = document.getElementById('dob').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            const nameRegex = /^[\u0590-\u05FFa-zA-Z\s]{2,30}$/;
            if (!nameRegex.test(firstName)) errorMessages.push("שם פרטי חייב להכיל אותיות בלבד.");
            if (!nameRegex.test(lastName)) errorMessages.push("שם משפחה חייב להכיל אותיות בלבד.");

            if (!/^\d{9}$/.test(idNumber)) {
                errorMessages.push("תעודת זהות חייבת להכיל 9 ספרות בדיוק.");
            }

            const phoneRegex = /^05\d[-]?\d{7}$/;
            if (!phoneRegex.test(phone)) {
                errorMessages.push("מספר טלפון לא תקין.");
            }

            if (!dob) {
                errorMessages.push("נא להזין תאריך לידה.");
            } else {
                const birthDate = new Date(dob);
                const today = new Date();
                if (birthDate >= today) {
                    errorMessages.push("תאריך הלידה לא יכול להיות בעתיד.");
                }
            }

            if (password.length < 6) {
                errorMessages.push("הסיסמה חייבת להכיל לפחות 6 תווים.");
            }

            if (password !== confirmPassword) {
                errorMessages.push("הסיסמאות אינן תואמות.");
            }

            if (errorMessages.length > 0) {
                e.preventDefault(); 
                if (typeof showStatusModal === "function") {
                    showStatusModal("יש לתקן את השדות הבאים", errorMessages.join("\n"), true);
                } else {
                    alert(errorMessages.join("\n"));
                }
            }
        });
    }
});