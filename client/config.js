
var Ip=0
var Port=0
var cpolarURL=0
var textArea="啥也没有写"
var locationURL = window.location.href
$.ajax({
    url: `/getIp`,
    type: "get",
    async: false,
    success: function (result) {
       Ip=result
    }
})
$.ajax({
    url: `/getPort`,
    type: "get",
    dataType: "text",
    async:false,
    success: 
    function (result) {
        Port = result
    }
});
$.ajax({
    url: `/getcpolarURL`,
    type: "get",
    dataType: "text",
    async:false,
    success: 
    function (result) {
        cpolarURL = result
    },
    error:
    function(err){
        console.log(err);
    }
});
$.ajax({
    url: `/getText`,
    type: "get",
    dataType: "text",
    async:false,
    success: 
    function (result) {
        textArea = result
    },
    error:
    function(err){
        console.log(err);
    }
});
var localURL=`http://${Ip}:${Port}`
console.log(`Ip:${Ip}`);
console.log(`Port:${Port}`);
console.log(`cpolarURL:${cpolarURL}`);
console.log(`localURL:${localURL}`);
console.log(`text:${textArea}`);
