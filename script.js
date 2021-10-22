const player = document.querySelector('.player')
const video = document.querySelector('.player video')
const controls = document.querySelector('.controls')
const play = document.querySelector('.play')
const playb = document.querySelector('.playb')
const pauseb = document.querySelector('.pauseb')
const volume = document.querySelector('.volume')
const fullvolume = document.querySelector('.fullvolume')
const mute = document.querySelector('.mute')
const full = document.querySelector('.full')
const maximizeButton = full.querySelector('.maximize');
const minimizeButton = full.querySelector('.minimize');
const rewind = document.querySelector('.rewind')
const back = document.querySelector('.back')
const bar = document.querySelector('.progress_bar')
const redBar = document.querySelector('.redBar')
const timeLeft = document.querySelector('.time')



let timeOut;
controls.style.opacity = '0';
redBar.style.width = '0px';
pauseb.style.display = 'none';
minimizeButton.style.display = 'none';


const displaycontrols = () => {
    controls.style.opacity = '1';
    document.body.style.cursor = 'initial'
    if (timeOut) {
        clearTimeout(timeOut)
    }
    timeOut = setTimeout(() => {
        controls.style.opacity = '0';
        document.body.style.cursor = 'none';
    }, 5000)
};


const playpause = () => {
    if (video.paused) {
        video.play();
        playb.style.display = 'none';
        pauseb.style.display = '';
    } else {
        video.pause();
        playb.style.display = '';
        pauseb.style.display = 'none';
        
    }
};

const volumefm = () => {
    video.muted = !video.muted;
    if (video.muted) {
        fullvolume.style.display = 'none';
        mute.style.display = '';
    } else {
        fullvolume.style.display = '';
        mute.style.display = 'none';
    }
};


const fullscreen = () => {
    if (!document.fullscreenElement) {
        player.requestFullscreen();
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


document.addEventListener('keyup', (event) => {
    if (event.code === 'space') {
        playpause();
    }
    if (event.code === 'keyM') {
        volumefm();
    }
    if (event.code === 'keyF') {
        fullscreen();
    }
    displaycontrols();
});

document.addEventListener('mousemove', () => {
    displaycontrols();
});

video.addEventListener('timeupdate', () => {
    redBar.style.width = ((video.currentTime / video.duration) * 100) + '%';

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

bar.addEventListener('click', (event) => {
    const pos = (event.pagex - (bar.offsetLeft + bar.offsetparent.offsetLeft)) / bar.offsetWidth;
    video.currentTime = pos * video.duration;
});

play.addEventListener('click', playpause)

rewind.addEventListener('click', () => {
    video.currentTime -= 10;
});

back.addEventListener('click', () => {
    video.currentTime += 10;
});

volume.addEventListener('click', volumefm)
full.addEventListener('click', fullscreen)
// play and pause







// volume and mute




// rewind and back



// fullscreen


// progress and time
