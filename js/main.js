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

    // Testimonials Slider
    const testimonials = [
        {
            name: "Nguyễn Thị Hương",
            text: "Dịch vụ tuyệt vời! Nhân viên chuyên nghiệp và không gian rất thư giãn. Tôi đặc biệt thích dịch vụ gội đầu dưỡng sinh.",
            rating: 5
        },
        {
            name: "Trần Văn Nam",
            text: "Massage cổ vai gáy ở đây rất hiệu quả. Sau một tuần làm việc căng thẳng, đây là điều tôi cần nhất.",
            rating: 5
        },
        {
            name: "Phạm Thu Hà",
            text: "Dịch vụ chăm sóc da và điều trị mụn rất tốt. Da mặt của tôi đã cải thiện rõ rệt sau vài lần điều trị.",
            rating: 5
        }
    ];

    const testimonialContainer = document.querySelector('.testimonials-slider');
    let currentTestimonial = 0;

    function createTestimonialElement(testimonial) {
        return `
            <div class="testimonial-item" style="opacity: 0; transition: opacity 0.5s ease;">
                <div class="rating">
                    ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5-testimonial.rating)}
                </div>
                <p class="testimonial-text">"${testimonial.text}"</p>
                <p class="testimonial-author">- ${testimonial.name}</p>
            </div>
        `;
    }

    function showTestimonial(index) {
        testimonialContainer.innerHTML = createTestimonialElement(testimonials[index]);
        setTimeout(() => {
            testimonialContainer.querySelector('.testimonial-item').style.opacity = '1';
        }, 50);
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Initialize testimonials
    if (testimonialContainer) {
        showTestimonial(0);
        setInterval(nextTestimonial, 5000);
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