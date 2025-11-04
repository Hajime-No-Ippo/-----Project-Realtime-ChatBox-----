// Replace the localhost URL with your deployed backend URL:
const SERVER_URL = process.env.SERVER_URL || "'https://grateful-francene-maynoothuniversity-7d5783cc.koyeb.app'";

// If you’re not using build-time env vars, you can just hard-code for now:
const socket = io(SERVER_URL, {
  withCredentials: true
});

 const messageContainer = document.getElementById('message-container')
 const messageForm = document.getElementById('send-container')
 const messageInput = document.getElementById('message-input')


const name = prompt("What's your name?")
    appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`, 'incoming')
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`, 'incoming')
})

socket.on('user-disconnected', name => {
    console.log('user-disconnected event received:', name)
    appendMessage(`${name || 'A user'} disconnected`, 'incoming')
})

 messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`, 'outgoing')
    socket.emit('send-chat-message', message) 
    messageInput.value = ''
})

function appendMessage(message, type = 'incoming'){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add('message');
    messageElement.classList.add(type);  // 'incoming' or 'outgoing'
    messageContainer.append(messageElement)

    requestAnimationFrame(() => {
    messageElement.classList.add('show');
  });
}