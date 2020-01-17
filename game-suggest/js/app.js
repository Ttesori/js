/*

() Sort games in library alpha
() If same min and max players, show only min

*/

const inputEl = document.querySelector('.gs-txt-search');
const btnEl = document.querySelector('.gs-btn-search');
const resultsEl = document.querySelector('.gs-results');
const libraryEl = document.querySelector('.gs-library');
const suggestEl = document.querySelector('.gs-suggest');
let gameLibrary;
let gameFilters = {
  players: 0,
  duration: 0
};

// Local Storage
const saveToLS = (gameLibrary) => {
  localStorage.setItem('gs-gameLibrary', JSON.stringify(gameLibrary));
};

const loadFromLS = () => {
  const library = localStorage.getItem('gs-gameLibrary');
  if (library) {
    return JSON.parse(library);
  } else {
    return [];
  }
};

const addGame = (game) => {
  gameLibrary.push({
    id: game.id,
    name: game.name,
    max_players: game.max_players,
    min_players: game.min_players,
    min_playtime: game.min_playtime,
    max_playtime: game.max_playtime,
    thumb_url: game.thumb_url
  });
  saveToLS(gameLibrary);
};

const removeGame = (gameToRemove) => {
  const gameIndexToRemove = gameLibrary.findIndex(
    (game) => game.id === gameToRemove.id
  );
  if (gameIndexToRemove > -1) {
    gameLibrary.splice(gameIndexToRemove, 1);
    saveToLS(gameLibrary);
    showLibrary(gameLibrary);
  }
};

const findGames = () => {
  // Get input from field
  const searchTerm = inputEl.value;
  // Build search URL
  const url = `https://www.boardgameatlas.com/api/search?name=${searchTerm}&client_id=aDvh6MlS2w&limit=5&fuzzy_match=true`;

  // Make request
  const request = new XMLHttpRequest();
  request.addEventListener('readystatechange', (e) => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      showResults(JSON.parse(e.target.responseText));
    }
  });
  request.open('GET', url);
  request.send();
};

const showResults = (results) => {
  resultsEl.innerHTML = '';
  results.games.forEach((game) => {
    buildResultItem(game);
  });
};

const buildResultItem = (game) => {
  const gameEl = document.createElement('section');
  gameEl.className = `game game-${game.id}`;
  gameEl.textContent = `${game.name}: ${game.min_players}-${game.max_players} players  < ${game.max_playtime}mins`;

  const addBtnEl = document.createElement('button');
  addBtnEl.className = 'btn gs-btn-add';
  addBtnEl.textContent = '+ Add Game to Library';
  addBtnEl.addEventListener('click', () => {
    addGame(game);
    showLibrary(gameLibrary);
  });
  gameEl.appendChild(addBtnEl);

  resultsEl.appendChild(gameEl);
};

const suggestGame = (gameLibrary) => {
  let filteredLibrary = gameLibrary;

  const playersVal = gameFilters.players;
  const durationVal = gameFilters.duration;
  if (playersVal || durationVal) {
    filteredLibrary = filterGames(filteredLibrary, gameFilters);
  }

  suggestEl.innerHTML = '';
  const rand = Math.floor(Math.random() * filteredLibrary.length);
  const game = filteredLibrary[rand];
  suggestEl.textContent = `You should play ${game.name}!`;

  const btnSuggestAgain = document.createElement('button');
  btnSuggestAgain.textContent = 'Suggest Again!';
  btnSuggestAgain.addEventListener('click', () => {
    showSuggest(gameLibrary);
  });

  suggestEl.appendChild(btnSuggestAgain);
};

const filterGames = (gameLibrary, gameFilters) => {
  if (gameFilters.players > 0) {
    // Filter by players
    console.log('Filtering by players...');
    gameLibrary = gameLibrary.filter(
      (game) => game.min_players >= gameFilters.players
    );
    console.log(`Found ${gameLibrary.length} games`);
  }

  if (gameFilters.duration > 0) {
    // Filter by duration
    console.log('Filtering by duration...');
    gameLibrary = gameLibrary.filter(
      (game) => game.max_playtime <= gameFilters.duration
    );
    console.log(`Found ${gameLibrary.length} games`);
  }
  return gameLibrary;
};

const showLibrary = (gameLibrary) => {
  if (gameLibrary.length === 0) {
    return false;
  }

  libraryEl.innerHTML = '<h2>Game Library</h2>';
  gameLibrary.forEach((game) => {
    const itemEl = document.createElement('section');
    itemEl.className = `game game-${game.id}`;
    itemEl.textContent = `${game.name}: ${game.min_players}-${game.max_players} players  <${game.max_playtime}mins`;

    // Add remove button
    const btnRemoveEl = document.createElement('button');
    btnRemoveEl.className = 'btn gs-btn-remove';
    btnRemoveEl.textContent = 'x Remove Game from Library';
    btnRemoveEl.addEventListener('click', () => {
      removeGame(game);
    });
    itemEl.appendChild(btnRemoveEl);

    libraryEl.appendChild(itemEl);
  });
};

const showSuggest = (gameLibrary) => {
  suggestEl.innerHTML = '';
  gameFilters = {
    duration: 0,
    players: 0
  };

  if (!gameLibrary.length > 0) {
    suggestEl.textContent = 'Add some games below to show suggestions.';
  }

  const selPlayers = document.createElement('select');
  selPlayers.className = 'gs-sel-players';
  selPlayers.innerHTML = `
  <option value="0">Any</option>
  <option value="1">Solo</option>
  <option value="2">2 Players</option>
  <option value="3">3 Players</option>
  <option value="4">4 Players</option>
  <option value="5">5+ Players</option>
  `;
  selPlayers.addEventListener('change', () => {
    gameFilters.players = selPlayers.value;
    console.log(gameFilters.players);
  });

  const selDuration = document.createElement('select');
  selDuration.className = 'gs-sel-duration';
  selDuration.innerHTML = `
  <option value="0">Any</option>
  <option value="30">&lt; 30mins</option>
  <option value="60">&lt; 60mins</option>
  <option value="90">&lt; 90mins</option>
  <option value="120">&lt; 120mins</option>
  `;
  selDuration.addEventListener('change', () => {
    gameFilters.duration = selDuration.value;
    console.log(gameFilters.duration);
  });

  const btnSuggest = document.createElement('button');
  btnSuggest.textContent = 'Suggest Game!';
  btnSuggest.addEventListener('click', () => {
    suggestGame(gameLibrary);
  });
  suggestEl.appendChild(selPlayers);
  suggestEl.appendChild(selDuration);
  suggestEl.appendChild(btnSuggest);
};

// Event listener
btnEl.addEventListener('click', (e) => {
  e.preventDefault();
  findGames();
});

const init = () => {
  gameLibrary = loadFromLS();
  showLibrary(gameLibrary);
  showSuggest(gameLibrary);
};

init();
