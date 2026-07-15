    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPage.includes(href) || 
            (currentPage.includes('projektet.html') && href === 'projektet.html')) {
            link.classList.add('active');
        }
    });