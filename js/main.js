document.addEventListener('DOMContentLoaded', function() {
    const videoItems = document.querySelectorAll('.video-item video');
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalCloseButton = document.getElementById('videoModalCloseButton');

    videoItems.forEach(video => {
        video.addEventListener('click', function() {
            // 暂停页面上所有其他视频
            videoItems.forEach(v => v.pause());

            // 显示模态窗口并播放视频
            modal.style.display = 'block';
            modalVideo.src = this.querySelector('source').src;
            modalVideo.play();
        });
    });

    // 在视频播放结束时关闭模态窗口
    modalVideo.addEventListener('ended', function() {
        modal.style.display = 'none';
        modalVideo.src = ''; // 清空视频源
    });

    // 点击模态窗口外部关闭模态窗口
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            modalVideo.pause();
            modalVideo.src = ''; // 清空视频源
        }
    });

    // 点击关闭按钮关闭模态窗口
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', function(event) {
            event.stopPropagation(); // 防止事件冒泡
            modal.style.display = 'none';
            modalVideo.pause();
            modalVideo.src = ''; // 清空视频源
        });
    }

    // 添加证书轮播功能
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    let currentIndex = 0;
    
    function updateSlidePosition() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    function moveToNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlidePosition();
    }
    
    function moveToPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlidePosition();
    }
    
    // 添加按钮事件监听器
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', moveToPrevSlide);
        nextButton.addEventListener('click', moveToNextSlide);
    }
    
    // 初始化轮播位置
    updateSlidePosition();
});
