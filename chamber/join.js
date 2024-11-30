document.addEventListener('DOMContentLoaded', function () {
    // === Modal Functionality ===
    // Open a modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex'; // Show modal
        }
    }

    // Close a modal
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none'; // Hide modal
        }
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', function (event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach((modal) => {
            if (event.target === modal) {
                modal.style.display = 'none'; // Close modal
            }
        });
    });

    // Export modal functions globally (if used in HTML attributes)
    window.openModal = openModal;
    window.closeModal = closeModal;

    // === Hamburger Menu Functionality ===
    const hamburger = document.querySelector('.hamburger');
    const closeMenu = document.querySelector('.close-menu');
    const navMenu = document.querySelector('.nav-menu');

    // Ensure all elements are present
    if (hamburger && closeMenu && navMenu) {
        // Show the menu on hamburger button click
        hamburger.addEventListener('click', function () {
            navMenu.classList.add('active'); // Show menu
            hamburger.style.display = 'none'; // Hide hamburger button
            closeMenu.style.display = 'block'; // Show close button
        });

        // Hide the menu on close button click
        closeMenu.addEventListener('click', function () {
            navMenu.classList.remove('active'); // Hide menu
            closeMenu.style.display = 'none'; // Hide close button
            hamburger.style.display = 'block'; // Show hamburger button
        });

        // Handle responsive behavior
        window.addEventListener('resize', function () {
            if (window.innerWidth >= 768) {
                // Desktop view
                navMenu.classList.remove('active'); // Ensure menu is always visible
                hamburger.style.display = 'none'; // Hide hamburger button
                closeMenu.style.display = 'none'; // Hide close button
            } else {
                // Mobile view
                hamburger.style.display = 'block'; // Show hamburger button
                closeMenu.style.display = 'none'; // Hide close button
                navMenu.classList.remove('active'); // Ensure menu is hidden initially
            }
        });

        // Trigger resize event on page load
        window.dispatchEvent(new Event('resize'));
    } else {
        console.error('Hamburger menu or navigation menu elements not found.');
    }

    // === Timestamp Functionality ===
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const currentDateTime = new Date().toISOString(); // Current date in ISO format
        timestampField.value = currentDateTime;
    }

    // === Last Modified Display ===
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = new Date(document.lastModified).toLocaleString(); // Format date
    }
});

    