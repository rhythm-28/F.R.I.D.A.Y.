import * as SpeechCommands from "@tensorflow-models/speech-commands";
import * as tf from "@tensorflow/tfjs";

import Model from "../AI_models/voiceModels/model.json";
import MetaData from "../AI_models/voiceModels/metadata.json";

export default class VoiceAssistant {
  constructor() {
    this.recognizer = null;
    this.options = {
      overlapFactor: 0.5,
      includeSpectrogram: true,
      probabilityThreshold: 0.21,
      invokeCallbackOnNoiseAndUnknown: false
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

  processWord(word){
    if (this.processingWord) {
      return;
    }
    this.processingWord = word;
    console.log(this.processingWord);
    this.processingWord = null;
  }
}
