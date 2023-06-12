# 2023_OSS_project_1
This is for the Open Source SW Project class

**9조 **

- 강쿤(20215#67)
- 왕지봉(20191#06)
- 호초(20196#10)



## ***This project provides a convenient way to upload computer files to a remote repository on Github.***

- **This project is an original creation with great potential for improvement.**
- **The application's functionality is not yet perfect, so it is important to carefully review the relevant information and logs when learning.**

This desktop application was developed based on Electron. Due to the use of JavaScript on the backend, some areas may have slower processing speeds. For more detailed information about Electron, please refer to the official website: https://www.electronjs.org

### *Features:*

- Traverse all folders and files on the computer and output them
- Upload selected files to a remote Git repository
- View version control
- Login to your Github account
- Delete branch
- Create branch
- checkout branch
- Show commit log
- Return to the previous path

### about API：The Github native API is used to obtain authentication and is primarily used for logging into Github accounts.
Detailed documentation: github API（https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api?apiVersion=2022-11-28&tool=cli）

### About OAuth: To obtain user computer permissions and enable file managers to work on any computer, we have registered an OAuth application.
Detailed documentation: https://docs.github.com/zh/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app

### Supported systems: 
- Windows OS 
- Linux (to be updated)
- Mac OS 

### Download method: 
We have packaged the project, go to the fileExploder/dist, to find /fileexploder Setup 1.0.0 .exe to download.

And you also can run the project by source code.


### NOTE ###

- if you want to download the app, it's just a demo app so the test repository was decided, not yours. So the file when you commit you can't find on your own repository

- if you want to run this project by the source code, you can change the repository in the /src/git/git.js. And with the different browser the resource maybe will lose, so you can change the img path to show the resource.


### Bug Log ###

We are not good at to build the application but we will fix the bug try our best.

- back button can't run on Windows Os(fix)
- resource lose(fix)
- View version control can't show on the GUI(fix)







