const createTipper = tip => {
  return bill => {
    return tip * bill;
  };
};

const tip15 = createTipper(0.15);
console.log(tip15(10));
console.log(tip15(25));

const tip20 = createTipper(0.2);
console.log(tip20(10));
console.log(tip20(25));
