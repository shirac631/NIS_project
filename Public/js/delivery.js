$(document).ready(function () {
    console.log("Delivery JS with Time Validation Loaded!");

    const $form = $("#deliveryForm");
    if ($form.length === 0) return;

    const $overlay = $("#deliveryOverlay");
    const $preview = $("#orderPreview");
    const $orderDetailsEl = $("#orderDetails");

    function updatePreview() {
        const txt = $orderDetailsEl.val().trim();
        $preview.text(txt.length ? txt : "עדיין לא הוזן פירוט הזמנה…");
    }
    updatePreview();
    $orderDetailsEl.on("input", updatePreview);

    $form.on("submit", function (e) {
        e.preventDefault(); 

        let errorMessages = [];
        const lettersOnlyRegex = /^[a-zA-Zא-ת\s]+$/;
        const phoneRegex = /^0\d{9}$/;

        if (typeof isUserLoggedIn !== 'undefined' && !isUserLoggedIn) {
            showStyledPopup("התחברות נדרשת", "כדי לבצע משלוח, עליכם להיות מחוברים לאתר.", true);
            return; 
        }

        const fullName = $("#fullName").val().trim();
        if (!fullName || !lettersOnlyRegex.test(fullName) || fullName.split(' ').filter(w => w).length < 2) {
            errorMessages.push("נא להזין שם מלא תקין (פרטי ומשפחה).");
        }

        const phone = $("#phone").val().trim();
        if (!phoneRegex.test(phone)) {
            errorMessages.push("מספר טלפון לא תקין (10 ספרות, מתחיל ב-0).");
        }

        const city = $("#city").val().trim();
        const street = $("#street").val().trim();
        const houseNumber = $("#houseNumber").val().trim();
        if (!city || !lettersOnlyRegex.test(city)) errorMessages.push("אנא הזינו שם עיר תקין.");
        if (!street) errorMessages.push("אנא הזינו שם רחוב.");
        if (!houseNumber || isNaN(houseNumber) || parseInt(houseNumber) <= 0) errorMessages.push("מספר בית חייב להיות מספר חיובי.");

        const deliveryTime = $("#deliveryTime").val();
        if (!deliveryTime) {
            errorMessages.push("אנא בחרו שעת משלוח מועדפת.");
        } else {
            const now = new Date();
            const [hours, minutes] = deliveryTime.split(':').map(Number);
            const selectedTimeDate = new Date();
            selectedTimeDate.setHours(hours, minutes, 0, 0);

            if (selectedTimeDate < now) {
                errorMessages.push("השעה שבחרת כבר עברה. נא לבחור שעה עתידית.");
            }
        }

        if (!$("#paymentMethod").val()) errorMessages.push("אנא בחרו אמצעי תשלום.");

        const orderDetails = $orderDetailsEl.val().trim();
        if (orderDetails.length < 5 || !/[a-zA-Zא-ת]/.test(orderDetails)) {
            errorMessages.push("פירוט ההזמנה חייב להכיל לפחות 5 תווים של מלל.");
        }

        if (errorMessages.length > 0) {
            showStyledPopup("שגיאות בטופס", errorMessages.join("\n"), true);
        } else {
            $overlay.addClass("show");
            setTimeout(() => {
                $form[0].submit();
            }, 1500);
        }
    });

    function showStyledPopup(title, message, isError) {
        const modalElement = document.getElementById('statusModal');
        if (modalElement) {
            $("#modalTitle").text(title).css("color", isError ? "#dc3545" : "#28a745");
            $("#modalBody").text(message);
            const myModal = new bootstrap.Modal(modalElement);
            myModal.show();
        } else {
            alert(title + "\n" + message);
        }
    }
});