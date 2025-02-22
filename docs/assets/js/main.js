document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the homepage
    const isHomepage = window.location.pathname === '/' || 
                      window.location.pathname === '/index.html' ||
                      window.location.pathname.endsWith('/docs/') ||
                      window.location.pathname.endsWith('/docs/index.html');

    const nav = document.querySelector('.main-nav');
    
    if (isHomepage) {
        nav.classList.add('transparent-nav');
        
        // Handle scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Check initial scroll position
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        }
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // If menu is opened on homepage with transparent nav, add scrolled class for visibility
            if (isHomepage && nav.classList.contains('transparent-nav')) {
                nav.classList.add('scrolled');
            } else if (isHomepage && !navLinks.classList.contains('active')) {
                // Remove scrolled class when menu is closed and we're at the top
                if (window.scrollY <= 50) {
                    nav.classList.remove('scrolled');
                }
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-nav')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after clicking a link
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Testimonials Display
    const testimonials = [
        {
            name: "Linh Nguyễn",
            text: "Mình hay gội đầu dưỡng sinh ở đây, nv rất dth nhiệt tình mà gội cũng rất thoải mái.",
            rating: 5
        },
        {
            name: "Kiều Tiên",
            text: "Nhân viên nhiệt tình, dễ thương, giá phải chăng,.....",
            rating: 5
        },
        {
            name: "Thiep Tran (Local Guide)",
            text: "Gội đầu sạch, mát xa dễ chịu và uốn mi siêu cong, ưng lắm. Giá mềm hơn so mặt bằng chung, nv nhiệt tình, bạn mình đợi mình uốn mi 1 tiếng thì được các bạn nv hỗ trợ ngâm chân free.",
            rating: 5
        },
        {
            name: "Phan Thư",
            text: "Nhân viên nhiệt tình, dễ thương, spa thơm saạch đẹp, giá phải chăng, nhân viên masa dễ chiu, thư giản…. Sẽ ghé ủng hộ tiếp, rất hài lòng",
            rating: 5
        },
        {
            name: "Long Nguyen",
            text: "Nhân viên dễ thương, giá cả cũng hợp lý. Mình hay nặn mụn ở đây thấy okela lắm nè",
            rating: 5
        }
    ];

    const testimonialContainer = document.querySelector('.testimonials-grid');
    
    function createTestimonialElement(testimonial) {
        return `
            <div class="testimonial-item">
                <div class="rating">
                    ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5-testimonial.rating)}
                </div>
                <p class="testimonial-text">"${testimonial.text}"</p>
                <p class="testimonial-author">- ${testimonial.name}</p>
            </div>
        `;
    }

    // Display all testimonials
    if (testimonialContainer) {
        testimonialContainer.innerHTML = testimonials.map(testimonial => 
            createTestimonialElement(testimonial)
        ).join('');
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}); 