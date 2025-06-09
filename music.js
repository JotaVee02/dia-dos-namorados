document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bgMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = playPauseBtn.querySelector('i');
    const progress = document.querySelector('.progress');
    const progressContainer = document.querySelector('.progress-container');
    const songTitle = document.getElementById('songTitle');

    // Tocar/Pausar ao clicar no botão
    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play().then(() => {
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
                updateProgress();
            }).catch(error => {
                console.log('Erro ao reproduzir:', error);
            });
        } else {
            audio.pause();
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        }
    });

    // Atualizar barra de progresso
    function updateProgress() {
        if (!audio.paused) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progress.style.width = `${progressPercent}%`;
            requestAnimationFrame(updateProgress);
        }
    }

    // Definir o progresso da música ao clicar na barra
    progressContainer.addEventListener('click', function(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        
        audio.currentTime = (clickX / width) * duration;
    });

    // Atualizar ícone quando a música terminar
    audio.addEventListener('ended', function() {
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        progress.style.width = '0%';
    });

    // Suporte para tocar em dispositivos móveis
    function enableAudio() {
        audio.volume = 0.5;
        document.removeEventListener('click', enableAudio);
        document.removeEventListener('touchstart', enableAudio);
    }

    // Ativar áudio na primeira interação do usuário
    document.addEventListener('click', enableAudio, { once: true });
    document.addEventListener('touchstart', enableAudio, { once: true });

    // Atualizar título da música
    audio.addEventListener('loadedmetadata', function() {
        const path = audio.src.split('/');
        const filename = path[path.length - 1].replace(/%20/g, ' ').replace('.mp3', '');
        songTitle.textContent = decodeURIComponent(filename);
    });

    // Iniciar a música automaticamente (pode não funcionar em todos os navegadores)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Reprodução automática não permitida:', error);
        });
    }
});
