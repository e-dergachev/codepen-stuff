const level = `
############
#..........#
#.....#....#
#.@...#..k.#
#.....#....#
############
`;
const colors = {dot: 'brown', wall: 'brown', k: 'green', player: 'white', loot: 'darkgrey'};
let playerCoords;

function drawLevel(level) {
  
  let rows = level.trim().split('\n').map(row => [...row]);
  
  rows.forEach( (row, i) => {
    row.forEach((cellContent, j) => {
      let cell = document.createElement('div');
      cell.textContent = cellContent;
      cell.setAttribute('coords', `x${j}y${i}`);
      cell.className = 'cell';
      if (cellContent === '@') {
        cell.style.color = colors.player;
        playerCoords = {x: j, y: i};
      }
      else if (cellContent === '.') {
        cell.style.color = colors.dot;
      }
      else if (cellContent === '#') {
        cell.style.color = colors.wall;
      }
      else {
        cell.style.color = colors[cellContent];
      }
      document.getElementById('field').append(cell);
    });
    document.getElementById('field').append(document.createElement('div'));
  });
}

function update(toWhere, fromWhere) {
  toWhere.textContent = '@';
  toWhere.style.color = colors.player;
  fromWhere.textContent = '.';
  fromWhere.style.color = colors.dot;
}

function handleInteractions(toWhere, fromWhere, move) {
  	if (toWhere.textContent === '.') {
      move();
    }
	  else if (toWhere.textContent === 'k') {
  	toWhere.textContent = '%';
    toWhere.style.color = colors.loot;
    }
    else if (toWhere.textContent === '%') {
      move();  
    }
}

function keyHandler(e) {
	e.preventDefault();
  const fromWhere = document.querySelector(`[coords="x${playerCoords.x}y${playerCoords.y}"]`);
	if (e.key === 'ArrowUp' || e.key === '8') {
  	const toWhere = document.querySelector(`[coords="x${playerCoords.x}y${playerCoords.y - 1}"]`);
    function move() {
			playerCoords.y -= 1;
    	update(toWhere, fromWhere);    
    }
  	handleInteractions(toWhere, fromWhere, move);
  }
	if (e.key === 'ArrowDown' || e.key === '2') {
  	const toWhere = document.querySelector(`[coords="x${playerCoords.x}y${playerCoords.y + 1}"]`);
  	function move() {
      playerCoords.y += 1;
    	update(toWhere, fromWhere);
    }
    handleInteractions(toWhere, fromWhere, move);    
  }
  if (e.key === 'ArrowLeft' || e.key === '4') {
  	const toWhere = document.querySelector(`[coords="x${playerCoords.x - 1}y${playerCoords.y}"]`);
  	function move() {
      playerCoords.x -= 1;
    	update(toWhere, fromWhere);
    }
    handleInteractions(toWhere, fromWhere, move);    
  }
  if (e.key === 'ArrowRight' || e.key === '6') {
  	const toWhere = document.querySelector(`[coords="x${playerCoords.x + 1}y${playerCoords.y}"]`);
  	function move() {
      playerCoords.x += 1;
    	update(toWhere, fromWhere);
    }
    handleInteractions(toWhere, fromWhere, move);   
  }
  if (e.key === 'Home' || e.key === '7') {
  	const toWhere = document.querySelector(`[coords="x${playerCoords.x - 1}y${playerCoords.y - 1}"]`);
  	function move() {
      playerCoords.x -= 1;
      playerCoords.y -= 1;
    	update(toWhere, fromWhere);
    }
    handleInteractions(toWhere, fromWhere, move);   
  }
  if (e.key === 'PageUp' || e.key === '9') {
  	const toWhere = document.querySelector(`[coords="x${playerCoords.x + 1}y${playerCoords.y - 1}"]`);
  	function move() {
      playerCoords.x += 1;
      playerCoords.y -= 1;
    	update(toWhere, fromWhere);
    }
    handleInteractions(toWhere, fromWhere, move);    
  }
  if (e.key === 'End' || e.key === '1') {
  	const toWhere = document.querySelector(`[coords="x${playerCoords.x - 1}y${playerCoords.y + 1}"]`);
  	function move() {
      playerCoords.x -= 1;
      playerCoords.y += 1;
    	update(toWhere, fromWhere);
    }
    handleInteractions(toWhere, fromWhere, move);   
  }
  if (e.key === 'PageDown' || e.key === '3') {
  	const toWhere = document.querySelector(`[coords="x${playerCoords.x + 1}y${playerCoords.y + 1}"]`);
  	function move() {
      playerCoords.x += 1;
      playerCoords.y += 1;
    	update(toWhere, fromWhere);
    }
    handleInteractions(toWhere, fromWhere, move);    
  } 
}

drawLevel(level);
document.addEventListener('keydown', keyHandler);
