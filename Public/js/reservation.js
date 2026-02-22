document.addEventListener("DOMContentLoaded", function () {
    const resForm = document.getElementById('resForm');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const phoneInput = document.getElementById('phone');
    const numPeopleInput = document.getElementById('num_of_people');
    const suggestions = document.getElementById('tableSuggestions');
    const eventInput = document.getElementById('celebration');

    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    if (timeInput && timeInput.options.length <= 1) {
        for (let h = 7; h <= 22; h++) {
            for (let m = 0; m < 60; m += 15) {
                if (h === 22 && m > 0) continue; 
                const hourStr = h.toString().padStart(2, '0');
                const minStr = m.toString().padStart(2, '0');
                const timeString = `${hourStr}:${minStr}`;
                const option = document.createElement('option');
                option.value = timeString;
                option.textContent = timeString;
                timeInput.appendChild(option);
            }
        }
    }

    function isStoreOpen(day, time) {
        const [hours, minutes] = time.split(':').map(Number);
        const timeValue = hours + minutes / 60;

        if (day >= 0 && day <= 4) { 
            return timeValue >= 9 && timeValue <= 22;
        } else if (day === 5) {
            return timeValue >= 8 && timeValue <= 14;
        }
        return false; 
    }

    resForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        if (typeof isUserLoggedIn !== 'undefined' && !isUserLoggedIn) {
            showStyledPopup("התחברות נדרשת", "כדי להזמין מקום, עליכם להיות מחוברים.", true);
            return; 
        }

        if (!phoneInput.value.trim() || !dateInput.value || !timeInput.value || !numPeopleInput.value || !eventInput.value) {
            showStyledPopup("פרטים חסרים", "נא למלא את כל הפרטים בטופס.", true);
            return;
        }

        const num = parseInt(numPeopleInput.value);
        if (num < 1 || num > 20) {
            showStyledPopup("כמות אורחים", "ניתן להזמין מקום ל-1 עד 20 איש בלבד.", true);
            return;
        }

        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(phoneInput.value.trim())) {
            showStyledPopup("שגיאה בטלפון", "נא להזין מספר טלפון תקין (10 ספרות, מתחיל ב-0).", true);
            return;
        }

        const selectedDate = new Date(dateInput.value);
        const dayOfWeek = selectedDate.getDay(); 
        const selectedTime = timeInput.value;

        if (dayOfWeek === 6) {
            showStyledPopup("אנחנו סגורים", "המסעדה סגורה בימי שבת.", true);
            return;
        }

        if (!isStoreOpen(dayOfWeek, selectedTime)) {
            let hoursMsg = (dayOfWeek === 5) ? "ביום ו' אנו פתוחים בין 08:00 ל-14:00" : "בימים א'-ה' אנו פתוחים בין 09:00 ל-22:00";
            showStyledPopup("מחוץ לשעות הפעילות", `סליחה, אנחנו סגורים בשעה זו. ${hoursMsg}`, true);
            return;
        }

        const now = new Date();
        const selectedDateTime = new Date(dateInput.value + 'T' + selectedTime);
        if (selectedDateTime < now) {
            showStyledPopup("זמן לא תקין", "לא ניתן להזמין מקום לזמן שכבר עבר.", true);
            return;
        }

        showStyledPopup("פרטים נקלטו!", "הפרטים תקינים. כעת בחרו איפה תרצו לשבת בתחתית העמוד.", false);
        
        suggestions.classList.remove('suggestions-hidden');
        suggestions.classList.add('suggestions-visible');
        setTimeout(() => suggestions.scrollIntoView({ behavior: 'smooth' }), 500);
    });
});

function showStyledPopup(title, message, isError) {
    const modalElement = document.getElementById('statusModal');
    if (modalElement) {
        const titleEl = document.getElementById('modalTitle');
        const bodyEl = document.getElementById('modalBody');
        
        // עיצוב כותרת לפי סוג ההודעה
        if (titleEl) {
            titleEl.innerText = title;
            titleEl.style.color = isError ? "#dc3545" : "#28a745"; // אדום לשגיאה, ירוק להצלחה
        }
        
        if (bodyEl) bodyEl.innerText = message;
        
        const myModal = new bootstrap.Modal(modalElement);
        myModal.show();
    } else {
        alert(title + "\n" + message);
    }
}

function submitFinalForm(seatValue) {
    const seatInput = document.getElementById('selectedSeat');
    const form = document.getElementById('resForm');
    if (seatInput && form) {
        seatInput.value = seatValue;
        form.submit();
    } else {
        console.error("שגיאה במציאת אלמנטים לשליחה");
    }
}