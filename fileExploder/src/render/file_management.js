const { ipcRenderer } = require('electron');
const fs = require('fs');

const fileList = document.getElementById('fileList');
const filePrint = document.getElementById('filePrint');
const backButton = document.getElementById('backButton');
const path = require('path');

let currentDir = '\\';

function updateFileList(dirPath) {
  currentDir = dirPath;
  document.getElementById('currentPath').textContent = dirPath;
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
  
    fileList.innerHTML = '';
    console.log('Files in directory:', dirPath);
    files.forEach(file => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      const filePath = `${dirPath}/${file}`;  // Use '/' instead of '\\'

      fs.stat(filePath,(err,stats) => {
        if(err){
          console.error(err);
          return;
        }
        if(stats.isDirectory()){
          link.setAttribute('data-type', 'directory');
          link.innerHTML = `<img src="./resources/folder.PNG" width="50" height="50"><br>${file}`;
        }else{
          link.setAttribute('data-type', 'file');
          link.innerHTML = file;
        }
      })
      link.setAttribute('href', `file://${filePath}`);
      link.setAttribute('data-path', `/${filePath}`);
      listItem.appendChild(link);
      fileList.appendChild(listItem);
    });
  });
}


function handleLinkClick(event) {
  event.preventDefault();
  const link = event.target;
  const path = link.getAttribute('data-path');  // Use 'data-path' instead of 'href'
  const type = link.getAttribute('data-type');
  console.log('Link clicked:', path, type);

  if (type === 'file') {
    console.log(path);
    const listItem = document.createElement('li');
    listItem.innerHTML = `<img src="./resources/file.png" width="50" height="50"><br>${path}`;
    filePrint.appendChild(listItem);

  } else if (type === 'directory') {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<img src="./resources/folder.PNG" width="50" height="50"><br>${path}`;
    filePrint.appendChild(listItem);
    updateFileList(path);
  }
}

function handleLinkDoubleClick(event) {
  event.preventDefault();
  const link = event.target;
  const path = link.getAttribute('data-path');  // Use 'data-path' instead of 'href'
  const type = link.getAttribute('data-type');
  if (type === 'directory') {
    updateFileList(path);
  }
}

function handleFolderSelection(event) {
  const link = event.target;
  const path = link.getAttribute('data-path');
  const type = link.getAttribute('data-type');
  if (type === 'directory') {
    filePrint.querySelectorAll('a').forEach(link => link.classList.remove('selected'));
    link.classList.add('selected');
  }
}

function handleBackButtonClick() {
  let currentPath;
  const selectedLink = fileList.querySelector('a.selected');

  // 如果没有选中的链接，那么我们使用当前目录作为默认值。
  if (selectedLink) {
    currentPath = selectedLink.getAttribute('data-path');
  } else {
    currentPath = currentDir;
  }
  
  const parentPath = path.dirname(currentPath);
  
  // '/' 在Windows系统中并不是根路径，应该更改为 'C:\\' 或是硬盘的具体路径。
  if(parentPath !== 'C:\\'){
    updateFileList(parentPath);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  updateFileList('\\');
});

ipcRenderer.on('changeDirectory', (event, arg) => {
  updateFileList(arg);
});

fileList.addEventListener('click', handleLinkClick);
fileList.addEventListener('dblclick', handleLinkDoubleClick);
fileList.addEventListener('click', handleFolderSelection);
backButton.addEventListener('click', handleBackButtonClick);
