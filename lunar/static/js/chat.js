const MESSAGE_TYPE = {
  USER: '사용자',
  BOT: 'BOT',
}

const createMessage = function (messageType=MESSAGE_TYPE.USER) {
  const chatMessages = document.getElementById("chat-messages");

  const newMessage = document.createElement("div");
  if (messageType === MESSAGE_TYPE.USER) {
    newMessage.classList.add("chat-message", "user-message");
  } else {
    newMessage.classList.add("chat-message", "bot-message");
  }

  const newMessageSender = document.createElement("div");

  newMessageSender.classList.add("chat-message-sender");
  newMessageSender.textContent = messageType;

  const newMessageText = document.createElement("div");
  newMessageText.classList.add("chat-message-text");
  // newMessageText.innerHTML = message.replace('\n', '<br>');

  newMessage.appendChild(newMessageSender);
  newMessage.appendChild(newMessageText);

  chatMessages.appendChild(newMessage);

  return newMessageText
}
const addMessage = function(message, messageType=MESSAGE_TYPE.USER) {
  const chatMessages = document.getElementById("chat-messages");
  const newMessageText = createMessage(messageType);
  newMessageText.innerHTML = message.replace('\n', '<br>');
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

const addStreamMessage = function (stream) {
  const chatMessages = document.getElementById("chat-messages");
  const newMessageText = createMessage(MESSAGE_TYPE.BOT);

  const reader = stream.body.getReader();
  const decoder = new TextDecoder('utf-8');

  const readStream = function() {
    reader.read().then(({done, value}) => {
      if (done) {
        // console.log('Stream End');
        return;
      }

      const text = decoder.decode(value, {stream: true});
      for (let i in text) {
        const c = text[i] === '\n' ? '<br>' : text[i]
        newMessageText.innerHTML = newMessageText.innerHTML + c;
      }
      chatMessages.scrollTop = chatMessages.scrollHeight;

      readStream();
    }).catch(error => {
      console.error('Error reading stream:', error);
    });
  };

  readStream();
};

const sendToServer = function (message) {
  fetch('/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
    },
    body: JSON.stringify({message})
  })
    .then(response => {
      addStreamMessage(response);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

document.getElementById('user-input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const message = event.target.value;
    event.target.value = '';
    event.stopPropagation();
    event.preventDefault();

    addMessage(message);
    sendToServer(message);
  }
});