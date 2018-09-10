const getWordFromServer = async wordCount => {
  const url = `http://puzzle.mead.io/puzzle?wordCount=${wordCount}`;
  const response = await fetch(url);
  if (response.status === 200) {
    const data = await response.json();
    return data.puzzle;
  } else {
    throw new Error('Unable to fetch puzzle');
  }
};

// Using promise chaining
//const getWordFromServer = wordCount => {
//   const url = `http://puzzle.mead.io/puzzle?wordCount=${wordCount}`;
//   return fetch(url)
//     .then(response => {
//       if (response.status === 200) {
//         return response.json();
//       } else {
//         throw new Error('Unable to fetch puzzle');
//       }
//     })
//     .then(data => {
//       // return just the puzzle for app
//       return data.puzzle;
//     });
// };

const getLocation = async () => {
  const url = 'http://ipinfo.io/json?token=823c0518575ae9';
  const resp = await fetch(url);
  if (resp.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Unable to get location.');
  }
};
