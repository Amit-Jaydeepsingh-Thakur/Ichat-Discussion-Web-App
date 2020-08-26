const socket=io('http://localhost:8000')

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");
//var audio=Audio('message.mp3');

const append=(message,position)=>{
	const messageElement=document.createElement('div');
	messageElement.innerText=message;
	messageElement.classList.add('message');
	messageElement.classList.add(position);
	messageContainer.append(messageElement);
	
}

form.addEventListener('submit',(e)=>{
	e.preventDefault();
	const message=messageInput.value;
	append(`You: ${message}`,'right');
	socket.emit('send',message);
	messageInput.value='';
})

const name=prompt("Enter Your Name to Join");
socket.emit('new-user-joined',name)

//Info About the Joining the chat
socket.on('user-joined',name=>{
	append(`${name} joined the chat`,'right');

})


//Message Joining Notification
socket.on('receive',data=>{
	append(`${data.name}:    ${data.message}`,'left');

})


//Disconnection Broadcast
socket.on('left',name=>{
	append(`${name} left the chat`,'left');

})
