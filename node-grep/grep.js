const {readFile} = require("fs").promises;
const {existsSync, statSync, readdirSync} = require("fs");

if (process.argv.length < 4) {
    console.log('Call this programm like this: node grep ["regular expression"] [list of files or directories to search separated by space]');
    return;
}

const files = []

function fileListFromDir(content, prefix) {
    for (let i = 0; i < content.length; i++) {
        let item = prefix.match(/\\/) ? `${prefix}\\${content[i]}` : `${prefix}/${content[i]}`;
        if (statSync(item).isDirectory()) {
            fileListFromDir(readdirSync(item), item);
        }
        else {
            files.push(item);
        }
    }
}

for (let i = 3; i < process.argv.length; i++) {
    let item = process.argv[i];
    if (item[item.length - 1] === "\\" || item[item.length - 1] === "/") {
        item = item.slice(0, -1);
        console.log(item);
    }
    if (existsSync(item) && statSync(item).isDirectory()) {
        fileListFromDir(readdirSync(item), item);
    }
    else {
        files.push(item);
    }
}

const query = new RegExp(process.argv[2]);

for (let i = 0; i < files.length; i++) {
    readFile(files[i], "utf8")
    .then(text => {
        let result = text.match(query) !== null ? "True" : "False";
        console.log(`${result} for ${files[i]}`);
    })
    .catch(err => {
        let message = err.code === "ENOENT" ? `No such file ${files[i]}` : err.message;
        console.log(`${message} --> error checking ${files[i]}`);
    });
}
