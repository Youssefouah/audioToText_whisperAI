import dotenv from "dotenv"

import fs from "fs"
import axios from "axios"

async function transcribe(file) {
  const response = await axios.post(
    'https://api.openai.com/v1/audio/transcriptions',
    {
      file,
      model: 'whisper-1'
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      }
    }
  );

  return response.data.text;
}

async function main() {
  const file = fs.createReadStream('audio.mp3');
  const transcript = await transcribe(file);

  console.log(transcript);
}

const inputElement = document.querySelector('.upload__inputfile');
inputElement.addEventListener('change', async (event) => {
  alert("Transcribing now... Please wait...");
  let button = $("#uploadbtn");
  button.removeClass("enabled");
  button.addClass("disabled");
  const file = event.target.files[0];

  const transcript = await transcribe(file);

  const myTextarea = document.getElementById("textArea");
  myTextarea.value = transcript;

  button.removeClass("disabled");
  button.addClass("enabled");
});