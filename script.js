const radioGif = document.getElementById('radio-gif');
const audioPlayer = document.getElementById('audio-player');
const sideMenu = document.getElementById('sideMenu');

radioGif.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        console.log("Playback started.");
    } else {
        audioPlayer.pause();
        console.log("Playback paused.");
    }
});

function toggleMenu() {
    sideMenu.classList.toggle('open');
}
