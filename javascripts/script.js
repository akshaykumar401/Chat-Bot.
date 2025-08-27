const initialMessage = document.getElementById("initialMessage");
const chatHistory = document.getElementById("chatHistory");
const userMessage = document.getElementById("userMessage");
const sendUserMessage = document.getElementById("sendUserMessage");

// Activate Server...
const ActivateServer = async () => {
  const response = await fetch('https://chat-bot-backend-q9a8.onrender.com/start')
}
ActivateServer();

// Scroll to Bottom Function....
const scrollToBottom = () => {
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

// create user message element...
const userMessageElement = () => {
  const userMessageElement = document.createElement("div");
  userMessageElement.classList.add("user");
  userMessageElement.innerHTML = `
    <pre>${marked.parse(userMessage.value)}</pre>
  `;
  chatHistory.appendChild(userMessageElement);
  scrollToBottom();
};

// create bot message element...
const botMessageElement = async () => {
  const response = await fetch('https://chat-bot-backend-q9a8.onrender.com/chat-bot/request/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userMessage: userMessage.value,
    }),
  })
  const data = await response.json();

  if ( data ) {
    const botMessageElement = document.createElement("div");
    botMessageElement.classList.add("bot");
  
    if ( data.status === 200 ) {
      botMessageElement.innerHTML =  `
        <pre>${marked.parse(data.data.response)}</pre>
      `;
    } else {
      botMessageElement.innerHTML = `
        <pre>${marked.parse(data.message)}</pre>
      `;
    }
    
    chatHistory.appendChild(botMessageElement);
    scrollToBottom();
  }

};

// Handling Enter Key Press...
document.addEventListener("DOMContentLoaded", () => {
    userMessage.addEventListener("keypress", async (event) => {
    if (event.key !== "Enter") return;
    if (userMessage.value === "") return;
    if (sendUserMessage.disabled) return;

    // sendUserMessage manuplating...
    sendUserMessage.disabled = true;
    sendUserMessage.innerText = "Loading";

    userMessageElement();
    botMessageElement();

    // Making Default Setting....
    sendUserMessage.innerText = "Send";
    sendUserMessage.disabled = false;
    userMessage.value = "";
  });
});


// Adding Message in chat history when user click the send Button...
sendUserMessage.addEventListener("click", async () => {
  if (userMessage.value === "") return;

  // sendUserMessage manuplating...
  sendUserMessage.disabled = true;
  sendUserMessage.innerText = "Loading";

  userMessageElement();
  botMessageElement();

  // Making Default Setting...
  sendUserMessage.innerText = "Send";
  sendUserMessage.disabled = false;
  userMessage.value = "";
});



