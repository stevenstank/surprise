let currentSlide = 0;
const slides = document.querySelectorAll('.polaroid');
const totalSlides = slides.length;
let autoSlideInterval;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
    document.getElementById('currentSlide').textContent = currentSlide + 1;
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 3000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

startAutoSlide();

const slideshowContainer = document.getElementById('slideshowContainer');
let touchStartX = 0;
let touchEndX = 0;

slideshowContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

slideshowContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            changeSlide(1);
        } else {
            changeSlide(-1);
        }
    }
}

// Event delegation for surprise boxes and slide buttons
document.addEventListener('click', (e) => {
    // Handle surprise boxes
    if (e.target.closest('.surprise-box')) {
        e.target.closest('.surprise-box').classList.toggle('revealed');
    }
    // Handle slide direction buttons
    if (e.target.closest('[data-slide-direction]')) {
        const direction = parseInt(e.target.closest('[data-slide-direction]').dataset.slideDirection);
        changeSlide(direction);
    }
    // Handle finale button
    if (e.target.id === 'finaleBtn') {
        document.getElementById('finale').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    // Handle finale close button
    if (e.target.id === 'finaleCloseBtn') {
        document.getElementById('finale').classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Keyboard support for slide buttons
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Music control
const music = document.getElementById('bgMusic');
const musicIcon = document.getElementById('musicIcon');
const musicControl = document.getElementById('musicControl');
const musicPrompt = document.getElementById('musicPrompt');
let isPlaying = false;
let hasInteracted = false;

function toggleMusic() {
    if (isPlaying) {
        music.pause();
        musicIcon.textContent = '🔇 Music Paused';
    } else {
        music.play();
        musicIcon.textContent = '🎵 Music Playing';
    }
    isPlaying = !isPlaying;
}

// Add music control click handler
if (musicControl) {
    musicControl.addEventListener('click', toggleMusic);
    musicControl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMusic();
        }
    });
}

music.volume = 0.5;

function handleInteraction() {
    if (!hasInteracted) {
        music.play().then(() => {
            isPlaying = true;
            hasInteracted = true;
            musicIcon.textContent = '🎵 Music Playing';
            if (musicPrompt) musicPrompt.style.display = 'none';
        }).catch(error => {
            console.error('Playback failed even after interaction:', error);
        });
    }
}

// Add interaction listeners with { once: true } to automatically remove after first trigger
document.addEventListener('click', handleInteraction, { once: true });
document.addEventListener('touchstart', handleInteraction, { once: true });

if (window.location.hash === '#autostart') {
    music.play().then(() => {
        isPlaying = true;
        hasInteracted = true;
        musicIcon.textContent = '🎵 Music Playing';
        if (musicPrompt) musicPrompt.style.display = 'none';
    }).catch(error => {
        if (musicPrompt) musicPrompt.style.display = 'block';
    });
}

// Shooting star animation - optimized to prevent memory leaks
let shootingStarTimeout;
let shootingStarInterval;
const maxShootingStars = 50; // Prevent DOM bloat

function createShootingStar() {
    // Remove old stars to prevent memory leaks
    const existingStars = document.querySelectorAll('.shooting-star');
    if (existingStars.length > maxShootingStars) {
        existingStars[0].remove();
    }

    const star = document.createElement('div');
    star.className = 'shooting-star';

    const startX = Math.random() * (window.innerWidth + 200);
    const startY = Math.random() * (window.innerHeight / 3);

    star.style.left = startX + 'px';
    star.style.top = startY + 'px';
    star.style.animation = 'shoot 2s ease-in forwards';

    document.body.appendChild(star);

    // Clean up the star after animation completes
    setTimeout(() => {
        star.remove();
    }, 2000);
}

// Start shooting stars with proper cleanup
shootingStarTimeout = setTimeout(() => {
    createShootingStar();
}, 500);

shootingStarTimeout = setTimeout(() => {
    createShootingStar();
}, 1000);

shootingStarInterval = setInterval(createShootingStar, 2000);

// Cleanup function (useful if needed)
function stopShootingStars() {
    clearTimeout(shootingStarTimeout);
    clearInterval(shootingStarInterval);
}