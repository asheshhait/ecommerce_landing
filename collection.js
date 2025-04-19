const slider = document.querySelector('.image-slider');
const images = document.querySelectorAll('.image-slider img');
const totalImages = images.length;
const slideNum = document.getElementById('slideNumber');
const slideText = document.getElementById('slideText'); 
const colorBox = document.querySelector('#yellow'); // Moved to top for reusability

let current = 0;
const slideTexts = [
  "BEAUTY IS THE MISTRY <br> OF THE LIFE",
  "NATURE IS THE ART <br> OF GOD",
  "EMBRACE THE CHAOS <br> AND THE CALM",
  "LET YOUR LIGHT <br> SHINE BRIGHT",
];


const slideColors = [
"#d6b790",
  "#74e8cd",  
  "#eddb69",  
  "#dea0a0",  
 
];
function updateSlideContent(n) {
  const tl = gsap.timeline();

  tl.to([slideNum, slideText], {
    opacity: 0,
    y: -20,
    duration: 0.3,
    ease: "power1.in"
  });

  tl.add(() => {
    slideNum.textContent = n.toString().padStart(2, '0');
    slideText.innerHTML = slideTexts[n - 1]; 
  });
  tl.add(() => {
    slideNum.textContent = n.toString().padStart(2, '0');
    slideText.innerHTML = slideTexts[n - 1];
    colorBox.style.backgroundColor = slideColors[n - 1];
  });

  tl.to([slideNum, slideText], {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: "bounce.out"
  });
  
}
const t2 = gsap.timeline();
t2.from("#text_h1", {
  x: "40%",
  ease: "back.out(2.6)",
  opacity: 0,
}, 0);

t2.from("#text_h2", {
  x: "-40%",
  ease: "back.out(2.6)",
  opacity: 0,
}, 0);

t2.from("#nav h6", {
  y: -30,
  ease: "back.out(1.6)",
  stagger: 0.2,
  opacity: 0,
}, 0);
t2.from("#image_div", {
    y: "40%",
    ease: "back.out(2.6)",
    opacity: 0,
    
  }, 0);
  t2.from("#social h6", {
    y: -30,
    ease: "back.out(1.6)",
    stagger: 0.2,
    opacity: 0,
  }, )
  t2.from("#cross", {
    y: -30,
    opacity: 0,
  }, )
 
function slideNext() {
  if (current >= totalImages - 1) return;

  current++;

  const tl = gsap.timeline();

  tl.to(slider, {
    x: `-${current * 100}%`,
    duration: 1.2,
    ease: "back.out(1.6)",
  }, 0.3);

  tl.add(() => {
    updateSlideContent(current + 1);
  }, 0.4);

  tl.from("#social h6", {
    y: -30,
    ease: "back.out(1.6)",
    stagger: 0.2,
    opacity: 0,
  }, 0.4);

  if (current === totalImages - 1) {
    tl.add(() => {
      gsap.set(slider, { x: `-${(totalImages - 1) * 100}%` });
      updateSlideContent(current + 1);
    }, 1.5);
  }
  t2.from("#cross", {
    rotate:"180deg"
  }, )

}
updateSlideContent(1);
let slideInterval = setInterval(slideNext, 3000);
function stopSliderOnLastImage() {
  if (current >= totalImages - 1) {
    clearInterval(slideInterval);
  }
}

setInterval(stopSliderOnLastImage, 1000);
