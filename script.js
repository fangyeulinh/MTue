// --- CẤU HÌNH ---
const message = "Gửi Minh Tuệ thân yêu,\nChúc Minh Tuệ của anh mùa Giáng sinh an lành, hạnh phúc và luôn tràn ngập niềm vui.\nHy vọng mùa lễ này mang đến cho em thật nhiều điều ấm áp và thêm những khoảnh khắc đáng nhớ bên anh.\nMerry Christmas! 🎄✨";
const typeSpeed = 50; // Tốc độ gõ chữ

// --- LẤY CÁC PHẦN TỬ ---
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
// Đã xóa dòng lấy skipBtn

// --- SỰ KIỆN ---

// 1. BẤM NÚT SẴN SÀNG
readyBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';
    introScreen.style.display = 'block';
    audio.play().catch(() => console.log("Cần tương tác để phát nhạc"));
    videoPlayer.play();
});

// 2. CHUYỂN QUA MÀN HÌNH CHÍNH (Chỉ chạy khi video hết)
function showMainContent() {
    introScreen.style.display = 'none';
    mainContent.style.display = 'block';
    
    // Làm mờ video để hiện chữ
    mainBgVideo.classList.add('is-blurred');
    mainBgVideo.play();
    
    // Bắt đầu gõ chữ
    typeWriter();
}

// Khi video intro chạy xong -> Tự chuyển
videoPlayer.onended = () => showMainContent();

// Đã xóa sự kiện click của skipBtn

// 3. HIỆU ỨNG GÕ CHỮ & LOGIC KẾT THÚC
let i = 0;
function typeWriter() {
    if (i < message.length) {
        if (message.charAt(i) === '\n') {
            greetingText.innerHTML += '<br>';
        } else {
            greetingText.innerHTML += message.charAt(i);
        }
        i++;
        setTimeout(typeWriter, typeSpeed);
    } else {
        // --- KHI VIẾT XONG ---
        console.log("Xong chữ. Bắt đầu hiện ảnh.");

        // 1. Hiện ảnh & Xóa mờ nền NGAY LẬP TỨC
        signature.style.opacity = '1'; 
        gallery.style.display = 'block';
        mainBgVideo.classList.remove('is-blurred');
        
        // 2. Mờ dần lời chúc và ẩn đi
        letterContainer.style.opacity = '0';
        setTimeout(() => { letterContainer.style.display = 'none'; }, 2000);

        // 3. --- GIAI ĐOẠN 1: BAY TỰ DO (4 giây) ---
        setTimeout(() => {
            // --- GIAI ĐOẠN 2: XẾP HÌNH TRÁI TIM ---
            console.log("Hết 4s bay. Bắt đầu xếp tim.");
            gallery.classList.add('heart-mode');

            // --- GIAI ĐOẠN 3: ĐẬP THÌNH THỊCH (Sau khi xếp xong 2.5s) ---
            setTimeout(() => {
                console.log("Đã xếp xong. Bắt đầu đập.");
                gallery.classList.add('heart-beating');
            }, 2500); 

        }, 4000); 
    }
}
