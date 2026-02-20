const swiper = document.querySelector(".swiper");
const dotsContainer = document.querySelector(".dots");
let slides = document.querySelectorAll(".slide");
const haederText = document.querySelector(".texts");
const elem = document.querySelector(".modal");
const links = document.querySelector(".qw");
const video = document.querySelectorAll("video");
console.log(video);

const liElem = [
  {
    id: "0",
    text: "Why Delta Dental",
  },
  {
    id: "1",
    text: "Plans for your employees",
  },
  {
    id: "2",
    text: "Small Business",
  },
  {
    id: "3",
    text: "Large Groups",
  },
  {
    id: "4",
    text: "Why Add DeltaVision®?",
  },
];

let index = 0;
let slideWidth = slides[0].offsetWidth;
window.addEventListener("resize", () => {
  slideWidth = slides[0].offsetWidth;
  console.log(slideWidth);

  updateText();
  moveTo(index);
});

liElem.forEach((value, i) => {
  let li = document.createElement("li");
  li.classList.add("atr-list");
  li.id = value.id;
  li.textContent = value.text;
  haederText.appendChild(li);
  updateText();
});

function updateText() {
  const text = document.querySelectorAll(".atr-list");
  text.forEach((value, i) => {
    if (i === index) {
      value.classList.add("active");
    } else {
      value.classList.remove("active");
    }
  });
}

liElem.forEach((e) => {
  let span = document.createElement("span");
  span.addEventListener("click", () => moveTo(index + e.id));
  span.textContent = e.text;
  span.classList.add("rew");
  links.appendChild(span);
});

createDots();
moveTo(0, false);

let startX = 0;
let burgerFlag = false;

let currentX = 0;
let isDragging = false;
let isSwipe = false;

swiper.addEventListener("pointerdown", (e) => {
  startX = e.clientX;
  isDragging = true;
  isSwipe = false;
  swiper.style.transition = "none";
});

swiper.addEventListener("pointermove", (e) => {
  if (!isDragging) return;

  currentX = e.clientX;
  let diff = currentX - startX;
  if (Math.abs(diff) > 5) {
    isSwipe = true;
    swiper.style.transform = `translateX(${-slideWidth * index + diff}px)`;
  }
});

swiper.addEventListener("pointerup", () => {
  if (!isDragging) return;

  let diff = currentX - startX;
  swiper.style.transition = ".4s";

  if (!isSwipe) {
    isDragging = false;
    return;
  }

  if (diff > 60) moveTo(index - 1);
  else if (diff < -60) moveTo(index + 1);
  else moveTo(index);

  isDragging = false;
});

swiper.addEventListener("pointerleave", () => {
  isDragging = false;
});

function moveTo(i, smooth = true) {
  if (i >= slides.length) i = 0;
  if (i < 0) i = slides.length - 1;

  swiper.style.transition = smooth ? ".4s" : "none";
  swiper.style.transform = `translateX(-${slideWidth * i}px)`;

  index = i;
  updateText();
  updateDots();
  if (index === 0) video[0].play();
  else if (index === 1) video[1].play();
  else video.forEach((e) => e.pause());
}

function next() {
  moveTo(index + 1);
}

function createDots() {
  dotsContainer.innerHTML = "";

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");

    dot.onclick = () => moveTo(i);

    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((d) => d.classList.remove("active"));

  dots[index].classList.add("active");
}

function onBurger() {
  if (burgerFlag === false) {
    elem.classList.add("hidden");
    burgerFlag = true;
  } else {
    burgerFlag = false;
    elem.classList.remove("hidden");
  }
}
// setInterval(next, 2500);
