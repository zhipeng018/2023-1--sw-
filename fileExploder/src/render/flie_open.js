// 获取文件列表的父容器
const fileListContainer = document.getElementById('fileListContainer');

// 遍历文件列表，为每个文件添加点击事件监听器
for (const file of fileList) {
  const fileElement = document.createElement('div');
  fileElement.textContent = file.name;

  // 判断文件类型，如果是文件夹则添加打开文件夹的事件监听器
  if (file.type === 'directory') {
    fileElement.addEventListener('click', () => {
      // 打开文件夹并显示其中的文件
      openFolder(file.path);
    });
  } else {
    // 如果是文件，则添加打开文件信息的事件监听器
    fileElement.addEventListener('click', () => {
      // 打开文件信息
      showFileInfo(file.path);
    });

    // 如果是图片文件，则添加文件缩略图
    if (isImageFile(file.name)) {
      const thumbnail = createThumbnail(file.path);
      fileElement.appendChild(thumbnail);
    }
  }

  // 将文件元素添加到文件列表容器中
  fileListContainer.appendChild(fileElement);
}

// 打开文件夹并显示其中的文件
function openFolder(folderPath) {
  // 使用 electron 中的 shell 模块打开文件夹
  shell.openItem(folderPath);
}

// 显示文件信息
function showFileInfo(filePath) {
  // 使用 electron 中的 dialog 模块打开文件信息对话框
  dialog.showMessageBoxSync({
    message: `文件信息：${filePath}`,
    buttons: ['确定']
  });
}

// 判断文件是否是图片文件
function isImageFile(fileName) {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  const fileExtension = fileName.split('.').pop().toLowerCase();
  return imageExtensions.includes(fileExtension);
}

// 创建文件缩略图
function createThumbnail(filePath) {
  const thumbnail = document.createElement('img');
  thumbnail.src = `file://${filePath}`;
  thumbnail.style.width = '50px';
  thumbnail.style.height = '50px';
  return thumbnail;
}
