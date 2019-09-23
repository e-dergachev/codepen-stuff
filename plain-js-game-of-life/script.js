  const n = 16
  const grid = document.querySelector("#grid");
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = Math.random() < 0.33 ? true : false;
      grid.append(checkbox);
    }
    grid.append(document.createElement("br"));
  }
  document.querySelector("#next").addEventListener("click", genHandler);
  function genHandler() {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const gridArr = [];
    let j;
  	for (let i = 0; i < n**2; i++) {
	  if (i % n === 0) {
        j = i === 0 ? 0 : j + 1;
        gridArr[j] = [];
      }
      gridArr[j].push(checkboxes[i].checked);
    }
    let index = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        let neighbors = 0;
        if (i - 1 >= 0 && j - 1 >= 0 && gridArr[i - 1][j - 1]) neighbors++;
        if (i + 1 < n && j - 1 >= 0 && gridArr[i + 1][j - 1]) neighbors++;
        if (i - 1 >= 0 && j + 1 < n && gridArr[i - 1][j + 1]) neighbors++;
        if (i - 1 >= 0 && gridArr[i - 1][j]) neighbors++;
        if (i + 1 < n && gridArr[i + 1][j]) neighbors++;
        if (j - 1 >= 0 && gridArr[i][j - 1]) neighbors++;
        if (j + 1 < n && gridArr[i][j + 1]) neighbors++;
        if (i + 1 < n && j + 1 < n && gridArr[i + 1][j + 1]) neighbors++;
        if (gridArr[i][j]) {
          if (neighbors < 2 || neighbors > 3) {
           checkboxes[index].checked = false;
          }
        }
        else if (neighbors === 3) {
          checkboxes[index].checked = true;	
        }
        index++;
      }
    }
  }
