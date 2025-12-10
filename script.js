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
let isPlaying = false;

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

music.volume = 0.5;

function startMusicOnInteraction() {
    if (music.paused) {
        music.play().then(() => {
            isPlaying = true;
            musicIcon.textContent = '🎵 Music Playing';
        }).catch(error => {
            console.error('Audio playback failed:', error);
            musicIcon.textContent = '⚠️ Failed to Play';
        });
    }

    document.removeEventListener('click', startMusicOnInteraction);
    document.removeEventListener('touchstart', startMusicOnInteraction);
}

document.addEventListener('click', startMusicOnInteraction);
document.addEventListener('touchstart', startMusicOnInteraction);