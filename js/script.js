const videoContainer = document.querySelector(".video-container");
const video = document.querySelector("video");
const controlsContainer = document.querySelector(".controls-container");
const playPauseButton = document.querySelector(".play-pause");
const rewindButton = document.querySelector(".rewind");
const fastForwardButton = document.querySelector(".fast-forward");
const volumeButton = document.querySelector(".volume");
const fullScreenButton = document.querySelector(".full-screen");
const playButton = playPauseButton.querySelector(".playing");
const pauseButton = playPauseButton.querySelector(".paused");
const fullVolumeButton = volumeButton.querySelector(".full-volume");
const mutedButton = volumeButton.querySelector(".muted");
const maximizeButton = fullScreenButton.querySelector(".maximize");
const minimizeButton = fullScreenButton.querySelector(".minimize");
const progressBar = document.querySelector(".progress_bar");
const watchedBar = document.querySelector(".watched-bar");
const timeLeft = document.querySelector(".time-remaining");
const volumeBar = videoContainer.querySelector(".volumeRang");
const subtitles = document.querySelector(".captions");
const superplay = document.querySelector('.superplay')

let controlsTimeOut;
controlsContainer.style.opacity = "0";
watchedBar.style.width = "0px";
pauseButton.style.display = "none";
minimizeButton.style.display = "none";

const displayControls = () => {
  controlsContainer.style.opacity = "1";
  document.body.style.cursor = "initial";
  if (controlsTimeOut) {
    clearTimeout(controlsTimeOut);
  }
  controlsTimeOut = setTimeout(() => {
    controlsContainer.style.opacity = "0";
    document.body.style.cursor = "none";
  }, 5000);
};



const playpause = () => {
  if (video.paused) {
    video.play();
    playButton.style.display = "none";
    pauseButton.style.display = "";
  } else {
    video.pause();
    playButton.style.display = "";
    pauseButton.style.display = "none";
  }
};

const volumefm = () => {
  video.muted = !video.muted;
  if (video.muted) {
    fullVolumeButton.style.display = "none";
    mutedButton.style.display = "";
  } else {
    fullVolumeButton.style.display = "";
    mutedButton.style.display = "none";
  }
};

volumeBar.addEventListener("mousemove", (e) => {
  video.volume = e.target.value;
});

const fullscreen = () => {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    maximizeButton.style.display = "";
    minimizeButton.style.display = "none";
  } else {
    maximizeButton.style.display = "none";
    minimizeButton.style.display = "";
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    playpause();
  }
  if (event.code === "KeyM") {
    volumefm();
  }
  if (event.code === "KeyF") {
    fullscreen();
  }
  if (event.code === "ArrowRight") {
    video.currentTime += 10;
  }
  if (event.code === "ArrowLeft") {
    video.currentTime -= 10;
  }
  if (event.code === "ArrowUp") {
    
  }
  if (event.code=== "ArrowDown") {
    
  }
  displayControls();
});

document.addEventListener("mousemove", () => {
  displayControls();
});

video.addEventListener("timeupdate", () => {
  watchedBar.style.width = (video.currentTime / video.duration) * 100 + "%";

  const totalsr = video.duration - video.currentTime;

  const time = new Date(null);
  time.setSeconds(totalsr);
  let hours = null;

  if (totalsr >= 3600) {
    hours = time.getHours().toString().padStart("2", "0");
  }
  let minutes = time.getMinutes().toString().padStart("2", "0");
  let seconds = time.getSeconds().toString().padStart("2", "0");

  timeLeft.textContent = `${hours ? hours : "00"}:${minutes}:${seconds}`;
});

progressBar.addEventListener("click", (event) => {
  const pos =
    (event.offsetX ||
      event.pagex -
        (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft)) /
    progressBar.offsetWidth;
  video.currentTime = pos * video.duration;
});

playPauseButton.addEventListener("click", playpause);

rewindButton.addEventListener("click", () => {
  video.currentTime -= 10;
});

fastForwardButton.addEventListener("click", () => {
  video.currentTime += 10;
});

volumeButton.addEventListener("click", volumefm);
fullScreenButton.addEventListener("click", fullscreen);
// play and pause

// volume and mute

// rewind and back

// fullscreen

// progress and time

/* const next = document.querySelector('.next')
const api = "./js/json/da.json";


 next.addEventListener("click", function () {
    async function getData() {
        const response = await fetch(api);
        const data = await response.json();
        printData(data)
    };
    getData();
});

 function printData(data) {
    for (i = 0; i < data.length; i++){
         video.innerHTML = `<source src="${data[i].link}">`
    }
     printData();
};


 */
for (i = 0; i < video.textTracks.length; i++) {
  video.textTracks[i].mode = "hidden";
}

// Creates and returns a menu item for the subtitles language menu
const subtitleMenuButtons = [];
const createMenuItem = function (id, lang, label) {
  let listItem = document.createElement("li");
  let button = listItem.appendChild(document.createElement("button"));
  button.setAttribute("id", id);
  button.className = "subtitles-button";
  if (lang.length > 0) button.setAttribute("lang", lang);
  button.value = label;
  button.setAttribute("data-state", "inactive");
  button.appendChild(document.createTextNode(label));
  button.addEventListener("click", function (e) {
    // Set all buttons to inactive
    subtitleMenuButtons.map(function (v, i, a) {
      subtitleMenuButtons[i].setAttribute("data-state", "inactive");
    });
    let lang = this.getAttribute("lang");
    for (i = 0; i < video.textTracks.length; i++) {
      // For the 'subtitles-off' button, the first condition will never match so all will subtitles be turned off
      if (video.textTracks[i].language == lang) {
        video.textTracks[i].mode = "showing";
        this.setAttribute("data-state", "active");
      } else {
        video.textTracks[i].mode = "hidden";
      }
    }
    subtitlesMenu.style.display = "none";
  });
  subtitleMenuButtons.push(button);
  return listItem;
};
var  subtitlesMenu;
if (video.textTracks) {
  let df = document.createDocumentFragment();
  var subtitlesMenu = df.appendChild(document.createElement("ul"));
  subtitlesMenu.className = "subtitles-menu";
  subtitlesMenu.appendChild(createMenuItem("subtitles-off", "", "Off"));
  for (i = 0; i < video.textTracks.length; i++) {
    subtitlesMenu.appendChild(
      createMenuItem(
        "subtitles-" + video.textTracks[i].language,
        video.textTracks[i].language,
        video.textTracks[i].label
      )
    );
  }
  videoContainer.appendChild(subtitlesMenu);
}
subtitles.addEventListener("click", function (e) {
  if (subtitlesMenu) {
    subtitlesMenu.style.display =
      subtitlesMenu.style.display == "block" ? "none" : "block";
  }
});
