const express = require('express')
const multer = require('multer')
const fs = require('fs')
const cors = require('cors');
const getIp=require('./API/IP');
const getPort=require('./API/Port')
const getcpolarURL=require('./API/cpolarURL')

var ip=getIp
var port=getPort
var cpolarURL=getcpolarURL

console.log(port);
console.log(ip);
console.log(cpolarURL);
// const moment = require('moment')
// console.log(getIp);
var app = express()
app.use(cors());
app.use(express.urlencoded({extended:false}))
// app.use(helmet())
var upload = multer({ 
    dest: './uploadFiles/' ,
    fileFilter(req, file, callback) {
    // 解决中文名乱码的问题
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    callback(null, true);
  },
}).array("file",20)


// 基于express框架的node服务器

// app.use('/', function (req, res) {
//     var fileName = "./client/index.html";
//     fs.readFile(fileName, function (err, data) {
//         if (err)
//             console.log("对不起，您所访问的路径出错");
//         else {
//             res.write(data);
//         }
//     })
// app.use(express.static('./client'))    
// })

// 允许所有类型的文件传递过来
// app.use(upload.any())

app.post('/file', upload.any(), function (req, res) {

    var originalname = req.files[0].originalname
    var extendName = originalname.slice(originalname.lastIndexOf('.'))
    var fileName = originalname.slice(0, originalname.lastIndexOf('.'))
    var newNameDay = `uploadFiles\\${originalname}`
    // console.log(extendName)
    // console.log(fileName);
    // console.log( originalname);s
    // console.log(req.files[0].originalname);
    // console.log(req.files[0].path);
    // console.log(newName);
    // console.log(req.files[0]);
    fs.exists(`uploadFiles\\${originalname}`, (exists) => {
        if (exists) {
            fs.rename(req.files[0].path, newNameDay, function (err) {
                if (err) {
                    res.send('失败！')
                } else {
                    res.send(`{status:2}`)
                }
            })
        }
        else {
            fs.rename(req.files[0].path, newNameDay, function (err) {
                if (err) {
                    res.send('失败！')
                } else {
                    res.send('{status:1}')
                }
            })
        }
    })


})
app.post('/fileInfo', function (req, res) {
    // var fileNames=fs.readdir('./uploadFiles')
    // console.log(fileNames);
    fs.readdir('./uploadFiles', (err, files) => {
        if (err) {
            return err
        }
        else {
            // console.log(files);
            
            var i=0
            var filesLength=files.length
            // console.log(filesLength);
            res.send(files)
        }
    })

})
app.get('/getIp',function(req,res){
    res.send(getIp)
})
app.get('/getPort',function(req,res){
    res.send(`${port}`)
})
app.get('/getcpolarURL',function(req,res){
    res.send(`${cpolarURL}`)
})

app.get('/getText', (req, res) => {

    let str;
    filePath = "./textArea.txt"
    fs.readFile(filePath, { encoding: "utf-8" }, function (err, fr) {
        //readFile回调函数
        if (err) {
            console.log(err);
        } else {
            str = fr;
            res.send(`${str}`)
        }
    });

})
app.post('/changeText',(req,res)=>{
    let changeText = req.body
    fs.writeFile('./textArea.txt',changeText.input,(err)=>{
        if(err){
            return err
        }
        else{
            res.send('保存成功')
        }
    })
    
})

app.use(express.static('client'))
app.use(express.static('uploadFiles'))
// 监听端口


app.listen(port, function () {
    console.log(`${port} 文件系统服务启动中~~`)
});

