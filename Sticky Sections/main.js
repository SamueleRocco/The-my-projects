const sections = document.querySelectorAll("section");
const first = sections[0];
const last = sections[sections.length - 1];

scrollIntoView(last)
  .then(() => asyncDelay())
  .then(() => scrollIntoView(first));

function asyncDelay(delayTime = 500) {
  return new Promise((resolve) => setTimeout(resolve, delayTime));
}

async function scrollIntoView(el) {
  return new Promise((resolve) => {
    function onEnd() {
      window.removeEventListener("scrollend", onEnd);
      resolve(el);
    }
    window.addEventListener("scrollend", onEnd);
    el.scrollIntoView({ behavior: "smooth" });
  });
}
