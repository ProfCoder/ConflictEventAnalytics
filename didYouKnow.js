document.addEventListener('DOMContentLoaded', () => {
    const didYouKnowSection = document.querySelector('.did-you-know-section');
    const timelineYear = document.getElementById('timelineYear');
    const ukraineFlagSection = document.querySelector('.ukraine-flag-section');

    let isScrollingAllowed = false; // Prevent auto-scrolling to the next section

    window.addEventListener('scroll', () => {
        const sectionRect = didYouKnowSection.getBoundingClientRect();
        const scrollY = window.scrollY;
        const sectionTop = didYouKnowSection.offsetTop;

        // Lock scrolling within the "Did You Know?" section
        if (scrollY >= sectionTop && scrollY < sectionTop + didYouKnowSection.offsetHeight) {
            const scrollProgress = Math.min(
                (scrollY - sectionTop) / didYouKnowSection.offsetHeight,
                1
            );

            // Animate the flag background
            didYouKnowSection.style.backgroundPosition = `100% ${100 - scrollProgress * 100}%`;

            // Animate the timeline year
            if (scrollProgress > 0) {
                timelineYear.style.opacity = 1;
                timelineYear.style.transform = 'translateY(0)';
            } else {
                timelineYear.style.opacity = 0;
                timelineYear.style.transform = 'translateY(50px)';
            }

            // Stop scrolling beyond the "Did You Know?" section
            window.scrollTo(0, sectionTop);

            // Allow scrolling to the next section only when animation completes
            if (scrollProgress === 1) {
                isScrollingAllowed = true;
            }
        }

        // Scroll to the next section only after the background is fully revealed
        if (isScrollingAllowed && scrollY >= sectionTop + didYouKnowSection.offsetHeight) {
            ukraineFlagSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
