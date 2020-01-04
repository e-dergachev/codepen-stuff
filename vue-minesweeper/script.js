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

const mineIndexes = [];
let mineAmount = 10;
while (mineAmount !== 0) {
    let roll = Math.floor((Math.random() * 81));
    if (!mineIndexes.includes(roll)) {
        mineAmount--;
        mineIndexes.push(roll);
    }
}

const field = [];
let placeCounter = 0;
for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
        row.push(mineIndexes.includes(placeCounter) ? '💣' : '');
        placeCounter++;
    }
    field.push(row);
}

for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        let neighbors = 0;
        if (i - 1 >= 0 && j - 1 >= 0 && field[i - 1][j - 1] === "💣") neighbors++;
        if (i + 1 < 9 && j - 1 >= 0 && field[i + 1][j - 1] === "💣") neighbors++;
        if (i - 1 >= 0 && j + 1 < 9 && field[i - 1][j + 1] === "💣") neighbors++;
        if (i - 1 >= 0 && field[i - 1][j] === "💣") neighbors++;
        if (i + 1 < 9 && field[i + 1][j] === "💣") neighbors++;
        if (j - 1 >= 0 && field[i][j - 1] === "💣") neighbors++;
        if (j + 1 < 9 && field[i][j + 1] === "💣") neighbors++;
        if (i + 1 < 9 && j + 1 < 9 && field[i + 1][j + 1] === "💣") neighbors++;
        if (neighbors > 0 && field[i][j] !== '💣') field[i][j] = neighbors;
    }
}

let temp = field.reduce((acc, val) => acc.concat(val), []);
temp = temp.map(val => {return {content: val, hidden: true, marked: false, questioned: false}});

Vue.component("cell", {
  props: ["content", "index", "hidden", "marked", "questioned"],
  data: function() {
    return {val: ""};
  },
  beforeUpdate() {
    this.val = this.marked ? "🚩" : (this.questioned && this.hidden) ? "❓" : this.hidden ? "" : this.content;
  },
  computed: {
    style() {
      const backgroundColor = this.hidden ? "silver" : "whitesmoke";
      const color = this.marked ? "red" : (this.questioned && this.hidden) ? "dimgrey" : ([1, 2, 3, 4, 5, 6, 7, 8].includes(this.content) ? colors[this.content] : 'black'); //the last black is for the mines
      if (this.index > 0 && (this.index + 1) % 9 === 0) {
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
  el: "#field-box",
  data: function() {
        return {field: temp, isLost: false, isWon: false};
  },
  beforeUpdate() {
    let numHidden = 0;
    for (let cell of this.field) {
      if (cell.hidden) numHidden++;
    }
    if (numHidden === 10) {
      this.isWon = true;
      for (let cell of this.field) {
        if (cell.hidden && !cell.marked) {
          cell.marked = true;
        }
      }      
    }
  },
  methods: {
    calculateVicinity: function(i) {
      let vicinity;
      if ([0, 9, 18, 27, 36, 45, 54, 63, 72].includes(i)) {
        vicinity = [i + 1, i - 8, i - 9, i + 9, i + 10];  
      }
      else if ([8, 17, 26, 35, 44, 53, 62, 71, 80].includes(i)) {
        vicinity = [i - 1, i - 9, i - 10, i + 8, i + 9];  
      }
      else {
        vicinity = [i - 1, i + 1, i - 8, i - 9, i - 10, i + 8, i + 9, i + 10];  
      }
      vicinity = vicinity.filter(vIndex => vIndex >= 0 && vIndex <= 80);
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
      if (this.field[index].hidden) {
        if (!this.field[index].marked) {
          this.field[index].hidden = false;
          if (this.field[index].content === "") {
            let vicinity = this.calculateVicinity(index);
            while (vicinity.length !== 0) {
              vicinity.forEach(vIndex => this.field[vIndex].hidden = this.field[vIndex].marked ? true : false);
              vicinity = vicinity.filter(vIndex => this.field[vIndex].content === "");
              let temp = [];
              vicinity.forEach(vIndex => temp.push(this.calculateVicinity(vIndex)));
              vicinity = temp.reduce((acc, val) => acc.concat(val), []).filter(vIndex => this.field[vIndex].hidden);
              vicinity = [...new Set(vicinity)];
            }
          }
          else if (this.field[index].content === "💣") {
            this.isLost = true;
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
        this.field[index].marked = (!this.field[index].marked && !this.field[index].questioned) ? true : false;
        this.field[index].questioned = (this.field[index].marked || this.field[index].questioned) ? false : true;
      }
      else {
        this.riskyBunch(index);
      }
    }
  },
});
