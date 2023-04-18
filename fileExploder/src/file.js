// 在文件列表中为文件和文件夹添加点击事件
const fileLinks = document.querySelectorAll('.file-list a');
fileLinks.forEach(link => {
link.addEventListener('click', event => {
event.preventDefault();
// 在此处添加文件/文件夹点击事件的处理逻辑
});
});

// 在侧边栏中为每个列表项添加一个展开/折叠图标
const sidebarLinks = document.querySelectorAll('.sidebar li a');
sidebarLinks.forEach(link => {
link.innerHTML += '<span class="expand-icon">▶</span>';
link.addEventListener('click', event => {
event.preventDefault();
// 在此处添加展开/折叠列表项的处理逻辑
});
});

