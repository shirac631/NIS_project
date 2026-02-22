document.addEventListener("DOMContentLoaded", () => {
    const greetingEl = document.getElementById("greeting-text");
    const hour = new Date().getHours();
    let greeting = "";

    if (hour >= 5 && hour < 12) {
        greeting = "בוקר טוב ☕"; 
    } else if (hour >= 12 && hour < 18) {
        greeting = "צהריים טובים ☕"; 
    } else if (hour >= 18 && hour < 22) {
        greeting = "ערב טוב 🍵"; 
    } else {
        greeting = "לילה טוב 🥐"; 
    }

    if (greetingEl) {
        greetingEl.textContent = greeting;
        greetingEl.classList.add("dynamic-greeting");
    }

    localStorage.setItem("lastVisitTime", new Date().toLocaleTimeString());
});