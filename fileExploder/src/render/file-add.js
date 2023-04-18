

// 不知道为什么 mac运行不了这段代码
const btn = this.document.querySelector('#btn')
const { BrowserWindow } = require('@electron/remote')

window.onload = function(){
    btn.onclick = ()=>{
        //button 事件
        const folderName = prompt('请输入文件夹名称：');
        if (folderName !== null && folderName !== '') {
           const folder = new Blob([], { type: 'application/octet-stream' });
           const folderUrl = URL.createObjectURL(folder);
           const downloadLink = document.createElement('a');
           downloadLink.href = folderUrl;
           downloadLink.download = `${folderName}.folder`;
           downloadLink.style.display = 'none'; // 隐藏链接
           document.body.appendChild(downloadLink); // 将链接插入到文档中
           downloadLink.click();
           URL.revokeObjectURL(folderUrl); // 释放URL对象
           document.body.removeChild(downloadLink); // 从文档中删除链接
        }
    }
}
window.addEventListener('contextmenu',function(){
    alert(111)
})