import * as SpeechCommands from "@tensorflow-models/speech-commands";
import * as tf from "@tensorflow/tfjs";

import Model from "../AI_models/voiceModels/model.json";
import MetaData from "../AI_models/voiceModels/metadata.json";

import { wait, weather } from "./util";

export default class VoiceAssistant {
  constructor() {
    this.recognizer = null;
    this.options = {
      overlapFactor: 0.5,
      includeSpectrogram: true,
      probabilityThreshold: 0.21,
      invokeCallbackOnNoiseAndUnknown: false,
    };
    this.processingWord = null;
  }

  buildModel() {
    this.recognizer = SpeechCommands.create(
      "BROWSER_FFT",
      undefined,
      Model,
      MetaData
    );
    this.recognizer.ensureModelLoaded();
  }

  async startAssistant() {
    await this.buildModel();

    const wordLables = this.recognizer.wordLabels();
    console.log(wordLables);

    this.recognizer.listen((result) => {
      const scores = result.scores;
      const largest = Math.max(...scores);
      const idx = scores.findIndex((val) => {
        return val === largest;
      });
      const word = wordLables[idx];
      this.processWord(word);
    }, this.options);
  }

  stopAssistant() {
    this.recognizer.stopListening();
  }

  saySpeech(text) {
    const speech = new window.SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  }

  async processWord(word) {
    if (this.processingWord) {
      return;
    }
    this.processingWord = word;
    console.log(this.processingWord);
    switch (this.processingWord) {
      case "Hello":
        this.saySpeech("Good, how about you");
        await wait(3000);
        break;
      case "Sing me a song":
        this.saySpeech(
          "First things first. I'ma say all the words inside my head."
        );
        await wait(3000);
        break;
      case "Time":
        const d = new Date();
        this.saySpeech("Its" + d.getHours() + d.getMinutes());
        await wait(3000);
        break;
      case "Weather":
        const temperature = await weather();
        this.saySpeech("Current temperature is" + temperature + "degrees Celsius");
        await wait(3000);
        break;
      default:
        break;
    }
    this.processingWord = null;
  }
}
