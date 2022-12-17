function copyIt(copyOb) {
    let transfer = document.createElement('input');
    document.body.appendChild(transfer);
    transfer.value =copyOb // 这里表示想要复制的内容
    transfer.focus();
    transfer.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
    }
    transfer.blur();
    success_prompt("复制成功",1000)
    document.body.removeChild(transfer);
    document.getElementById('textBox').focus();
}
// document.getElementById('textBox').addEventListener("focus",()=>{
// copyIt(document.getElementById('textBox').value)
// })
// document.addEventListener('copy', function (e) {
			
//     e.clipboardData.setData('text/plain', "nihao");
//     e.preventDefault();
//     return false;
// });

