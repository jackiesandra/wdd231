document.addEventListener('DOMContentLoaded', () => {
    const lastModifiedElement = document.getElementById('lastModified');
    const lastModifiedDate = new Date(document.lastModified);
    lastModifiedElement.textContent = lastModifiedDate.toLocaleString();

    const hamburger = document.querySelector('.hamburger');
    const closeMenu = document.querySelector('.close-menu');
    const navMenu = document.querySelector('.nav-menu');

    // Check viewport width and toggle visibility of hamburger and nav menu
    function updateMenuVisibility() {
        if (window.innerWidth > 768) {
            hamburger.style.display = 'none';
            closeMenu.style.display = 'none';
            navMenu.classList.remove('active');
        } else {
            hamburger.style.display = 'block';
            closeMenu.style.display = 'none';
        }
    }

    // Initial visibility check
    updateMenuVisibility();

    // Update visibility on window resize
    window.addEventListener('resize', updateMenuVisibility);

    // Toggle mobile navigation menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.add('active');
        hamburger.style.display = 'none';
        closeMenu.style.display = 'block';
    });

    closeMenu.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.style.display = 'block';
        closeMenu.style.display = 'none';
    });

    // Ensure close button is within the navigation menu
    if (!navMenu.contains(closeMenu)) {
        navMenu.prepend(closeMenu);
    }

    const directory = document.getElementById('business-directory');
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');

    async function fetchMembers() {
        try {
            const response = await fetch('Data/members.json');
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error('Error loading members:', error);
        }
    }

    function displayMembers(members) {
        directory.innerHTML = '';
        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('business-card');

            card.innerHTML = `
                <img src="${member.image}" alt="${member.name}">
                <div class="business-info">
                    <h4>${member.name}</h4>
                    <p>${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                </div>
            `;

            directory.appendChild(card);
        });
    }

    // Toggle between grid and list views
    gridViewBtn.addEventListener('click', () => {
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        directory.classList.add('grid-view');
        directory.classList.remove('list-view');
    });

    listViewBtn.addEventListener('click', () => {
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        directory.classList.add('list-view');
        directory.classList.remove('grid-view');
    });

    // Initialize member data
    fetchMembers();
});
