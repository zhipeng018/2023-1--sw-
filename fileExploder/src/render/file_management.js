const fs = require('fs');

// 扫描指定目录下的所有文件和子目录
function scanDir(path) {
  const files = fs.readdirSync(path, { withFileTypes: true });
  files.forEach(file => {
    if (file.isDirectory()) {
      scanDir(`${path}/${file.name}`);
    } else {
      // 处理文件
    }
  });
}

// 获取文件信息并在界面上显示
function displayFile(path) {
  const stats = fs.statSync(path);
  const fileName = path.split('/').pop(); // 获取文件名
  const fileSize = stats.size; // 获取文件大小
  const fileCreated = stats.birthtime; // 获取文件创建时间
  const fileModified = stats.mtime; // 获取文件修改时间

  const fileDiv = document.createElement('div');
  fileDiv.innerHTML = `${fileName} (${fileSize} bytes, 创建于 ${fileCreated}, 修改于 ${fileModified})`;
  document.getElementById('fileList').appendChild(fileDiv);
}

// 扫描文件系统并在界面上显示所有文件
scanDir('/');

// 新建文件
// document.getElementById('add').addEventListener('click', function(event) {
//     event.preventDefault(); // 防止表单提交
//     const fileName = document.getElementById('newFileName').value;
//     fs.writeFileSync(fileName, ''); // 创建一个空文件
//     displayFile(fileName); // 在界面上显示新文件
//   });
  
//   // 删除文件
//   function deleteFile(path) {
//     fs.unlinkSync(path); // 删除文件
//     document.getElementById('fileList').removeChild(document.getElementById(path)); // 从界面上移除文件
//   }
  
// 创建文件
function createFile(fileName, content) {
    const fs = require('fs');
    fs.writeFile(fileName, content, function(err) {
    if (err) {
    console.error(err);
    return;
    }
    console.log("${fileName} created successfully.");
    });
    }
    
    // 删除文件
    function deleteFile(fileName) {
    const fs = require('fs');
    fs.unlink(fileName, function(err) {
    if (err) {
    console.error(err);
    return;
    }
    console.log("${fileName} deleted successfully.");
    });
    }
