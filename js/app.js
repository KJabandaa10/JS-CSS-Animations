const learnNo = document.querySelectorAll("hp-learn-no");
const learnYes = document.querySelector("hp-learn-yes");

window.addEventListener("DOMContentLoaded", function(e) {
  const presentation = document.querySelector("hp-presentation");

  presentation.onclick = handlePresentationClick;
  presentation.addEventListener("animationend", handleAnimationEnd, false);
});

function handlePresentationClick(e) {
  const current = document.querySelector("hp-slide.active");
  const next = current.nextElementSibling;

  while (next && next.tagName != "HP-SLIDE") {
    next = next.nextElementSibling;
  }

  if (next) {
    current.classList.remove("active");
    next.classList.add("active");

    next.querySelectorAll(".match").forEach(function(el) {
      setTimeout(() => {
        el.classList.remove("match");
      }, 0);
    });

    const aa = parseInt(next.getAttribute("data-autoadvance"));

    if (!isNaN(aa)) {
      setTimeout(e => {
        handlePresentationClick(e);
      }, aa);
    }

    const osa = next.getAttribute("data-onshow");
    if (osa) {
      window[osa]();
    }
  }
}

function handleAnimationEnd(e) {
  const slide = e.target.closest("hp-slide");
  const aa = slide.getAttribute("data-autoadvance");

  if (aa == "animationend" && slide.classList.contains("active")) {
    handlePresentationClick(e);
  }
}

function setLearnImage(imageName) {
  let img = document.querySelector("hp-slide.active hp-learn img");
  img.src = `img/${imageName}.svg`;
}

let shapes = ["circle", "hexagon", "diamond", "square"];

function showLearning() {
  let imgIndex = Math.floor(Math.random() * shapes.length);
  setLearnImage(shapes[imgIndex]);

  let slide = document.querySelector("hp-slide.active");
  slide.classList.remove("learn-yes");
  slide.classList.remove("learn-no");
  slide.classList.add(imgIndex ? "learn-no" : "learn-yes");
}

function startLearning(learningDelay) {
  showLearning();

  setTimeout(() => {
    if (learningDelay > 1.1) {
      showLearning();

      learningDelay = Math.pow(learningDelay, 1 / 1.05);
      startLearning(learningDelay);
    }
  }, learningDelay);
}

function runLearningSequence() {
  startLearning(1500);
}

function animateSVGstep() {
  const slide = document.querySelector("hp-slide.active");

  let svgs = slide.querySelectorAll("svg");

  if (svgs[0].children.length > 0) {
    let el = svgs[0].children[0];

    if (el) {
      svgs[1].appendChild(el.parentNode.removeChild(el));
    }

    return true;
  }

  return false;
}
function animateSVG() {
  if (animateSVGstep()) {
    setTimeout(animateSVG, 30);
  }
  presentation.style.border = "none";
}
