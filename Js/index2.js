AV.init({
    appId:"txADom1VtiCCJkIKjhX7kOtQ-gzGzoHsz",
    appKey:"hjUu1qmtdcCDiuXVjpTls9Qs",
    serverURLs:"https://txadom1v.lc-cn-n1-shared.com"
});
const $=s=>document.querySelector(s);
$(`#avatar-upload`).onchange =function(){
    console.log(`触发`);
    if(this.files.length>0)
    {
        //获取上传文件
        let localFile=this.files[0];
        console.log(localFile);
        //判断上传文件大小
        if(localFile.size/1048576>2)
        {
            alert(`文件不能超过2M`);
            return;
        }
        insertImageBefore();
        let avFile=new AV.File(encodeURI(localFile.name),localFile);
        avFile.save({
            keepFileName:true,
            onprogress(progress){
                console.log(progress.percent);
                insertImageBefore(progress.percent);
            }
        }).then(file=>{
            console.log(`文件保存完成`);
            console.log(file);
            insertImageAfter(file.attributes.url+``)
        })
    }
}
//文本框用户在输入位置或用户选中位置插入上传进度提示
function insertImageBefore(percent=0)
{
    //获取组件
    let $textarea=$(`textarea`);
    //用户选中文本的首个字母位置
    let start=$textarea.selectionStart;
    //用户选中文本的末尾字母位置
    let end=$textarea.selectionEnd;
    //$textarea组件未插入提示之前的文本
    let oldText=$textarea.value;
    let insertText=`![上传中，进度${percent}%]()`;
    $textarea.value=`${oldText.substring(0,start)}${insertText} ${oldText.substring(end)}`;
    //$textarea组件聚焦
    $textarea.focus();
    //$textarea光标选中之前用户选中文本的首个字母位置，与
    $textarea.setSelectionRange(start,start+insertText.length);
}
//文本框用户在输入位置或用户选中位置插入上传完成提示
function insertImageAfter(url,name="")
{
    //获取组件
    let $textarea=$(`textarea`);
    //用户选中文本的首个字母位置
    let start=$textarea.selectionStart;
    //用户选中文本的末尾字母位置
    let end=$textarea.selectionEnd;
    let oldText=$textarea.value;

    let insertText=`![${name}](${url})`;
    $textarea.value=`${oldText.substring(0,start)}${insertText}${oldText.substring(end)}`;
    $textarea.focus();
    $textarea.setSelectionRange(start,start+insertText.length);
}