//Init SpeechSynth API
const synth = window.speechSynthesis;

const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

// Init voices Array

let voices = [];

const getVoices = () => {
  voices = synth.getVoices();
  console.log(voices);

  //loop through voices and create an option for each one.
  voices.forEach((voice) => {
    //Create an Option Element
    const option = document.createElement("option");
    //fill the option with the voice and language
    option.textContent = voice.name + "(" + voice.lang + ")";

    //Set Needed Option attributes
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);

    voiceSelect.appendChild(option);
  });
};

getVoices();

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

//Speak
const speak = () => {
  //check if speaking
  if (synth.speaking) {
    console.error("Already Speaking...");
    return;
  }
  if (textInput.value !== "") {
    //get Speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    //Speak End
    speakText.onend = (e) => {
      console.log("Done Speaking...");
    };

    speakText.onerror = (e) => {
      console.error("something went wrong");
    };

    //Selected Voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );

    //loop through Voices
    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });
    //set pitch and rate

    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    synth.speak(speakText);
  }
};

//Event Listener
textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});

//rate value change

rate.addEventListener("change", (e) => (rateValue.textContent = rate.value));

pitch.addEventListener("change", (e) => (pitchValue.textContent = pitch.value));

//voice Select change
voiceSelect.addEventListener("change", (e) => speak());
