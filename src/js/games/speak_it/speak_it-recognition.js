window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
export const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';
recognition.maxAlternatives = 1;
recognition.continuous = true;
recognition.interimResults = false;
