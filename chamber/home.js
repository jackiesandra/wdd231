const apiKey = 'ebc7d4aa3e81308e5b500cbbf4a843b4'; //  valid API key
const city = 'San Pedro Sula'; // Location

document.addEventListener('DOMContentLoaded', () => {
    // Fetch current weather
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) throw new Error(`Weather API error: ${response.statusText}`);
            return response.json();
        })
        .then(data => {
            const temperature = Math.round(data.main.temp);
            const description = capitalizeWords(data.weather.map(item => item.description).join(', '));

            // Display current weather
            document.getElementById('temperature').innerHTML = `
                <p><strong>Temperature:</strong> ${temperature}°C</p>
                <p><strong>Description:</strong> ${description}</p>
            `;
        })
        .catch(error => console.error('Error fetching current weather:', error.message));

    // Fetch 3-day forecast
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) throw new Error(`Forecast API error: ${response.statusText}`);
            return response.json();
        })
        .then(data => {
            const forecast = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

            if (forecast.length === 0) {
                console.warn('No forecast data available for 12:00 PM.');
            }

            const forecastHTML = forecast.map(day => `
                <p><strong>${new Date(day.dt_txt).toLocaleDateString()}:</strong> ${Math.round(day.main.temp)}°C, ${capitalizeWords(day.weather.map(item => item.description).join(', '))}</p>
            `).join('');

            document.getElementById('forecast').innerHTML = forecastHTML;
        })
        .catch(error => console.error('Error fetching forecast:', error.message));

    // Fetch Spotlight Data
    fetch('Data/spotlights.json')
        .then(response => {
            if (!response.ok) throw new Error(`Spotlight data error: ${response.statusText}`);
            return response.json();
        })
        .then(data => {
            const eligibleMembers = data.filter(member =>
                ['gold', 'silver'].includes(member.membershipLevel.toLowerCase())
            );

            if (eligibleMembers.length === 0) {
                console.warn('No eligible spotlight members found.');
            }

            const randomMembers = eligibleMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

            const spotlightContainer = document.getElementById('spotlight-container');
            spotlightContainer.innerHTML = randomMembers.map(member => `
                <div class="spotlight-card">
                    <img src="${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.tagline}</p>
                    <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><a href="${member.url}" target="_blank">Visit Website</a></p>
                    <p><strong>Membership Level:</strong> ${capitalizeWords(member.membershipLevel)}</p>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error fetching spotlight data:', error.message));
});

// Function to capitalize words
function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger'); // Hamburger button
    const navMenu = document.querySelector('.nav-menu');   // Navigation menu
    const closeMenuButton = document.querySelector('.close-menu'); // Optional close button (if used)

    if (hamburger && navMenu) {
        // Handle hamburger button click
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active'); // Toggle the menu visibility
            hamburger.style.display = 'none'; // Hide hamburger when menu is open
            if (closeMenuButton) closeMenuButton.style.display = 'block'; // Show close button if present
        });

        // Handle close button click (if present)
        if (closeMenuButton) {
            closeMenuButton.addEventListener('click', () => {
                navMenu.classList.remove('active'); // Hide the menu
                closeMenuButton.style.display = 'none'; // Hide close button
                hamburger.style.display = 'block'; // Show hamburger button again
            });
        }
    } else {
        console.error('Hamburger button or navigation menu not found.');
    }

    // Ensure menu is always visible on desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            // For desktop view
            navMenu.classList.remove('active'); // Ensure menu is visible
            hamburger.style.display = 'none'; // Hide hamburger button
            if (closeMenuButton) closeMenuButton.style.display = 'none'; // Hide close button
        } else {
            // For mobile view
            hamburger.style.display = 'block'; // Show hamburger button
        }
    });

    // Trigger resize event initially to ensure correct state
    window.dispatchEvent(new Event('resize'));
});

document.addEventListener('DOMContentLoaded', () => {
    // Other existing JavaScript logic...

    // Set the last modified date and time
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        const lastModified = new Date();
        lastModifiedElement.textContent = lastModified.toLocaleString(); // Formats date and time
    } else {
        console.error('Last Modified element not found.');
    }
});
