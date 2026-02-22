
function toggleJobForm() {
    const $container = $('#jobFormContainer');
    
    if ($container.hasClass('job-form-hidden')) {
        $container.removeClass('job-form-hidden').addClass('job-form-visible');
        $container.addClass('fade-in-up');
        
        setTimeout(() => {
            $container[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    } else {
        $container.removeClass('job-form-visible').addClass('job-form-hidden');
    }
}

function showStatusModal(title, message, isError = false) {
    const modalElement = document.getElementById('statusModal');
    if (modalElement) {
        $("#modalTitle").text(title).css("color", isError ? "#dc3545" : "#28a745");
        const formattedMessage = message.replace(/\n/g, "<br>");
        $("#modalBody").html(formattedMessage);
        const iconClass = isError ? "fas fa-times-circle text-danger" : "fas fa-check-circle text-success";
        $("#modalIcon").attr("class", iconClass);
        const myModal = new bootstrap.Modal(modalElement);
        myModal.show();
    } else {
        alert(title + "\n" + message);
    }
}

$(document).ready(function () {
    console.log("Jobs JS Loaded Successfully!");

    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    if (msg) {
        const isError = msg.includes("שגיאה") || msg.includes("חלה תקלה");
        showStatusModal(isError ? "NIS - שגיאה" : "בהצלחה!", msg, isError);
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    const $form = $('#jobApplicationForm');
    
    $form.on('submit', function (event) {
        event.preventDefault(); 
        
        let errorMessages = [];
        const lettersOnlyRegex = /^[a-zA-Zא-ת\s]+$/;
        const fName = $('#firstName').val().trim();
        const lName = $('#lastName').val().trim();
        if (fName.length < 2 || !lettersOnlyRegex.test(fName)) errorMessages.push("שם פרטי חייב להכיל לפחות 2 אותיות.");
        if (lName.length < 2 || !lettersOnlyRegex.test(lName)) errorMessages.push("שם משפחה חייב להכיל לפחות 2 אותיות.");

        const idNum = $('#id_number').val().trim();
        if (!/^\d{9}$/.test(idNum)) errorMessages.push("תעודת זהות חייבת להכיל בדיוק 9 ספרות.");
        if (!$('#gender').val()) errorMessages.push("נא לבחור מגדר.");

        const phone = $('#phone').val().trim();
        if (!/^0\d{9}$/.test(phone)) errorMessages.push("מספר טלפון חייב להכיל 10 ספרות ולהתחיל ב-0.");

        const email = $('#email').val().trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errorMessages.push("כתובת אימייל לא תקינה.");

        const cvFileInput = $('#cv_file')[0];
        if (!cvFileInput.files.length) {
            errorMessages.push("נא להעלות קובץ קורות חיים.");
        } else {
            const file = cvFileInput.files[0];
            const ext = file.name.split('.').pop().toLowerCase();
            if (!['pdf', 'doc', 'docx'].includes(ext)) {
                errorMessages.push("סוג קובץ לא נתמך (PDF/Word בלבד).");
            }
        }

        if (errorMessages.length > 0) {
            showStatusModal("נמצאו שגיאות בטופס", errorMessages.join("\n"), true);
        } else {
            showStatusModal("שולח מועמדות", "אנא המתן בזמן שאנו מעבדים את הקובץ...", false);
            setTimeout(() => {
                $form[0].submit();
            }, 1000);
        }
    });
});