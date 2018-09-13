class WheelPuzzles {
  static getPuzzles() {
    const puzzles = [
      {
        category: 'Around The House',
        puzzles: [
          'A Pile of Coats',
          'Accent Furniture',
          'Bathtub',
          'Alarm Clock',
          'Bathroom Scale',
          'Cozy Sofa',
          'Exercise Equipment',
          'End Tables',
          'Duct Tape',
          'Garage Door',
          'High-Definition Television',
          'Cell Phone Charger',
          'Outdoor Fire Pit',
          'Trash Bags',
          'Patio Furniture',
          'Pair of Scissors',
          'Shower Caddy',
          'Vacuum Cleaner',
          'Remote Control',
          'Scented Candles',
          'Toothbrush',
          'Toilet Bowl Cleaner',
          'Welcome Mat'
        ]
      },
      {
        category: 'Phrase',
        puzzles: [
          'A Bargain at Half the Price',
          'A Bird in the Hand is Worth Two in the Bush',
          'A Blessing in Disguise',
          'Across the Pond',
          'All Bark and No Bite',
          'Badge of Honor',
          'Because I Said So',
          'Bells and Whistles',
          'Butterflies in My Stomach',
          'Cool Calm and Collected',
          'Case By Case Basis',
          'Chain of Events',
          'Divide and Conquer',
          'Double Or Nothing',
          'Easy as Pie',
          'Every Little Bit Helps',
          'Expect The Unexpected',
          'Fair Enough',
          'Getting Cold Feet',
          'Happy Birthday',
          'In My Humble Opinion',
          'Jump The Gun'
        ]
      },
      {
        category: 'Food and Drink',
        puzzles: [
          'Chocolate Chip Ice Cream',
          'Spaghetti and Meatballs',
          'Peanut Butter and Jelly Sandwich',
          'Aged Cheddar Cheese',
          'Ahi Tuna Salad',
          'Scrambled Eggs And Bacon',
          'Beer And Wine',
          'Birthday Cake',
          'Chewy Saltwater Taffy',
          'Chicken Pot Pie',
          'Dark Chocolate Bar',
          'Fried Pickle Chips',
          'Giant Soft Pretzel',
          'Loaf of Bread',
          'Sparkling Water',
          'Cold Brew Coffee',
          'Mexican Hot Chocolate',
          'Oven-Roasted Broccoli',
          'Poppy Seed Muffin',
          'Red Bell Pepper',
          'Red Velvet Cake',
          'Scrambled Eggs',
          'Spicy Buffalo Wings'
        ]
      },
      {
        category: 'Place',
        puzzles: [
          'Air Force Base',
          'Beautiful Beach Resort',
          'Bed and Breakfast',
          'Dense Tropical Rainforest',
          'Garden of Eden',
          'Ancient Castle',
          'Open-Air Fish Market',
          'Local Coffee Shop',
          'Faraway Galaxy',
          'National Park',
          'Abandoned Warehouse',
          'Bicycle Path',
          'Car Dealership',
          'Fine Art Museum',
          'Field of Flowers',
          'Fast-Food Restaurant',
          'Golf Course',
          'Natural Food Store',
          'Haunted House',
          'Hardware Store',
          'Lighthouse'
        ]
      },
      {
        category: 'Show Biz',
        puzzles: [
          'Academy Award Nominee',
          'Animated Movie',
          'Best Picture Oscar',
          'Best-Selling Album',
          'Best-Dressed List',
          'Big-Budget Blockbuster',
          'Broadway Musical',
          'Celebrity Couple',
          'Choreographer',
          'Stand-Up Comedy',
          'Country Music Artist',
          'Cover Band',
          'Daytime Television',
          'Debut Album',
          'Feel-Good Movie',
          'Game Shows',
          'Hip-Hop Music',
          'Hit Television Show',
          'Indie-Rock Band',
          'Lead Singer',
          'Made-For-TV Movie',
          'Movie Soundtrack',
          'National Public Radio',
          'Netflix Series',
          'Reality Show',
          'Romantic Comedy'
        ]
      },
      {
        category: 'Before and After',
        puzzles: [
          'A Cure For The Common Cold Cuts',
          'A Long Shot In The Dark',
          'A Man On A Mission Statement',
          'Air Force One In a Million',
          'All Hands On Deck Chairs',
          'All Sales Are Final Exam',
          'Bald Eagle Scout',
          'Black Hole In One',
          'Blow Off a Little Steam Engine',
          'Captain Hook Line And Sinker',
          'Casper The Friendly Ghost Pepper',
          'Do The Funky Chicken Noodle Soup',
          'Emotional Plea Bargain',
          'Fairy Dust Bunnies',
          'Guilt Trip of a Lifetime',
          'Hot Dog Stand By Your Man',
          'Ice Cube Steak',
          'Jingle Bell Rock Paper Scissors',
          'Key Lime Pie Chart',
          'Land Down Under The Radar',
          'Meter Maid of Honor',
          'Selfie Stick In The Mud',
          'Shaved Head Coach',
          'Tip of the Iceberg Lettuce'
        ]
      }
    ];
    return puzzles;
  }

  static getRandomPuzzle() {
    const puzzles = WheelPuzzles.getPuzzles();
    const randCategoryNum = Math.floor(Math.random() * puzzles.length);
    const randPuzzleNum = Math.floor(
      Math.random() * puzzles[randCategoryNum].puzzles.length
    );

    console.log(
      `Puzzle category ${randCategoryNum}, puzzle number ${randPuzzleNum}`
    );

    return {
      category: puzzles[randCategoryNum].category,
      puzzle: puzzles[randCategoryNum].puzzles[randPuzzleNum],
      puzzleNum: randPuzzleNum
    };
  }
}

export { WheelPuzzles as default };
