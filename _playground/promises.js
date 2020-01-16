// Callback

const getDataCallback = callback => {
  setTimeout(() => {
    callback(undefined, 'This is teh data');
  }, 2000);
};

getDataCallback((err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

// Promise

const getDataPromise = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      //resolve('This is the promise data');
      reject('There was a problem');
    }, 2000);
  });

const myPromise = getDataPromise();

myPromise.then(
  data => {
    console.log(data);
  },
  err => {
    console.log(err);
  }
);
