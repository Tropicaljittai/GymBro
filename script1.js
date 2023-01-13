const track = document.getElementById("image-slider");

const mouseClicked = e => track.dataset.mouseDownAt = e.clientX;

const mouseRelease = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const mouseMoving = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

window.onmousedown = e => mouseClicked(e);
window.ontouchstart = e => mouseClicked(e.touches[0]);
window.onmouseup = e => mouseRelease(e);
window.ontouchend = e => mouseRelease(e.touches[0]);
window.onmousemove = e => mouseMoving(e);
window.ontouchmove = e => mouseMoving(e.touches[0]);
