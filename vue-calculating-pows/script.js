Vue.component('pow', {
  props: ['pow'],
  template: '<li>2<sup>{{pow}}</sup> = {{2**pow}}</li>'
});
const app = new Vue({
  el: '#app',
  data: {
    pows: [],
    num: 5
  },
  created() {
    for (let i = 0; i < this.num; i++) {
      this.pows.push(10 + i);
    }    
  },
  beforeUpdate() {
    if (!isNaN(this.num) && this.num >= 1) {
      this.num = Math.floor(this.num);
      this.pows = [];
      for (let i = 0; i < this.num; i++) {
        this.pows.push(10 + i);
      }
    }
  },
  methods: {
    makePows: function() {
      if (!isNaN(this.num) && this.num >= 0) {
        this.num = Math.floor(this.num) + 1;
        this.pows = [];
        for (let i = 0; i < this.num; i++) {
          this.pows.push(10 + i);
        }
      }
    }
  }
});
