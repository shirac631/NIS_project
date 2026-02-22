document.addEventListener("DOMContentLoaded", function () {
    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
        logoutLink.addEventListener("click", function() {
            window.location.href = "/logout";
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('msg');

    if (message) {
        const decodedMsg = decodeURIComponent(message);
        
        const isSuccess = decodedMsg.includes("בהצלחה") || 
                          decodedMsg.includes("התחברת") || 
                          decodedMsg.includes("נרשמת") || 
                          decodedMsg.includes("כיף");

        const isError = !isSuccess && (
                        decodedMsg.includes("שגיאה") || 
                        decodedMsg.includes("לא") || 
                        decodedMsg.includes("נכשל") || 
                        decodedMsg.includes("שגויה") || 
                        decodedMsg.includes("קיים"));
        
        let title = "NIS - הודעה"; 
        
        if (decodedMsg.includes("התנתקת")) {
            title = "להתראות!"; 
        } else if (isSuccess) {
            title = "איזה כיף שאתם כאן! ✨";
        } else if (isError) {
            title = "NIS - שגיאה";
        }

        showStatusModal(title, decodedMsg, isError);
        
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

function showStatusModal(title, message, isError = false) {
    const modalElement = document.getElementById('statusModal');
    if (modalElement) {
        document.getElementById('modalTitle').innerText = title;
        document.getElementById('modalBody').innerText = message;
        
        const iconEl = document.getElementById('modalIcon');
        if (iconEl) {
            if (title === "להתראות!") {
                iconEl.className = "fas fa-door-open";
                iconEl.style.color = "#8B5A2B"; 
            } else {
                iconEl.className = isError ? "fas fa-times-circle text-danger" : "fas fa-check-circle text-success";
                iconEl.style.color = ""; 
            }
        }
        
        const myModal = new bootstrap.Modal(modalElement);
        myModal.show();
    }
}