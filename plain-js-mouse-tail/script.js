document.addEventListener("DOMContentLoaded", () => {
  const tail = [];
  const n = 11;
  for (let i = 0; i < n; i++) {
    let dot = document.createElement('div');
  	dot.className = 'trail';
  	tail.push(dot);
  }
  let counter = 0;
  function moved(e) {
    let index = counter % n;
    tail[index].style.left = e.pageX + 10 + 'px';
    tail[index].style.top = e.pageY + 'px';
  	document.querySelector('body').append(tail[index]);
    counter++;
  }
  document.addEventListener('mousemove', moved);
});
