const path = require('path');
const express = require("express");
const app = express();
const http  = require('http').createServer(app);
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

let ejs = require('ejs');

const urlencodedParser = bodyParser.urlencoded({ extended: false })
const io = require('socket.io')(http);

app.use(urlencodedParser);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
var roomList = [];


const PORT = 3000 || process.env.PORT;

http.listen(PORT, () => console.log("Server is running on port 3000"));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/chat.html');
})

app.post('/', function (req, res) {
  console.log(req);
    res.sendFile(__dirname + '/index.html');
})

app.get('/index', function (req, res) {
  res.render('index');
})
app.post('/index', function (req, res) {
console.log(req.body.user);
  res.render('index', {Username: req.body.user});

})

io.on('connection', socket => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
    console.log(socket.rooms);
  //  console.log(socket.client);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('chat message', "User has disconnected");
  });
  socket.on('joinRoom', ({username, room}) => {
    username =
  const user = userJoin(socket.id, username, room);
  console.log("It is working ig .. ");
  socket.broadcast
      .to(user.room)
      .emit(
        'message',
         `${user.username} has joined the chat`
      );

});
});
app.post('/index', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
