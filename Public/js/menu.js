document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const sections = document.querySelectorAll(".menu-section");
    const noResultsMsg = document.getElementById("no-results");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filterValue = button.getAttribute("data-filter");

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            let hasVisibleSections = false;

            sections.forEach(section => {
                if (filterValue === "all" || section.classList.contains("category-" + filterValue)) {
                    section.style.display = "block";
                    hasVisibleSections = true;
                } else {
                    section.style.display = "none";
                }
            });

            if (!hasVisibleSections) {
                noResultsMsg.style.display = "block";
                noResultsMsg.textContent = `מצטערים, אין כרגע מנות בקטגוריית ${button.textContent}`;
            } else {
                noResultsMsg.style.display = "none";
            }
        });
    });
});