import VoiceVisualizer from "./voiceVisualizer.js";

let isStarted = false;

const btn = document.getElementById("btn");

const voiceVisualizer = new VoiceVisualizer();

btn.onclick = async function () 
{
  if (!isStarted) 
  {
    await voiceVisualizer.startVisualizing();
    isStarted = true;
    btn.innerText = "Stop listening";
  } 
  else 
  {
    await voiceVisualizer.stopVisualizing();
    isStarted = false;
    btn.innerText = "Start listening";
  }
};
