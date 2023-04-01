import Wave from "wave-visualizer";
// const Wave = require("wave-visualizer");

export default class VoiceVisualizer {
  constructor() {
    this.audioStream = null;
  }

  async openAudioStream() {
    try {
      this.audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    } catch (error) {
      console.error("error");
    }
  }

  // if declaring functions inside class, omit the keyword 'function'
  // async must be used with await
  async startVisualizing() {
    await this.openAudioStream();

    let wave = new Wave();

    // giving the audio to wave to generate wave in a canvas with id="output"
    await wave.fromStream(this.audioStream, "output", {
      colors: ["red", "white", "blue"],
    });
  }

  stopVisualizing() {
    this.audioStream.getTracks().forEach((track) => {
      track.stop();
    });
  }
}
