document.addEventListener("DOMContentLoaded", () => {
    const monthsContainer = document.getElementById('monthsContainer');
    const months = Array.from(monthsContainer.querySelectorAll('div'));
    const centerText = document.getElementById('centerText');

    // boxHeight + spacing
    const boxHeight = 200;
    const boxSpacing = 100;
    const totalHeightPerMonth = boxHeight + boxSpacing;

    // When user scrolls, we find the current month
    // monthIndex = floor(scrollY / totalHeightPerMonth)

    const monthData = [
      
    ];

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        let monthIndex = Math.floor(scrollY / totalHeightPerMonth);
        if (monthIndex < 0) monthIndex = 0;
        if (monthIndex > months.length - 1) monthIndex = months.length - 1;

        highlightMonth(monthIndex);
        centerText.textContent = monthData[monthIndex];
    });

    function highlightMonth(index) {
        months.forEach(m => m.classList.remove('highlighted'));
        months[index].classList.add('highlighted');
    }

    // Initially highlight the first month
    highlightMonth(0);
});
