const drag = document.querySelector("#brer-rabbit");
const drop = document.querySelector("#briar-patch");

let briarPatch = drop.getBoundingClientRect();
let brerRabbit = drag.getBoundingClientRect();
let leftButtonPressed = false;

function intersectRect(r1, r2) {
  return !(r2.left > r1.right || 
           r2.right < r1.left || 
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}

drag.addEventListener("mousedown", event => {
    if (event.button == 0) {
      leftButtonPressed = true;
    }
  });
  
drag.addEventListener("mouseup", event => {
    if (event.button == 0) {
      leftButtonPressed = false;
      if (intersectRect(briarPatch, brerRabbit)) {
      	drag.remove();
        drop.style.marginTop = "150px";
        document.querySelector("#freed-rabbit").style.display = "block";
      }
    }
  });
  
drag.addEventListener("mousemove", event => {
		if (leftButtonPressed) {
    	drag.style.left = event.pageX - 73 + "px";
    	drag.style.top = event.pageY - 28 + "px";
      brerRabbit = drag.getBoundingClientRect();
    }
  });  

drag.addEventListener("touchmove", event => {
    const touch = event.targetTouches[0];
    drag.style.left = touch.pageX - 85 + "px";
    drag.style.top = touch.pageY - 40 + "px";
    brerRabbit = drag.getBoundingClientRect();
  });

drag.addEventListener("touchend", event => {
    if (intersectRect(briarPatch, brerRabbit)) {
      	drag.remove();
        drop.style.marginTop = "150px";
        document.querySelector("#freed-rabbit").style.display = "block";
      }
  });
  