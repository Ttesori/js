import WheelValues from './wheelvalues';
import WheelPuzzles from './wheelpuzzles';
import PlayWheelUI from './playwheelui';
import PlayWheel from './playwheel';

const init = () => {
  const playwheel = new PlayWheel();
  console.log(WheelValues.getRandomValue());
  console.log(WheelPuzzles.getRandomPuzzle());
  PlayWheelUI.updateGame();
};

init();
