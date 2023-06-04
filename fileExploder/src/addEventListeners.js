const gitOperations = require('./git/git_operations.js');
const prompt = require('electron-prompt');

//获取当前路径
function getCurrentPath() {
  const currentPath = document.getElementById('currentPath').textContent;
  return path.normalize(currentPath);
}

document.getElementById('git').addEventListener('click', function() {
  const normalizedCurrentPath = getCurrentPath();
  gitOperations.initGit(normalizedCurrentPath);
});

document.getElementById('commit').addEventListener('click', async function() {
  const normalizedCurrentPath = getCurrentPath();
  const commitMessage = await prompt({
      title: 'Commit Message',
      label: 'Enter your commit message:',
      value: 'Default commit message',
      inputAttrs: {
          type: 'text'
      },
      type: 'input'
  });
  
  if(commitMessage !== null) {  // 用户点击了取消按钮，commitMessage 会是 null
      gitOperations.commitChanges(normalizedCurrentPath, commitMessage);
  }
});

document.getElementById('push').addEventListener('click', function() {
  const normalizedCurrentPath = getCurrentPath();
  gitOperations.pushChanges(normalizedCurrentPath);
});

document.getElementById('pull').addEventListener('click', function() {
  const normalizedCurrentPath = getCurrentPath();
  gitOperations.pullRepo(normalizedCurrentPath);
});

document.getElementById('fetch').addEventListener('click', function() {
  const normalizedCurrentPath = getCurrentPath();
  gitOperations.fetchRepo(normalizedCurrentPath);
});
