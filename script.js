document.addEventListener('DOMContentLoaded', function() {
    // Interactive elements toggle
    const interactiveElements = document.querySelectorAll('.interactive-element');
    interactiveElements.forEach(element => {
        element.addEventListener('click', function() {
            const hiddenContent = this.querySelector('.hidden-content');
            if (hiddenContent) {
                hiddenContent.classList.toggle('hidden');
                
                // Smooth scroll to reveal content if it was hidden
                if (!hiddenContent.classList.contains('hidden')) {
                    setTimeout(() => {
                        hiddenContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                }
            }
        });
    });

    // 3D Card effect
    const card3d = document.querySelector('.interactive-element-3d');
    if (card3d) {
        card3d.addEventListener('click', function() {
            const cardContent = this.querySelector('.card-content');
            if (cardContent) {
                cardContent.classList.toggle('hidden');
            }
        });
    }

    // Scroll animations for chapter sections
    const chapterSections = document.querySelectorAll('.chapter-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    chapterSections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for "Explore story" button
    const exploreBtn = document.querySelector('.explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const introSection = document.querySelector('section:nth-of-type(1)');
            if (introSection) {
                introSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Dynamically adjust chapter height on mobile
    function adjustChapterHeight() {
        if (window.innerWidth < 768) {
            const chapterSections = document.querySelectorAll('.chapter-section');
            chapterSections.forEach(section => {
                section.style.minHeight = 'auto';
                section.style.paddingTop = '4rem';
                section.style.paddingBottom = '4rem';
            });
        } else {
            const chapterSections = document.querySelectorAll('.chapter-section');
            chapterSections.forEach(section => {
                section.style.minHeight = '100vh';
                section.style.paddingTop = '5rem';
                section.style.paddingBottom = '5rem';
            });
        }
    }

    // Call on load and resize
    adjustChapterHeight();
    window.addEventListener('resize', adjustChapterHeight);

    // Prevent zooming
    window.addEventListener("wheel", (e) => {
        const isPinching = e.ctrlKey
        if (isPinching) e.preventDefault()
    }, { passive: false });
    
    // Add fade-in animation to elements as they scroll into view
    const fadeElements = document.querySelectorAll('.prose p, .prose h4');
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    fadeElements.forEach(el => {
        el.style.opacity = "0";
        fadeObserver.observe(el);
    });
});
