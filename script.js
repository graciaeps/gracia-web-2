const scrollContainers = document.querySelectorAll('.scroll-container');

scrollContainers.forEach(container => {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return; 
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; 
        container.scrollLeft = scrollLeft - walk;
    });
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const images = Array.from(document.querySelectorAll('.clickable'));
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

if (lightbox && lightboxImg && closeBtn && prevBtn && nextBtn) {

    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
            currentIndex = index;
        });
    });

    closeBtn.onclick = () => {
        lightbox.style.display = "none";
    };

    nextBtn.onclick = () => {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex].src;
    };

    prevBtn.onclick = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex].src;
    };

    lightbox.onclick = (e) => {
        if (e.target !== lightboxImg && e.target !== nextBtn && e.target !== prevBtn) {
            lightbox.style.display = "none";
        }
    };

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === "flex") {
            if (e.key === "ArrowRight") nextBtn.onclick();
            if (e.key === "ArrowLeft") prevBtn.onclick();
            if (e.key === "Escape") lightbox.style.display = "none";
        }
    });
}

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("show");
});

const homePage = document.getElementById("homePage");
const aboutPage = document.getElementById("aboutPage");
const aboutTrigger = document.getElementById("aboutTrigger");
const backTrigger = document.getElementById("backTrigger");

if (aboutTrigger && backTrigger && homePage && aboutPage) {
    aboutTrigger.addEventListener("click", () => {
        homePage.classList.remove("active");
        aboutPage.classList.add("active");
    });

    backTrigger.addEventListener("click", () => {
        aboutPage.classList.remove("active");
        homePage.classList.add("active");
    });
}

function showVideo(videoId) {
    const detailArea = document.getElementById('videoDetailArea');
    const allContents = document.querySelectorAll('.detail-content');
    const allPlayers = document.querySelectorAll('.detail-content video');

    allContents.forEach(content => content.style.display = 'none');
    allPlayers.forEach(player => {
        player.pause();
        player.currentTime = 0;
    });

    detailArea.style.display = 'block';
    const targetContent = document.getElementById('content-' + videoId);
    targetContent.style.display = 'block';

    detailArea.scrollIntoView({ behavior: 'smooth' });

    const activePlayer = document.getElementById('player-' + videoId);
    activePlayer.play();
}