document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

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

    // Google Maps Integration
    function initMap() {
        const mapElement = document.querySelector('.map');
        if (mapElement && typeof google !== 'undefined') {
            const spaLocation = { lat: 10.8501, lng: 106.7718 }; // Coordinates for Thu Duc address
            const map = new google.maps.Map(mapElement, {
                center: spaLocation,
                zoom: 16,
                styles: [
                    {
                        "featureType": "all",
                        "elementType": "geometry",
                        "stylers": [{"color": "#f5f5f5"}]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [{"color": "#e9e9e9"}]
                    }
                ]
            });

            const marker = new google.maps.Marker({
                position: spaLocation,
                map: map,
                title: 'Chipon Spa - 11 Đ. Số 4, khu phố 2, Thủ Đức'
            });

            // Add info window
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div style="padding: 10px;">
                        <h3 style="margin: 0 0 5px 0; color: #6B4423;">Chipon Spa</h3>
                        <p style="margin: 0; color: #333;">11 Đ. Số 4, khu phố 2<br>Thủ Đức, Hồ Chí Minh</p>
                    </div>
                `
            });

            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
        }
    }

    // Load Google Maps script
    if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
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

    // Form validation for booking
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Cảm ơn bạn đã đặt lịch! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
        });
    }
}); 