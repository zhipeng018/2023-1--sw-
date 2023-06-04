const simpleGit = require('simple-git/promise');

// Define the URL of the Git repository to operate on
const remote = 'https://github.com/SUPERHU0620/test_01.git';

// Variable to store the file path
let filePath = '';

// Clone the repository
async function clone() {
const git = simpleGit();
await git.clone(remote);
}

// Add file to Git
async function add() {
if (filePath) {
const git = simpleGit();
await git.add(filePath);
} else {
console.log('File path not set');
}
}

// Commit changes to Git
async function commit(message) {
const git = simpleGit();
await git.commit(message);
}

// Push changes to the remote Git repository
async function push() {
const git = simpleGit();
await git.push(['--force', remote, 'HEAD']);
}

// Pull the latest changes from the Git repository
async function pull() {
const git = simpleGit();
await git.pull(remote, 'HEAD', { '--allow-unrelated-histories': null });
}

// Function to set the file path
function setFilePath(path) {
filePath = path;
}

// Export the methods for use in other JavaScript files
module.exports = {
clone,
add,
commit,
push,
pull,
setFilePath,

};

