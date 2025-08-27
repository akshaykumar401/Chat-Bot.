const chatHistory = document.getElementById("chatHistory");
const sendUserMessage = document.getElementById("sendUserMessage");
const userMessage = document.getElementById("userMessage");

// Basics Animation Function....
const basicAnimation = () => {
  let tl = gsap.timeline();

  tl.to("body", {
    opacity: 1,
    duration: 0.2,
  });
  tl.from("header, header h1", {
    y: -50,
    opacity: 0,
    stagger: 0.3,
    duration: 0.4,
  });
  tl.from("#initialMessage, #inputContainer", {
    y: -200,
    opacity: 0,
    stagger: 0.3,
    duration: 0.6,
  });
  tl.from("footer, footer p", {
    y: 50,
    opacity: 0,
    stagger: 0.3,
    duration: 0.4,
  });
};

// State Change Animation Methode
const changeInputPosition = () => {
  let changeInputPositionTl = gsap.timeline();

  changeInputPositionTl.to("#initialMessage", {
    y: 50,
    opacity: 0,
    duration: 0.2,
    display: "none",
  });
  changeInputPositionTl.from(
    "#inputContainer",
    {
      y: -270,
      duration: 1,
    },
    "-=0.5"
  );
  changeInputPositionTl.from("#chatHistory", {
    display: "flex",
    opacity: 1,
    y: -200,
  });
  changeInputPositionTl.from(
    "#chatHistory",
    {
      display: "flex",
    },
    "-=0.5"
  );
};


// Handling Animation when user Press Enter
userMessage.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    // checking is chatHistory has any Childern...
    if (chatHistory.children.length === 0) {
      changeInputPosition();
    }
  }
});

// Animation when user Intract with Chat Bot...
sendUserMessage.addEventListener("click", () => {
  // checking is chatHistory has any Childern...
  if (chatHistory.children.length === 0) {
    changeInputPosition();
  }
});

basicAnimation();
