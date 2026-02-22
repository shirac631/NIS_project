document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reviewForm");
    const visitorName = document.getElementById("visitor_name");
    const visitDate = document.getElementById("visit_date");
    const rating = document.getElementById("rating");
    const comment = document.getElementById("comment");
    const charCount = document.getElementById("charCount");
    const starsText = document.getElementById("starsText");
    const starsPreview = document.querySelector(".stars-preview");

    const updateCounter = () => {
        const len = (comment.value || "").length;
        charCount.textContent = String(len);
        if (len >= 20) {
            charCount.classList.add("text-success");
            charCount.classList.remove("text-danger");
        } else {
            charCount.classList.add("text-danger");
            charCount.classList.remove("text-success");
        }
    };
    comment.addEventListener("input", updateCounter);

    const updateStarsPreview = () => {
        const val = parseInt(rating.value, 10);
        if (!val) {
            starsPreview.classList.remove("filled");
            starsText.textContent = "";
            return;
        }
        starsPreview.classList.add("filled");
        starsText.textContent = `נבחר דירוג: ${val}/5`;
        const stars = starsPreview.querySelectorAll('i');
        stars.forEach((star, index) => {
            star.style.color = index < val ? "#ffc107" : "#e4e4e4";
        });
    };
    rating.addEventListener("change", updateStarsPreview);

    const showStatusModal = (title, message, isError = false) => {
        const modalElement = document.getElementById('statusModal');
        if (!modalElement) return;

        const existingModal = bootstrap.Modal.getInstance(modalElement);
        if (existingModal) existingModal.hide();

        document.getElementById('modalTitle').innerText = title;
        document.getElementById('modalTitle').style.color = isError ? "#dc3545" : "#28a745";
        document.getElementById('modalBody').innerHTML = message.replace(/\n/g, "<br>");
        
        const iconEl = document.getElementById('modalIcon');
        if (iconEl) {
            iconEl.className = isError ? "fas fa-exclamation-circle text-danger" : "fas fa-check-circle text-success";
        }

        const myModal = new bootstrap.Modal(modalElement);
        myModal.show();
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nameValue = visitorName.value.trim();
        let errorMessages = [];
        
        if (nameValue.length < 2) errorMessages.push("השם קצר מדי.");
        if (!visitDate.value) errorMessages.push("נא לבחור תאריך.");
        if (!rating.value) errorMessages.push("נא לדרג בכוכבים.");
        if (comment.value.trim().length < 20) errorMessages.push("הביקורת חייבת להכיל לפחות 20 תווים.");

        if (errorMessages.length > 0) {
            showStatusModal("יש לתקן את השדות", errorMessages.join("\n"), true);
            return;
        }

        const formData = new FormData(form);
        const targetUrl = form.getAttribute('action');

        fetch(targetUrl, {
            method: 'POST',
            body: formData,
            mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                showStatusModal(`תודה רבה ${nameValue}!`, data.message, false);
                form.reset();
                updateCounter();
                updateStarsPreview();
            } else {
                showStatusModal("שגיאה", data.message, true);
            }
        })
        .catch(error => {
            showStatusModal("שגיאת תקשורת", "אירעה שגיאה בחיבור לשרת.", true);
        });
    });

    form.addEventListener("reset", () => {
        setTimeout(() => {
            updateCounter();
            updateStarsPreview();
        }, 10);
    });
});