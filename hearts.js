// Criar corações flutuantes
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤';
    heart.classList.add('heart');
    
    // Tamanho aleatório
    const size = Math.random() * 30 + 20;
    heart.style.fontSize = `${size}px`;
    
    // Posição horizontal aleatória
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Iniciar de baixo da tela
    heart.style.bottom = '-50px';
    
    // Rotação aleatória
    const rotation = Math.random() * 60 - 30; // entre -30 e 30 graus
    heart.style.transform = `rotate(${rotation}deg)`;
    
    // Duração e atraso de animação
    const duration = Math.random() * 8 + 6; // entre 6 e 14 segundos
    const delay = Math.random() * 5;
    heart.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    
    // Opacidade aleatória
    heart.style.opacity = Math.random() * 0.5 + 0.3; // entre 0.3 e 0.8
    
    document.body.appendChild(heart);
    
    // Remover o coração após a animação
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, (duration + delay) * 1000);
}

// Iniciar a criação de corações quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Criar corações iniciais
    for (let i = 0; i < 15; i++) {
        setTimeout(createHeart, i * 800);
    }
    
    // Continuar criando corações periodicamente
    setInterval(createHeart, 1500);
});
