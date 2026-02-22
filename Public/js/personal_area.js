function showSection(sectionId) {
    const displayArea = document.getElementById('displayArea');
    if (displayArea) {
        displayArea.classList.remove('display-area-hidden');
        displayArea.classList.add('display-area-visible');
    }

    const sections = document.querySelectorAll('.content-section-item');
    sections.forEach(sec => {
        sec.style.display = 'none';
        sec.classList.remove('active');
    });

    const cards = document.querySelectorAll('.value-card');
    cards.forEach(card => card.classList.remove('active'));

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
        setTimeout(() => activeSection.classList.add('active'), 10);
    }

    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    if (activeSection) {
        activeSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const firstCard = document.querySelector('.value-card');
    if (firstCard) {
        firstCard.click();
    }
});