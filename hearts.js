// Criar corações flutuantes
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.classList.add('heart');
    
    // Tamanho aleatório
    const size = Math.random() * 30 + 20;
    heart.style.fontSize = `${size}px`;
    
    // Posição horizontal aleatória
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Duração e atraso de animação
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 5;
    heart.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    
    document.body.appendChild(heart);
    
    // Remover o coração após a animação
    setTimeout(() => {
        heart.remove();
    }, (duration + delay) * 1000);
}

// Criar corações periodicamente
setInterval(createHeart, 300);

// Criar alguns corações iniciais
for (let i = 0; i < 10; i++) {
    setTimeout(createHeart, i * 300);
}
