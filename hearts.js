// Configurações dos corações
const HEARTS_COUNT = 30;
const HEARTS_CONTAINER = document.getElementById('hearts-container');
const HEARTS = ['❤', '💖', '💗', '💓', '💞', '💕', '💘'];
const COLORS = ['#ff6b6b', '#ff8e8e', '#ffb3b3', '#ffd8d8', '#ff4b5c'];

// Verifica se o dispositivo é móvel
const IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Criar corações flutuantes
function createHeart() {
    const heart = document.createElement('span');
    heart.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
    
    // Tamanho aleatório
    const size = Math.random() * 25 + 15; // 15-40px
    
    // Estilos iniciais
    heart.style.position = 'fixed';
    heart.style.fontSize = `${size}px`;
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.bottom = '-50px';
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    heart.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    heart.style.zIndex = '0';
    heart.style.pointerEvents = 'none';
    heart.style.willChange = 'transform, opacity';
    heart.style.userSelect = 'none';
    heart.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.7)';
    
    // Adiciona o coração ao container
    HEARTS_CONTAINER.appendChild(heart);
    
    // Configuração da animação
    const duration = Math.random() * 20 + 10; // 10-30s
    const delay = Math.random() * 5;
    const startX = Math.random() * 100;
    const endX = startX + (Math.random() * 100 - 50); // Movimento horizontal aleatório
    const rotation = Math.random() * 360;
    
    // Configura a animação
    const keyframes = [
        { 
            transform: `translate(-50%, 0) rotate(0deg) scale(${Math.random() * 0.5 + 0.5})`,
            opacity: 0,
            left: `${startX}%`
        },
        { 
            opacity: Math.random() * 0.5 + 0.3,
            offset: 0.1
        },
        { 
            transform: `translate(-50%, -100vh) rotate(${rotation}deg) scale(${Math.random() * 0.5 + 0.5})`,
            opacity: 0,
            left: `${endX}%`
        }
    ];
    
    const options = {
        duration: duration * 1000,
        delay: delay * 1000,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
    };
    
    // Inicia a animação
    const animation = heart.animate(keyframes, options);
    
    // Remove o coração após a animação
    animation.onfinish = () => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    };
    
    return animation;
}

// Função para gerenciar a criação de corações
function startHearts() {
    // Criar corações iniciais
    for (let i = 0; i < HEARTS_COUNT; i++) {
        setTimeout(createHeart, i * 500);
    }
    
    // Intervalo para adicionar novos corações
    const interval = IS_MOBILE ? 2000 : 1000; // Mais lento em dispositivos móveis
    setInterval(createHeart, interval);
    
    // Adiciona corações extras ao mover o mouse (apenas em desktop)
    if (!IS_MOBILE) {
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.7) { // 30% de chance de criar um coração ao mover o mouse
                const heart = createHeart();
                heart.play();
            }
        });
    }
}

// Iniciar a criação de corações quando a página estiver pronta
function initHearts() {
    // Pequeno atraso para garantir que a página esteja totalmente carregada
    setTimeout(startHearts, 1000);
}

// Verifica se o DOM já foi carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHearts);
} else {
    initHearts();
}
