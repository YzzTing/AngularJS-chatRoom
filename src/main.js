import Vue from 'vue'
import App from './App'
import io from 'socket.io' (http)

/* socket */
var connectedSockets = {};
var allUsers = [{
  nickname: '',
  color: '#000'
}]; //初始值即包含"群聊",用""表示nickname
io.on('connection', function(socket) {
  socket.on('addUser', function(data) { //有新用户进入聊天室
    if (connectedSockets[data.nickname]) { //昵称已被占用
      socket.emit('userAddingResult', {
        result: false
      });
    } else {
      socket.emit('userAddingResult', {
        result: true
      });
      socket.nickname = data.nickname;
      connectedSockets[socket.nickname] = socket; //保存每个socket实例,发私信需要用
      allUsers.push(data); //推入新用户
      socket.broadcast.emit('userAdded', data); //广播欢迎新用户,除新用户外都可看到
      socket.emit('allUser', allUsers); //将所有在线用户发给新用户
    }
  });
  socket.on('addMessage', function(data) { //有用户发送新消息
    if (data.to) { //发给特定用户
      connectedSockets[data.to].emit('messageAdded', data);
    } else { //群发
      socket.broadcast.emit('messageAdded', data); //广播消息,除原发送者外都可看到
    }
  });
  socket.on('disconnect', function() { //有用户退出聊天室
    socket.broadcast.emit('userRemoved', { //广播有用户退出
      nickname: socket.nickname
    });
    for (var i = 0; i < allUsers.length; i++) {
      if (allUsers[i].nickname == socket.nickname) {
        allUsers.splice(i, 1);
        //splice() 方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。
      }
    }
    delete connectedSockets[socket.nickname]; //删除对应的socket实例
  });
});
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: {
    App
  }
})
