const git = require('simple-git');
const path = require('path');

//当前路径
function getCurrentPath() {
  const currentPath = document.getElementById('currentPath').textContent;
  return path.normalize(currentPath);
}

// init button
function initGit(dirPath) {
  const normalizedDirPath = path.normalize(dirPath);
  console.log(`Attempting to initialize a repository at: ${normalizedDirPath}`);
  git(normalizedDirPath).init()
    .then(() => console.log('Repository initialized successfully.'))
    .catch((err) => console.error('Failed to initialize repository:', err));
}


// commit 按钮脚本
function commitChanges(dirPath, message) {
  if (message !== null) {
    const normalizedDirPath = path.normalize(dirPath);
    console.log(`Adding and committing changes in: ${normalizedDirPath}`);
    git(normalizedDirPath)
      .add('.')
      .then(() => git(normalizedDirPath).commit(message))
      .then(() => console.log('Changes added and committed successfully.'))
      .catch((err) => console.error('Failed to add and commit changes:', err));
  }
}

// push 按钮脚本
function pushChanges(dirPath) {
  const normalizedDirPath = path.normalize(dirPath);
  console.log(`Pushing changes from: ${normalizedDirPath}`);
  git(normalizedDirPath).push('origin', 'master')
    .then(() => console.log('Changes pushed successfully.'))
    .catch((err) => console.error('Failed to push changes:', err));
}

//pull 按钮脚本
function pullRepo(dirPath) {
  const normalizedDirPath = path.normalize(dirPath);
  console.log(`Pulling changes from: ${normalizedDirPath}`);
  git(normalizedDirPath).pull()
    .then(() => console.log('Changes pulled successfully.'))
    .catch((err) => console.error('Failed to pull changes:', err));
}

//fetch 按钮脚本
function fetchRepo(dirPath) {
  const normalizedDirPath = path.normalize(dirPath);
  console.log(`Fetching changes from: ${normalizedDirPath}`);
  git(normalizedDirPath).fetch()
    .then(() => console.log('Changes fetched successfully.'))
    .catch((err) => console.error('Failed to fetch changes:', err));
}
//log 按钮脚本
function getLog(dirPath) {
  const normalizedDirPath = path.normalize(dirPath);
  return git(normalizedDirPath).log();
}
// 创建分支
let branchCounter = 0;
function createBranch(dirPath) {
  branchCounter++;
  const branchName = "branch" + branchCounter;
  const normalizedDirPath = path.normalize(dirPath);
  git(normalizedDirPath).branch([branchName])
      .then(() => console.log(`Branch '${branchName}' created successfully.`))
      .catch((err) => console.error('Failed to create branch:', err));
}

// 切换分支
async function getBranches(dirPath) {
  const normalizedDirPath = path.normalize(dirPath);
  return git(normalizedDirPath).branch();
}

async function switchBranch(dirPath, branchName) {
  const normalizedDirPath = path.normalize(dirPath);
  const isRepo = await git(normalizedDirPath).checkIsRepo();
  if (!isRepo) {
      alert('The current directory is not a Git repository.');
  } else {
      git(normalizedDirPath).checkout(branchName)
          .then(() => console.log(`Switched to branch '${branchName}' successfully.`))
          .catch((err) => console.error('Failed to switch branch:', err));
  }
}


module.exports = {
  initGit,
  commitChanges,
  pushChanges,
  pullRepo,
  fetchRepo,
  getLog,
  createBranch,
  switchBranch
};
