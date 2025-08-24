const initialMessage = document.getElementById("initialMessage");
const chatHistory = document.getElementById("chatHistory");
const userMessage = document.getElementById("userMessage");
const sendUserMessage = document.getElementById("sendUserMessage");

// create user message element...
const userMessageElement = () => {
  const userMessageElement = document.createElement("div");
  userMessageElement.classList.add("user");
  userMessageElement.innerHTML = `
    <p>${userMessage.value}</p>
  `;
  return userMessageElement;
};

// create bot message element...
const botMessageElement = async () => {
  const response = await fetch('https://chat-bot-backend-ruby.vercel.app/chat-bot/request/', {
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
        <p>${data.data.response}</p>
      `;
    } else {
      botMessageElement.innerHTML = `
        <p>${data.message}</p>
      `;
    }
    
    return botMessageElement;
  }

};

// Adding Message in chat history when user click the send Button...
sendUserMessage.addEventListener("click", async () => {
  if (userMessage.value === "") return;

  // sendUserMessage manuplating...
  sendUserMessage.disabled = true;
  sendUserMessage.innerText = "Loading";

  chatHistory.appendChild(userMessageElement());
  const botElement = await botMessageElement();
  if (botElement) chatHistory.appendChild(botElement);

  // Making Default Setting...
  sendUserMessage.innerText = "Send";
  userMessage.value = "";
});

userMessage.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    // sendUserMessage manuplating...
    sendUserMessage.disabled = true;
    sendUserMessage.innerText = "Loading";

    chatHistory.appendChild(userMessageElement());
    const botElement = await botMessageElement();
    if (botElement) chatHistory.appendChild(botElement);

    // Making Default Setting....
    sendUserMessage.innerText = "Send";
    userMessage.value = "";
  }
});