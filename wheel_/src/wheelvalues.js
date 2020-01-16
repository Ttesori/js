class WheelValues {
  static getValues() {
    const values = [
      0,
      700,
      2500,
      500,
      600,
      250,
      0,
      900,
      700,
      5000,
      250,
      550,
      500,
      0,
      600,
      650,
      1000,
      700,
      500,
      800,
      0,
      650,
      500,
      900
    ];
    return values;
  }

  static getRandomValue() {
    const values = WheelValues.getValues();
    const rand = Math.floor(Math.random() * values.length);
    return {
      value: values[rand],
      position: rand
    };
  }
}

export { WheelValues as default };
