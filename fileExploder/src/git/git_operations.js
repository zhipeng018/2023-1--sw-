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
/// 创建分支
async function createBranch(dirPath) {
  const normalizedDirPath = path.normalize(dirPath);
  const branchName = "branch" + Date.now(); // 使用当前时间戳来创建唯一的分支名
  try {
    await git(normalizedDirPath).branch([branchName]);
    console.log(`Branch '${branchName}' created successfully.`);
    const ul = document.querySelector('.fileprint');
    const li = document.createElement('li');
    li.textContent = `Branch '${branchName}' created successfully.`;
    li.addEventListener('click', () => {
      switchBranch(dirPath, branchName);
    });
    ul.appendChild(li);
  } catch(err) {
    console.error('Failed to create branch:', err);
  }
}

async function getBranches(dirPath) {
  const normalizedDirPath = path.normalize(dirPath);
  const branches = await git(normalizedDirPath).branch();
  const ul = document.querySelector('#fileprint');
  ul.innerHTML = ''; // 清空之前的内容
  branches.all.forEach((branch) => {
    const li = document.createElement('li');
    li.textContent = branch;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteBranch(dirPath, branch);
    });

    const checkoutButton = document.createElement('button');
    checkoutButton.textContent = 'Checkout';
    checkoutButton.addEventListener('click', () => {
      switchBranch(dirPath, branch);
    });

    li.appendChild(checkoutButton);
    li.appendChild(deleteButton);
    ul.appendChild(li);
  });
}


async function switchBranch(dirPath, branchName) {
  const normalizedDirPath = path.normalize(dirPath);
  const isRepo = await git(normalizedDirPath).checkIsRepo();
  if (!isRepo) {
    alert('The current directory is not a Git repository.');
  } else {
    git(normalizedDirPath)
      .checkout(branchName)
      .then(() => {
        console.log(`Switched to branch '${branchName}' successfully.`);
        const ul = document.querySelector('#fileprint');
        const li = document.createElement('li');
        //li.textContent = `Switched to branch '${branchName}' successfully.`;
        //ul.appendChild(li);
      })
      .catch((err) => console.error('Failed to switch branch:', err));
  }
}
//删除分支
async function deleteBranch(dirPath, branchName) {
  const normalizedDirPath = path.normalize(dirPath);
  try {
    const currentBranch = (await git(normalizedDirPath).branch()).current;
    if (currentBranch === branchName) {
      alert("You can't delete the current branch. Please switch to another branch first.");
      return;
    }
    if (branchName === 'main' || branchName === 'master') {
      alert("You can't delete the main/master branch.");
      return;
    }
    await git(normalizedDirPath).branch(['-d', branchName]);
    console.log(`Branch '${branchName}' deleted successfully.`);
  } catch(err) {
    console.error('Failed to delete branch:', err);
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
  switchBranch,
  getBranches,
  deleteBranch
};

