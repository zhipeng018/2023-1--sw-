
const git = require('simple-git');
const path = require('path');
const {dialog} =require('electron')
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
  console.log(dialog,1111111111)
  const normalizedDirPath = path.normalize(dirPath);
  
  const { response, inputFieldValue } = await dialog.showMessageBox({
    type: 'question',
    title: 'Create Branch',
    message: 'Enter branch name:',
    buttons: ['Create', 'Cancel'],
    input: 'text',
    normalizeAccessKeys: true,
    defaultId: 0,
    cancelId: 1
  });

  if (response === 0) {
    const branchName = inputFieldValue.trim();
    
    if (branchName === '') {
      console.error('Branch name cannot be empty.');
      return;
    }

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

  const branchName = "branch" + Date.now(); // 使用当前时间戳来创建唯一的分支名
  try {
    await git(normalizedDirPath).branch([branchName]);
    console.log(`Branch '${branchName}' created successfully.`);
    const ul = document.querySelector('#fileprint');
    const li = document.createElement('li');
    //li.textContent = `Branch '${branchName}' created successfully.`;
    li.addEventListener('click', () => {
      switchBranch(dirPath, branchName);
    });
    ul.appendChild(li);
  } catch(err) {
    console.error('Failed to create branch:', err);
>>>>>>> 78dc2e4e5b550a4baf8bbb50bd8f2c465523b7e9
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
    li.addEventListener('click', () => {
      switchBranch(dirPath, branch);
    });
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




module.exports = {
  initGit,
  commitChanges,
  pushChanges,
  pullRepo,
  fetchRepo,
  getLog,
  createBranch,
  switchBranch,
  getBranches
};
