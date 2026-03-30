const video = document.getElementById("video");
const image = document.getElementById("image");
const music = document.getElementById("music");
const notif = document.getElementById("notif");
const monthText = document.getElementById("monthText");
const text = document.getElementById("text");
const startBtn = document.getElementById("startBtn");

let images = [
  "1-4.jpg",
  "first-time.jpg",
  "2-4.jpg",
  "1-5.jpg",
  "2-5.jpg",
  "1-6.jpg"
];

let index = 0;

const monthNames = {
  4:"April 2025",
  5:"May 2025",
  6:"June 2025",
  7:"July 2025",
  8:"August 2025",
  9:"September 2025",
  10:"October 2025",
  11:"November 2025",
  12:"December 2025",
  1:"January 2025",
  2:"February 2025",
  3:"March 2025"
};

function showImage(){

  try {

    if(index >= images.length) return;

    const path = images[index];

    if(!path){
      index++;
      setTimeout(showImage, 1000);
      return;
    }

    image.src = path;

    image.style.opacity = 0;
    image.style.transform = "translateX(80px) scale(0.98)";

    setTimeout(() => {

      image.style.opacity = 1;
      image.style.transform = "translateX(0) scale(1)";

      if(path.includes("first-time")){
        monthText.innerText = "💫 Special Moment";
        text.innerText = "first time 🤍";
      } else {

        const file = path.split(".")[0];
        const parts = file.split("-");

        if(parts.length >= 2){
          const monthNum = parts[1];
          monthText.innerText = monthNames[monthNum] || "Unknown Month";
          text.innerText = "";
        } else {
          monthText.innerText = "Unknown";
        }

      }

      notif.currentTime = 0;
      notif.play().catch(()=>{});

    }, 200);

    index++;

    if(index < images.length){
      setTimeout(showImage, 4000);
    }

  } catch (error) {
    console.log("Error:", error);
    index++;
    setTimeout(showImage, 1000);
  }

}

function start(){

  video.muted = true;

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(err => {
      console.log("Video error:", err);
    });
  }

  music.play().catch(()=>{});

  showImage();
}

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  start();
});