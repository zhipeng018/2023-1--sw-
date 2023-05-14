const git = require('./git.js');

// Call the clone function to clone the Git repository
git.clone()
.then(() => {
console.log('Repository cloned successfully');
// Add file to Git
return git.add('file.txt');
})
.then(() => {
console.log('File added successfully');
// Commit changes to Git
return git.commit('Add file');
})
.then(() => {
console.log('Changes committed successfully');
// Push changes to remote Git repository
return git.push();
})
.then(() => {
console.log('Changes pushed successfully');
// Pull the latest changes from the remote Git repository
return git.pull();
})
.then(() => {
console.log('Changes pulled successfully');
})
.catch((error) => {
console.error(error);
});
