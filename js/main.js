/**
 * Inner Performance - Main JavaScript
 * Luxury animations, scroll effects, and interactions
 */

class InnerPerformance {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupGallery();
        this.setupForms();
    }

    init() {
        // Start immediately without loading screen
        window.addEventListener('load', () => {
            this.startHeroAnimations();
        });

        // Setup navigation
        this.setupNavigation();
        
        // Setup scroll effects
        this.setupScrollEffects();
        
        // Setup parallax
        this.setupParallax();
        
        // Setup video controls
        this.setupVideoControls();
        
        // Setup lazy loading
        this.setupLazyLoading();
    }


    startHeroAnimations() {
        // Typewriter effect for hero title
        this.typewriterEffect();
        
        // Animate hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 1.5s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 500);
        }
    }

    typewriterEffect() {
        const heroTitle = document.querySelector('.hero h1');
        if (!heroTitle) return;

        const originalText = heroTitle.textContent;
        let charIndex = 0;

        const typeWriter = () => {
            if (charIndex === 0) {
                heroTitle.textContent = '';
            }
            
            if (charIndex < originalText.length) {
                heroTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            }
        };

        // Start typing effect
        setTimeout(typeWriter, 1000);
    }

    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close mobile menu on link click
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });
        }

        // Active navigation highlighting
        this.setupActiveNavigation();
    }

    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        const highlightNavigation = () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', highlightNavigation);
    }

    setupScrollEffects() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll reveal animations
        this.setupScrollReveal();
    }

    setupScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Stagger animation for service cards
                    if (entry.target.classList.contains('service-card')) {
                        const cards = entry.target.parentElement.querySelectorAll('.service-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('animate');
                            }, index * 200);
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.section-title, .service-card, .contact-info, .contact-form, .reveal').forEach(el => {
            observer.observe(el);
        });
    }

    setupParallax() {
        // Parallax particles in hero
        this.createParticles();
        
        // Section parallax
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.section');
            
            parallaxElements.forEach((element, index) => {
                const speed = index % 2 === 0 ? 0.5 : 0.3;
                element.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
            });
        });
    }

    createParticles() {
        const heroBg = document.getElementById('heroBg');
        if (!heroBg) return;

        // Clear existing particles
        heroBg.innerHTML = '';

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particle.style.width = (2 + Math.random() * 4) + 'px';
            particle.style.height = particle.style.width;
            heroBg.appendChild(particle);
        }
    }

    setupVideoControls() {
        const videoElements = document.querySelectorAll('video');
        
        videoElements.forEach(video => {
            // Create custom controls
            this.createVideoControls(video);
            
            // Handle autoplay
            video.addEventListener('loadeddata', () => {
                video.muted = true;
                video.play().catch(e => {
                    console.log('Autoplay prevented:', e);
                });
            });
        });
    }

    createVideoControls(video) {
        const container = video.closest('.video-container');
        if (!container) return;

        const controls = document.createElement('div');
        controls.className = 'video-controls';
        
        const playBtn = document.createElement('button');
        playBtn.className = 'play-btn';
        playBtn.innerHTML = video.paused ? '▶' : '⏸';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.width = '200px';
        progressBar.style.height = '4px';
        progressBar.style.background = 'rgba(255, 255, 255, 0.3)';
        progressBar.style.borderRadius = '2px';
        progressBar.style.margin = '0 10px';
        
        const progress = document.createElement('div');
        progress.style.height = '100%';
        progress.style.background = 'var(--gold)';
        progress.style.borderRadius = '2px';
        progress.style.width = '0%';
        progressBar.appendChild(progress);
        
        controls.appendChild(playBtn);
        controls.appendChild(progressBar);
        container.appendChild(controls);
        
        // Event listeners
        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playBtn.innerHTML = '⏸';
            } else {
                video.pause();
                playBtn.innerHTML = '▶';
            }
        });
        
        video.addEventListener('timeupdate', () => {
            const percent = (video.currentTime / video.duration) * 100;
            progress.style.width = percent + '%';
        });
        
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            video.currentTime = percent * video.duration;
        });
    }

    setupGallery() {
        // Gallery lightbox
        this.setupLightbox();
        
        // Random photo selection
        this.randomizePhotos();
        
        // Gallery hover effects
        this.setupGalleryHover();
    }

    setupLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = this.createLightbox();
        
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    this.openLightbox(img.src, img.alt);
                }
            });
        });
    }

    createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="" alt="">
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Close lightbox
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                this.closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'Escape') {
                    this.closeLightbox();
                }
            }
        });
        
        return lightbox;
    }

    openLightbox(src, alt) {
        const lightbox = document.querySelector('.lightbox');
        const img = lightbox.querySelector('img');
        
        img.src = src;
        img.alt = alt;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        const lightbox = document.querySelector('.lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    randomizePhotos() {
        const photoContainers = document.querySelectorAll('.gallery-item img, .coach-photo img, .hero-bg');
        const photos = [
            'photos/IMG_9201.jpg', 'photos/IMG_9202.jpg', 'photos/IMG_9203.jpg',
            'photos/IMG_9239.jpg', 'photos/IMG_9240.jpg', 'photos/IMG_9241.jpg',
            'photos/IMG_9253.jpg', 'photos/IMG_9254.jpg', 'photos/IMG_9255.jpg',
            'photos/IMG_9256.jpg', 'photos/IMG_9257.jpg', 'photos/IMG_9258.jpg',
            'photos/IMG_9266.jpg', 'photos/IMG_9267.jpg', 'photos/IMG_9269.jpg',
            'photos/IMG_9270.jpg', 'photos/IMG_9272.jpg', 'photos/IMG_9274.jpg',
            'photos/IMG_9275.jpg', 'photos/IMG_9276.jpg', 'photos/IMG_9277.jpg',
            'photos/IMG_9288.jpg', 'photos/IMG_9289.jpg', 'photos/IMG_9290.jpg',
            'photos/IMG_9291.jpg', 'photos/IMG_9292.jpg', 'photos/IMG_9293.jpg',
            'photos/IMG_9294.jpg', 'photos/IMG_9295.jpg', 'photos/IMG_9303.jpg',
            'photos/IMG_9329.jpg', 'photos/IMG_9365.jpg', 'photos/IMG_9383.jpg',
            'photos/IMG_9384.jpg', 'photos/IMG_9385.jpg', 'photos/IMG_9386.jpg',
            'photos/IMG_9388.jpg', 'photos/IMG_9402.jpg', 'photos/IMG_9436.jpg',
            'photos/IMG_9441.jpg', 'photos/IMG_9472.jpg', 'photos/IMG_9475.jpg',
            'photos/IMG_9476.jpg', 'photos/IMG_9486.jpg', 'photos/IMG_9514.jpg',
            'photos/IMG_9519.jpg', 'photos/IMG_9520.jpg', 'photos/IMG_9525.jpg',
            'photos/IMG_9526.jpg', 'photos/IMG_9539.jpg', 'photos/IMG_9548.jpg',
            'photos/IMG_9554.jpg', 'photos/IMG_9598.jpg', 'photos/IMG_9599.jpg',
            'photos/IMG_9601.jpg', 'photos/IMG_9605.jpg', 'photos/IMG_9633.jpg',
            'photos/IMG_9640.jpg'
        ];
        
        photoContainers.forEach(container => {
            const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
            
            if (container.tagName === 'IMG') {
                container.src = randomPhoto;
                container.alt = 'Inner Performance Training';
            } else if (container.classList.contains('hero-bg')) {
                container.style.backgroundImage = `url(${randomPhoto})`;
                container.style.backgroundSize = 'cover';
                container.style.backgroundPosition = 'center';
                container.style.backgroundRepeat = 'no-repeat';
            }
        });
    }

    setupGalleryHover() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupForms() {
        // Form submission is handled by form-handler.js (sends to Google Sheets)
        // Form validation only (blur/input feedback)
        this.setupFormValidation();
    }

    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
                
                input.addEventListener('input', () => {
                    if (input.classList.contains('error')) {
                        this.validateField(input);
                    }
                });
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error styling
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        // Show error if invalid
        if (!isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            errorDiv.style.color = '#ff6b6b';
            errorDiv.style.fontSize = '0.875rem';
            errorDiv.style.marginTop = '0.25rem';
            field.parentNode.appendChild(errorDiv);
        }
        
        return isValid;
    }

    handleFormSubmission(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate all fields
        let isFormValid = true;
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showNotification('Please fix the errors above', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            this.showNotification('Thank you! Your enquiry has been sent successfully.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Log form data (in production, send to server)
            console.log('Form submitted:', data);
        }, 2000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '1rem 2rem';
        notification.style.borderRadius = '0.5rem';
        notification.style.color = 'white';
        notification.style.fontWeight = '600';
        notification.style.zIndex = '10000';
        notification.style.transform = 'translateX(100%)';
        notification.style.transition = 'transform 0.3s ease';
        
        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';
                break;
            case 'error':
                notification.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a52)';
                break;
            default:
                notification.style.background = 'linear-gradient(135deg, #FFD700, #FFC107)';
                notification.style.color = '#050d1a';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    setupEventListeners() {
        // Resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
        
        // Performance optimization
        this.setupPerformanceOptimizations();
    }

    handleResize() {
        // Recalculate parallax on resize
        this.setupParallax();
        
        // Adjust gallery layout
        this.adjustGalleryLayout();
    }

    adjustGalleryLayout() {
        const gallery = document.querySelector('.gallery-grid');
        if (!gallery) return;
        
        const items = gallery.querySelectorAll('.gallery-item');
        const containerWidth = gallery.offsetWidth;
        const itemWidth = 300;
        const gap = 20;
        const itemsPerRow = Math.floor((containerWidth + gap) / (itemWidth + gap));
        
        items.forEach((item, index) => {
            const row = Math.floor(index / itemsPerRow);
            item.style.animationDelay = `${row * 0.1}s`;
        });
    }

    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + K for search (future feature)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            // Future search functionality
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            this.closeAllModals();
        }
    }

    closeAllModals() {
        const lightbox = document.querySelector('.lightbox.active');
        if (lightbox) {
            this.closeLightbox();
        }
    }

    setupPerformanceOptimizations() {
        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Scroll-dependent operations
            }, 16); // ~60fps
        });
        
        // Preload critical images
        this.preloadCriticalImages();
    }

    preloadCriticalImages() {
        const criticalImages = [
            'photos/IMG_9201.jpg',
            'photos/IMG_9202.jpg',
            'photos/IMG_9203.jpg'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    initializeAnimations() {
        // Initialize GSAP animations if available
        if (typeof gsap !== 'undefined') {
            this.setupGSAPAnimations();
        }
        
        // Setup custom animations
        this.setupCustomAnimations();
    }

    setupGSAPAnimations() {
        // Hero animations
        gsap.timeline()
            .from('.hero h1', { duration: 1, y: 100, opacity: 0, ease: 'power3.out' })
            .from('.hero p', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' }, '-=0.5')
            .from('.cta-buttons', { duration: 1, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.5');
        
        // Scroll-triggered animations
        gsap.utils.toArray('.service-card').forEach((card, index) => {
            gsap.from(card, {
                duration: 1,
                y: 100,
                opacity: 0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                delay: index * 0.2
            });
        });
    }

    setupCustomAnimations() {
        // Button hover animations
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Card tilt effect (exclude form containers - tilt is distracting when filling out forms)
        document.querySelectorAll('.service-card, .glass-card').forEach(card => {
            if (card.classList.contains('demo-container') || card.classList.contains('main-contact-form') || card.classList.contains('form-info') || card.classList.contains('brochure-container') || card.querySelector('form')) {
                return;
            }
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new InnerPerformance();
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InnerPerformance;
}
