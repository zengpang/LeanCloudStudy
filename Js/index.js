//初始化
AV.init(
    {
        appId:"txADom1VtiCCJkIKjhX7kOtQ-gzGzoHsz",
        appKey:"hjUu1qmtdcCDiuXVjpTls9Qs",
        serverURLs:"https://txadom1v.lc-cn-n1-shared.com"
    }
)
//获取上传组件
var avatarUpload=document.getElementById(`avatar-upload`);
//组件上传文件触发事件
avatarUpload.onchange=function(){
    
    console.log(`加载了文件`);
    //输出文件信息
    console.log(this.files);
    let localFile=this.files[0];
    //avatar.jpg是上传文件的名称,localFile是上传文件
    let avFile=new AV.File(`avatar.jpg`,localFile);
    avFile.save().then(file=>{
        //上传成功触发
        console.log(`文件上传成功`);
        console.log(file);
    }).catch(err=>console.log(err));

}
