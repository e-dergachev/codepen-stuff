customElements.define("votes-", class extends HTMLElement {
  constructor() { 
    super();
    this.votes = null;
    this.shadow = this.attachShadow({mode: 'open'});
    this.content = document.importNode(document.querySelector('template').content, true);
    this.shadow.appendChild(this.content);
    this.shadow.querySelector(".minus").addEventListener("click", () => {
      if (this.votes !== 0) {
        this.votes -= 1;
        this.makeCats();
      }
    });
    this.shadow.querySelector(".plus").addEventListener("click", () => {
      this.votes += 1;
      this.makeCats();
    });
  }

  makeCats() {
    const node = this.shadow.querySelectorAll("slot")[1].assignedNodes()[0];
    if (this.votes === null) {
      this.votes = Number(node.textContent);
    }
    let cats = "";
    for (let i = 0; i < this.votes; i++) {
      cats += "😸 ";  
    }
    node.textContent = cats;
  }

});

const data = [
  {
    "title": "Angular",
    "votes": 0,
    "id": 0
  },
  {
    "title": "React",
    "votes": 3,
    "id": 1
  },
  {
    "title": "Vue",
    "votes": 2,
    "id": 2
  }
]; //sample data
data.forEach(piece => {
  const el = document.createElement("votes-");
  el.innerHTML = `
    <span slot="framework">${piece.title}</span><br>
    <span slot="votes">${piece.votes}</span>
  `;
  el.makeCats();
  document.body.append(el);
});
