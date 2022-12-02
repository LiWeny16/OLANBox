// main.js
// Modules to control application life and create native browser window
const {  Menu,app, BrowserWindow } = require('electron')
const path = require('path')
// ################################################################################
Menu.setApplicationMenu(null)
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
var app_express = express()
let filePath_All = path.join(__dirname,'/uploadFiles/')
app_express.use(cors());
app_express.use(express.urlencoded({extended:false}))
// app.use(helmet())
var upload = multer({ dest: filePath_All ,
fileFilter(req, file, callback) {
    // 解决中文名乱码的问题
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    callback(null, true);
  },

})


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

app_express.post('/file', upload.any(), function (req, res) {

    let filePath = path.join(__dirname,'/uploadFiles')
    var originalname = req.files[0].originalname
    var extendName = originalname.slice(originalname.lastIndexOf('.'))
    var fileName = originalname.slice(0, originalname.lastIndexOf('.'))
    var newName = `${filePath}/${originalname}`
    // console.log(extendName)
    // console.log(fileName);
    // console.log( originalname);s
    // console.log(req.files[0].originalname);
    console.log(req.files[0].path);
    // console.log(newName);
    // console.log(req.files[0]);
    fs.exists(`${filePath}/${originalname}`, (exists) => {
        if (exists) {
            fs.rename(req.files[0].path, newName, function (err) {
                if (err) {
                    res.send('失败！')
                } else {
                    res.send(`{"status":1}`)
                }
            })
        }
        else {
            fs.rename(req.files[0].path, newName, function (err) {
                if (err) {
                    res.send('失败！')
                } else {
                    res.send(`{"status":0}`)
                }
            })
        }
    })


})
app_express.post('/fileInfo', function (req, res) {
    // var fileNames=fs.readdir('./uploadFiles')
    // console.log(fileNames);
    let filePath = path.join(__dirname,'/uploadFiles')
    fs.readdir(filePath, (err, files) => {
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
app_express.get('/getIp',function(req,res){
    res.send(getIp)
})
app_express.get('/getPort',function(req,res){
    res.send(`${port}`)
})
app_express.get('/getcpolarURL',function(req,res){
    res.send(`${cpolarURL}`)
})

app_express.get('/getText', (req, res) => {

    let str;
    let filePath = path.join(__dirname,'/textArea.txt')
    console.log(filePath);
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
app_express.post('/changeText',(req,res)=>{
    let changeText = req.body
    filePath = path.join(__dirname,'/textArea.txt')
    fs.writeFile(filePath,changeText.input,(err)=>{
        if(err){
            return err
        }
        else{
            res.send('保存成功')
        }
    })
    
})

app_express.use(express.static(path.join(__dirname,'/client')))
app_express.use(express.static(path.join(__dirname,'/uploadFiles')))
// 监听端口


app_express.listen(port, function () {
    console.log(`${port} 文件系统服务启动中~~`)
});





// ################################################################################


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 526,
    // frame:false,
    icon:path.join(__dirname,"/favicon.ico"),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration:true,
      contextIsolation: false
      
    }
  })

  // 加载 index.html
  mainWindow.loadFile('./mainIndex.html')

  // 打开开发工具
  // mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})





// Object



// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. 也可以拆分成几个文件，然后用 require 导入。