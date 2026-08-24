/* -------------------------
   EXISTING BUILDING CODE
------------------------- */

const buildings = document.querySelectorAll(".building");

function createWindows(building) {
  const windowCount = Math.floor(Math.random() * 5) + 3;

  for (let i = 0; i < windowCount; i++) {
    const windowLight = document.createElement("span");

    windowLight.classList.add("window");

    windowLight.style.left = Math.random() * 80 + 10 + "%";
    windowLight.style.top = Math.random() * 80 + 10 + "%";
    windowLight.style.animationDelay = Math.random() * 5 + "s";

    building.appendChild(windowLight);
  }
}

buildings.forEach(createWindows);

/* -------------------------
   MUSIC & LYRICS
------------------------- */

const music = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");
const lyric = document.getElementById("lyric");

/*
   Replace the text and time values only.
   Time is measured in seconds.
*/

const lyrics = [
  {
    time: 0.1,
    text: "When we're out in a crowd, laughing loud",
  },

  {
    time: 5,
    text: "and nobody knows why.",
  },

  {
    time: 13,
    text: "When we're lost at a club, getting drunk",
  },

  {
    time: 17,
    text: "And you give me that smile",
  },

  {
    time: 25,
    text: "Going home in the back of a car",
  },

  {
    time: 29,
    text: "And your hand touches mine",
  },

  {
    time: 37,
    text: "When we're done making love and you look up",
  },

  {
    time: 41,
    text: "And give me those eyes",
  },

  /* -------------------------
     CHORUS
  ------------------------- */

  {
    time: 48,
    text: "'Cause all of the small things that you do",
  },

  {
    time: 54,
    text: "Are what remind me why I fell for you",
  },

  {
    time: 60,
    text: "And when we're apart and I'm missing you",
  },

  {
    time: 66,
    text: "I close my eyes and all I see is you",
  },

  {
    time: 72,
    text: "And the small things you do",
  },

  {
    time: 78,
    text: "",
  },

  // Continue adding more lyrics here...
];

/* -------------------------
   CHORUS SLIDESHOW
------------------------- */

/*
   The slideshow starts at 48 seconds
   and ends at 78 seconds.
*/

const slideshow = document.getElementById("slideshow");
const slideImage = document.getElementById("slideImage");

/*
   Add or remove photos here.

   The file extension must match the
   actual file in your photos folder.
*/

const photos = [
  "photos/photos (1).jpeg",
  "photos/photos (1).jpg",
  "photos/photos (1).webp",

  "photos/photos (2).jpeg",
  "photos/photos (2).jpg",
  "photos/photos (2).webp",

  "photos/photos (3).jpeg",
  "photos/photos (3).jpg",

  "photos/photos (4).jpeg",
  "photos/photos (4).jpg",

  "photos/photos (5).jpeg",
  "photos/photos (5).jpg",

  "photos/photos (6).jpeg",
  "photos/photos (6).jpg",

  "photos/photos (7).jpg",
  "photos/photos (8).jpg",
  "photos/photos (9).jpg",

  "photos/photos (10).jpg",
  "photos/photos (11).jpg",
  "photos/photos (12).jpg",
  "photos/photos (13).jpg",
  "photos/photos (14).jpg",
  "photos/photos (15).jpg",
  "photos/photos (16).jpg",
  "photos/photos (17).jpg",
  "photos/photos (18).jpg",
  "photos/photos (19).jpg",
  "photos/photos (20).jpg",
  "photos/photos (21).jpg",
  "photos/photos (22).jpg",
  "photos/photos (23).jpg",
  "photos/photos (24).jpg",
  "photos/photos (25).jpg",
  "photos/photos (26).jpg",
  "photos/photos (27).jpg",
  "photos/photos (28).jpg",
  "photos/photos (29).jpg",
  "photos/photos (30).jpg",
  "photos/photos (31).jpg",
  "photos/photos (32).jpg",
  "photos/photos (33).jpg",
];

/* -------------------------
   SLIDESHOW SETTINGS
------------------------- */

const chorusStart = 48;
const chorusEnd = 78;

/*
   Change this number to control
   how long each photo stays.

   2500 = 2.5 seconds
   2000 = 2 seconds
   1500 = 1.5 seconds
   1000 = 1 second
*/

const slideDuration = 2500;

let slideIndex = 0;
let slideInterval = null;

/* -------------------------
   START SLIDESHOW
------------------------- */

function startSlideshow() {
  // Prevent multiple intervals
  if (slideInterval !== null) {
    return;
  }

  // Show slideshow
  slideshow.classList.remove("hidden");

  // Start from first photo
  slideIndex = 0;
  slideImage.src = photos[slideIndex];

  // Change photos automatically
  slideInterval = setInterval(() => {
    slideIndex++;

    // Loop back to first photo
    if (slideIndex >= photos.length) {
      slideIndex = 0;
    }

    slideImage.src = photos[slideIndex];
  }, slideDuration);
}

/* -------------------------
   STOP SLIDESHOW
------------------------- */

function stopSlideshow() {
  // Hide slideshow
  slideshow.classList.add("hidden");

  // Stop changing photos
  clearInterval(slideInterval);

  slideInterval = null;
}

/* -------------------------
   PLAY MUSIC
------------------------- */

playBtn.addEventListener("click", () => {
  music.play();

  playBtn.style.display = "none";
});

/* -------------------------
   UPDATE LYRICS
------------------------- */

let currentLine = -1;

music.addEventListener("timeupdate", () => {
  const currentTime = music.currentTime;

  /* -------------------------
     FIND CURRENT LYRIC
  ------------------------- */

  for (let i = lyrics.length - 1; i >= 0; i--) {
    if (currentTime >= lyrics[i].time) {
      if (currentLine !== i) {
        currentLine = i;

        // Fade lyric out
        lyric.style.opacity = 0;

        setTimeout(() => {
          lyric.textContent = lyrics[i].text;

          // Fade lyric back in
          lyric.style.opacity = 1;
        }, 150);
      }

      break;
    }
  }

  /* -------------------------
     CHORUS SLIDESHOW CONTROL
  ------------------------- */

  /*
     Start slideshow when the song
     reaches 48 seconds.
  */

  if (currentTime >= chorusStart && currentTime < chorusEnd) {
    startSlideshow();
  } else {
    /*
       Stop slideshow when:
       - before chorus
       - after chorus
    */

    stopSlideshow();
  }
});

/* -------------------------
   RESET WHEN MUSIC ENDS
------------------------- */

music.addEventListener("ended", () => {
  currentLine = -1;

  stopSlideshow();

  lyric.textContent = "Press Play";

  lyric.style.opacity = 1;

  playBtn.style.display = "block";
});
