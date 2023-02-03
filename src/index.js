import './css/styles.css';
import Game from './js/Game';
import { pause } from './util';

window.addEventListener('load', async () => {
  let game = new Game();
  await game.renderOnTerminal('CODPIECE', {
    tag: 'span',
    className: 'terminal-title',
    targetQuery: '#terminal',
    speed: 100,
    prepend: true
  });
  await pause(300);
  document.getElementById('character-form').style.display = 'grid';
  await pause(1);
  document.getElementById('character-form').classList.add('showing');


  document.getElementById('start-game-button').addEventListener('click', async (e) => {
    e.preventDefault();
    await game.clearTitleScreen();
    await pause(500);
    game.showRegion('Starting Area');
  });

  for (const button of document.getElementsByClassName('nav-button')) {
    button.addEventListener('click', () => {
      document.getElementById('terminal').innerHTML = '';
      game.showRegion(game.getRandomRegion());
    })
  }
});