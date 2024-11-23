// Function to toggle the menu
function toggleMenu() {
    const nav = document.getElementById("navbar");
    if (nav) {
        nav.classList.toggle("open"); // Add or remove the 'open' class to show/hide the menu
    } else {
        console.error("Element with ID 'navbar' not found.");
    }
}

// Function to update the last modified date
function updateLastUpdate() {
    const now = new Date();
    // Format the date in default locale
    const dateString = now.toLocaleString();

    // Update the content of the element with ID 'last-update'
    const lastUpdateElement = document.getElementById("last-update");
    if (lastUpdateElement) {
        lastUpdateElement.textContent = `Last Update: ${dateString}`;
    } else {
        console.error("Element with ID 'last-update' not found.");
    }
}

// Run the update date function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateLastUpdate(); // Update the date on load

    // Set up click event for the menu button
    const menuToggle = document.getElementById("menu-toggle");
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    } else {
        console.error("Element with ID 'menu-toggle' not found.");
    }

    // Set up click events for filtering courses
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.textContent.toLowerCase(); // Get the category from the button text
            filterCourses(category); // Call the filter function
        });
    });
});

// Function to filter courses by category
function filterCourses(category) {
    const courses = document.querySelectorAll('.course-btn'); // Select all course buttons

    // Iterate through each course and filter based on the selected category
    courses.forEach(course => {
        if (category === 'all') {
            course.style.display = 'inline-block'; // Show all courses
        } else if (course.classList.contains(category)) {
            course.style.display = 'inline-block'; // Show courses in the selected category
        } else {
            course.style.display = 'none'; // Hide courses not in the selected category
        }
    });
}
// Toggle Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');

    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active'); // Add/remove 'active' class
    });
});
const totalCredits = Array.from(document.querySelectorAll('.credits'))
    .reduce((sum, credit) => sum + parseInt(credit.textContent), 0);
document.getElementById('total-credits').textContent = `${totalCredits} credits`;
document.querySelectorAll('.course-btn.completed').forEach(course => {
    course.style.textDecoration = 'line-through';
});
