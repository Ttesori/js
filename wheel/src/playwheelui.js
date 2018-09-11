class PlayWheelUI {
  static getElements() {
    return {
      gameEl: '.wheel-game'
    };
  }

  static updateGame() {
    const elements = PlayWheelUI.getElements();
    document.querySelector(elements.gameEl).innerHTML = 'All Hooked Up!';
  }
}

export { PlayWheelUI as default };
