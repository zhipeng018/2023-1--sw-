/*require('dotenv').config();

class Git {
constructor() {
const simpleGit = require('simple-git');
this.git = simpleGit();
}

async initRepo(path) {
await this.git.init(path);
}

async connectToGitHub() {
const { GITHUB_ACCESS_TOKEN } = process.env;


await this.git.addConfig('user.name', 'your-username');
await this.git.addConfig('user.email', 'your-email');
await this.git.addConfig('user.password', `${GITHUB_ACCESS_TOKEN}`);
await this.git.addConfig('credential.helper', 'store');
}
}

async function test() {
const git = new Git();
const path = './test-repo';

// 初始化本地 Git 仓库
await git.initRepo(path);

// 连接到 GitHub
await git.connectToGitHub();

console.log('Connected to GitHub!');
// 在本地仓库中创建一个文件并提交更改
const fs = require('fs');

if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
}

fs.writeFileSync(`${path}/test.txt`, 'Hello World');
await git.git.add('.');
await git.git.commit('Initial commit');

// 将本地更改推送到远程仓库
await git.git.push('origin', 'main');


// 检查远程仓库是否包含提交的更改
const remoteCommits = await git.git.log(['origin/master']);
if (remoteCommits.total === 1) {
  console.log('Connected to GitHub and successfully pushed changes!');
} else {
  console.log('Failed to push changes to GitHub!');
}

}

test();
*/