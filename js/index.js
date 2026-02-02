const track = document.querySelector(".track");
const slides = document.querySelectorAll(".slide");

let index = 1;
let startX = 0;
let isDragging = false;

const width = slides[0].offsetWidth + parseFloat(getComputedStyle(track).gap);

function update(animate = true) {
  track.style.transition = animate ? "transform 0.35s ease" : "none";
  track.style.transform = `translateX(-${index * width}px);`
}

track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

track.addEventListener("touchend", (e) => {
  if (!isDragging) return;
  isDragging = false;

  const diff = e.changedTouches[0].clientX - startX;

  if (diff < -60) index++;
  if (diff > 60) index--;

  update();

  track.addEventListener(
    "transitionend",
    () => {
      if (index === slides.length - 1) {
        index = 1;
        update(false);
      }
      if (index === 0) {
        index = slides.length - 2;
        update(false);
      }
    },
    { once: true },
  );
});

update(false);
