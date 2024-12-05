document.addEventListener('DOMContentLoaded', () => {
    const months = document.querySelectorAll('.months div');
    const centerText = document.getElementById('centerText');
    const timelineDescription = document.getElementById('timelineDescription');

    const data = [
        { month: 'Jan', text: 'January Data', percentage: '10%' },
        { month: 'Feb', text: 'February Data', percentage: '15%' },
        { month: 'Mar', text: 'March Data', percentage: '20%' },
        { month: 'Apr', text: 'April Data', percentage: '25%' },
        { month: 'May', text: 'May Data', percentage: '30%' },
        { month: 'Jun', text: 'June Data', percentage: '51.9%' },
        { month: 'Jul', text: 'July Data', percentage: '45%' },
        { month: 'Aug', text: 'August Data', percentage: '50%' },
        { month: 'Sep', text: 'September Data', percentage: '55%' },
        { month: 'Oct', text: 'October Data', percentage: '60%' },
        { month: 'Nov', text: 'November Data', percentage: '65%' },
        { month: 'Dec', text: 'December Data', percentage: '70%' },
    ];

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY % 1200; // Adjust based on the timeline height
        const step = Math.floor(scrollY / (1200 / data.length));
        const currentData = data[step] || data[0];

        updateTimeline(currentData);
    });

    function updateTimeline(data) {
        months.forEach((monthDiv) => {
            monthDiv.classList.remove('highlighted');
            if (monthDiv.textContent === data.month) {
                monthDiv.classList.add('highlighted');
            }
        });
        centerText.textContent = data.percentage;
        timelineDescription.textContent = data.text;
    }
});









