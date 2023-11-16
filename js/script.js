/* //esperamos que se cree todo el dom
document.addEventListener("DOMContentLoaded", function () {
  //traemos por sus id a los botones y inputs
  const chatMessages = document.getElementById("chat-messages");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");

  //JSON para almacenar preguntas y respuestas que no aparece en el knowledge_base.json
  let knowledgeBase = {};

  //cargamos el conocimiento base desde el archivo JSON externo al cargar la página
  fetch("knowledge_base.json")
    .then((response) => response.json())
    .then((data) => {
      knowledgeBase = data.preguntas.reduce((acc, { texto, respuesta }) => {
        acc[texto] = respuesta;
        return acc;
      }, {});
    })
    .catch((error) => {
      console.error("Error al cargar knowledge_base.json", error);
    });

  //funcion para agregar mensajes al chat
  function addMessage(sender, message) {
    const msgElement = document.createElement("div");
    msgElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(msgElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar hacia abajo automáticamente
  }

  //funcion para procesar la entrada del usuario
  function processUserInput() {
    const userMessage = userInput.value.trim();
    if (userMessage === "") return;

    addMessage("Usuario", userMessage);
    userInput.value = "";

    //logica del chatbot para obtener respuesta del json knowledge_base
    const botResponse = getBotResponse(userMessage);
    addMessage("Bot", botResponse);
  }

  //logica del chatbot (obtener respuesta del conocimiento base)
  function getBotResponse(userInput) {
    //verificar si la pregunta ya está en el conocimiento base
    if (knowledgeBase.hasOwnProperty(userInput)) {
      return `Bot: ${knowledgeBase[userInput]}`;
    } else {
      //si la pregunta no está en el conocimiento base, puedes implementar tu lógica de respuesta aquí
      const newAnswer = prompt(
        "No sé la respuesta. Por favor, ingresa una respuesta:"
      );
      knowledgeBase[userInput] = newAnswer;

      //guardar el conocimiento base actualizado en el localStorage (puedes cambiar esto según tus necesidades)
      localStorage.setItem("knowledgeBase", JSON.stringify(knowledgeBase));

      return `Bot: Gracias por enseñarme. Ahora sé que ${userInput} es ${newAnswer}`;
    }
  }

  //cargar el conocimiento base desde el localStorage al cargar la página
  const storedKnowledgeBase = localStorage.getItem("knowledgeBase");
  if (storedKnowledgeBase) {
    knowledgeBase = JSON.parse(storedKnowledgeBase);
  }

  //botón de enviar
  sendButton.addEventListener("click", processUserInput);

  //tecla Enter en el campo de entrada del usuario
  userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      processUserInput();
    }
  });
});

 */

document.addEventListener("DOMContentLoaded", function () {
  const chatMessages = document.getElementById("chat-messages");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");

  let knowledgeBase = {};

  fetch("/chatbot WEB/conocimiento/knowledge_base.json")
    .then((response) => response.json())
    .then((data) => {
      knowledgeBase = data.preguntas.reduce((acc, { texto, respuesta }) => {
        acc[texto] = respuesta;
        return acc;
      }, {});
    })
    .catch((error) => {
      console.error("Error al cargar knowledge_base.json", error);
    });

  // Cargar la lista de malas palabras
  let badWordsList = [];
  fetch("/chatbot WEB/conocimiento/bad_words.json")
    .then((response) => response.json())
    .then((data) => {
      badWordsList = data.badWords.map((word) => word.toLowerCase());
      console.log("Bad words loaded:", badWordsList);
    })
    .catch((error) => {
      console.error("Error loading bad_words.json", error);
    });

  function addMessage(sender, message) {
    const msgElement = document.createElement("div");
    msgElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(msgElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function processUserInput() {
    const userMessage = userInput.value.trim();
    if (userMessage === "") return;

    // Verificar malas palabras
    const containsBadWord = badWordsList.some((word) =>
      userMessage.toLowerCase().includes(word)
    );

    if (containsBadWord) {
      addMessage(
        "Bot",
        "Bot: ¡Cuidado con tu lenguaje! Por favor, sé respetuoso."
      );
    } else {
      addMessage("Usuario", userMessage);
      userInput.value = "";

      const botResponse = getBotResponse(userMessage);
      addMessage("Bot", botResponse);
    }
  }

  function getBotResponse(userInput) {
    if (knowledgeBase.hasOwnProperty(userInput)) {
      return `Bot: ${knowledgeBase[userInput]}`;
    } else {
      const newAnswer = prompt(
        "No sé la respuesta. Por favor, ingresa una respuesta:"
      );
      knowledgeBase[userInput] = newAnswer;

      localStorage.setItem("knowledgeBase", JSON.stringify(knowledgeBase));

      return `Bot: Gracias por enseñarme. Ahora sé que ${userInput} es ${newAnswer}`;
    }
  }

  const storedKnowledgeBase = localStorage.getItem("knowledgeBase");
  if (storedKnowledgeBase) {
    knowledgeBase = JSON.parse(storedKnowledgeBase);
  }

  sendButton.addEventListener("click", processUserInput);

  userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      processUserInput();
    }
  });
});
