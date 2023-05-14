/*const git = require('./git.js');

// Call the clone function to clone the Git repository
git.clone()
  .then(() => {
    console.log('克隆存储库成功');
    // 添加文件到 Git
    return git.add('file.txt');
  })
  .then(() => {
    console.log('添加文件成功');
    // 提交更改到 Git
    return git.commit('添加文件');
  })
  .then(() => {
    console.log('提交更改成功');
    // 推送更改到远程 Git 存储库
    return git.push();
  })
  .then(() => {
    console.log('推送更改成功');
    // 拉取远程 Git 存储库的最新更改
    return git.pull();
  })
  .then(() => {
    console.log('拉取更改成功');
  })
  .catch((error) => {
    console.error(error);
  });
