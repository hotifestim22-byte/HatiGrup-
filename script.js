const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    }
});

const contactForm = document.getElementById('contactForm');
const emailInput = document.getElementById('emailInput');
const emailError = document.getElementById('emailError');
const submitMessage = document.getElementById('submitMessage');

if (emailInput) {
    emailInput.addEventListener('input', () => {
        emailError?.classList.add('hidden');
        emailInput.classList.remove('input-error');
        submitMessage?.classList.add('hidden');
        submitMessage?.classList.remove('error');
    });
}

if (contactForm && emailInput && emailError) {
    contactForm.addEventListener('submit', event => {
        event.preventDefault();

        const nameField = document.getElementById('name');
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');
        const nameValue = nameField?.value.trim();
        const emailValue = emailInput.value.trim();
        const subjectValue = subjectField?.value.trim();
        const messageValue = messageField?.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameValue || !subjectValue || !messageValue) {
            submitMessage?.classList.remove('hidden');
            submitMessage?.classList.add('error');
            submitMessage.textContent = 'Ju lutemi plotësoni emrin, subjektin dhe mesazhin para se të dërgoni.';

            if (!nameValue) {
                nameField.focus();
            } else if (!subjectValue) {
                subjectField.focus();
            } else {
                messageField.focus();
            }
            return;
        }

        if (!emailRegex.test(emailValue)) {
            emailError.classList.remove('hidden');
            emailInput.classList.add('input-error');
            emailInput.focus();
            return;
        }

        const recipient = 'hotifestim22@gmail.com';
        const mailSubject = encodeURIComponent(subjectValue || 'Mesazh nga kontakt form');
        const mailBody = encodeURIComponent(`Emri: ${nameValue}\nEmail: ${emailValue}\n\nMesazhi:\n${messageValue}`);
        const mailtoLink = `mailto:${recipient}?subject=${mailSubject}&body=${mailBody}`;

        submitMessage?.classList.remove('hidden', 'error');
        submitMessage.textContent = 'Po hapet klienti i email-it...';

        setTimeout(() => {
            window.location.href = mailtoLink;
        }, 200);
    });
}