const apiKey = 'ebc7d4aa3e81308e5b500cbbf4a843b4'; // Tu API key válida
const city = 'San Pedro Sula'; // Ciudad para el clima

// Ejecuta todo el script al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    initializeWeather();
    initializeForecast();
    initializeHamburgerMenu();
    setLastModifiedDate();
});

// Función para obtener el clima actual
function initializeWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) throw new Error(`Error en la API del clima: ${response.statusText}`);
            return response.json();
        })
        .then(data => {
            const temperature = Math.round(data.main.temp);
            const description = capitalizeWords(data.weather[0]?.description || 'No description available');

            document.getElementById('temperature').innerHTML = `
                <p><strong>Temperature:</strong> ${temperature}°C</p>
                <p><strong>Description:</strong> ${description}</p>
            `;
        })
        .catch(error => console.error('Error obteniendo el clima actual:', error.message));
}

// Función para obtener el pronóstico de 3 días
function initializeForecast() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) throw new Error(`Error en la API del pronóstico: ${response.statusText}`);
            return response.json();
        })
        .then(data => {
            const forecast = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

            const forecastHTML = forecast.map(day => `
                <p><strong>${new Date(day.dt_txt).toLocaleDateString()}:</strong> 
                ${Math.round(day.main.temp)}°C, ${capitalizeWords(day.weather[0]?.description || 'No data')}</p>
            `).join('');

            document.getElementById('forecast').innerHTML = forecastHTML;
        })
        .catch(error => console.error('Error obteniendo el pronóstico:', error.message));
}

// Función para inicializar el menú hamburguesa
function initializeHamburgerMenu() {
    const hamburger = document.querySelector(".hamburger-btn");
    const navMenu = document.querySelector(".nav-menu");

    if (!hamburger || !navMenu) {
        console.error("No se encontró el botón hamburguesa o el menú.");
        return;
    }

    // Ocultar el menú por defecto (asegura el estado inicial)
    navMenu.classList.remove('active');

    // Alternar visibilidad del menú
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        console.log("Botón hamburguesa clickeado");
    });

    // Ajustar el menú al redimensionar la ventana
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            navMenu.classList.remove("active"); // Mostrar siempre en pantallas grandes
        }
    });
}
// Función para manejar el mensaje de bienvenida
document.addEventListener("DOMContentLoaded", () => {
    const welcomeMessageElement = document.getElementById("welcome-message");

    // Comprobar si hay un registro en localStorage
    const hasVisited = localStorage.getItem("hasVisited");

    if (hasVisited) {
        // Segunda visita o más
        welcomeMessageElement.textContent = "Welcome Back! We're glad to see you again.";
    } else {
        // Primera visita
        welcomeMessageElement.textContent = "Welcome! We're excited to have you here.";
        localStorage.setItem("hasVisited", "true"); // Registrar la visita
    }

    // Mostrar el mensaje
    welcomeMessageElement.style.display = "block";
});

// Función para mostrar la última fecha de modificación
function setLastModifiedDate() {
    const lastModifiedElement = document.getElementById("lastModified");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = new Date(document.lastModified).toLocaleString();
    } else {
        console.error("Elemento para última fecha de modificación no encontrado.");
    }
}

// Función para capitalizar las palabras
function capitalizeWords(str) {
    if (!str) return '';
    return str.replace(/\b\w/g, char => char.toUpperCase());
}
