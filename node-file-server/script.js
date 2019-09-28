function fetchFile(fileName) {
    fetch(fileName)
    .then(res => res.text())
    .then(data => document.querySelector("textarea").value = data);

    const el = document.querySelector("button");
    const elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el); //to remove the event listeners from the button the lazy way

    document.querySelector("button").addEventListener("click", () => {
        fetch(fileName, {method: "PUT", body: document.querySelector("textarea").value});
    });
}    

fetch("/")
.then(res => res.text())
.then(data => {
    const files = data.split("\n").filter(file => file.match(/\.[a-zA-Z]+$/));
    const select = document.querySelector("select");
    files.forEach(file => {
        let option = document.createElement("option");
        option.text = file;
        select.append(option);
    });
    select.addEventListener("change", () => {
        fetchFile(select.options[select.selectedIndex].text);
    });
    fetchFile(select.options[0].text);
});
