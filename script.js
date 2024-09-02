let songInfo = [{src: '/songs/song1.mp3' , songName: 'Song1' , singerName: 'Group1' , songTime: '01:00', songImg: 'song1.jpg'} , {src: '/songs/song2.mp3' , songName: 'Song2' , singerName: 'Group2' , songTime: '00:47', songImg: 'song2.jpg'} , {src: '/songs/song3.mp3' , songName: 'Song3' , singerName: 'Group3' , songTime: '00:30', songImg: 'song3.jpg'} , {src: '/songs/song4.mp3' , songName: 'Song4' , singerName: 'Group4' , songTime: '00:26', songImg: 'song4.jpg'} , {src: '/songs/song5.mp3' , songName: 'Song5' , singerName: 'Group5' , songTime: '00:24', songImg: 'song5.png'} , {src: '/songs/song6.mp3' , songName: 'Song6' , singerName: 'Group6' , songTime: '00:29', songImg: 'song6.jpg'}];
let songsList = document.getElementById('songsList');
let musicList = document.getElementById('musicList');

const songName = document.getElementById('songName');
const singerName = document.getElementById('singerName');
const songTime =document.getElementById('songTime');
const songImg = document.getElementById('songImg');

const myAudio = document.getElementById('myAudio');
const myAudioSrc = document.getElementById('myAudioSrc');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');

const progressBar = document.getElementById('progressBar');

let currentSongIndex = 0;
let modSong = 'next';



function addElement(value , index){
    let parentDiv = document.createElement('div');
    parentDiv.classList = 'music-list-item col-12 display-flex space-between';
    
    parentDiv.addEventListener('click' , () => {
        musicChoose(index);
    });

    let firstChild = document.createElement('div');
    let fisrtP = document.createElement('p');
    fisrtP.style = 'margin-bottom: 10%';
    fisrtP.innerHTML = value.songName;
    let secondP = document.createElement('p');
    secondP.innerHTML = value.singerName;
    firstChild.appendChild(fisrtP);
    firstChild.appendChild(secondP);

    let secondChild = document.createElement('p');
    secondChild.style = 'margin-top: 5%';
    secondChild.innerHTML = value.songTime;

    parentDiv.appendChild(firstChild);
    parentDiv.appendChild(secondChild);

    return parentDiv;
}

function initSongs(){
    songInfo.forEach(function(value , index) {

        let temp = addElement(value , index);
        musicList.appendChild(temp);

    })
}

initSongs();


function musicChoose(index){
    let item = songInfo[index];

    currentSongIndex = index;

    songName.innerHTML = item.songName;
    singerName.innerHTML = item.singerName;
    songImg.src = item.songImg;
    songTime.innerHTML = item.songTime;
    closeListFunction();

    myAudioSrc.src = item.src;
    playSongFunction();
}


const goNext = document.getElementById('goNext');
const repeat = document.getElementById('repeat');
const shuffle = document.getElementById('shuffle');




function songsListFunction() {
    songsList.style.display = 'inline';
}

function closeListFunction() {
    songsList.style.display = 'none';
}



function goNextFunction() {
    goNext.style.display = 'none';
    repeat.style.display = 'flex';
    shuffle.style.display = 'none';
    modSong = 'repeat';
}

function repeatFunction() {
    goNext.style.display = 'none';
    repeat.style.display = 'none';
    shuffle.style.display = 'flex';
    modSong = 'shuffle';
}

function shuffleFunction() {
    goNext.style.display = 'flex';
    repeat.style.display = 'none';
    shuffle.style.display = 'none';
    modSong = 'next';
}



function lastSongFunction() {
    if (modSong === 'shuffle') {
        currentSongIndex = getRandomInt(0, songInfo.length);
        musicChoose(currentSongIndex);
    }
    else {
        if (currentSongIndex > 0) {
            musicChoose(--currentSongIndex); //currentSongIndex = currentSongIndex -1
        }
        else if (currentSongIndex === 0) {
            musicChoose(songInfo.length-1);
        }
    }
}


function nextSongFunction() {
    if (modSong === 'shuffle') {
        currentSongIndex = getRandomInt(0, songInfo.length);
        musicChoose(currentSongIndex);
    }
    else {
        if (currentSongIndex < songInfo.length-1) {
            musicChoose(++currentSongIndex); //currentSongIndex = currentSongIndex +1
        }
        else if (currentSongIndex === songInfo.length-1) {
            musicChoose(0);
        }
    }
}



function playSongFunction() {
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'flex';
    
    myAudio.load();
    myAudio.play();
}


function pauseSongFunction() {
    playBtn.style.display = 'flex';
    pauseBtn.style.display = 'none';

    myAudio.pause();
}




// progressBar.addEventListener("change",()=>{
//     let progressSlider = (progressBar.value/progressBar.max)*100;
//     progressBar.style.background=`linear-gradient(90deg, rgb(255, 46, 231) , rgb(116, 0, 159) , rgb(250, 194, 255) ${progressSlider}%)`;
//     console.log(progressSlider);
// })


myAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime; //getting playing song currentTime  e.target is element ineerHTML
    const duration = e.target.duration; //getting playing song total duration
    let progressWidth = (currentTime / duration) * 100;

    if (currentTime === duration) {
        musicEndFunction();
    }

    progressBar.value = progressWidth;

    let musicCurrentTime = document.querySelector(".current-time");
    musicDuartion = document.querySelector(".max-duration");
    myAudio.addEventListener("loadeddata", ()=>{
      // update song total duration
      let mainAdDuration = myAudio.duration;
      let totalMin = Math.floor(mainAdDuration / 60);
      let totalSec = Math.floor(mainAdDuration % 60);
      if(totalSec < 10){ //if sec is less than 10 then add 0 before it
        totalSec = `0${totalSec}`;
      }
      musicDuartion.innerText = `${totalMin}:${totalSec}`;
    });
    // update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){ //if sec is less than 10 then add 0 before it
      currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
  });


  progressBar.addEventListener("click", (e)=>{
    let progressWidth = progressBar.clientWidth; //getting width of progress bar
    let clickedOffsetX = e.offsetX; //getting offset x value
    let songDuration = myAudio.duration; //getting song total duration
    
    myAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    myAudio.play(); //calling playMusic function
  });



  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }


  function musicEndFunction(){
    if (modSong === 'next') {
        currentSongIndex = currentSongIndex + 1;
    }
    else if (modSong === 'shuffle') {
        currentSongIndex = getRandomInt(0, songInfo.length);
    }

    musicChoose(currentSongIndex);
  }
