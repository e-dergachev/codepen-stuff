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

const temp = field.reduce((acc, val) => acc.concat(val), []);

Vue.component("cell", {
  props: ["content", "index"],
  computed: {
    style() {
      const color = ([1, 2, 3, 4, 5, 6, 7, 8].includes(this.content) ? colors[this.content] : 'black');
      if (this.index > 0 && (this.index + 1) % 9 === 0) {
        console.log(this.index);
        return {color};   
      }
      else {
        return {borderRight: "1px solid black", color}; 
      }
    }
  },
  template: '<div class="cell" v-bind:style="style">{{ content }}</div>'
});

const app = new Vue({
  el: "#field-box",
  data: {
    field: temp
  },
});
