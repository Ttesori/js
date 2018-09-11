class WheelValues {
  static getValues() {
    const values = [0, 250, 500, 1000, -1];
    return values;
  }

  static getRandomValue() {
    const values = WheelValues.getValues();
    const rand = Math.floor(Math.random() * values.length);
    return values[rand];
  }
}

export { WheelValues as default };
