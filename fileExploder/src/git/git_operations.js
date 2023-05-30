const git = require('simple-git');
const path = require('path');

function initGit(dirPath) {
  const normalizedDirPath = path.normalize(dirPath);
  console.log(`Attempting to initialize a repository at: ${normalizedDirPath}`);
  git(normalizedDirPath).init()
    .then(() => console.log('Repository initialized successfully.'))
    .catch((err) => console.error('Failed to initialize repository:', err));
}

document.getElementById('git').addEventListener('click', function() {
  const currentPath = document.getElementById('currentPath').textContent;
  const normalizedCurrentPath = path.normalize(currentPath);
  initGit(normalizedCurrentPath);
});
  
module.exports = {
  initGit
};
