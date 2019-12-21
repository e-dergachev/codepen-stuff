let app = new Vue({
  el: '#app',
  data: {
    r: 255,
    g: 255,
    b: 255,
  },
  methods: {
    backgroundHandler: function() {
      document.body.style.backgroundColor = `rgb(${this.r},${this.g},${this.b})`;
    }
  }
  });
