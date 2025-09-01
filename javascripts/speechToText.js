// Module For Listen
export const speechToText = () => {
  return new Promise((resolve, reject) => {
    // Defining Language of The Speech to Text Module...
    const LANGUAGE = "en-US";

    // Speech Recognition object...
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition)();

    // Setting Up the Language to The Speech Recognition object...
    recognition.lang = LANGUAGE;

    // Listining Chat....
    recognition.onresult = (event) => {
      const message = event.results[0][0].transcript;
      resolve(message);
    };

    // Error Handling...
    recognition.onerror = (event) => {
      reject(event.error);
    };

    // No Match handling...
    recognition.onnomatch = () => {
      reject("No match found");
    };

    // Starting The Module...
    recognition.start();
  });
};
