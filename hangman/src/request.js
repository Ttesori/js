const getWordFromServer = async wordCount => {
  const url = `https://puzzle.mead.io/puzzle?wordCount=${wordCount}`;
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

export { getWordFromServer as default };
