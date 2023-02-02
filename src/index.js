import './css/styles.css';
import { pause } from './util.js';

async function renderOnTerminal(textLine, speed=40) {
  let screen = document.getElementById('terminal');
  let letterArray = textLine.split('');
  let newLine = document.createElement('div');
  newLine.classList.add('terminal-line')
  screen.append(newLine);
  for (const char of letterArray) {
    newLine.innerHTML += char;
    await pause(speed);
  }
}

// renderOnTerminal('I have a brass waterbed')