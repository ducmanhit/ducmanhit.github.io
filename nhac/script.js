document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const menuItems = document.querySelectorAll('.menu-item');
    const tabContents = document.querySelectorAll('.tab-content');
    const themeToggle = document.getElementById('themeToggle');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const colorOptions = document.querySelectorAll('.color-option');
    const backgroundEffect = document.getElementById('backgroundEffect');
    const particlesContainer = document.getElementById('particles');
    const uploadArea = document.getElementById('uploadArea');
    const uploadInput = document.getElementById('uploadInput');
    const searchInput = document.getElementById('searchInput');
    const playlistsList = document.getElementById('playlistsList');
    const featuredSongs = document.getElementById('featuredSongs');
    const songsTableBody = document.getElementById('songsTableBody');
    const recentList = document.getElementById('recentList');
    const createPlaylistBtn = document.getElementById('createPlaylistBtn');
    const createPlaylistModal = document.getElementById('createPlaylistModal');
    const closeModal = document.querySelector('.close-modal');
    const cancelPlaylistBtn = document.getElementById('cancelPlaylistBtn');
    const savePlaylistBtn = document.getElementById('savePlaylistBtn');
    const importSelectedBtn = document.getElementById('importSelectedBtn');
    const selectFolderBtn = document.getElementById('selectFolderBtn');
    const filesContainer = document.getElementById('filesContainer');
    const folderStructure = document.getElementById('folderStructure');
    
    // Audio Player Elements
    const albumArt = document.getElementById('albumArt');
    const songTitle = document.getElementById('songTitle');
    const artistName = document.getElementById('artistName');
    const audioVisualizer = document.getElementById('audioVisualizer');
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.getElementById('progress');
    const progressBuffer = document.querySelector('.progress-buffer');
    const progressHandle = document.querySelector('.progress-handle');
    const currentTime = document.getElementById('currentTime');
    const totalTime = document.getElementById('totalTime');
    const volumeIcon = document.getElementById('volumeIcon');
    const volumeBar = document.querySelector('.volume-bar');
    const volumeLevel = document.getElementById('volumeLevel');
    const volumeHandle = document.querySelector('.volume-handle');
    const vinylDisc = document.querySelector('.vinyl-disc');
    const albumArtContainer = document.querySelector('.album-art-container');
    
    // Audio Context for Visualizer
    let audioContext;
    let analyser;
    let dataArray;
    let canvasCtx = audioVisualizer.getContext('2d');
    
    // Audio Element
    const audio = new Audio();
    
    // Application State
    let songs = [];
    let playlists = [
        { id: 'all', name: 'Tất cả bài hát', songs: [] },
        { id: 'favorites', name: 'Yêu thích', songs: [] }
    ];
    let currentSongIndex = 0;
    let currentPlaylist = 'all';
    let isPlaying = false;
    let isShuffled = false;
    let isRepeating = false;
    let isDarkMode = true;
    let currentTheme = 'default';
    let backgroundMode = 'particles';
    
    // Initialize App
    function initApp() {
        // Set canvas size
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Create background particles
        createParticles();
        
        // Initialize tabs
        initTabs();
        
        // Initialize theme
        initTheme();
        
        // Initialize event listeners
        initEventListeners();
        
        // Initialize audio events
        setupAudioEvents();
        
        // Load stored songs
        loadStoredData();
        
        // Populate UI
        populateUI();
    }
    
    function resizeCanvas() {
        audioVisualizer.width = audioVisualizer.clientWidth;
        audioVisualizer.height = audioVisualizer.clientHeight;
    }
    
    function createParticles() {
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 5 + 1;
            
            // Random opacity
            const opacity = Math.random() * 0.5 + 0.1;
            
            // Random speed
            const speedX = Math.random() * 0.5 - 0.25;
            const speedY = Math.random() * 0.5 - 0.25;
            
            // Set styles
            particle.style.cssText = `
                position: absolute;
                top: ${posY}%;
                left: ${posX}%;
                width: ${size}px;
                height: ${size}px;
                background-color: rgba(255, 255, 255, ${opacity});
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%);
            `;
            
            // Set data attributes for animation
            particle.dataset.x = posX;
            particle.dataset.y = posY;
            particle.dataset.speedX = speedX;
            particle.dataset.speedY = speedY;
            
            particlesContainer.appendChild(particle);
        }
        
        // Start animation
        animateParticles();
    }
    
    function animateParticles() {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach(particle => {
            let x = parseFloat(particle.dataset.x);
            let y = parseFloat(particle.dataset.y);
            const speedX = parseFloat(particle.dataset.speedX);
            const speedY = parseFloat(particle.dataset.speedY);
            
            x += speedX;
            y += speedY;
            
            // Boundary check
            if (x < 0) x = 100;
            if (x > 100) x = 0;
            if (y < 0) y = 100;
            if (y > 100) y = 0;
            
            particle.dataset.x = x;
            particle.dataset.y = y;
            
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    function initTabs() {
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all menu items
                menuItems.forEach(menuItem => menuItem.classList.remove('active'));
                
                // Add active class to clicked menu item
                item.classList.add('active');
                
                // Hide all tab contents
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Show corresponding tab content
                const tabId = item.dataset.tab;
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }
    
    function initTheme() {
        // Check saved preferences
        const savedTheme = localStorage.getItem('theme') || 'default';
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        const savedBgEffect = localStorage.getItem('bgEffect') || 'particles';
        
        // Apply saved theme
        currentTheme = savedTheme;
        isDarkMode = savedDarkMode;
        backgroundMode = savedBgEffect;
        
        // Apply theme
        document.body.classList.toggle('light-mode', !isDarkMode);
        document.body.classList.add(`theme-${currentTheme}`);
        
        // Update toggles
        themeToggle.checked = isDarkMode;
        darkModeToggle.checked = isDarkMode;
        backgroundEffect.value = backgroundMode;
        
        // Update theme option
        colorOptions.forEach(option => {
            if (option.dataset.theme === currentTheme) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        
        // Apply background effect
        applyBackgroundEffect();
    }
    
    function applyBackgroundEffect() {
        // Reset
        particlesContainer.innerHTML = '';
        particlesContainer.style.background = '';
        
        // Apply selected effect
        switch (backgroundMode) {
            case 'particles':
                createParticles();
                break;
                
            case 'waves':
                // Create wave effect with SVG
                particlesContainer.innerHTML = `
                    <svg viewBox="0 0 1440 400" preserveAspectRatio="none" class="waves">
                        <path class="wave wave1" d="M0,100 C320,150 420,50 640,100 C860,150 980,50 1200,100 C1320,130 1400,80 1440,100 V400 H0 Z"></path>
                        <path class="wave wave2" d="M0,150 C220,100 320,200 540,150 C760,100 880,200 1100,150 C1220,120 1300,170 1440,150 V400 H0 Z"></path>
                        <path class="wave wave3" d="M0,200 C120,250 220,150 440,200 C660,250 780,150 1000,200 C1120,230 1200,180 1440,200 V400 H0 Z"></path>
                    </svg>
                `;
                
                // Add styles for waves
                const style = document.createElement('style');
                style.textContent = `
                    .waves {
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        height: 100%;
                    }
                    .wave {
                        fill: rgba(255, 255, 255, 0.05);
                        transform-origin: bottom;
                        animation: wave-animation 20s linear infinite;
                    }
                    .wave1 {
                        opacity: 0.5;
                        animation-duration: 20s;
                    }
                    .wave2 {
                        opacity: 0.3;
                        animation-duration: 15s;
                        animation-delay: -5s;
                    }
                    .wave3 {
                        opacity: 0.2;
                        animation-duration: 30s;
                        animation-delay: -2s;
                    }
                    @keyframes wave-animation {
                        0% { transform: translateX(0) scaleY(1); }
                        50% { transform: translateX(-2%) scaleY(0.95); }
                        100% { transform: translateX(0) scaleY(1); }
                    }
                `;
                document.head.appendChild(style);
                break;
                
            case 'gradient':
                particlesContainer.style.background = `
                    radial-gradient(circle at 30% 40%, 
                        rgba(${isDarkMode ? '255, 62, 120, 0.15' : '255, 62, 120, 0.05'}), 
                        transparent 40%),
                    radial-gradient(circle at 70% 60%, 
                        rgba(${isDarkMode ? '255, 155, 87, 0.15' : '255, 155, 87, 0.05'}), 
                        transparent 40%)
                `;
                break;
                
            case 'none':
            default:
                // No background effect
                break;
        }
    }
    
    function initEventListeners() {
        // Theme toggling
        themeToggle.addEventListener('change', toggleDarkMode);
        darkModeToggle.addEventListener('change', toggleDarkMode);
        
        // Theme color options
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove active class from all options
                colorOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                option.classList.add('active');
                
                // Apply theme
                const theme = option.dataset.theme;
                changeTheme(theme);
            });
        });
        
        // Background effect
        backgroundEffect.addEventListener('change', () => {
            backgroundMode = backgroundEffect.value;
            localStorage.setItem('bgEffect', backgroundMode);
            applyBackgroundEffect();
        });
        
        // Upload handlers
        uploadArea.addEventListener('click', () => uploadInput.click());
        uploadInput.addEventListener('change', handleFileUpload);
        
        // Drag and drop for upload area
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('active');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('active');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('active');
            handleFileUpload({ target: { files: e.dataTransfer.files } });
        });
        
        // Search functionality
        searchInput.addEventListener('input', handleSearch);
        
        // Playlist selection
        playlistsList.addEventListener('click', (e) => {
            const playlistItem = e.target.closest('.playlist-item');
            if (playlistItem) {
                // Remove active class from all playlist items
                document.querySelectorAll('.playlist-item').forEach(item => item.classList.remove('active'));
                
                // Add active class to clicked playlist item
                playlistItem.classList.add('active');
                
                // Update current playlist
                currentPlaylist = playlistItem.dataset.playlist;
                
                // Refresh songs table
                populateSongsTable();
            }
        });
        
        // Create playlist
        createPlaylistBtn.addEventListener('click', () => {
            createPlaylistModal.style.display = 'block';
        });
        
        closeModal.addEventListener('click', () => {
            createPlaylistModal.style.display = 'none';
        });
        
        cancelPlaylistBtn.addEventListener('click', () => {
            createPlaylistModal.style.display = 'none';
        });
        
        savePlaylistBtn.addEventListener('click', createNewPlaylist);
        
        // Import selected files
        importSelectedBtn.addEventListener('click', () => {
            alert('Tính năng này sẽ được triển khai trong phiên bản tiếp theo!');
        });
        
        // Select folder
        selectFolderBtn.addEventListener('click', () => {
            alert('Tính năng này yêu cầu quyền truy cập hệ thống tệp và sẽ được triển khai khi tải lên GitHub!');
        });
        
        // Audio player controls
        playBtn.addEventListener('click', togglePlay);
        prevBtn.addEventListener('click', playPrevious);
        nextBtn.addEventListener('click', playNext);
        shuffleBtn.addEventListener('click', toggleShuffle);
        repeatBtn.addEventListener('click', toggleRepeat);
        progressBar.addEventListener('click', seekAudio);
        volumeBar.addEventListener('click', changeVolume);
        volumeIcon.addEventListener('click', toggleMute);
    }
    
    function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('light-mode', !isDarkMode);
        
        // Sync toggles
        themeToggle.checked = isDarkMode;
        darkModeToggle.checked = isDarkMode;
        
        // Save preference
        localStorage.setItem('darkMode', isDarkMode);
        
        // Refresh background if using gradient
        if (backgroundMode === 'gradient') {
            applyBackgroundEffect();
        }
    }
    
    function changeTheme(theme) {
        // Remove all theme classes
        document.body.classList.remove('theme-default', 'theme-blue', 'theme-green', 'theme-purple');
        
        // Add new theme class
        document.body.classList.add(`theme-${theme}`);
        
        // Update current theme
        currentTheme = theme;
        
        // Save preference
        localStorage.setItem('theme', theme);
    }
    
    function setupAudioEvents() {
        audio.addEventListener('timeupdate', updateProgress);
        
        audio.addEventListener('loadedmetadata', () => {
            // Update total time display
            totalTime.textContent = formatTime(audio.duration);
        });
        
        audio.addEventListener('ended', () => {
            if (isRepeating) {
                // Repeat current song
                audio.currentTime = 0;
                audio.play();
            } else {
                // Play next song
                playNext();
            }
        });
        
        audio.addEventListener('play', () => {
            isPlaying = true;
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            albumArtContainer.classList.add('playing');
            
            // Initialize audio context for visualizer when playing for the first time
            if (!audioContext) {
                setupAudioVisualizer();
            }
        });
        
        audio.addEventListener('pause', () => {
            isPlaying = false;
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            albumArtContainer.classList.remove('playing');
        });
        
        // Set default volume
        audio.volume = 0.7;
        updateVolumeUI(0.7);
        
        // Buffer progress
        audio.addEventListener('progress', () => {
            if (audio.duration) {
                for (let i = 0; i < audio.buffered.length; i++) {
                    if (audio.buffered.start(audio.buffered.length - 1 - i) <= audio.currentTime) {
                        const bufferedLength = audio.buffered.end(audio.buffered.length - 1 - i);
                        const duration = audio.duration;
                        progressBuffer.style.width = `${(bufferedLength / duration) * 100}%`;
                        break;
                    }
                }
            }
        });
    }
    
    function setupAudioVisualizer() {
        try {
            // Create audio context
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            
            // Connect audio to analyser
            const source = audioContext.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            
            // Configure analyser
            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
            
            // Start rendering
            renderVisualizer();
        } catch (e) {
            console.error("Web Audio API is not supported in this browser:", e);
        }
    }
    
    function renderVisualizer() {
        requestAnimationFrame(renderVisualizer);
        
        if (!analyser || !isPlaying) return;
        
        // Get frequency data
        analyser.getByteFrequencyData(dataArray);
        
        const width = audioVisualizer.width;
        const height = audioVisualizer.height;
        
        // Clear canvas
        canvasCtx.clearRect(0, 0, width, height);
        
        // Create gradient
        const gradient = canvasCtx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, getComputedStyle(document.documentElement).getPropertyValue('--primary-color'));
        gradient.addColorStop(1, getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'));
        
        // Calculate bar width
        const barWidth = (width / dataArray.length) * 2.5;
        let barHeight;
        let x = 0;
        
        // Draw bars
        for (let i = 0; i < dataArray.length; i++) {
            barHeight = (dataArray[i] / 255) * height * 0.8;
            
            // Add glow effect
            canvasCtx.shadowBlur = 10;
            canvasCtx.shadowColor = 'rgba(255, 62, 120, 0.5)';
            
            // Draw bar with rounded corners
            canvasCtx.fillStyle = gradient;
            canvasCtx.beginPath();
            canvasCtx.roundRect(x, height - barHeight, barWidth - 2, barHeight, 5);
            canvasCtx.fill();
            
            x += barWidth;
        }
    }
    
    function handleFileUpload(event) {
        const files = Array.from(event.target.files).filter(file => 
            file.type.startsWith('audio/')
        );
        
        if (files.length === 0) return;
        
        // Process each file
        files.forEach(file => {
            // Create file reader to read file data
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const songId = Date.now() + Math.random().toString(36).substr(2, 9);
                const songName = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
                
                // Create new song object
                const song = {
                    id: songId,
                    name: songName,
                    artist: extractArtistFromName(songName) || "Unknown Artist",
                    src: e.target.result,
                    duration: 0,
                    favorite: false,
                    dateAdded: new Date().toISOString()
                };
                
                // Add song to songs array
                songs.push(song);
                
                // Add song to all playlist
                const allPlaylist = playlists.find(p => p.id === 'all');
                if (allPlaylist) {
                    allPlaylist.songs.push(songId);
                }
                
                // Save songs data
                saveData();
                
                // Load duration
                const tempAudio = new Audio(song.src);
                tempAudio.addEventListener('loadedmetadata', () => {
                    song.duration = tempAudio.duration;
                    saveData();
                    
                    // Update UI if this was the last file
                    if (files.indexOf(file) === files.length - 1) {
                        populateUI();
                    }
                });
                
                // Generate album art
                song.image = generateAlbumArt(song.name);
                
                // If this is the first song, load it
                if (songs.length === 1) {
                    loadSong(0);
                }
            };
            
            // Read file as data URL
            reader.readAsDataURL(file);
        });
        
        // Reset file input
        event.target.value = '';
    }
    
    function extractArtistFromName(name) {
        // Common patterns: "Artist - Title" or "Title by Artist"
        const dashPattern = /(.+)\s-\s(.+)/;
        const byPattern = /(.+)\sby\s(.+)/i;
        
        let match = name.match(dashPattern);
        if (match) return match[1].trim();
        
        match = name.match(byPattern);
        if (match) return match[2].trim();
        
        return '';
    }
    
    function generateAlbumArt(name) {
        // Create a vibrant placeholder based on song name
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        
        // Generate a unique-ish color based on the song name
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        const h = Math.abs(hash % 360);
        const s = 70 + (hash % 20);
        const l = 45 + (hash % 20);
        
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, 300, 300);
        gradient.addColorStop(0, `hsl(${h}, ${s}%, ${l}%)`);
        gradient.addColorStop(1, `hsl(${(h + 60) % 360}, ${s}%, ${l + 10}%)`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 300, 300);
        
        // Add a modern pattern
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        
        // Create a wave pattern
        ctx.beginPath();
        for (let x = 0; x < 300; x += 3) {
            const y = 150 + Math.sin((x + hash) * 0.05) * 30;
            ctx.rect(x, y, 2, 150);
        }
        ctx.fill();
        
        // Add circular accent
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(150, 150, 60 + (hash % 40), 0, Math.PI * 2);
        ctx.fill();
        
        // Add first letter of song name
        const firstChar = name.charAt(0).toUpperCase();
        ctx.font = 'bold 120px sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(firstChar, 150, 150);
        
        return canvas.toDataURL();
    }
    
    function loadSong(index) {
        if (songs.length === 0) return;
        
        // Update current index
        currentSongIndex = index;
        
        // Get current song
        const song = songs[index];
        
        // Update UI elements
        songTitle.textContent = song.name;
        artistName.textContent = song.artist;
        albumArt.src = song.image;
        audio.src = song.src;
        
        // Reset progress
        progress.style.width = '0%';
        currentTime.textContent = '0:00';
        totalTime.textContent = formatTime(song.duration);
        
        // Update playlist selection
        highlightCurrentSong();
        
        // Add to recent
        addToRecent(song.id);
        
        return song;
    }
    
    function highlightCurrentSong() {
        // Remove highlight from all songs
        document.querySelectorAll('.songs-table tr').forEach(row => {
            row.classList.remove('active');
        });
        
        // Add highlight to current song
        const currentSong = songs[currentSongIndex];
        if (currentSong) {
            const row = document.querySelector(`.songs-table tr[data-id="${currentSong.id}"]`);
            if (row) {
                row.classList.add('active');
            }
        }
    }
    
    function addToRecent(songId) {
        // Find song in recents
        const recentSongs = JSON.parse(localStorage.getItem('recentSongs') || '[]');
        
        // Remove if already exists
        const index = recentSongs.indexOf(songId);
        if (index !== -1) {
            recentSongs.splice(index, 1);
        }
        
        // Add to beginning
        recentSongs.unshift(songId);
        
        // Keep only latest 10
        if (recentSongs.length > 10) {
            recentSongs.pop();
        }
        
        // Save to localStorage
        localStorage.setItem('recentSongs', JSON.stringify(recentSongs));
        
        // Update recents UI
        populateRecentList();
    }
    
    function togglePlay() {
        if (songs.length === 0) return;
        
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
    }
    
    function playPrevious() {
        if (songs.length === 0) return;
        
        // If we're more than 3 seconds into the song, restart it
        if (audio.currentTime > 3) {
            audio.currentTime = 0;
            return;
        }
        
        let prevIndex;
        
        if (isShuffled) {
            prevIndex = Math.floor(Math.random() * songs.length);
        } else {
            prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        }
        
        loadSong(prevIndex);
        togglePlay(true);
    }
    
    function playNext() {
        if (songs.length === 0) return;
        
        let nextIndex;
        
        if (isShuffled) {
            nextIndex = Math.floor(Math.random() * songs.length);
        } else {
            nextIndex = (currentSongIndex + 1) % songs.length;
        }
        
        loadSong(nextIndex);
        togglePlay(true);
    }
    
    function toggleShuffle() {
        isShuffled = !isShuffled;
        shuffleBtn.classList.toggle('active', isShuffled);
    }
    
    function toggleRepeat() {
        isRepeating = !isRepeating;
        repeatBtn.classList.toggle('active', isRepeating);
    }
    
    function updateProgress() {
        const duration = audio.duration || 0;
        const currentTimeValue = audio.currentTime || 0;
        
        // Update progress bar
        const progressPercent = (currentTimeValue / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Update time displays
        currentTime.textContent = formatTime(currentTimeValue);
        
        // Update progress handle position
        progressHandle.style.opacity = '1';
    }
    
    function seekAudio(e) {
        if (!audio.duration) return;
        
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
    }
    
    function changeVolume(e) {
        const rect = volumeBar.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        
        audio.volume = percent;
        updateVolumeUI(percent);
    }
    
    function updateVolumeUI(volumeValue) {
        volumeLevel.style.width = `${volumeValue * 100}%`;
        volumeHandle.style.opacity = '1';
        
        // Update volume icon
        if (volumeValue === 0) {
            volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (volumeValue < 0.5) {
            volumeIcon.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }
    
    function toggleMute() {
        audio.muted = !audio.muted;
        
        if (audio.muted) {
            volumeLevel.style.width = '0%';
            volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            volumeLevel.style.width = `${audio.volume * 100}%`;
            updateVolumeUI(audio.volume);
        }
    }
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        // Filter songs in the current view
        const currentView = document.querySelector('.tab-content.active').id;
        
        if (currentView === 'main-tab') {
            // Filter featured songs
            const songCards = featuredSongs.querySelectorAll('.song-card');
            songCards.forEach(card => {
                const title = card.querySelector('.song-card-title').textContent.toLowerCase();
                const artist = card.querySelector('.song-card-artist').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || artist.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        } else if (currentView === 'library-tab') {
            // Filter songs table
            const songRows = document.querySelectorAll('.songs-table tbody tr');
            songRows.forEach(row => {
                const title = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
                const artist = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || artist.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }
    }
    
    function createNewPlaylist() {
        // Get input values
        const playlistName = document.getElementById('playlistName').value.trim();
        const playlistDesc = document.getElementById('playlistDescription').value.trim();
        
        if (!playlistName) {
            alert('Vui lòng nhập tên danh sách phát!');
            return;
        }
        
        // Create new playlist
        const playlistId = Date.now().toString();
        const newPlaylist = {
            id: playlistId,
            name: playlistName,
            description: playlistDesc,
            songs: []
        };
        
        // Add to playlists array
        playlists.push(newPlaylist);
        
        // Save data
        saveData();
        
        // Update UI
        populatePlaylistsList();
        
        // Close modal
        createPlaylistModal.style.display = 'none';
        
        // Reset form
        document.getElementById('playlistName').value = '';
        document.getElementById('playlistDescription').value = '';
    }
    
    function loadStoredData() {
        try {
            // Load songs
            const storedSongs = localStorage.getItem('songs');
            if (storedSongs) {
                songs = JSON.parse(storedSongs);
            }
            
            // Load playlists
            const storedPlaylists = localStorage.getItem('playlists');
            if (storedPlaylists) {
                playlists = JSON.parse(storedPlaylists);
            }
        } catch (error) {
            console.error('Error loading stored data:', error);
        }
    }
    
    function saveData() {
        try {
            // Save songs
            localStorage.setItem('songs', JSON.stringify(songs));
            
            // Save playlists
            localStorage.setItem('playlists', JSON.stringify(playlists));
        } catch (error) {
            console.error('Error saving data:', error);
            
            if (error.name === 'QuotaExceededError') {
                alert('Dung lượng lưu trữ đã đầy. Một số bài hát có thể không được lưu.');
            }
        }
    }
    
    function populateUI() {
        // Populate featured songs
        populateFeaturedSongs();
        
        // Populate songs table
        populateSongsTable();
        
        // Populate playlists list
        populatePlaylistsList();
        
        // Populate recent list
        populateRecentList();
        
        // If we have songs, load the first one
        if (songs.length > 0 && !audio.src) {
            loadSong(0);
        }
    }
    
    function populateFeaturedSongs() {
        // Clear container
        featuredSongs.innerHTML = '';
        
        // Create song cards
        songs.forEach((song, index) => {
            const card = document.createElement('div');
            card.className = 'song-card';
            card.dataset.index = index;
            
            card.innerHTML = `
                <img src="${song.image}" alt="${song.name}" class="song-card-img">
                <div class="song-card-info">
                    <h3 class="song-card-title">${song.name}</h3>
                    <p class="song-card-artist">${song.artist}</p>
                </div>
            `;
            
            card.addEventListener('click', () => {
                loadSong(index);
                togglePlay(true);
            });
            
            featuredSongs.appendChild(card);
        });
        
        // If no songs, show message
        if (songs.length === 0) {
            featuredSongs.innerHTML = '<p class="empty-message">Chưa có bài hát nào. Tải lên bài hát từ tab Thư Viện.</p>';
        }
    }
    
    function populateSongsTable() {
        // Clear table
        songsTableBody.innerHTML = '';
        
        // Get songs for current playlist
        let playlistSongs = [];
        
        if (currentPlaylist === 'all') {
            playlistSongs = songs;
        } else if (currentPlaylist === 'favorites') {
            playlistSongs = songs.filter(song => song.favorite);
        } else {
            // Find current playlist
            const playlist = playlists.find(p => p.id === currentPlaylist);
            if (playlist) {
                // Get songs in this playlist
                playlistSongs = playlist.songs.map(id => songs.find(song => song.id === id)).filter(Boolean);
            }
        }
        
        // Create table rows
        playlistSongs.forEach((song, index) => {
            const row = document.createElement('tr');
            row.dataset.id = song.id;
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><i class="fas fa-heart song-favorite ${song.favorite ? 'active' : ''}"></i></td>
                <td>${song.name}</td>
                <td>${song.artist}</td>
                <td>${formatTime(song.duration)}</td>
                <td>
                    <div class="song-actions">
                        <button class="song-action-btn play-song"><i class="fas fa-play"></i></button>
                        <button class="song-action-btn add-to-playlist"><i class="fas fa-plus"></i></button>
                        <button class="song-action-btn remove-song"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            `;
            
            // Add event listeners
            const favoriteBtn = row.querySelector('.song-favorite');
            favoriteBtn.addEventListener('click', () => {
                song.favorite = !song.favorite;
                favoriteBtn.classList.toggle('active', song.favorite);
                saveData();
            });
            
            const playBtn = row.querySelector('.play-song');
            playBtn.addEventListener('click', () => {
                // Find index in all songs array
                const songIndex = songs.findIndex(s => s.id === song.id);
                if (songIndex !== -1) {
                    loadSong(songIndex);
                    togglePlay(true);
                }
            });
            
            const addToPlaylistBtn = row.querySelector('.add-to-playlist');
            addToPlaylistBtn.addEventListener('click', () => {
                // To be implemented: show playlist selection dialog
                alert('Tính năng này sẽ được triển khai trong phiên bản tiếp theo!');
            });
            
            const removeBtn = row.querySelector('.remove-song');
            removeBtn.addEventListener('click', () => {
                // Confirm delete
                if (confirm('Bạn có chắc muốn xóa bài hát này?')) {
                    // Remove from songs array
                    const songIndex = songs.findIndex(s => s.id === song.id);
                    if (songIndex !== -1) {
                        songs.splice(songIndex, 1);
                    }
                    
                    // Remove from playlists
                    playlists.forEach(playlist => {
                        const playlistSongIndex = playlist.songs.indexOf(song.id);
                        if (playlistSongIndex !== -1) {
                            playlist.songs.splice(playlistSongIndex, 1);
                        }
                    });
                    
                    // Save data
                    saveData();
                    
                    // Refresh UI
                    populateUI();
                }
            });
            
            songsTableBody.appendChild(row);
        });
        
        // If no songs, show message
        if (playlistSongs.length === 0) {
            songsTableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="empty-message">
                        ${currentPlaylist === 'all' ? 
                            'Chưa có bài hát nào. Tải lên bài hát bằng cách kéo thả hoặc nhấp vào khu vực phía trên.' : 
                            'Không có bài hát nào trong danh sách phát này.'
                        }
                    </td>
                </tr>
            `;
        }
    }
    
    function populatePlaylistsList() {
        // Get all playlists except built-in ones
        const customPlaylists = playlists.filter(p => p.id !== 'all' && p.id !== 'favorites');
        
        // Get container with built-in playlists
        const baseHTML = `
            <li class="playlist-item ${currentPlaylist === 'all' ? 'active' : ''}" data-playlist="all">
                <i class="fas fa-list"></i>
                <span>Tất cả bài hát</span>
            </li>
            <li class="playlist-item ${currentPlaylist === 'favorites' ? 'active' : ''}" data-playlist="favorites">
                <i class="fas fa-heart"></i>
                <span>Yêu thích</span>
            </li>
        `;
        
        // Add custom playlists
        let customPlaylistsHTML = '';
        customPlaylists.forEach(playlist => {
            customPlaylistsHTML += `
                <li class="playlist-item ${currentPlaylist === playlist.id ? 'active' : ''}" data-playlist="${playlist.id}">
                    <i class="fas fa-music"></i>
                    <span>${playlist.name}</span>
                </li>
            `;
        });
        
        // Update playlist list
        playlistsList.innerHTML = baseHTML + customPlaylistsHTML;
    }
    
    function populateRecentList() {
        // Get recent songs from localStorage
        const recentSongs = JSON.parse(localStorage.getItem('recentSongs') || '[]');
        
        // Clear list
        recentList.innerHTML = '';
        
        // If no recent songs, show message
        if (recentSongs.length === 0) {
            recentList.innerHTML = '<li class="empty-list">Chưa có bài hát nào</li>';
            return;
        }
        
        // Add songs to list
        recentSongs.forEach(songId => {
            const song = songs.find(s => s.id === songId);
            if (song) {
                const li = document.createElement('li');
                li.textContent = song.name;
                
                li.addEventListener('click', () => {
                    const songIndex = songs.findIndex(s => s.id === songId);
                    if (songIndex !== -1) {
                        loadSong(songIndex);
                        togglePlay(true);
                    }
                });
                
                recentList.appendChild(li);
            }
        });
    }
    
    // Initialize app
    initApp();
});
