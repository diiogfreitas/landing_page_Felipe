document.addEventListener('DOMContentLoaded', () => {
    
    // Optional: Dynamic 3D effect on Hero image for premium feel
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero__image-wrapper');
    
    if (heroSection && heroImage) {
        heroSection.addEventListener('mousemove', (e) => {
            // Usa as coordenadas do mouse em relação à janela (clientX/Y) e ao centro num limite contido
            const rect = heroSection.getBoundingClientRect();
            const xAxis = ((rect.left + rect.width / 2) - e.clientX) / 40;
            const yAxis = ((rect.top + rect.height / 2) - e.clientY) / 40;
            
            heroImage.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        // Reset when mouse leaves the section
        heroSection.addEventListener('mouseleave', () => {
            heroImage.style.transform = `rotateY(0deg) rotateX(0deg)`;
            heroImage.style.transition = 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
        });
        
        // Suaviza o movimento ao invés de um estalo grosseiro ("none")
        heroSection.addEventListener('mouseenter', () => {
            heroImage.style.transition = 'transform 0.1s ease-out';
        });
    }

    // Scroll Reveal Animation via IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Continuous Infinite Carousel Logic
    const track = document.getElementById('proofCarouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    
    if (track && prevBtn && nextBtn) {
        let isAnimating = false;
        
        const getMoveDistance = () => {
            const items = track.querySelectorAll('.proof-carousel__item');
            if (items.length === 0) return 0;
            const itemWidth = items[0].getBoundingClientRect().width;
            const gap = parseInt(window.getComputedStyle(track).gap) || 24; // 1.5rem default = 24px
            return itemWidth + gap;
        };
        
        nextBtn.addEventListener('click', () => {
            if (isAnimating) return;
            const items = track.querySelectorAll('.proof-carousel__item');
            if (items.length <= 1) return;
            
            isAnimating = true;
            const moveDistance = getMoveDistance();
            
            track.style.transition = 'transform 0.5s ease-in-out';
            track.style.transform = `translateX(-${moveDistance}px)`;
            
            setTimeout(() => {
                track.style.transition = 'none';
                track.appendChild(track.firstElementChild);
                track.style.transform = 'translateX(0)';
                
                setTimeout(() => {
                    track.style.transition = '';
                    isAnimating = false;
                }, 50);
            }, 500);
        });
        
        prevBtn.addEventListener('click', () => {
            if (isAnimating) return;
            const items = track.querySelectorAll('.proof-carousel__item');
            if (items.length <= 1) return;
            
            isAnimating = true;
            const moveDistance = getMoveDistance();
            
            // Move last child to first position instantly and offset track
            track.style.transition = 'none';
            track.prepend(track.lastElementChild);
            track.style.transform = `translateX(-${moveDistance}px)`;
            
            // Force reflow safely
            void track.offsetWidth;
            
            // Animate it back to original visual place 
            track.style.transition = 'transform 0.5s ease-in-out';
            track.style.transform = 'translateX(0)';
            
            setTimeout(() => {
                track.style.transition = '';
                isAnimating = false;
            }, 500);
        });
        
        window.addEventListener('resize', () => {
            track.style.transition = 'none';
            track.style.transform = 'translateX(0)';
            setTimeout(() => {
                track.style.transition = '';
            }, 50);
        });
    }
});
