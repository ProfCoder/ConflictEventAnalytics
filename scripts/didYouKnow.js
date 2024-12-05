document.addEventListener("DOMContentLoaded", () => {
    const detachedSquare = document.querySelector(".detached");
    const scrollSection = document.querySelector(".scroll-section");
    const nextPage = document.querySelector(".next-page");
    const initialText = document.querySelector(".initial-text");
    const dynamicText = document.querySelector(".dynamic-text");
    const progressBar = document.querySelector(".timeline-line"); // Line connecting 2024 to 2014
    const currentYear = document.querySelector(".current-year");
    const nextYear = document.querySelector(".next-year");

    let progress = 0;
    let isDetachmentComplete = false;
    let isOnNextPage = false;

    // Show the initial text on load
    initialText.style.opacity = "1";

    // Listen to scroll events
    window.addEventListener("wheel", (event) => {
        const direction = event.deltaY > 0 ? "down" : "up";

        if (!isOnNextPage) {
            // Handle detachment logic when on the first page
            if (!isDetachmentComplete) {
                // Adjust progress based on scroll direction
                progress += event.deltaY * 0.1; // Adjust speed with multiplier
                progress = Math.max(0, Math.min(100, progress)); // Clamp between 0 and 100

                updateScrollEffect(progress);

                // Gradually show the dynamic text during detachment
                const textOpacity = Math.min((progress / 50), 1); // Start appearing at 0% and fully visible at 50% progress
                dynamicText.style.opacity = textOpacity.toString();

                // Check if detachment is complete
                if (progress >= 100) {
                    isDetachmentComplete = true;
                    showTimelineLine(); // Make the line appear
                    showNextYear(); // Show 2014
                }

                // Prevent default scrolling
                event.preventDefault();
            } else if (direction === "down") {
                // Move to next page only after some delay to allow users to see "2014"
                setTimeout(() => {
                    isOnNextPage = true;
                    scrollSection.style.transform = "translateY(-100vh)";
                    nextPage.style.display = "flex";
                    nextPage.style.opacity = 1;
                }, 2000); // 2-second delay before moving to next page
                event.preventDefault();
            }
        } else if (isOnNextPage && direction === "up") {
            // Handle reverse scrolling back to the first page
            isOnNextPage = false;

            scrollSection.style.transform = "translateY(0)";
            nextPage.style.opacity = 0;

            setTimeout(() => {
                nextPage.style.display = "none";
            }, 1000);

            // Reverse detachment process
            reverseDetachment();

            // Prevent default scrolling during transition
            event.preventDefault();
        }
    });

    function updateScrollEffect(progress) {
        // Move detached square to the right by up to 30px
        const moveRight = (progress / 100) * 30; // Calculate the movement based on progress
        detachedSquare.style.transform = `translateX(${moveRight}px)`;

        // Adjust opacity during detachment
        const opacity = progress >= 50 ? 0.5 : 1;
        detachedSquare.style.opacity = `${opacity}`;
    }

    function showTimelineLine() {
        // Adjust the timeline height dynamically to stop above 2014
        progressBar.style.height = "calc(100% - 80px)"; // Stop above 2014
        progressBar.style.backgroundColor = "black"; // Ensure it's visible
    
        // Trigger the continuation line
        progressBar.classList.add("continuation");
    }
    

    function showNextYear() {
        nextYear.style.opacity = "1";
        nextYear.style.transform = "translateY(0)";
        nextYear.style.color = "red"; // Highlight 2014
    
        // Add the continuation class to the line
        progressBar.classList.add("continuation");
    }
    
    
    
    function moveToNextPage() {
        setTimeout(() => {
            isOnNextPage = true;
    
            // Transition the scroll section out of view
            scrollSection.style.transform = "translateY(-100vh)";
            nextPage.style.display = "flex";
            nextPage.style.opacity = 1;
    
            // Set 2014 as the current year on the new page
            nextYear.style.bottom = "0px"; // Align to the bottom
            nextYear.style.color = "black"; // Make it neutral
            nextYear.textContent = "2014"; // Keep the year as current
        }, 2000); // 2-second delay before moving to the next page
    }
    

    function reverseDetachment() {
        const resetInterval = setInterval(() => {
            progress -= 5;
            if (progress <= 0) {
                progress = 0;
                isDetachmentComplete = false;
                clearInterval(resetInterval);
            }
            updateScrollEffect(progress);
    
            // Reset the line and 2014 visibility
            progressBar.classList.remove("continuation");
            nextYear.style.opacity = "0";
            nextYear.style.transform = "translateY(10px)";
        }, 50);
    }
    
    
    
    
});