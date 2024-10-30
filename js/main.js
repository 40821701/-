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

    // 更新二维码显示处理
    const socialIcons = document.querySelectorAll('.social-icon');

    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(event) {
            event.stopPropagation(); // 阻止事件冒泡
            const qrCode = this.querySelector('.qr-code-popup');
            if (qrCode) {
                // 隐藏所有其他二维码
                document.querySelectorAll('.qr-code-popup').forEach(popup => {
                    if (popup !== qrCode) {
                        popup.style.display = 'none';
                    }
                });
                // 切换当前二维码的显示状态
                qrCode.style.display = qrCode.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // 点击页面其他地方关闭二维码
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.social-icon')) {
            document.querySelectorAll('.qr-code-popup').forEach(popup => {
                popup.style.display = 'none';
            });
        }
    });

    // 视频加载优化
    const allVideos = document.querySelectorAll('video');
    
    // 使用 Intersection Observer 来监控视频是否在视口中
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            
            // 如果视频进入视口
            if (entry.isIntersecting) {
                // 如果视频之前被暂停，则开始播放
                if (video.paused && video.autoplay) {
                    video.play().catch(() => {
                        // 处理自动播放失败的情况
                        console.log('Autoplay prevented');
                    });
                }
            } else {
                // 如果视频离开视口，则暂停播放
                if (!video.paused) {
                    video.pause();
                }
            }
        });
    }, {
        threshold: 0.2 // 当20%的视频可见时触发
    });

    // 对所有视频应用观察器
    allVideos.forEach(video => {
        videoObserver.observe(video);
        
        // 设置视频的播放质量
        video.addEventListener('loadedmetadata', function() {
            if (window.innerWidth < 768) {
                // 移动设备使用较低质量
                video.quality = 'low';
            }
        });
    });

    // 处理窗口大小改变
    window.addEventListener('resize', () => {
        allVideos.forEach(video => {
            if (window.innerWidth < 768) {
                video.quality = 'low';
            } else {
                video.quality = 'high';
            }
        });
    });
});
