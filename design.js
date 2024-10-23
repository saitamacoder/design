document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        const toggleBtn = this.querySelector('.toggle-btn');
        toggleBtn.style.transform = body.classList.contains('dark-theme') ? 'translateX(30px)' : 'translateX(0)';
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animated counter for impact numbers
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const impactItems = document.querySelectorAll('.impact-item h3');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-value'));
                animateValue(target, 0, endValue, 2000);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    impactItems.forEach(item => {
        item.setAttribute('data-value', item.innerText);
        item.innerText = '0';
        observer.observe(item);
    });

    // Expandable advantages list
    const advantageItems = document.querySelectorAll('.advantage-list li');
    advantageItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('expanded');
            const arrow = this.querySelector('.arrow');
            arrow.style.transform = this.classList.contains('expanded') ? 'rotate(90deg)' : 'rotate(0)';
        });
    });

    // Form validation for account creation (assuming there's a form in the CTA section)
    const createAccountForm = document.querySelector('#create-account-form');
    if (createAccountForm) {
        createAccountForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form validation logic here
            console.log('Form submitted');
        });
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imgOptions = {
        threshold: 0,
        rootMargin: "0px 0px 300px 0px"
    };

    const imgObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imgObserver.unobserve(img);
        });
    }, imgOptions);

    images.forEach(img => imgObserver.observe(img));

    // Testimonial carousel (if needed)
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-item');
    const totalTestimonials = testimonials.length;

    function showTestimonial(index) {
        testimonials.forEach(testimonial  => testimonial.style.display = 'none');
        testimonials[index].style.display = 'block';
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        showTestimonial(currentTestimonial);
    }

    // Uncomment and use these if you decide to add navigation buttons for testimonials
    // document.querySelector('.next-testimonial').addEventListener('click', nextTestimonial);
    // document.querySelector('.prev-testimonial').addEventListener('click', prevTestimonial);

    // Auto-rotate testimonials every 5 seconds
    setInterval(nextTestimonial, 5000);

    // Initialize
    showTestimonial(currentTestimonial);
});
