document.addEventListener('DOMContentLoaded', () => {
    // Visitor Message Logic
    const visitorMessage = document.getElementById('visitor-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentVisit = Date.now();

    if (lastVisit) {
        const daysSinceLastVisit = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysSinceLastVisit < 1) {
            visitorMessage.textContent = 'Back so soon! Awesome!';
        } else if (daysSinceLastVisit === 1) {
            visitorMessage.textContent = 'You last visited 1 day ago.';
        } else {
            visitorMessage.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
        }
    } else {
        visitorMessage.textContent = 'Welcome! Let us know if you have any questions.';
    }
    localStorage.setItem('lastVisit', currentVisit);

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const closeMenuButton = document.querySelector('.close-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.style.display = 'none';
            if (closeMenuButton) closeMenuButton.style.display = 'block';
        });

        if (closeMenuButton) {
            closeMenuButton.addEventListener('click', () => {
                navMenu.classList.remove('active');
                closeMenuButton.style.display = 'none';
                hamburger.style.display = 'block';
            });
        }
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            navMenu.classList.remove('active');
            hamburger.style.display = 'none';
            if (closeMenuButton) closeMenuButton.style.display = 'none';
        } else {
            hamburger.style.display = 'block';
        }
    });

    window.dispatchEvent(new Event('resize'));

    // Set the last modified date in the footer
    const lastModified = document.getElementById('lastModified');
    if (lastModified) {
        lastModified.textContent = new Date(document.lastModified).toLocaleString();
    }

    // Lazy Loading Logic for Images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => observer.observe(img));
    } else {
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // Calendar Logic
    const calendarElement = document.getElementById('calendar');
    const calendarHeading = document.getElementById('calendar-heading');

    // Clear any previous calendar content to prevent duplication
    calendarElement.innerHTML = "";

    // Generate days of the week headers
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.textContent = day;
        calendarElement.appendChild(dayHeader);
    });

    // Get current month and year
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    calendarHeading.textContent = `${monthNames[month]} ${year}`;

    // Get the first day of the month and days in the month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Fill blank days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendarElement.appendChild(emptyCell);
    }

    // Fill days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.textContent = day;
        calendarElement.appendChild(dayCell);

        // Highlight today's date
        if (day === today.getDate()) {
            dayCell.style.backgroundColor = '#555';
            dayCell.style.color = 'white';
            dayCell.style.fontWeight = 'bold';
        }
    }
});
