var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);//新建一个socket服务
//默认连接部署网站的服务器
app.use(express.static(__dirname + '/public'));
//指明静态文件的路径

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

var connectedSockets={};//用户组
var allUsers=[{nickname:"",color:"#000"}];//初始值即包含"群聊",用""表示nickname
io.on('connection',function(socket){
 socket.on('addUser',function(data){ //有新用户进入聊天室
        if(connectedSockets[data.nickname]){//昵称已被占用
          socket.emit('userAddingResult',{result:false});
        }else{
            socket.emit('userAddingResult',{result:true});
            socket.nickname=data.nickname;
            connectedSockets[socket.nickname]=socket;//保存每个socket实例,发私信需要用
            allUsers.push(data);//推入新用户
            socket.broadcast.emit('userAdded',data);//广播欢迎新用户,除新用户外都可看到
            socket.emit('allUser',allUsers);//将所有在线用户发给新用户
        }
    });
/**
 * socket.emit()：信息传输对象为当前 socket 对应的 client，可看做一对一；
 * socket.broadcast.emit()：信息传输对象为所有的 client，排除当前 socket 对应的 client；
 * sockets.emit()：信息传输对象为所有的 client。
 */

    socket.on('addMessage',function(data){ //有用户发送新消息
        if(data.to){//发给特定用户
            connectedSockets[data.to].emit('messageAdded',data);
        }else{//群发
            socket.broadcast.emit('messageAdded',data);//广播消息,除原发送者外都可看到
        }


    });



    socket.on('disconnect', function () {  //有用户退出聊天室
            socket.broadcast.emit('userRemoved', {  //广播有用户退出
                nickname: socket.nickname
            });
            for(var i=0;i<allUsers.length;i++){
                if(allUsers[i].nickname==socket.nickname){
                    allUsers.splice(i,1);
                    //splice() 方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。
                }
            }
            delete connectedSockets[socket.nickname]; //删除对应的socket实例

        }
    );
});

http.listen(3000, function () {
    console.log('GO!');
});
