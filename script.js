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

function revealSurprise(element) {
    element.classList.toggle('revealed');
}

function showFinale() {
    document.getElementById('finale').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFinale() {
    document.getElementById('finale').classList.remove('active');
    document.body.style.overflow = 'auto';
}

const music = document.getElementById('bgMusic');
const musicIcon = document.getElementById('musicIcon');
const musicPrompt = document.getElementById('musicPrompt');
let isPlaying = false;
let hasInteracted = false;

function toggleMusic() {
    if (isPlaying) {
        music.pause();
        musicIcon.textContent = '🔇 Music Paused';
    } else {
        if (music.paused) {
            music.play();
            musicIcon.textContent = '🎵 Music Playing';
        }
    }
    isPlaying = !isPlaying;
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

document.addEventListener('click', handleInteraction, { once: true });
document.addEventListener('touchstart', handleInteraction, { once: true });
if (musicPrompt) {
    musicPrompt.addEventListener('click', handleInteraction, { once: true });
}

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

function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';

    const startX = Math.random() * (window.innerWidth + 200);
    const startY = Math.random() * (window.innerHeight / 3);

    star.style.left = startX + 'px';
    star.style.top = startY + 'px';
    star.style.animation = 'shoot 2s ease-in forwards';

    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 2000);
}

setInterval(createShootingStar, 2000);

setTimeout(() => {
    createShootingStar();
}, 1000);

setTimeout(() => {
    createShootingStar();
}, 500);