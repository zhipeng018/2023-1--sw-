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
  const normalizedDirPath = path.normalize(dirPath);
  console.log(`Adding and committing changes in: ${normalizedDirPath}`);
  git(normalizedDirPath)
    .add('.')
    .then(() => git(normalizedDirPath).commit(message))
    .then(() => console.log('Changes added and committed successfully.'))
    .catch((err) => console.error('Failed to add and commit changes:', err));
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

document.getElementById('git').addEventListener('click', function() {
  const normalizedCurrentPath = getCurrentPath();
  initGit(normalizedCurrentPath);
});

document.getElementById('commit').addEventListener('click', function() {
  const normalizedCurrentPath = getCurrentPath();
  const commitMessage = "Commit message"; // TODO: 获取真实的提交信息
  commitChanges(normalizedCurrentPath, commitMessage);
});

document.getElementById('push').addEventListener('click', function() {
  const normalizedCurrentPath = getCurrentPath();
  pushChanges(normalizedCurrentPath);
});

document.getElementById('pull').addEventListener('click', function() {
  const normalizedCurrentPath = getCurrentPath();
  pullRepo(normalizedCurrentPath);
});

document.getElementById('fetch').addEventListener('click', function() {
  const normalizedCurrentPath = getCurrentPath();
  fetchRepo(normalizedCurrentPath);
});

  
module.exports = {
  initGit,
  commitChanges,
  pushChanges,
  pullRepo,
  fetchRepo
};
