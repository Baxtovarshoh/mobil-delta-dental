const swiper = document.querySelector(".swiper");
const dotsContainer = document.querySelector(".dots");
let slides = document.querySelectorAll(".slide");
const haederText = document.querySelector(".texts");
const elem = document.querySelector(".modal");
const links = document.querySelector(".qw");
const video = document.querySelectorAll("video");
const volumes = document.querySelectorAll(".vol");
const baner = document.querySelector(".baner");
const content = document.querySelector(".container");
const close = document.querySelector(".close");
const roller = document.querySelector(".spa");
const thumb = document.querySelector(".rol");
const end = document.querySelector(".endpoint");
const imgs = document.querySelectorAll(".baner  img");
const bur = document.querySelectorAll(".bt-t");
const subLinks = document.querySelectorAll(".rew");
let parent = bur[0].parentElement;
let startX = 0;
let burgerFlag = false;

let currentX = 0;
let isDragging = false;
let isSwipe = false;

const liElem = [
  {
    id: 0,
    text: "Why Delta Dental",
  },
  {
    id: 1,
    text: "Plans for your employees",
  },
  {
    id: 2,
    text: "Small Business",
  },
  {
    id: 3,
    text: "Large Groups",
  },
  {
    id: 4,
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

createDots();
moveTo(0, false);

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

function forVolume(content, volume) {
  if (!content || !volume) return;

  const currentVolume = content.muted;

  if (currentVolume) {
    content.muted = false;
    volume.innerHTML = `<i class="bi bi-volume-up-fill"></i>`;
  } else {
    content.muted = true;
    volume.innerHTML = `<i class="bi bi-volume-mute-fill"></i>`;
  }
}
volumes[0].addEventListener("click", () => forVolume(video[0], volumes[0]));
volumes[1].addEventListener("click", () => forVolume(video[1], volumes[1]));
function moveTo(i, smooth = true) {
  if (i >= slides.length) i = 0;
  if (i < 0) i = slides.length - 1;

  swiper.style.transition = smooth ? ".4s" : "none";
  swiper.style.transform = `translateX(-${slideWidth * i}px)`;
  index = i;
  updateText();

  updateDots();
  if (index === 0) (video[0].play(), video[1].pause());
  else if (index === 1) (video[1].play(), video[0].pause());
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

console.log(bur);

function onBurger() {
  if (burgerFlag === true) {
    elem.classList.add("up");

    bur[0].classList.remove("li1");
    bur[1].classList.remove("li2");
    bur[2].classList.remove("li0");
    parent.style.top = "0";
    burgerFlag = false;
  } else {
    parent.style.top = "7px";
    elem.classList.remove("up");
    bur[0].classList.add("li1");
    bur[1].classList.add("li2");
    bur[2].classList.add("li0");
    burgerFlag = true;
  }
}

let startXs = 0;
let currentXs = 0;
let dragging = false;

thumb.addEventListener("pointerdown", (e) => {
  startXs = e.clientX;
  dragging = true;
  thumb.style.transition = "none";
});

window.addEventListener("pointermove", (e) => {
  if (!dragging) return;

  currentXs = e.clientX;
  let diff = currentXs - startXs;

  if (diff < 0) diff = 0;

  const max = roller.offsetWidth - thumb.offsetWidth - 5;

  if (diff > max) diff = max;

  thumb.style.transform = `translateX(${diff}px)`;
});

window.addEventListener("pointerup", () => {
  if (!dragging) return;
  dragging = false;

  let diff = currentXs - startXs;
  const max = roller.offsetWidth - thumb.offsetWidth - 5;

  thumb.style.transition = ".3s";

  if (diff >= max * 0.9) {
    thumb.style.transform = `translateX(${max - 5}px)`;

    onSlideComplete();
  } else {
    thumb.style.transform = `translateX(0px)`;
  }
});
function oter() {
  if (content.classList.contains("hidden")) {
    video[0].pause();
    console.log("wew");
  } else {
    video[0].play();
    console.log("ere");
  }
}

function onSlideComplete() {
  baner.classList.add("hidden");
  content.classList.remove("hidden");
  oter();

  slideWidth = slides[0].offsetWidth;
  console.log(slideWidth);

  updateText();
  moveTo(index);
}

oter();

close.addEventListener("click", () => {
  baner.classList.remove("hidden");
  content.classList.add("hidden");
  oter();
  index = 0;
  moveTo(index);

  video[0].currentTime = 0
  video[1].currentTime = 0
  thumb.style.transform = `translateX(0px)`;
});

imgs.forEach((v) => {
  let link = document.createElement("link");
  link.rel = "preload";
  link.href = v.src;
  link.as = "image";
  document.head.appendChild(link);
});

function setClick(i) {
  moveTo(i);
  onBurger();
  console.log(index);
  subLinks.forEach((e) => e.classList.remove("active"));
  switch (index) {
    case 1:
      subLinks[0].classList.add("active");
      break;
    case 0:
      subLinks[2].classList.add("active");
      break;
    case 4:
      subLinks[1].classList.add("active");
      break;
    default:
      break;
  }
}
