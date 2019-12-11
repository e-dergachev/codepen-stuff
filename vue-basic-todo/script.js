Vue.component('todo', {
  props: ['todo', 'index'],
  computed: {
    style() {
      if (this.index % 2 === 0 ) {
        return {backgroundColor: "whitesmoke"};   
      }
    }
  },
  template: '<li :style="style">{{todo}}</li>'
});
const app = new Vue({
  el: '#app',
  data: {
    tasks: [],
    task: ""
  },
  created() {
    fetch('https://kodaktor.ru/j/tasklist')
      .then(res => res.json())
      .then(data => this.tasks = data.list);
  },
  methods: {
    addItem: function() {
      if (this.task.length > 0) {
        this.tasks.push(this.task);
        this.task = "";
      }
    }
  }
});
