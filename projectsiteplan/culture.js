 // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach((img) => {
        img.addEventListener("load", () => {
            console.log(`${img.src} has been loaded`);
        });
    });

// Hamburger Menu Functionality
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger-btn");
    const navMenu = document.querySelector(".nav-menu");

    if (!hamburger || !navMenu) {
        console.error("Hamburger button or navigation menu not found.");
        return;
    }

    // Toggle menu visibility on hamburger button click
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Adjust visibility on window resize
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            // Desktop view: always show menu
            navMenu.classList.remove("active");
        }
    });
});

// Set Last Modified Date
document.addEventListener("DOMContentLoaded", () => {
    const lastModifiedElement = document.getElementById("lastModified");
    if (lastModifiedElement) {
        const lastModified = new Date();
        lastModifiedElement.textContent = lastModified.toLocaleString();
    } else {
        console.error("Last Modified element not found.");
    }
});
