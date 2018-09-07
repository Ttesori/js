function getWordFromServer(wordCount, callback) {
  // Make HTTP Request for random puzzle
  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.responseText);
      callback(undefined, data.puzzle);
    } else if (e.target.status === 400) {
      callback('There has been an error');
    }
  });
  request.open('GET', `http://puzzle.mead.io/puzzle?wordCount=${wordCount}`);
  request.send();
}
