const processData = async () => {
  let data = await getDataPromise(2);
  data = await getDataPromise(data);
  return data;
};

const getDataPromise = num =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * 2);
    }, 2000);
  });

processData().then(data => {
  console.log('Data ', data);
});
