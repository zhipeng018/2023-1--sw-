require('dotenv').config();

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
}

test();