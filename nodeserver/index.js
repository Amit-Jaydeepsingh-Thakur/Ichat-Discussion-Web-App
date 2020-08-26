//This is a node server which will handle socket io connection
//This server wilol receive incoming listening

const io=require('socket.io')(8000)

const users={};

io.on('connection',socket =>{
	socket.on('new-user-joined',name=>{
		users[socket.id]=name;
		socket.broadcast.emit('user-joined',name);
	});

	socket.on('send',message=>{
		socket.broadcast.emit('receive',{message:message,name: users[socket.id]})
	});

	socket.on('disconnect',message=>{
		socket.broadcast.emit('left',users[socket.id]);
		delete users[socket.id];
	});
})
