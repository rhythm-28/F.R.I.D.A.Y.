import VoiceVisualizer from "./voiceVisualizer.js";
import VoiceAssistant from "./voiceAssistant.js";

let isStarted = false;

const btn = document.getElementById("btn");

const voiceVisualizer = new VoiceVisualizer();
const voiceAssistant = new VoiceAssistant();

btn.onclick = async function () 
{
  if (!isStarted) 
  {
    await voiceAssistant.startAssistant();
    await voiceVisualizer.startVisualizing();
    isStarted = true;
    btn.innerText = "Stop listening";
  } 
  else 
  {
    await voiceAssistant.stopAssistant();
    await voiceVisualizer.stopVisualizing();
    isStarted = false;
    btn.innerText = "Start listening";
  }
};
