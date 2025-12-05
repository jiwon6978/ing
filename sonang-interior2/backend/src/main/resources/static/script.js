document.addEventListener('DOMContentLoaded', () => {
    // Inject Navbar
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        navbarPlaceholder.innerHTML = `
      <nav class="navbar">
        <div class="container navbar-container">
          <a href="/" class="logo">SONANG</a>
          <div class="menu-icon" id="menu-icon">
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </div>
          <ul class="nav-menu" id="nav-menu">
            <li class="nav-item"><a href="/" class="nav-link">Home</a></li>
            <li class="nav-item"><a href="/portfolio.html" class="nav-link">Portfolio</a></li>
            <li class="nav-item"><a href="/reservation.html" class="nav-link">Reservation</a></li>
            <li class="nav-item"><a href="/contact.html" class="nav-link">Contact</a></li>
            <li class="nav-item"><a href="/login.html" class="nav-link">Login</a></li>
          </ul>
        </div>
      </nav>
    `;

        // Initialize Menu Logic after injection
        initMenu();
        highlightActiveLink();
    }

    // Inject Footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
      <footer class="footer">
        <div class="container footer-container">
          <div class="footer-section">
            <h3>SONANG</h3>
            <p>Creating spaces that tell your story.</p>
          </div>
          <div class="footer-section">
            <h4>Contact</h4>
            <p>123 Design Avenue, Seoul, KR</p>
            <p>+82 10-1234-5678</p>
            <p>hello@sonang.com</p>
          </div>
          <div class="footer-section">
            <h4>Follow Us</h4>
            <div class="social-icons">
              <a href="#" class="social-icon">Instagram</a>
              <a href="#" class="social-icon">Facebook</a>
              <a href="#" class="social-icon">Pinterest</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} Sonang Interior. All rights reserved.</p>
        </div>
      </footer>
    `;
    }

    // Reservation Form Handling
    const reservationForm = document.querySelector('.reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your reservation request. We will contact you shortly.');
            reservationForm.reset();
        });
    }
});

function initMenu() {
    const menuIcon = document.getElementById('menu-icon');
    const navMenu = document.getElementById('nav-menu');

    if (menuIcon && navMenu) {
        menuIcon.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Simple icon toggle logic could go here if using different SVGs
        });

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Simple check: if current path ends with link path (e.g. /index.html ends with index.html)
        // Also handle root path '/' matching 'index.html'
        if (currentPath.endsWith(linkPath) || (currentPath.endsWith('/') && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
}
