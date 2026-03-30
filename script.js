const video = document.getElementById("video");
const image = document.getElementById("image");
const music = document.getElementById("music");
const notif = document.getElementById("notif");
const monthText = document.getElementById("monthText");
const text = document.getElementById("text");
const startBtn = document.getElementById("startBtn");

// 🔥 توليد الصور تلقائي
let images = [];
const months = [4,5,6,7,8,9,10,11,12,1,2,3];

months.forEach(month => {
  for(let i = 1; i <= 20; i++){
    images.push(`${i}-${month}.jpg`);
  }
});

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
  1:"January 2026",
  2:"February 2026",
  3:"March 2026"
};

// 🐢 بطيء → ⚡ سريع
function getSpeed(month){
  month = parseInt(month);
  if(month >= 4 && month <= 8){
    return 3500;
  }
  return 200;
}

// 🎬 النهاية
function showEnding(){

  image.src = "final.jpg";
  image.style.width = "420px";
  image.style.opacity = 1;

  monthText.innerText = "";

  const lines = [
    "NOHA… it was all worth it 🤍",
    "and I’d do it all over again 🤍",
    "still feels like it all just started…",
    "untitled story is not begun yet"
  ];

  let i = 0;

  function showLine(){

    if(i >= lines.length) return;

    text.innerText = lines[i];
    text.style.opacity = 1;

    setTimeout(() => {
      text.style.opacity = 0;

      setTimeout(() => {
        i++;
        showLine();
      }, 800);

    }, 3000);
  }

  setTimeout(showLine, 1000);
}

// 🔥 أهم جزء (حل Vercel)
function showImage(){

  if(index >= images.length){
    showEnding();
    return;
  }

  const path = images[index];

  const temp = new Image();

  temp.onload = () => {

    image.src = path;
    image.style.width = "300px";
    image.style.opacity = 0;

    setTimeout(() => {
      image.style.opacity = 1;

      const file = path.split(".")[0];
      const month = file.split("-")[1];

      monthText.innerText = monthNames[month] || "";
      text.style.opacity = 0;

      notif.currentTime = 0;
      notif.play().catch(()=>{});

      // 🔥 السرعة بعد تحميل الصورة
      const speed = getSpeed(month);

      index++;
      setTimeout(showImage, speed);

    }, 100);

  };

  // لو صورة مش موجودة
  temp.onerror = () => {
    index++;
    showImage();
  };

  temp.src = path;
}

function start(){

  // 🎬 تشغيل الفيديو
  video.muted = true;
  video.play().catch(()=>{});

  // 🎵 الموسيقى
  music.play().catch(()=>{});

  showImage();
}

startBtn.onclick = () => {
  startBtn.style.display = "none";
  start();
};