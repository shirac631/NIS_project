document.addEventListener("DOMContentLoaded", function () {
    console.log("Contact JS Loaded!");

    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('msg');
    if (message) {
        showStatusModal("הודעה מהמערכת", message);
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            const firstNameEl = document.getElementById('firstName');
            const lastNameEl = document.getElementById('lastName');
            const emailEl = document.getElementById('email');
            const phoneEl = document.getElementById('phone');
            const subjectEl = document.getElementById('subject');
            const messageEl = document.getElementById('message');
            
            let errorMessages = [];

            const nameRegex = /^[a-zA-Zא-ת\s]+$/;
            if (!firstNameEl.value.trim() || !nameRegex.test(firstNameEl.value.trim())) {
                errorMessages.push("שם פרטי חייב להכיל אותיות בלבד.");
            }
            if (!lastNameEl.value.trim() || !nameRegex.test(lastNameEl.value.trim())) {
                errorMessages.push("שם משפחה חייב להכיל אותיות בלבד.");
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
            if (!emailRegex.test(emailEl.value.trim())) {
                errorMessages.push("כתובת האימייל אינה תקינה.");
            }

            const phoneRegex = /^0\d{9}$/; 
            if (!phoneRegex.test(phoneEl.value.trim())) {
                errorMessages.push("מספר טלפון חייב להכיל 10 ספרות ולהתחיל ב-0.");
            }

            if (!subjectEl.value || subjectEl.value === "") {
                errorMessages.push("אנא בחרו נושא לפני שליחת הטופס.");
            }

            const messageValue = messageEl.value.trim();
            const hasLetters = /[a-zA-Zא-ת]/.test(messageValue);

            if (messageValue.length < 10) {
                errorMessages.push("ההודעה קצרה מדי, אנא פרטו לפחות 10 תווים.");
            } else if (!hasLetters) {
                errorMessages.push("תוכן ההודעה חייב להכיל מלל (אותיות), לא רק מספרים.");
            }

            if (errorMessages.length > 0) {
                event.preventDefault();
                showStatusModal("נמצאו שגיאות בטופס", errorMessages.join("\n"));
            }
        });
    }
});

function showStatusModal(title, message) {
    const modalElement = document.getElementById('statusModal');
    if (modalElement) {
        const titleEl = document.getElementById('modalTitle');
        const bodyEl = document.getElementById('modalBody');
        
        if (titleEl) titleEl.innerText = title;
        if (bodyEl) bodyEl.innerText = message;
        
        const myModal = new bootstrap.Modal(modalElement);
        myModal.show();
    } else {
        alert(title + "\n\n" + message);
    }
}