document.addEventListener('DOMContentLoaded', function() {
    // Função para extrair o ID da música ou playlist do Spotify
    function getSpotifyId(url) {
        if (!url) return null;
        
        try {
            // Remove parâmetros de rastreamento e outros parâmetros
            const cleanUrl = url.split('?')[0];
            
            // Tenta extrair o ID da URL
            const trackMatch = cleanUrl.match(/track\/([a-zA-Z0-9]+)/);
            if (trackMatch) return { id: trackMatch[1], type: 'track' };
            
            const playlistMatch = cleanUrl.match(/playlist\/([a-zA-Z0-9]+)/);
            if (playlistMatch) return { id: playlistMatch[1], type: 'playlist' };
            
            return null;
        } catch (e) {
            console.error('Erro ao processar URL do Spotify:', e);
            return null;
        }
    }

    // URL da playlist
    const spotifyUrl = 'https://open.spotify.com/playlist/0iqiAiDsWTZfc20aemNJBw';
    const player = document.getElementById('spotifyPlayer');
    
    if (!player) {
        console.error('Elemento do player não encontrado');
        return;
    }
    
    try {
        const spotifyData = getSpotifyId(spotifyUrl);
        
        if (spotifyData) {
            const { id, type } = spotifyData;
            const theme = 'theme=0';
            const embedUrl = `https://open.spotify.com/embed/${type}/${id}?${theme}`;
            
            console.log('Carregando player do Spotify:', embedUrl);
            
            // Criar iframe programaticamente
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', embedUrl);
            iframe.setAttribute('width', '100%');
            iframe.setAttribute('height', '380');
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allowtransparency', 'true');
            iframe.setAttribute('allow', 'encrypted-media');
            iframe.style.borderRadius = '8px';
            
            // Substituir o iframe existente
            player.parentNode.replaceChild(iframe, player);
            
            // Disparar evento de carregamento
            window.dispatchEvent(new Event('resize'));
        } else {
            throw new Error('URL do Spotify inválida');
        }
    } catch (error) {
        console.error('Erro ao carregar o player do Spotify:', error);
        
        const playerContainer = document.querySelector('.spotify-player');
        if (playerContainer) {
            player.style.display = 'none';
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'spotify-error';
            errorDiv.style.padding = '20px';
            errorDiv.style.textAlign = 'center';
            errorDiv.innerHTML = `
                <p style="margin-bottom: 15px;">Não foi possível carregar a playlist.</p>
                <button onclick="window.open('https://open.spotify.com/playlist/0iqiAiDsWTZfc20aemNJBw', '_blank')" 
                        class="spotify-button"
                        style="margin: 0 auto;">
                    <i class="fab fa-spotify"></i> Abrir no Spotify
                </button>
            `;
            
            playerContainer.appendChild(errorDiv);
        }
    }
});
