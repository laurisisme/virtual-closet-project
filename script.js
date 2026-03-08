(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initSmoothScroll();
        initNavbarScroll();
        initFadeInScroll();
        initFormValidation();
        initSocialMediaTracking();
        initTryNowButtons();
    });

    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href !== '') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    function initNavbarScroll() {
        const navbar = document.querySelector('nav');
        let lastScroll = 0;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                navbar.classList.add('shadow-lg');
            } else {
                navbar.classList.remove('shadow-lg');
            }

            lastScroll = currentScroll;
        });
    }

    function initFadeInScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }

    function initFormValidation() {
        const form = document.querySelector('form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');

            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                return;
            }

            if (!email.value.trim() || !isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                return;
            }

            if (!subject.value.trim()) {
                showError(subject, 'Please enter a subject');
                return;
            }

            if (!message.value.trim()) {
                showError(message, 'Please enter a message');
                return;
            }

            showSuccess();
        });

        function showError(input, message) {
            input.classList.add('border-rose');
            input.classList.remove('border-cocoa/20');
            
            const existingError = input.parentElement.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }

            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message text-rose text-sm mt-1';
            errorDiv.textContent = message;
            input.parentElement.appendChild(errorDiv);

            setTimeout(() => {
                input.classList.remove('border-rose');
                input.classList.add('border-cocoa/20');
                errorDiv.remove();
            }, 3000);
        }

        function showSuccess() {
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Message Sent!';
            submitButton.classList.add('bg-green-500');
            submitButton.classList.remove('bg-rose');

            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.classList.remove('bg-green-500');
                submitButton.classList.add('bg-rose');
                form.reset();
            }, 2000);
        }

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
    }

    function initSocialMediaTracking() {
        const socialLinks = document.querySelectorAll('.social-icon, .social-grid a, footer a[href*="facebook"], footer a[href*="twitter"], footer a[href*="instagram"]');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const platform = this.href.includes('facebook') ? 'Facebook' :
                               this.href.includes('twitter') ? 'Twitter' :
                               this.href.includes('instagram') ? 'Instagram' : 'Unknown';
                
                console.log(`Social media click: ${platform}`);
                
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });

            link.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
            });
        });
    }

    function initTryNowButtons() {
        const tryButtons = document.querySelectorAll('a[href*="prototype"], .btn-try-now, a:contains("Try")');
        
        tryButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#' || this.getAttribute('href') === '#cta') {
                    e.preventDefault();
                    console.log('Try Now button clicked');
                    
                    this.classList.add('animate-pulse');
                    setTimeout(() => {
                        this.classList.remove('animate-pulse');
                    }, 600);
                }
            });
        });
    }

    window.addEventListener('load', function() {
        const heroSection = document.querySelector('section');
        if (heroSection) {
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }
    });

})();