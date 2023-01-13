const track = document.getElementById("image-track");

const mouseOnDown = e => track.dataset.mouseDownAt = e.clientX;

const mouseOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const mouseOnMove = e => {
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

window.onmousedown = e => mouseOnDown(e);
window.ontouchstart = e => mouseOnDown(e.touches[0]);
window.onmouseup = e => mouseOnUp(e);
window.ontouchend = e => mouseOnUp(e.touches[0]);
window.onmousemove = e => mouseOnMove(e);
window.ontouchmove = e => mouseOnMove(e.touches[0]);
