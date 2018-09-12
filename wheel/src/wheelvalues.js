class WheelValues {
  static getValues() {
    const values = [
      0,
      2500,
      500,
      600,
      700,
      600,
      650,
      500,
      700,
      0,
      100000,
      0,
      600,
      550,
      500,
      600,
      0,
      650,
      1000,
      700,
      500,
      800,
      500,
      650,
      500,
      900
    ];
    return values;
  }

  static getRandomValue() {
    const values = WheelValues.getValues();
    const rand = Math.floor(Math.random() * values.length);
    return values[rand];
  }
}

export { WheelValues as default };
