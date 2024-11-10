// Función para alternar el menú
function toggleMenu() {
    const nav = document.getElementById("navbar");
    nav.classList.toggle("open"); // Agrega o quita la clase 'open' para mostrar u ocultar el menú
}

// Función para actualizar la hora de la última actualización
function updateLastUpdate() {
    const now = new Date();
    const dateString = now.toLocaleString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
    document.getElementById("last-update").textContent = `Last Update: ${dateString}`;
}

// Ejecutar la actualización de la fecha al cargar la página
window.onload = updateLastUpdate;
function filterCourses(category) {
    const courses = document.querySelectorAll('.course-btn');
    
    courses.forEach(course => {
        if (category === 'all') {
            course.style.display = 'inline-block';  // Show all courses
        } else if (course.classList.contains(category)) {
            course.style.display = 'inline-block';  // Show courses with the selected category
        } else {
            course.style.display = 'none';  // Hide other courses
        }
    });
}
