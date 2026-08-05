// data.js - Lesson content
// 8 categories: alphabet, numbers, colors, shapes, animals, fruits, family, body, songs
// Each item has an English word, Farsi translation, emoji illustration, and theme color.

const Data = {
  // -------- ALPHABET (26 harf) --------
  alphabet: [
    { id: 'A', letter: 'A', word: 'Apple',     emoji: '🍎',  fa: 'سیب',      color: '#ff5252' },
    { id: 'B', letter: 'B', word: 'Bear',      emoji: '🐻',  fa: 'خرس',      color: '#8d6e63' },
    { id: 'C', letter: 'C', word: 'Cat',       emoji: '🐱',  fa: 'گربه',     color: '#ff9800' },
    { id: 'D', letter: 'D', word: 'Dog',       emoji: '🐕',  fa: 'سگ',       color: '#a1887f' },
    { id: 'E', letter: 'E', word: 'Egg',       emoji: '🥚',  fa: 'تخم مرغ',  color: '#fdd835' },
    { id: 'F', letter: 'F', word: 'Fish',      emoji: '🐟',  fa: 'ماهی',     color: '#29b6f6' },
    { id: 'G', letter: 'G', word: 'Grapes',    emoji: '🍇',  fa: 'انگور',    color: '#7b1fa2' },
    { id: 'H', letter: 'H', word: 'House',     emoji: '🏠',  fa: 'خانه',     color: '#43a047' },
    { id: 'I', letter: 'I', word: 'Ice Cream', emoji: '🍦',  fa: 'بستنی',    color: '#f48fb1' },
    { id: 'J', letter: 'J', word: 'Juice',     emoji: '🧃',  fa: 'آبمیوه',   color: '#ff5722' },
    { id: 'K', letter: 'K', word: 'Key',       emoji: '🔑',  fa: 'کلید',     color: '#fbc02d' },
    { id: 'L', letter: 'L', word: 'Lion',      emoji: '🦁',  fa: 'شیر',      color: '#fb8c00' },
    { id: 'M', letter: 'M', word: 'Monkey',    emoji: '🐵',  fa: 'میمون',    color: '#795548' },
    { id: 'N', letter: 'N', word: 'Nut',       emoji: '🥜',  fa: 'آجیل',     color: '#a1887f' },
    { id: 'O', letter: 'O', word: 'Orange',    emoji: '🍊',  fa: 'پرتقال',   color: '#fb8c00' },
    { id: 'P', letter: 'P', word: 'Pear',      emoji: '🍐',  fa: 'گلابی',    color: '#9ccc65' },
    { id: 'Q', letter: 'Q', word: 'Queen',     emoji: '👑',  fa: 'ملکه',     color: '#ffd54f' },
    { id: 'R', letter: 'R', word: 'Rabbit',    emoji: '🐰',  fa: 'خرگوش',    color: '#bcaaa4' },
    { id: 'S', letter: 'S', word: 'Star',      emoji: '⭐',  fa: 'ستاره',    color: '#fdd835' },
    { id: 'T', letter: 'T', word: 'Tree',      emoji: '🌳',  fa: 'درخت',     color: '#43a047' },
    { id: 'U', letter: 'U', word: 'Umbrella',  emoji: '☂️',  fa: 'چتر',      color: '#42a5f5' },
    { id: 'V', letter: 'V', word: 'Violin',    emoji: '🎻',  fa: 'ویولن',    color: '#8d6e63' },
    { id: 'W', letter: 'W', word: 'Whale',     emoji: '🐋',  fa: 'نهنگ',     color: '#1976d2' },
    { id: 'X', letter: 'X', word: 'Xylophone', emoji: '🎼',  fa: 'زیلوفون',  color: '#ab47bc' },
    { id: 'Y', letter: 'Y', word: 'Yarn',      emoji: '🧶',  fa: 'نخ',       color: '#ec407a' },
    { id: 'Z', letter: 'Z', word: 'Zebra',     emoji: '🦓',  fa: 'گورخر',    color: '#424242' }
  ],

  // -------- NUMBERS (1-10) --------
  numbers: [
    { id: '1',  word: 'One',   emoji: '1️⃣', fa: 'یک',    color: '#e91e63' },
    { id: '2',  word: 'Two',   emoji: '2️⃣', fa: 'دو',    color: '#9c27b0' },
    { id: '3',  word: 'Three', emoji: '3️⃣', fa: 'سه',    color: '#3f51b5' },
    { id: '4',  word: 'Four',  emoji: '4️⃣', fa: 'چهار',  color: '#2196f3' },
    { id: '5',  word: 'Five',  emoji: '5️⃣', fa: 'پنج',   color: '#03a9f4' },
    { id: '6',  word: 'Six',   emoji: '6️⃣', fa: 'شش',    color: '#00bcd4' },
    { id: '7',  word: 'Seven', emoji: '7️⃣', fa: 'هفت',   color: '#009688' },
    { id: '8',  word: 'Eight', emoji: '8️⃣', fa: 'هشت',   color: '#4caf50' },
    { id: '9',  word: 'Nine',  emoji: '9️⃣', fa: 'نه',    color: '#ff9800' },
    { id: '10', word: 'Ten',   emoji: '🔟', fa: 'ده',    color: '#f44336' }
  ],

  // -------- COLORS (10) --------
  colors: [
    { id: 'red',    word: 'Red',    emoji: '🔴', fa: 'قرمز',     color: '#f44336' },
    { id: 'blue',   word: 'Blue',   emoji: '🔵', fa: 'آبی',      color: '#2196f3' },
    { id: 'green',  word: 'Green',  emoji: '🟢', fa: 'سبز',      color: '#4caf50' },
    { id: 'yellow', word: 'Yellow', emoji: '🟡', fa: 'زرد',      color: '#ffeb3b' },
    { id: 'orange', word: 'Orange', emoji: '🟠', fa: 'نارنجی',   color: '#ff9800' },
    { id: 'purple', word: 'Purple', emoji: '🟣', fa: 'بنفش',     color: '#9c27b0' },
    { id: 'pink',   word: 'Pink',   emoji: '🩷', fa: 'صورتی',    color: '#ec407a' },
    { id: 'brown',  word: 'Brown',  emoji: '🟤', fa: 'قهوه‌ای', color: '#795548' },
    { id: 'black',  word: 'Black',  emoji: '⚫', fa: 'سیاه',     color: '#212121' },
    { id: 'white',  word: 'White',  emoji: '⚪', fa: 'سفید',     color: '#9e9e9e' }
  ],

  // -------- SHAPES (8) --------
  shapes: [
    { id: 'circle',    word: 'Circle',    emoji: '⭕', fa: 'دایره',    color: '#e91e63' },
    { id: 'square',    word: 'Square',    emoji: '⬛', fa: 'مربع',     color: '#3f51b5' },
    { id: 'triangle',  word: 'Triangle',  emoji: '🔺', fa: 'مثلث',     color: '#f44336' },
    { id: 'star',      word: 'Star',      emoji: '⭐', fa: 'ستاره',    color: '#ffc107' },
    { id: 'heart',     word: 'Heart',     emoji: '❤️', fa: 'قلب',      color: '#e91e63' },
    { id: 'rectangle', word: 'Rectangle', emoji: '▬',  fa: 'مستطیل',   color: '#00bcd4' },
    { id: 'diamond',   word: 'Diamond',   emoji: '🔷', fa: 'لوزی',     color: '#2196f3' },
    { id: 'oval',      word: 'Oval',      emoji: '🥚', fa: 'بیضی',     color: '#9e9e9e' }
  ],

  // -------- ANIMALS (10) --------
  animals: [
    { id: 'cat',    word: 'Cat',    emoji: '🐱', fa: 'گربه',     color: '#ff9800' },
    { id: 'dog',    word: 'Dog',    emoji: '🐕', fa: 'سگ',       color: '#a1887f' },
    { id: 'fish',   word: 'Fish',   emoji: '🐟', fa: 'ماهی',     color: '#29b6f6' },
    { id: 'bird',   word: 'Bird',   emoji: '🐦', fa: 'پرنده',    color: '#7e57c2' },
    { id: 'rabbit', word: 'Rabbit', emoji: '🐰', fa: 'خرگوش',    color: '#bcaaa4' },
    { id: 'lion',   word: 'Lion',   emoji: '🦁', fa: 'شیر',      color: '#fb8c00' },
    { id: 'monkey', word: 'Monkey', emoji: '🐵', fa: 'میمون',    color: '#795548' },
    { id: 'cow',    word: 'Cow',    emoji: '🐄', fa: 'گاو',      color: '#5d4037' },
    { id: 'sheep',  word: 'Sheep',  emoji: '🐑', fa: 'گوسفند',   color: '#90a4ae' },
    { id: 'bear',   word: 'Bear',   emoji: '🐻', fa: 'خرس',      color: '#8d6e63' }
  ],

  // -------- FRUITS (10) --------
  fruits: [
    { id: 'apple',      word: 'Apple',      emoji: '🍎', fa: 'سیب',         color: '#f44336' },
    { id: 'banana',     word: 'Banana',     emoji: '🍌', fa: 'موز',         color: '#fdd835' },
    { id: 'orange',     word: 'Orange',     emoji: '🍊', fa: 'پرتقال',      color: '#fb8c00' },
    { id: 'grape',      word: 'Grapes',     emoji: '🍇', fa: 'انگور',       color: '#7b1fa2' },
    { id: 'strawberry', word: 'Strawberry', emoji: '🍓', fa: 'توت فرنگی',   color: '#e91e63' },
    { id: 'watermelon', word: 'Watermelon', emoji: '🍉', fa: 'هندوانه',     color: '#4caf50' },
    { id: 'pear',       word: 'Pear',       emoji: '🍐', fa: 'گلابی',       color: '#9ccc65' },
    { id: 'peach',      word: 'Peach',      emoji: '🍑', fa: 'هلو',         color: '#ffab91' },
    { id: 'cherry',     word: 'Cherry',     emoji: '🍒', fa: 'گیلاس',       color: '#c62828' },
    { id: 'pineapple',  word: 'Pineapple',  emoji: '🍍', fa: 'آناناس',      color: '#ffeb3b' }
  ],

  // -------- FAMILY (8) --------
  family: [
    { id: 'mother',      word: 'Mother',      emoji: '👩',         fa: 'مادر',        color: '#ec407a' },
    { id: 'father',      word: 'Father',      emoji: '👨',         fa: 'پدر',         color: '#1976d2' },
    { id: 'sister',      word: 'Sister',      emoji: '👧',         fa: 'خواهر',       color: '#f48fb1' },
    { id: 'brother',     word: 'Brother',     emoji: '👦',         fa: 'برادر',       color: '#42a5f5' },
    { id: 'baby',        word: 'Baby',        emoji: '👶',         fa: 'نوزاد',       color: '#ffca28' },
    { id: 'grandmother', word: 'Grandmother', emoji: '👵',         fa: 'مادربزرگ',    color: '#8d6e63' },
    { id: 'grandfather', word: 'Grandfather', emoji: '👴',         fa: 'پدربزرگ',     color: '#5d4037' },
    { id: 'family',      word: 'Family',      emoji: '👨‍👩‍👧‍👦', fa: 'خانواده', color: '#43a047' }
  ],

  // -------- BODY (8) --------
  body: [
    { id: 'eye',   word: 'Eye',    emoji: '👁️', fa: 'چشم',  color: '#42a5f5' },
    { id: 'ear',   word: 'Ear',    emoji: '👂', fa: 'گوش',  color: '#ab47bc' },
    { id: 'nose',  word: 'Nose',   emoji: '👃', fa: 'بینی', color: '#ef5350' },
    { id: 'mouth', word: 'Mouth',  emoji: '👄', fa: 'دهان', color: '#ec407a' },
    { id: 'hand',  word: 'Hand',   emoji: '✋', fa: 'دست',  color: '#ffa726' },
    { id: 'foot',  word: 'Foot',   emoji: '🦶', fa: 'پا',   color: '#8d6e63' },
    { id: 'hair',  word: 'Hair',   emoji: '💇', fa: 'مو',   color: '#5d4037' },
    { id: 'teeth', word: 'Teeth',  emoji: '🦷', fa: 'دندان', color: '#eceff1' }
  ],

  // -------- SONGS (placeholder, arkadaşınla doldurulacak) --------
  songs: [
    {
      id: 'abc',
      title: 'ABC Song',
      faTitle: 'آهنگ الفبا',
      emoji: '🎵',
      color: '#e91e63',
      fa: 'حروف الفبا',
      lines: ['A B C D E F G', 'H I J K L M N O P', 'Q R S T U V', 'W X Y and Z', 'Now I know my ABCs', 'Next time won\'t you sing with me?']
    },
    {
      id: 'twinkle',
      title: 'Twinkle Twinkle',
      faTitle: 'ستاره کوچولو',
      emoji: '⭐',
      color: '#fdd835',
      fa: 'ستاره',
      lines: ['Twinkle, twinkle, little star', 'How I wonder what you are', 'Up above the world so high', 'Like a diamond in the sky', 'Twinkle, twinkle, little star', 'How I wonder what you are']
    }
  ]
};

// Helper: get total item count for a category
Data.count = function(category) {
  return (this[category] || []).length;
};
