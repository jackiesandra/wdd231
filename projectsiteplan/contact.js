document.addEventListener("DOMContentLoaded", () => {
    // Hamburger Menu Functionality
    const hamburger = document.querySelector(".hamburger-btn");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth >= 768) {
                navMenu.classList.remove("active"); // Asegura que el menú esté visible en escritorio
            }
        });
    } else {
        console.error("Hamburger button or navigation menu not found.");
    }

    // Set Last Modified Date
    const lastModifiedElement = document.getElementById("lastModified");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = new Date(document.lastModified).toLocaleString();
    } else {
        console.error("Last Modified element not found.");
    }

    // Form Submission
    const bookingForm = document.getElementById("booking-form");
    if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Previene el envío por defecto
            alert("Thank you for your reservation!"); // Muestra una alerta
            window.location.href = "thank-you.html"; // Redirige a la página de agradecimiento
        });
    } else {
        console.error("Booking form not found.");
    }
});
