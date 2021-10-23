const videoContainer = document.querySelector('.video-container')
const video = document.querySelector('video')
const controlsContainer = document.querySelector('.controls-container')
const playPauseButton = document.querySelector('.play-pause')
const rewindButton = document.querySelector('.rewind')
const fastForwardButton = document.querySelector('.fast-forward')
const volumeButton = document.querySelector('.volume')
const fullScreenButton = document.querySelector('.full-screen')
const playButton = playPauseButton.querySelector('.playing')
const pauseButton = playPauseButton.querySelector('.paused')
const fullVolumeButton = volumeButton.querySelector('.full-volume');
const mutedButton = volumeButton.querySelector('.muted');
const maximizeButton = fullScreenButton.querySelector('.maximize')
const minimizeButton = fullScreenButton.querySelector('.minimize')
const progressBar = document.querySelector('.progress_bar')
const watchedBar = document.querySelector('.watched-bar')
const timeLeft = document.querySelector('.time-remaining')



let controlsTimeOut;
controlsContainer.style.opacity = '0';
watchedBar.style.width = '0px';
pauseButton.style.display = 'none';
minimizeButton.style.display = 'none';


const displayControls = () => {
    controlsContainer.style.opacity = '1';
    document.body.style.cursor = 'initial'
    if (controlsTimeOut) {
        clearTimeout(controlsTimeOut)
    }
    controlsTimeOut = setTimeout(() => {
        controlsContainer.style.opacity = '0';
        document.body.style.cursor = 'none';
    }, 5000)
};


const playpause = () => {
    if (video.paused) {
        video.play();
        playButton.style.display = 'none';
        pauseButton.style.display = '';
    } else {
        video.pause();
        playButton.style.display = '';
        pauseButton.style.display = 'none';
        
    }
};

const volumefm = () => {
    video.muted = !video.muted;
    if (video.muted) {
        fullVolumeButton.style.display = 'none';
        mutedButton.style.display = '';
    } else {
        fullVolumeButton.style.display = '';
        mutedButton.style.display = 'none';
    }
};


const fullscreen = () => {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        maximizeButton.style.display = '';
        minimizeButton.style.display = 'none';
    } else {
        maximizeButton.style.display = 'none';
        minimizeButton.style.display = '';
    }
});


document.addEventListener('Keyup', (event) => {
    if (event.code === 'Space') {
        playpause();
    }
    if (event.code === 'KeyM') {
        volumefm();
    }
    if (event.code === 'KeyF') {
        fullscreen();
    }
    displayControls();
});

document.addEventListener('mousemove', () => {
    displayControls();
});

video.addEventListener('timeupdate', () => {
    watchedBar.style.width = ((video.currentTime / video.duration) * 100) + '%';

    const totalsr = video.duration - video.currentTime;

    const time = new Date(null);
    time.setSeconds(totalsr)
    let hours = null;

    if (totalsr >= 3600) {
    hours = (time.getHours().toString()).padStart('2', '0')
    }
    let minutes = (time.getMinutes().toString()).padStart('2', '0');
    let seconds = (time.getSeconds().toString()).padStart('2', '0');

    timeLeft.textContent = `${hours ? hours : '00'}:${minutes}:${seconds}`
});

progressBar.addEventListener('click', (event) => {
    const pos = (event.pagex - (bar.offsetLeft + bar.offsetparent.offsetLeft)) / bar.offsetWidth;
    video.currentTime = pos * video.duration;
});

playPauseButton.addEventListener('click', playpause)

rewindButton.addEventListener('click', () => {
    video.currentTime -= 10;
});

fastForwardButton.addEventListener('click', () => {
    video.currentTime += 10;
});

volumeButton.addEventListener('click', volumefm)
fullScreenButton.addEventListener('click', fullscreen)
// play and pause







// volume and mute




// rewind and back



// fullscreen


// progress and time
