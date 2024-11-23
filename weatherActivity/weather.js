const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=ebc7d4aa3e81308e5b500cbbf4a843b4';

async function apiFetch() {
    try {
        const response = await fetch(url); // Realiza la solicitud a la API
        if (response.ok) {
            const data = await response.json(); // Convierte la respuesta en JSON
            console.log(data); // Muestra los datos en la consola para verificar
            displayResults(data); // Llama a la función para mostrar los datos
        } else {
            throw new Error(`HTTP error: ${response.status}`); // Maneja errores de HTTP
        }
    } catch (error) {
        console.error('Error fetching data:', error); // Muestra errores en la consola
        document.body.innerHTML = '<p>Sorry, we could not load the weather data. Please try again later.</p>';
    }
}

function displayResults(data) {
    // Elementos del DOM
    const temp = document.getElementById('current-temp');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherCaption = document.getElementById('weather-caption');

    // Muestra la temperatura actual con un decimal
    temp.textContent = `${data.main.temp.toFixed(1)} °C`;

    // Genera la URL del ícono del clima
    const iconCode = data.weather[0].icon;
    const iconUrl = https://www.iconfinder.com/icons/1530391/weather_clouds_sun_sunny_icon;
    weatherIcon.setAttribute('src', iconUrl); // Asigna el ícono
    weatherIcon.setAttribute('alt', data.weather[0].description); // Asigna la descripción como texto alternativo

    // Muestra la descripción del clima
    weatherCaption.textContent = data.weather[0].description;
}

// Llama a la función para obtener los datos al cargar la página
apiFetch();
