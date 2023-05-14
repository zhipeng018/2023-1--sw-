const simpleGit = require('simple-git/promise');

// 定义要操作的 Git 存储库的 URL
const remote = 'https://github.com/SUPERHU0620/test_01.git';

// 存储文件路径的变量
let filePath = '';

// 克隆存储库
async function clone() {
  const git = simpleGit();
  await git.clone(remote);
}

// 添加文件到 Git
async function add() {
  if (filePath) {
    const git = simpleGit();
    await git.add(filePath);
  } else {
    console.log('文件路径未设置');
  }
}

// 提交更改到 Git
async function commit(message) {
  const git = simpleGit();
  await git.commit(message);
}

// 推送更改到远程 Git 存储库
async function push() {
  const git = simpleGit();
  await git.push(['--force', remote, 'HEAD']);
}

// 获取 Git 存储库中的最新更改
async function pull() {
  const git = simpleGit();
  await git.pull(remote, 'HEAD', { '--allow-unrelated-histories': null });
}

// 设置文件路径的函数
function setFilePath(path) {
  filePath = path;
}

// 导出方法，以便在其他 JavaScript 文件中使用
module.exports = {
  clone,
  add,
  commit,
  push,
  pull,
  setFilePath,
};