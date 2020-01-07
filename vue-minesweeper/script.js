const colors = {
  1: 'blue', 
  2: 'green', 
  3: 'red', 
  4: 'purple', 
  5: 'maroon', 
  6: 'turquoise',
  7: 'black',
  8: 'gray'
};

Vue.component("cell", {
props: ["content", "index", "hidden", "marked", "questioned", "size", "lost"],
data: function() {
  return {val: ""};
},
beforeUpdate() {
  this.val = (this.marked && this.content !== "💣" && this.lost) ? "╳" : this.marked ? "🚩" : (this.lost && this.content === "💣") ? "💣" : (this.questioned && this.hidden) ? "❓" : this.hidden ? "" : this.content;
},
computed: {
  style() {
    const backgroundColor = (this.lost && this.hidden) ? "hsl(0, 100%, 85%)" : (this.lost && !this.hidden) ? "hsl(0, 100%, 95%)" : this.hidden ? "silver" : "whitesmoke";
    const color = this.marked ? "red" : (this.questioned && this.hidden) ? "dimgrey" : ([1, 2, 3, 4, 5, 6, 7, 8].includes(this.content) ? colors[this.content] : 'black'); //the last black is for the mines
    const limit = this.size === "small" ? 9 : this.size === "medium" ? 16 : 30;
    if (this.index > 0 && (this.index + 1) % limit === 0) {
      return {color, backgroundColor};   
    }
    else {
      return {borderRight: "1px solid black", color, backgroundColor}; 
    }
  }
},
template: `<div 
             class="cell" 
             :style="style" 
             @click.left="$emit('disclose-cell')"
             @click.right="$emit('mark-cell')"
           >{{ this.val }}</div>`
});

const app = new Vue({
el: "#main-box",
data: function() {
      return {field: {}, isLost: false, isWon: false, size: "small", mines: 10, clicked: false, time: 0, timeStop: true, interval: undefined};
},
created() {
  this.makeField(this.size);
},
beforeUpdate() {
  this.checkIfWon(this.size);
},
methods: {
  timer: function() {
    this.interval = setInterval(() => {
        if (!document.hidden) { //to stop the timer when the tab is hidden
          this.time++;   
        }
        if (/*this.timeStop ||*/ this.time === 999) {
          /*if (this.time !== 999) { //to awoid switching the timer after the game has ended
            this.time--;
          }*/
          clearInterval(this.interval);
        }
      }, 1000);
  },
  changeField: function(size = this.size) {
    this.time = 0;
    this.timeStop = true;
    if (!this.isWon || !this.isLost) {
      clearInterval(this.interval);
    }
    this.isWon = false;
    this.isLost = false;
    this.makeField(size);
  },
  checkIfWon: function(size) {
    const mineAmount = size === "small" ? 10 : size === "medium" ? 40 : 99;
    let numHidden = 0;
    for (let cell of this.field) {
      if (cell.hidden) numHidden++;
    }
    if (numHidden === mineAmount) {
      this.isWon = true;
      this.mines = 0;
      this.timeStop = true;
      clearInterval(this.interval);
      for (let cell of this.field) {
        if (cell.hidden && !cell.marked) {
          cell.marked = true;
        }
      }      
    }      
  },
  makeField: function(size) {
    const mineIndexes = [];
    const rndLimit = size === "small" ? 81 : size === "medium" ? 256 : 480;
    let mineAmount = size === "small" ? 10 : size === "medium" ? 40 : 99;
    this.mines = mineAmount;
    while (mineAmount !== 0) {
        let roll = Math.floor((Math.random() * rndLimit));
        if (!mineIndexes.includes(roll)) {
            mineAmount--;
            mineIndexes.push(roll);
        }
    }

    const field = [];
    const iLimit = size === "small" ? 9 : 16;
    const jLimit = size === "small" ? 9 : size === "medium" ? 16 : 30;
    let placeCounter = 0;
    for (let i = 0; i < iLimit; i++) {
        let row = [];
        for (let j = 0; j < jLimit; j++) {
            row.push(mineIndexes.includes(placeCounter) ? '💣' : '');
            placeCounter++;
        }
        field.push(row);
    }

    for (let i = 0; i < iLimit; i++) {
        for (let j = 0; j < jLimit; j++) {
            let neighbors = 0;
            if (i - 1 >= 0 && j - 1 >= 0 && field[i - 1][j - 1] === "💣") neighbors++;
            if (i + 1 < iLimit && j - 1 >= 0 && field[i + 1][j - 1] === "💣") neighbors++;
            if (i - 1 >= 0 && j + 1 < jLimit && field[i - 1][j + 1] === "💣") neighbors++;
            if (i - 1 >= 0 && field[i - 1][j] === "💣") neighbors++;
            if (i + 1 < iLimit && field[i + 1][j] === "💣") neighbors++;
            if (j - 1 >= 0 && field[i][j - 1] === "💣") neighbors++;
            if (j + 1 < jLimit && field[i][j + 1] === "💣") neighbors++;
            if (i + 1 < iLimit && j + 1 < jLimit && field[i + 1][j + 1] === "💣") neighbors++;
            if (neighbors > 0 && field[i][j] !== '💣') field[i][j] = neighbors;
        }
    }

    let temp = field.reduce((acc, val) => acc.concat(val), []);
    this.field = temp.map(val => {return {content: val, hidden: true, marked: false, questioned: false}});      
  },
  calculateVicinity: function(i) {
    let vicinity;
    const leftIndexes = this.size === "small" ? [0, 9, 18, 27, 36, 45, 54, 63, 72] : this.size === "medium" ? 
          [0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240] : 
          [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450];
    const rightIndexes = this.size === "small" ? [8, 17, 26, 35, 44, 53, 62, 71, 80] : this.size === "medium" ?
          [15, 31, 47, 63, 79, 95, 111, 127, 143, 159, 175, 191, 207, 223, 239, 255] : 
          [29, 59, 89, 119, 149, 179, 209, 239, 269, 299, 329, 359, 389, 419, 449, 479];
    const limit = this.size === "small" ? 9 : this.size === "medium" ? 16 : 30;
    const filterLimit = this.size === "small" ? 80 : this.size === "medium" ? 255 : 479;
    if (leftIndexes.includes(i)) {
      vicinity = [i + 1, i - limit + 1, i - limit, i + limit, i + limit + 1];  
    }
    else if (rightIndexes.includes(i)) {
      vicinity = [i - 1, i - limit, i - limit - 1, i + limit - 1, i + limit];  
    }
    else {
      vicinity = [i - 1, i + 1, i - limit + 1, i - limit, i - limit - 1, i + limit - 1, i + limit, i + limit + 1];  
    }
    vicinity = vicinity.filter(vIndex => vIndex >= 0 && vIndex <= filterLimit);
    return vicinity;   
  },
  riskyBunch: function(i) {
    const bombsNumber = Number(this.field[i].content); //clicking on a bomb be made impossible with gameover
    const vicinity = this.calculateVicinity(i);
    let numMarked = 0;
    for (let vIndex of vicinity) {
      if (this.field[vIndex].marked) numMarked++;
    }
    if (numMarked === bombsNumber) {
      for (let vIndex of vicinity) {
        this.discloseCell(vIndex, true)
      }
    }
  },
  discloseCell: function(index, hiddenOnly) {
    if (this.isLost || this.isWon) return;
    if (this.time === 0) { //start the timer
        this.timeStop = false;
        this.timer();
    }
    if (this.field[index].hidden) {
      if (!this.field[index].marked) {
        this.clicked = true; //to briefly change the face emoticon
        setTimeout(() => this.clicked = false, 200);
        this.field[index].hidden = false;
        if (this.field[index].content === "") {
          let vicinity = this.calculateVicinity(index);
          while (vicinity.length !== 0) {
            vicinity.forEach(vIndex => this.field[vIndex].hidden = this.field[vIndex].marked ? true : false);
            vicinity = vicinity.filter(vIndex => this.field[vIndex].content === "");
            let temp = [];
            vicinity.forEach(vIndex => temp.push(this.calculateVicinity(vIndex)));
            vicinity = temp.reduce((acc, val) => acc.concat(val), []).filter(vIndex => this.field[vIndex].hidden);
            vicinity = [...new Set(vicinity)]; //remove duplicates
          }
        }
        else if (this.field[index].content === "💣") {
          this.isLost = true;
          this.timeStop = true;
          clearInterval(this.interval);
          this.$forceUpdate(); //to change the field colors and show all the mines
        }
      }
    }
    else if (hiddenOnly !== true) {
      this.riskyBunch(index);
    }
  },
  markCell: function(index) {
    if (this.isLost || this.isWon) return;
    if (this.field[index].hidden) {
      this.mines = (!this.field[index].marked && !this.field[index].questioned) ? this.mines - 1 : this.field[index].marked ? this.mines + 1 : this.mines;
      this.field[index].marked = (!this.field[index].marked && !this.field[index].questioned) ? true : false;
      this.field[index].questioned = (this.field[index].marked || this.field[index].questioned) ? false : true;
    }
    else {
      this.riskyBunch(index);
    }
  }
},
});
