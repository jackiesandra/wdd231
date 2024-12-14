// Load and Display JSON Data
fetch("./Data/destinations.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log("JSON data loaded successfully:", data);

        const destinations = data.destinations;
        const destinationCards = document.querySelectorAll(".destination-highlight");

        if (!destinationCards.length) {
            console.error("No destination cards found on the page.");
            return;
        }

        // Attach click event to destination cards
        destinationCards.forEach((card, index) => {
            card.addEventListener("click", () => {
                if (destinations[index]) {
                    showDestinationDetails(destinations[index]);
                } else {
                    console.error(`No data found for card index: ${index}`);
                }
            });
        });
    })
    .catch((error) => console.error("Error loading JSON:", error));

// Show Destination Details in Modal
function showDestinationDetails(destination) {
    const modal = document.getElementById("destination-details");
    if (!modal) {
        console.error("Modal element not found.");
        return;
    }

    document.getElementById("destination-name").textContent = destination.name || "N/A";
    document.getElementById("destination-location").textContent = destination.location || "N/A";
    document.getElementById("destination-population").textContent = destination.population || "N/A";
    document.getElementById("destination-best-days").textContent =
        (destination.best_days && destination.best_days.join(", ")) || "N/A";
    document.getElementById("destination-festivals").textContent =
        (destination.cultural_festivals && destination.cultural_festivals.join(", ")) || "N/A";

    modal.classList.remove("hidden");
}

// Close Modal
document.getElementById("close-modal")?.addEventListener("click", () => {
    const modal = document.getElementById("destination-details");
    modal.classList.add("hidden");
});

// Close Modal When Clicking Outside
window.addEventListener("click", (event) => {
    const modal = document.getElementById("destination-details");
    if (event.target === modal) {
        modal.classList.add("hidden");
    }
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
