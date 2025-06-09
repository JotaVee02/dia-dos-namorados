document.addEventListener('DOMContentLoaded', function() {
    // Função para extrair o ID da música ou playlist do Spotify
    function getSpotifyId(url) {
        // Remove parâmetros de rastreamento e outros parâmetros
        const cleanUrl = url.split('?')[0];
        
        // Tenta extrair o ID da URL
        const trackMatch = cleanUrl.match(/track\/([a-zA-Z0-9]+)/);
        if (trackMatch) return { id: trackMatch[1], type: 'track' };
        
        const playlistMatch = cleanUrl.match(/playlist\/([a-zA-Z0-9]+)/);
        if (playlistMatch) return { id: playlistMatch[1], type: 'playlist' };
        
        return null;
    }

    // URL da música específica que você quer tocar
    // Se quiser usar a playlist completa, descomente a linha da playlist e comente a da música
    const spotifyUrl = 'https://open.spotify.com/track/2o2xhyri4aJUtgMGkf5P0J?si=-zcDYwDZQmCZpk7mUjBTtA';
    // const spotifyUrl = 'https://open.spotify.com/playlist/0iqiAiDsWTZfc20aemNJBw?si=8F519ggzSf-tgZ8vzEu8RQ';
    
    try {
        const spotifyData = getSpotifyId(spotifyUrl);
        
        if (spotifyData) {
            const { id, type } = spotifyData;
            const theme = 'theme=0'; // 0 para tema claro, 1 para tema escuro
            const embedUrl = `https://open.spotify.com/embed/${type}/${id}?${theme}`;
            
            console.log('Carregando:', embedUrl);
            document.getElementById('spotifyPlayer').src = embedUrl;
        } else {
            throw new Error('Formato de URL não reconhecido');
        }
    } catch (error) {
        console.error('Erro ao carregar o Spotify:', error);
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <p style="color: #ff4b5c; text-align: center; padding: 1rem;">
                Não foi possível carregar a música. Por favor, verifique se a URL do Spotify está correta.
                <br><br>
                <small>Erro: ${error.message}</small>
            </p>
            <p style="text-align: center;">
                <a href="${spotifyUrl}" target="_blank" style="color: #1DB954; text-decoration: none;">
                    Abrir música no Spotify
                </a>
            </p>
        `;
        document.querySelector('.spotify-player').appendChild(errorDiv);
    }
});
