import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const CURRENTTIME_KEY = 'videoplayer-current-time';

localStorage.setItem(CURRENTTIME_KEY, 0);

const onPlay = function ({ seconds }) {
  localStorage.setItem(CURRENTTIME_KEY, seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));
player.setCurrentTime(localStorage.getItem(CURRENTTIME_KEY));
