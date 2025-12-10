let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
    document.getElementById('currentSlide').textContent = currentSlide + 1;
}

setInterval(() => {
    showSlide(currentSlide + 1);
}, 3000);

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