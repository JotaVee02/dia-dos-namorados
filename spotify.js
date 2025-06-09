document.addEventListener('DOMContentLoaded', function() {
    // Função para extrair o ID da música ou playlist do Spotify
    function getSpotifyId(url, type) {
        const regex = type === 'track' 
            ? /spotify:track:([a-zA-Z0-9]+)|open\.spotify\.com\/track\/([a-zA-Z0-9]+)/
            : /spotify:playlist:([a-zA-Z0-9]+)|open\.spotify\.com\/playlist\/([a-zA-Z0-9]+)/;
            
        const match = url.match(regex);
        return match ? (match[1] || match[2]) : null;
    }

    // URL da música ou playlist do Spotify (substitua pela sua)
    const spotifyUrl = 'https://open.spotify.com/track/SEU_ID_DA_MUSICA';
    
    // Determinar se é uma música ou playlist
    const isPlaylist = spotifyUrl.includes('playlist');
    const spotifyId = getSpotifyId(spotifyUrl, isPlaylist ? 'playlist' : 'track');
    
    if (spotifyId) {
        const embedUrl = isPlaylist
            ? `https://open.spotify.com/playlist/0iqiAiDsWTZfc20aemNJBw?si=8F519ggzSf-tgZ8vzEu8RQ&pt=cbbf53fd34225751f113aa84238fda08&pi=AZv9ofeQSniHN`
            : `https://open.spotify.com/track/2o2xhyri4aJUtgMGkf5P0J?si=-zcDYwDZQmCZpk7mUjBTtA`;
        
        document.getElementById('spotifyPlayer').src = embedUrl;
    } else {
        console.error('URL do Spotify inválida');
        document.querySelector('.spotify-player').innerHTML = 
            '<p>Não foi possível carregar a música. Por favor, verifique a URL do Spotify.</p>';
    }
});
