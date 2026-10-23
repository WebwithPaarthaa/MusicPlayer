const songs = [
    {
        title: "Dreams",
        artist: "Artist One",
        src: "music/song1.mp3"
    },
    {
        title: "Adventure",
        artist: "Artist Two",
        src: "music/song2.mp3"
    },
    {
        title: "Memories",
        artist: "Artist Three",
        src: "music/song3.mp3"
    }
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

let songIndex = 0;


// Load song
function loadSong(index) {

    const song = songs[index];

    title.textContent = song.title;
    artist.textContent = song.artist;

    audio.src = song.src;

    updatePlaylist();
}


// Play song
function playSong() {

    audio.play();

    playBtn.textContent = "⏸";
}


// Pause song
function pauseSong() {

    audio.pause();

    playBtn.textContent = "▶";
}


// Play / Pause
playBtn.addEventListener("click", () => {

    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }

});


// Previous song
prevBtn.addEventListener("click", () => {

    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);
    playSong();

});


// Next song
nextBtn.addEventListener("click", () => {

    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songIndex);
    playSong();

});


// Update progress bar
audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        const progressValue =
            (audio.currentTime / audio.duration) * 100;

        progress.value = progressValue;

        currentTime.textContent =
            formatTime(audio.currentTime);
    }

});


// Get duration
audio.addEventListener("loadedmetadata", () => {

    duration.textContent =
        formatTime(audio.duration);

});


// Seek song
progress.addEventListener("input", () => {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;
    }

});


// Volume control
volume.addEventListener("input", () => {

    audio.volume = volume.value;

});


// Automatically play next song
audio.addEventListener("ended", () => {

    nextBtn.click();

});


// Format time
function formatTime(time) {

    if (isNaN(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${seconds}`;
}


// Create playlist
function createPlaylist() {

    playlist.innerHTML = "";

    songs.forEach((song, index) => {

        const li = document.createElement("li");

        li.textContent =
            `${song.title} - ${song.artist}`;

        li.addEventListener("click", () => {

            songIndex = index;

            loadSong(songIndex);

            playSong();

        });

        playlist.appendChild(li);

    });

}


// Highlight current song
function updatePlaylist() {

    const items =
        playlist.querySelectorAll("li");

    items.forEach((item, index) => {

        item.classList.toggle(
            "active",
            index === songIndex
        );

    });

}


// Initialize
createPlaylist();

loadSong(songIndex);