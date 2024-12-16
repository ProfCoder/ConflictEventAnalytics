console.log("didYouKnow.js loaded");

let progress = 0;
let isDetachmentComplete = false;

function initializeScrollLogic() {
    const detachedSquare = document.querySelector(".detached");
    const initialText = document.querySelector(".initial-text");
    const dynamicText = document.querySelector(".dynamic-text");
    const progressBar = document.querySelector(".timeline-line");
    const currentYear = document.querySelector(".current-year");
    const nextYear = document.querySelector(".next-year");

    // Set initial visibility for text and elements
    if (initialText) initialText.style.opacity = "1";
    if (dynamicText) dynamicText.style.opacity = "0"; // Ensure dynamic text starts hidden

    window.addEventListener("wheel", (event) => {
        progress += event.deltaY * 0.1;
        progress = Math.max(0, Math.min(100, progress)); // Clamp progress between 0 and 100

        updateScrollEffect(progress, detachedSquare, dynamicText);

        if (progress >= 100 && !isDetachmentComplete) {
            isDetachmentComplete = true;
            showTimelineLine(progressBar, nextYear, currentYear);
            showNextYear(nextYear);
        } else if (progress < 100) {
            isDetachmentComplete = false;
            resetTimelineLine(progressBar, nextYear, currentYear);
        }
    });
}

function updateScrollEffect(progress, detachedSquare, dynamicText) {
    const moveRight = (progress / 100) * 30;

    // Move detached square
    if (detachedSquare) detachedSquare.style.transform = `translateX(${moveRight}px)`;

    // Adjust opacity for the detached square
    const opacity = progress >= 50 ? 0.5 : 1;
    if (detachedSquare) detachedSquare.style.opacity = `${opacity}`;

    // Make dynamic text visible only after scrolling starts
    if (dynamicText) {
        const textOpacity = Math.min(progress / 50, 1); // Fade in from 0% to 50% scroll progress
        dynamicText.style.opacity = textOpacity.toString();
    }
}

function showTimelineLine(progressBar, nextYear, currentYear) {
    const timelineContainer = document.querySelector(".timeline-container");
    if (!timelineContainer || !progressBar || !nextYear || !currentYear) return;

    const timelineTop = timelineContainer.getBoundingClientRect().top;
    const nextYearTop = nextYear.getBoundingClientRect().top;
    const stopHeight = nextYearTop - timelineTop - 140;

    progressBar.style.height = `${stopHeight}px`;
    progressBar.style.backgroundColor = "black";

    setTimeout(() => {
        nextYear.classList.add("enlarged");
        currentYear.classList.add("transparent");
    }, 600);
}

function resetTimelineLine(progressBar, nextYear, currentYear) {
    if (progressBar) {
        progressBar.style.height = "0px"; // Reset the timeline line height
        progressBar.style.backgroundColor = "transparent"; // Hide the line
    }

    if (nextYear) {
        nextYear.classList.remove("enlarged");
        nextYear.style.opacity = "0";
        nextYear.style.transform = "translateY(20px)";
    }

    if (currentYear) {
        currentYear.classList.remove("transparent");
    }
}

function showNextYear(nextYear) {
    if (nextYear) {
        nextYear.style.opacity = "1";
        nextYear.style.transform = "translateY(0)";
        nextYear.style.color = "red";
    }
}

// Run immediately after script loads
initializeScrollLogic();
