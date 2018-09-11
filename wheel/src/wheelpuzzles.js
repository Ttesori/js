class WheelPuzzles {
  static getPuzzles() {
    const puzzles = [
      {
        category: 'Around The House',
        puzzles: ['A Pile of Coats', 'Accent Furniture', 'Bathtub']
      },
      {
        category: 'Food and Drink',
        puzzles: [
          'Chocolate Chip Ice Cream',
          'Spaghetti and Meatballs',
          'Peanut Butter and Jelly Sandwich'
        ]
      },
      {
        category: 'Place',
        puzzles: [
          'Air Force Base',
          'Beautiful Beach Resort',
          'Bed and Breakfast',
          'Dense Tropical Rainforest'
        ]
      }
    ];
    return puzzles;
  }

  static getRandomPuzzle() {
    const puzzles = WheelPuzzles.getPuzzles();
    const randCategoryNum = Math.floor(Math.random() * (puzzles.length - 1));
    const randPuzzleNum = Math.floor(
      Math.random() * (puzzles[randCategoryNum].puzzles.length - 1)
    );

    return {
      category: puzzles[randCategoryNum].category,
      puzzle: puzzles[randCategoryNum].puzzles[randPuzzleNum]
    };
  }
}

export { WheelPuzzles as default };
