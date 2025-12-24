// --- CẤU HÌNH ---
const message = "Gửi Minh Tuệ thân yêu,\nChúc Minh Tuệ của anh mùa Giáng sinh an lành, hạnh phúc và luôn tràn ngập niềm vui.\nHy vọng mùa lễ này mang đến cho em thật nhiều điều ấm áp và thêm những khoảnh khắc đáng nhớ bên anh.\nMerry Christmas! 🎄✨";
const typeSpeed = 60; // Tốc độ gõ chữ

// --- DOM ELEMENTS ---
const startScreen = document.getElementById('start-screen');
const readyBtn = document.getElementById('ready-btn');
const introScreen = document.getElementById('intro-screen');
const videoPlayer = document.getElementById('video-player');
const mainBgVideo = document.getElementById('main-bg-video');
const mainContent = document.getElementById('main-content');
const audio = document.getElementById('bg-music');
const greetingText = document.getElementById('greeting-text');
const gallery = document.getElementById('floating-gallery');
const letterContainer = document.getElementById('letter-container');
const signature = document.getElementById('signature');
const skipBtn = document.getElementById('skip-btn');

// 1. START BUTTON
readyBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';
    introScreen.style.display = 'block';
    audio.play().catch(e => console.log("Audio autoplay blocked"));
    videoPlayer.play();
});

// 2. CHUYỂN QUA MÀN HÌNH CHÍNH
function showMainContent() {
    introScreen.style.display = 'none';
    mainContent.style.display = 'block';
    
    // QUAN TRỌNG: Làm mờ video ngay lập tức để hiện chữ
    mainBgVideo.classList.add('is-blurred');
    mainBgVideo.play();
    
    // Bắt đầu gõ chữ
    typeWriter();
}

videoPlayer.onended = () => showMainContent();
skipBtn.addEventListener('click', () => {
    videoPlayer.pause();
    showMainContent();
});

// 3. HIỆU ỨNG GÕ CHỮ & XỬ LÝ KẾT THÚC
// --- THAY THẾ ĐOẠN TYPEWRITER CŨ BẰNG ĐOẠN NÀY ---

let i = 0;
function typeWriter() {
    if (i < message.length) {
        // Xử lý xuống dòng
        if (message.charAt(i) === '\n') {
            greetingText.innerHTML += '<br>';
        } else {
            greetingText.innerHTML += message.charAt(i);
        }
        i++;
        setTimeout(typeWriter, typeSpeed);
    // --- THAY THẾ PHẦN "ELSE" TRONG HÀM TYPEWRITER ---

// ... (đoạn trên giữ nguyên) ...
    } else {
        // --- KHI VIẾT XONG ---
        
        // 1. Hiện ảnh & Xóa mờ (Giai đoạn bay lượn)
        signature.style.opacity = '1'; 
        gallery.style.display = 'block';
        mainBgVideo.classList.remove('is-blurred');
        
        // 2. Mờ lời chúc
        letterContainer.style.opacity = '0';
        setTimeout(() => { letterContainer.style.display = 'none'; }, 2000);

        // 3. --- QUAN TRỌNG: SAU 4 GIÂY BAY LƯỢN -> XẾP HÌNH TRÁI TIM ---
        setTimeout(() => {
            // Thêm class này để kích hoạt CSS xếp hình
            gallery.classList.add('heart-mode');
        }, 4000); // 4000ms = 4 giây sau khi ảnh hiện ra
    }
}