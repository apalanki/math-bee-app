// ═══════════════════════════════════════════════════════════════════
// MATH BEE PRACTICE APP — Exhaustive Question Bank
// Based on North South Foundation MB1 (K-3) Syllabus
// 200+ questions across 14 topics + speed drill bank
// Topics ranked from most important to least important
// ═══════════════════════════════════════════════════════════════════

export interface Question {
  id: string;
  question: string;
  answer: string;
  hints: [string, string, string]; // [hardest clue, medium clue, easiest clue]
  topicId: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface SpeedDrill {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Topic {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  rank: number;
  questions: Question[];
}

// ─────────────────────────────────────────────────────────────────
// SPEED DRILL BANK — Fast computation practice (no hints, 5s each)
// ─────────────────────────────────────────────────────────────────
export const speedDrills: SpeedDrill[] = [
  // Addition - Single digit
  { id: 'sd1', question: '3 + 4', answer: '7', category: 'Addition' },
  { id: 'sd2', question: '6 + 7', answer: '13', category: 'Addition' },
  { id: 'sd3', question: '8 + 9', answer: '17', category: 'Addition' },
  { id: 'sd4', question: '5 + 8', answer: '13', category: 'Addition' },
  { id: 'sd5', question: '7 + 6', answer: '13', category: 'Addition' },
  { id: 'sd6', question: '9 + 4', answer: '13', category: 'Addition' },
  { id: 'sd7', question: '8 + 6', answer: '14', category: 'Addition' },
  { id: 'sd8', question: '7 + 8', answer: '15', category: 'Addition' },
  { id: 'sd9', question: '9 + 9', answer: '18', category: 'Addition' },
  { id: 'sd10', question: '6 + 6', answer: '12', category: 'Addition' },
  // Addition - Two digit
  { id: 'sd11', question: '23 + 14', answer: '37', category: 'Addition' },
  { id: 'sd12', question: '45 + 32', answer: '77', category: 'Addition' },
  { id: 'sd13', question: '56 + 27', answer: '83', category: 'Addition' },
  { id: 'sd14', question: '38 + 45', answer: '83', category: 'Addition' },
  { id: 'sd15', question: '67 + 24', answer: '91', category: 'Addition' },
  { id: 'sd16', question: '49 + 38', answer: '87', category: 'Addition' },
  { id: 'sd17', question: '75 + 16', answer: '91', category: 'Addition' },
  { id: 'sd18', question: '83 + 19', answer: '102', category: 'Addition' },
  { id: 'sd19', question: '64 + 37', answer: '101', category: 'Addition' },
  { id: 'sd20', question: '55 + 55', answer: '110', category: 'Addition' },
  // Addition - Three digit
  { id: 'sd21', question: '123 + 456', answer: '579', category: 'Addition' },
  { id: 'sd22', question: '234 + 321', answer: '555', category: 'Addition' },
  { id: 'sd23', question: '347 + 256', answer: '603', category: 'Addition' },
  { id: 'sd24', question: '418 + 375', answer: '793', category: 'Addition' },
  { id: 'sd25', question: '509 + 284', answer: '793', category: 'Addition' },
  { id: 'sd26', question: '637 + 148', answer: '785', category: 'Addition' },
  { id: 'sd27', question: '725 + 196', answer: '921', category: 'Addition' },
  { id: 'sd28', question: '843 + 157', answer: '1000', category: 'Addition' },
  { id: 'sd29', question: '456 + 544', answer: '1000', category: 'Addition' },
  { id: 'sd30', question: '299 + 301', answer: '600', category: 'Addition' },
  // Subtraction - Single/Two digit
  { id: 'sd31', question: '15 − 7', answer: '8', category: 'Subtraction' },
  { id: 'sd32', question: '13 − 6', answer: '7', category: 'Subtraction' },
  { id: 'sd33', question: '17 − 9', answer: '8', category: 'Subtraction' },
  { id: 'sd34', question: '50 − 29', answer: '21', category: 'Subtraction' },
  { id: 'sd35', question: '72 − 38', answer: '34', category: 'Subtraction' },
  { id: 'sd36', question: '85 − 47', answer: '38', category: 'Subtraction' },
  { id: 'sd37', question: '91 − 56', answer: '35', category: 'Subtraction' },
  { id: 'sd38', question: '63 − 28', answer: '35', category: 'Subtraction' },
  { id: 'sd39', question: '100 − 37', answer: '63', category: 'Subtraction' },
  { id: 'sd40', question: '100 − 64', answer: '36', category: 'Subtraction' },
  // Subtraction - Three digit
  { id: 'sd41', question: '500 − 234', answer: '266', category: 'Subtraction' },
  { id: 'sd42', question: '800 − 456', answer: '344', category: 'Subtraction' },
  { id: 'sd43', question: '347 − 128', answer: '219', category: 'Subtraction' },
  { id: 'sd44', question: '625 − 318', answer: '307', category: 'Subtraction' },
  { id: 'sd45', question: '904 − 567', answer: '337', category: 'Subtraction' },
  { id: 'sd46', question: '1000 − 375', answer: '625', category: 'Subtraction' },
  { id: 'sd47', question: '750 − 289', answer: '461', category: 'Subtraction' },
  { id: 'sd48', question: '600 − 143', answer: '457', category: 'Subtraction' },
  { id: 'sd49', question: '483 − 256', answer: '227', category: 'Subtraction' },
  { id: 'sd50', question: '912 − 487', answer: '425', category: 'Subtraction' },
  // Multiplication - Times tables 1–10
  { id: 'sd51', question: '3 × 4', answer: '12', category: 'Multiplication' },
  { id: 'sd52', question: '6 × 7', answer: '42', category: 'Multiplication' },
  { id: 'sd53', question: '8 × 9', answer: '72', category: 'Multiplication' },
  { id: 'sd54', question: '5 × 7', answer: '35', category: 'Multiplication' },
  { id: 'sd55', question: '4 × 8', answer: '32', category: 'Multiplication' },
  { id: 'sd56', question: '9 × 6', answer: '54', category: 'Multiplication' },
  { id: 'sd57', question: '7 × 7', answer: '49', category: 'Multiplication' },
  { id: 'sd58', question: '8 × 8', answer: '64', category: 'Multiplication' },
  { id: 'sd59', question: '9 × 9', answer: '81', category: 'Multiplication' },
  { id: 'sd60', question: '6 × 8', answer: '48', category: 'Multiplication' },
  { id: 'sd61', question: '7 × 9', answer: '63', category: 'Multiplication' },
  { id: 'sd62', question: '4 × 6', answer: '24', category: 'Multiplication' },
  { id: 'sd63', question: '3 × 9', answer: '27', category: 'Multiplication' },
  { id: 'sd64', question: '5 × 8', answer: '40', category: 'Multiplication' },
  { id: 'sd65', question: '7 × 6', answer: '42', category: 'Multiplication' },
  { id: 'sd66', question: '9 × 4', answer: '36', category: 'Multiplication' },
  { id: 'sd67', question: '8 × 3', answer: '24', category: 'Multiplication' },
  { id: 'sd68', question: '6 × 5', answer: '30', category: 'Multiplication' },
  { id: 'sd69', question: '7 × 4', answer: '28', category: 'Multiplication' },
  { id: 'sd70', question: '9 × 3', answer: '27', category: 'Multiplication' },
  // Multiplication - larger
  { id: 'sd71', question: '12 × 5', answer: '60', category: 'Multiplication' },
  { id: 'sd72', question: '11 × 7', answer: '77', category: 'Multiplication' },
  { id: 'sd73', question: '12 × 8', answer: '96', category: 'Multiplication' },
  { id: 'sd74', question: '15 × 4', answer: '60', category: 'Multiplication' },
  { id: 'sd75', question: '20 × 6', answer: '120', category: 'Multiplication' },
  { id: 'sd76', question: '25 × 4', answer: '100', category: 'Multiplication' },
  { id: 'sd77', question: '11 × 11', answer: '121', category: 'Multiplication' },
  { id: 'sd78', question: '12 × 12', answer: '144', category: 'Multiplication' },
  { id: 'sd79', question: '10 × 10', answer: '100', category: 'Multiplication' },
  { id: 'sd80', question: '15 × 6', answer: '90', category: 'Multiplication' },
  // Division
  { id: 'sd81', question: '36 ÷ 4', answer: '9', category: 'Division' },
  { id: 'sd82', question: '48 ÷ 6', answer: '8', category: 'Division' },
  { id: 'sd83', question: '63 ÷ 7', answer: '9', category: 'Division' },
  { id: 'sd84', question: '72 ÷ 8', answer: '9', category: 'Division' },
  { id: 'sd85', question: '54 ÷ 6', answer: '9', category: 'Division' },
  { id: 'sd86', question: '42 ÷ 7', answer: '6', category: 'Division' },
  { id: 'sd87', question: '56 ÷ 8', answer: '7', category: 'Division' },
  { id: 'sd88', question: '45 ÷ 9', answer: '5', category: 'Division' },
  { id: 'sd89', question: '81 ÷ 9', answer: '9', category: 'Division' },
  { id: 'sd90', question: '64 ÷ 8', answer: '8', category: 'Division' },
  { id: 'sd91', question: '100 ÷ 5', answer: '20', category: 'Division' },
  { id: 'sd92', question: '120 ÷ 6', answer: '20', category: 'Division' },
  { id: 'sd93', question: '144 ÷ 12', answer: '12', category: 'Division' },
  { id: 'sd94', question: '96 ÷ 8', answer: '12', category: 'Division' },
  { id: 'sd95', question: '75 ÷ 5', answer: '15', category: 'Division' },
  // Mixed operations
  { id: 'sd96', question: '5 × 6 + 3', answer: '33', category: 'Mixed' },
  { id: 'sd97', question: '4 × 7 − 8', answer: '20', category: 'Mixed' },
  { id: 'sd98', question: '36 ÷ 4 + 5', answer: '14', category: 'Mixed' },
  { id: 'sd99', question: '8 × 3 − 12', answer: '12', category: 'Mixed' },
  { id: 'sd100', question: '50 ÷ 5 + 7', answer: '17', category: 'Mixed' },
  { id: 'sd101', question: '9 × 4 ÷ 6', answer: '6', category: 'Mixed' },
  { id: 'sd102', question: '7 × 8 − 16', answer: '40', category: 'Mixed' },
  { id: 'sd103', question: '24 ÷ 3 × 4', answer: '32', category: 'Mixed' },
  { id: 'sd104', question: '100 − 6 × 9', answer: '46', category: 'Mixed' },
  { id: 'sd105', question: '48 ÷ 8 × 7', answer: '42', category: 'Mixed' },
  // Doubles and halves
  { id: 'sd106', question: 'Double 35', answer: '70', category: 'Doubles' },
  { id: 'sd107', question: 'Double 48', answer: '96', category: 'Doubles' },
  { id: 'sd108', question: 'Double 75', answer: '150', category: 'Doubles' },
  { id: 'sd109', question: 'Half of 96', answer: '48', category: 'Doubles' },
  { id: 'sd110', question: 'Half of 150', answer: '75', category: 'Doubles' },
  // Squares
  { id: 'sd111', question: '4²', answer: '16', category: 'Squares' },
  { id: 'sd112', question: '5²', answer: '25', category: 'Squares' },
  { id: 'sd113', question: '6²', answer: '36', category: 'Squares' },
  { id: 'sd114', question: '7²', answer: '49', category: 'Squares' },
  { id: 'sd115', question: '8²', answer: '64', category: 'Squares' },
  { id: 'sd116', question: '9²', answer: '81', category: 'Squares' },
  { id: 'sd117', question: '10²', answer: '100', category: 'Squares' },
  { id: 'sd118', question: '11²', answer: '121', category: 'Squares' },
  { id: 'sd119', question: '12²', answer: '144', category: 'Squares' },
  { id: 'sd120', question: '3²', answer: '9', category: 'Squares' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 1: Arithmetic Operations (Most Important — Rank 1)
// ─────────────────────────────────────────────────────────────────
const arithmeticQuestions: Question[] = [
  { id: 'a1', question: '64 + 128 = ?', answer: '192', hints: ['Break it: 60+120 and 4+8.', 'Add ones: 4+8=12, carry 1. Then 6+2+1=9.', '64+128 = 192.'], topicId: 'arithmetic', difficulty: 'easy' },
  { id: 'a2', question: '50 − 29 = ?', answer: '21', hints: ['What number + 29 = 50?', 'Count up: 29→30 (+1), 30→50 (+20). Total added = 21.', '50−29 = 21.'], topicId: 'arithmetic', difficulty: 'easy' },
  { id: 'a3', question: 'A bookshelf has 5 shelves. Each shelf has 9 books. How many books total?', answer: '45', hints: ['Groups × items per group.', '5 × 9 = ? (5 times table).', '5 × 9 = 45 books.'], topicId: 'arithmetic', difficulty: 'easy' },
  { id: 'a4', question: 'Jay has 40 brownies shared equally among 5 friends. How many each?', answer: '8', hints: ['40 split into 5 equal groups.', '5 × ? = 40.', '40 ÷ 5 = 8 brownies each.'], topicId: 'arithmetic', difficulty: 'easy' },
  { id: 'a5', question: 'Alex bought 4 packs of pens. Each pack has 6 pens. How many pens total?', answer: '24', hints: ['Multiply packs by pens per pack.', '4 × 6 = ?', '4 × 6 = 24 pens.'], topicId: 'arithmetic', difficulty: 'easy' },
  { id: 'a6', question: '347 + 256 = ?', answer: '603', hints: ['Add column by column right to left.', '7+6=13 (write 3, carry 1). 4+5+1=10 (write 0, carry 1). 3+2+1=6.', '347+256 = 603.'], topicId: 'arithmetic', difficulty: 'medium' },
  { id: 'a7', question: '1000 − 375 = ?', answer: '625', hints: ['Borrow carefully from 1000.', '1000 − 400 = 600, then 600 + 25 = 625.', '1000 − 375 = 625.'], topicId: 'arithmetic', difficulty: 'medium' },
  { id: 'a8', question: 'A train travels 240 km in 3 hours. What is its average speed per hour?', answer: '80 km/h', hints: ['Speed = Distance ÷ Time.', '240 ÷ 3 = ? (3 × ? = 240).', '240 ÷ 3 = 80 km/h.'], topicId: 'arithmetic', difficulty: 'hard' },
  { id: 'a9', question: '36 students in a class. 1/4 are absent. How many are present?', answer: '27', hints: ['Find absent first, then subtract.', '1/4 of 36 = 36÷4 = 9 absent.', '36 − 9 = 27 present.'], topicId: 'arithmetic', difficulty: 'medium' },
  { id: 'a10', question: 'What is 15 × 12?', answer: '180', hints: ['Break it: 15 × 10 + 15 × 2.', '15×10=150, 15×2=30. Add them.', '150 + 30 = 180.'], topicId: 'arithmetic', difficulty: 'medium' },
  { id: 'a11', question: '456 + 378 = ?', answer: '834', hints: ['Add ones: 6+8=14, carry 1. Add tens: 5+7+1=13, carry 1. Add hundreds: 4+3+1=8.', '14 ones → write 4 carry 1. 13 tens → write 3 carry 1. 8 hundreds.', '456 + 378 = 834.'], topicId: 'arithmetic', difficulty: 'medium' },
  { id: 'a12', question: '900 − 648 = ?', answer: '252', hints: ['Borrow from hundreds. 900 − 600 = 300, then 300 − 48 = ?', '300 − 48: 300 − 50 = 250, + 2 = 252.', '900 − 648 = 252.'], topicId: 'arithmetic', difficulty: 'medium' },
  { id: 'a13', question: '7 × 8 × 2 = ?', answer: '112', hints: ['Multiply left to right: (7×8) first, then ×2.', '7×8 = 56. Then 56×2 = ?', '56 × 2 = 112.'], topicId: 'arithmetic', difficulty: 'medium' },
  { id: 'a14', question: 'If 6 pencils cost $1.20, how much does 1 pencil cost?', answer: '$0.20', hints: ['Divide the total cost by the number of pencils.', '$1.20 ÷ 6 = ?', '$1.20 ÷ 6 = $0.20 (20 cents).'], topicId: 'arithmetic', difficulty: 'medium' },
  { id: 'a15', question: 'What is 25 × 8?', answer: '200', hints: ['Think: 25 × 4 = 100, then double it.', '25 × 4 = 100. 25 × 8 = 100 × 2.', '25 × 8 = 200.'], topicId: 'arithmetic', difficulty: 'medium' },
  { id: 'a16', question: 'There are 144 students split equally into 12 classrooms. How many per room?', answer: '12', hints: ['Divide total students by number of rooms.', '144 ÷ 12 = ? (12 × ? = 144).', '12 × 12 = 144, so 144 ÷ 12 = 12.'], topicId: 'arithmetic', difficulty: 'medium' },
  { id: 'a17', question: '2,345 + 1,678 = ?', answer: '4,023', hints: ['Add column by column. Watch for carries.', '5+8=13, 4+7+1=12, 3+6+1=10, 2+1+1=4.', '2345 + 1678 = 4023.'], topicId: 'arithmetic', difficulty: 'hard' },
  { id: 'a18', question: 'A farmer has 8 rows of corn. Each row has 24 plants. How many plants total?', answer: '192', hints: ['Multiply rows by plants per row.', '8 × 24 = 8 × 20 + 8 × 4.', '160 + 32 = 192 plants.'], topicId: 'arithmetic', difficulty: 'hard' },
  { id: 'a19', question: 'What is 999 + 1?', answer: '1000', hints: ['Add 1 to 999.', '9+1=10 in ones place, carry 1. 9+1=10 in tens, carry 1. 9+1=10 in hundreds, carry 1.', '999 + 1 = 1000.'], topicId: 'arithmetic', difficulty: 'easy' },
  { id: 'a20', question: 'What is 500 ÷ 25?', answer: '20', hints: ['Think: 25 × ? = 500.', '25 × 20 = 500 (since 25 × 2 = 50, so 25 × 20 = 500).', '500 ÷ 25 = 20.'], topicId: 'arithmetic', difficulty: 'hard' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 2: Word Problems (Rank 2)
// ─────────────────────────────────────────────────────────────────
const wordProblemQuestions: Question[] = [
  { id: 'wp1', question: 'Patricia is 10. Lisa is 3 years older than Patricia. Matthew is 5 years younger than Lisa. How old is Matthew?', answer: '8', hints: ['Find Lisa first, then Matthew.', 'Lisa = 10+3 = 13. Matthew = 13−5 = ?', '13 − 5 = 8 years old.'], topicId: 'word-problems', difficulty: 'medium' },
  { id: 'wp2', question: 'John has twice as many marbles as Anna. Together they have 45. How many does John have?', answer: '30', hints: ['If Anna = A, John = 2A. Together = 3A = 45.', 'A = 45 ÷ 3 = 15. John = 2 × 15.', 'John has 30 marbles.'], topicId: 'word-problems', difficulty: 'hard' },
  { id: 'wp3', question: 'Jill types 15 words per minute. How long to type a 90-word poem?', answer: '6 minutes', hints: ['Divide total words by words per minute.', '90 ÷ 15 = ?', '90 ÷ 15 = 6 minutes.'], topicId: 'word-problems', difficulty: 'medium' },
  { id: 'wp4', question: 'Amelia earns 50 cents per half mile in a walkathon. She raised $6.00. How many miles did she walk?', answer: '6 miles', hints: ['Find how many half-miles, then convert.', '$6.00 ÷ $0.50 = 12 half-miles.', '12 half-miles = 6 full miles.'], topicId: 'word-problems', difficulty: 'hard' },
  { id: 'wp5', question: 'Sarah has 3 times as many stickers as Tom. Together they have 32. How many does Sarah have?', answer: '24', hints: ['Tom = T, Sarah = 3T. T + 3T = 4T = 32.', 'T = 32 ÷ 4 = 8.', 'Sarah = 3 × 8 = 24 stickers.'], topicId: 'word-problems', difficulty: 'hard' },
  { id: 'wp6', question: 'A cinema has 12 rows. Row 1 has 10 seats, Row 2 has 12, Row 3 has 14, and so on. How many seats in Row 12?', answer: '32', hints: ['Each row adds 2 seats. Find the pattern.', 'Row n = 10 + (n−1) × 2.', 'Row 12 = 10 + 11×2 = 10+22 = 32 seats.'], topicId: 'word-problems', difficulty: 'hard' },
  { id: 'wp7', question: 'A recipe needs 3 cups of flour per batch. Jessica makes 4 batches. How many cups total?', answer: '12 cups', hints: ['Multiply cups per batch by number of batches.', '3 × 4 = ?', '3 × 4 = 12 cups.'], topicId: 'word-problems', difficulty: 'easy' },
  { id: 'wp8', question: 'Mike is 15. His sister Sarah is 6 younger. Their cousin Ben is 4 older than Sarah. How old is Ben?', answer: '13', hints: ['Find Sarah first, then Ben.', 'Sarah = 15−6 = 9. Ben = 9+4 = ?', 'Ben is 13 years old.'], topicId: 'word-problems', difficulty: 'medium' },
  { id: 'wp9', question: 'A car travels at 60 mph. How far does it travel in 2.5 hours?', answer: '150 miles', hints: ['Distance = Speed × Time.', '60 × 2.5 = 60 × 2 + 60 × 0.5.', '120 + 30 = 150 miles.'], topicId: 'word-problems', difficulty: 'medium' },
  { id: 'wp10', question: 'Tom has $24. He spends $7 on lunch and $9 on a book. How much does he have left?', answer: '$8', hints: ['Subtract both purchases from $24.', '$24 − $7 = $17. Then $17 − $9 = ?', '$17 − $9 = $8.'], topicId: 'word-problems', difficulty: 'easy' },
  { id: 'wp11', question: 'A school has 6 classes. Each class has 28 students. How many students in total?', answer: '168', hints: ['Multiply classes by students per class.', '6 × 28 = 6 × 20 + 6 × 8.', '120 + 48 = 168 students.'], topicId: 'word-problems', difficulty: 'medium' },
  { id: 'wp12', question: 'Lisa has 3 times as many books as Mark. Lisa has 36 books. How many does Mark have?', answer: '12', hints: ['Lisa = 3 × Mark. So Mark = Lisa ÷ 3.', '36 ÷ 3 = ?', '36 ÷ 3 = 12 books.'], topicId: 'word-problems', difficulty: 'easy' },
  { id: 'wp13', question: 'A bus holds 48 passengers. If 3/4 of the seats are filled, how many passengers are on the bus?', answer: '36', hints: ['Find 3/4 of 48.', '1/4 of 48 = 12. So 3/4 = 3 × 12.', '3 × 12 = 36 passengers.'], topicId: 'word-problems', difficulty: 'medium' },
  { id: 'wp14', question: 'A store sells apples for 25 cents each. How much do 12 apples cost?', answer: '$3.00', hints: ['Multiply price per apple by number of apples.', '25 cents × 12 = ? cents.', '25 × 12 = 300 cents = $3.00.'], topicId: 'word-problems', difficulty: 'medium' },
  { id: 'wp15', question: 'There are 5 boxes. Each box has 8 rows of 6 chocolates. How many chocolates total?', answer: '240', hints: ['First find chocolates per box, then multiply by boxes.', 'Per box: 8 × 6 = 48. Total: 48 × 5.', '48 × 5 = 240 chocolates.'], topicId: 'word-problems', difficulty: 'hard' },
  { id: 'wp16', question: 'A swimming pool is 25 meters long. Sam swims 8 lengths. How many meters does he swim?', answer: '200 meters', hints: ['Multiply pool length by number of lengths.', '25 × 8 = ?', '25 × 8 = 200 meters.'], topicId: 'word-problems', difficulty: 'easy' },
  { id: 'wp17', question: 'A bag of rice weighs 5 kg. A store has 24 such bags. What is the total weight?', answer: '120 kg', hints: ['Multiply weight per bag by number of bags.', '5 × 24 = 5 × 20 + 5 × 4.', '100 + 20 = 120 kg.'], topicId: 'word-problems', difficulty: 'medium' },
  { id: 'wp18', question: 'Emma reads 15 pages per day. How many days to finish a 180-page book?', answer: '12 days', hints: ['Divide total pages by pages per day.', '180 ÷ 15 = ?', '180 ÷ 15 = 12 days.'], topicId: 'word-problems', difficulty: 'medium' },
  { id: 'wp19', question: 'A number is multiplied by 7 and then 14 is added. The result is 63. What is the number?', answer: '7', hints: ['Work backwards: subtract 14 first, then divide by 7.', '63 − 14 = 49. 49 ÷ 7 = ?', '49 ÷ 7 = 7.'], topicId: 'word-problems', difficulty: 'hard' },
  { id: 'wp20', question: 'A garden has 9 rows of flowers. Each row has 15 flowers. 27 flowers are picked. How many remain?', answer: '108', hints: ['Find total flowers, then subtract picked.', '9 × 15 = 135 total. 135 − 27 = ?', '135 − 27 = 108 flowers.'], topicId: 'word-problems', difficulty: 'hard' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 3: Place Value (Rank 3)
// ─────────────────────────────────────────────────────────────────
const placeValueQuestions: Question[] = [
  { id: 'pv1', question: 'What is the value of the digit 7 in 3,742?', answer: '700', hints: ['Which place is 7 in? Ones, tens, hundreds, or thousands?', 'In 3,742: 3=thousands, 7=hundreds, 4=tens, 2=ones.', '7 is in hundreds place: 7 × 100 = 700.'], topicId: 'place-value', difficulty: 'easy' },
  { id: 'pv2', question: 'Write: 4 thousands, 3 hundreds, 0 tens, 8 ones.', answer: '4308', hints: ['Build the number place by place.', '4000 + 300 + 0 + 8 = ?', '4000 + 300 + 8 = 4308.'], topicId: 'place-value', difficulty: 'easy' },
  { id: 'pv3', question: 'What is 100 more than 4,756?', answer: '4,856', hints: ['Adding 100 changes only the hundreds digit.', '7 hundreds + 1 hundred = 8 hundreds.', '4,756 + 100 = 4,856.'], topicId: 'place-value', difficulty: 'easy' },
  { id: 'pv4', question: 'Round 3,847 to the nearest hundred.', answer: '3,800', hints: ['Look at the tens digit to decide.', 'Tens digit is 4. Since 4 < 5, round down.', '3,847 → 3,800.'], topicId: 'place-value', difficulty: 'medium' },
  { id: 'pv5', question: 'What are the next two numbers? 107, 102, 51, 46, 23, 18, ___, ___', answer: '9, 4', hints: ['The pattern alternates two operations.', 'Subtract 5, then divide by 2. 18÷2=9, 9−5=?', '9 − 5 = 4. Next two: 9 and 4.'], topicId: 'place-value', difficulty: 'hard' },
  { id: 'pv6', question: 'What is the digit in the tens place of 5,839?', answer: '3', hints: ['Count the places from right: ones, tens, hundreds, thousands.', '5,839: 9=ones, 3=tens, 8=hundreds, 5=thousands.', 'The tens digit is 3.'], topicId: 'place-value', difficulty: 'easy' },
  { id: 'pv7', question: 'Round 2,563 to the nearest thousand.', answer: '3,000', hints: ['Look at the hundreds digit to decide.', 'Hundreds digit is 5. Since 5 ≥ 5, round up.', '2,563 → 3,000.'], topicId: 'place-value', difficulty: 'medium' },
  { id: 'pv8', question: 'What is 1,000 less than 7,432?', answer: '6,432', hints: ['Subtracting 1,000 changes only the thousands digit.', '7 thousands − 1 thousand = 6 thousands.', '7,432 − 1,000 = 6,432.'], topicId: 'place-value', difficulty: 'easy' },
  { id: 'pv9', question: 'Which number has a 5 in the hundreds place? (a) 5,234 (b) 3,512 (c) 2,354 (d) 4,523', answer: '(b) 3,512', hints: ['Hundreds place is the third digit from the right.', 'Check each: 5,234 → 2 in hundreds. 3,512 → 5 in hundreds!', 'Answer: (b) 3,512.'], topicId: 'place-value', difficulty: 'medium' },
  { id: 'pv10', question: 'Write the number 6,000 + 400 + 70 + 9 in standard form.', answer: '6,479', hints: ['Add each place value together.', '6 thousands = 6000, 4 hundreds = 400, 7 tens = 70, 9 ones = 9.', '6000 + 400 + 70 + 9 = 6,479.'], topicId: 'place-value', difficulty: 'easy' },
  { id: 'pv11', question: 'What is 10 more than 3,995?', answer: '4,005', hints: ['Add 10 to 3,995. Watch for carrying.', '3,995 + 10: 5+10=15 in tens, carry 1. 9+1=10 in hundreds, carry 1. 9+1=10, carry 1.', '3,995 + 10 = 4,005.'], topicId: 'place-value', difficulty: 'medium' },
  { id: 'pv12', question: 'What is the largest 4-digit number you can make with digits 3, 7, 1, 9?', answer: '9,731', hints: ['To make the largest number, put the biggest digit first.', 'Arrange digits from largest to smallest: 9, 7, 3, 1.', 'The largest number is 9,731.'], topicId: 'place-value', difficulty: 'medium' },
  { id: 'pv13', question: 'Round 4,450 to the nearest hundred.', answer: '4,500', hints: ['Look at the tens digit.', 'Tens digit is 5. Since 5 ≥ 5, round up.', '4,450 → 4,500.'], topicId: 'place-value', difficulty: 'medium' },
  { id: 'pv14', question: 'What is 100 less than 3,007?', answer: '2,907', hints: ['Subtract 100 from 3,007. Watch for borrowing.', '3,007 − 100: hundreds digit 0 needs to borrow from thousands.', '3,007 − 100 = 2,907.'], topicId: 'place-value', difficulty: 'medium' },
  { id: 'pv15', question: 'What is the smallest 4-digit number using digits 2, 8, 0, 5 (each once)?', answer: '2,058', hints: ['To make the smallest number, put the smallest non-zero digit first.', 'Smallest non-zero digit is 2. Then arrange rest: 0, 5, 8.', 'Smallest number: 2,058.'], topicId: 'place-value', difficulty: 'hard' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 4: Fractions (Rank 4)
// ─────────────────────────────────────────────────────────────────
const fractionQuestions: Question[] = [
  { id: 'f1', question: 'A pizza has 10 slices. Jane eats 3, Mike eats 2. What fraction remains?', answer: '1/2', hints: ['Find slices eaten, then slices left.', '3+2=5 eaten. 10−5=5 left. 5 out of 10 = ?', '5/10 = 1/2.'], topicId: 'fractions', difficulty: 'easy' },
  { id: 'f2', question: '24 students in a class. 1/3 are girls. How many boys?', answer: '16', hints: ['Find girls first, then subtract.', '1/3 of 24 = 24÷3 = 8 girls.', '24 − 8 = 16 boys.'], topicId: 'fractions', difficulty: 'easy' },
  { id: 'f3', question: 'Which is larger: 3/4 or 2/3?', answer: '3/4', hints: ['Find a common denominator.', 'LCD of 4 and 3 is 12. 3/4=9/12, 2/3=8/12.', '9/12 > 8/12, so 3/4 is larger.'], topicId: 'fractions', difficulty: 'medium' },
  { id: 'f4', question: 'A box has 24 chocolates. 1/4 are dark. How many are milk chocolate?', answer: '18', hints: ['Find dark chocolates first.', '1/4 of 24 = 6 dark.', '24 − 6 = 18 milk chocolates.'], topicId: 'fractions', difficulty: 'easy' },
  { id: 'f5', question: '60 students in a club. 3/5 are boys. How many girls?', answer: '24', hints: ['Find boys first, then subtract.', '3/5 of 60 = (60÷5)×3 = 36 boys.', '60 − 36 = 24 girls.'], topicId: 'fractions', difficulty: 'medium' },
  { id: 'f6', question: 'What is 1/2 + 1/4?', answer: '3/4', hints: ['Find a common denominator.', '1/2 = 2/4. Now add 2/4 + 1/4.', '2/4 + 1/4 = 3/4.'], topicId: 'fractions', difficulty: 'easy' },
  { id: 'f7', question: 'What is 3/4 − 1/4?', answer: '1/2', hints: ['Same denominator, just subtract numerators.', '3/4 − 1/4 = (3−1)/4 = 2/4.', '2/4 = 1/2.'], topicId: 'fractions', difficulty: 'easy' },
  { id: 'f8', question: 'Order from smallest to largest: 1/2, 1/3, 1/4, 1/6', answer: '1/6, 1/4, 1/3, 1/2', hints: ['Larger denominator = smaller fraction (when numerator is 1).', '1/6 < 1/4 < 1/3 < 1/2.', 'Smallest to largest: 1/6, 1/4, 1/3, 1/2.'], topicId: 'fractions', difficulty: 'medium' },
  { id: 'f9', question: 'A ribbon is 3/4 meter long. Another is 1/2 meter. What is the total length?', answer: '5/4 or 1 1/4 meters', hints: ['Add the fractions. Find a common denominator.', '3/4 + 1/2 = 3/4 + 2/4.', '3/4 + 2/4 = 5/4 = 1 and 1/4 meters.'], topicId: 'fractions', difficulty: 'medium' },
  { id: 'f10', question: 'What fraction of 20 is 5?', answer: '1/4', hints: ['Write it as a fraction: 5 out of 20.', '5/20 — can you simplify this?', '5/20 = 1/4.'], topicId: 'fractions', difficulty: 'easy' },
  { id: 'f11', question: 'A class has 30 students. 2/5 wear glasses. How many wear glasses?', answer: '12', hints: ['Find 2/5 of 30.', '1/5 of 30 = 6. So 2/5 = 2 × 6.', '2 × 6 = 12 students wear glasses.'], topicId: 'fractions', difficulty: 'medium' },
  { id: 'f12', question: 'Which is smaller: 5/8 or 3/5?', answer: '3/5', hints: ['Find a common denominator of 8 and 5.', 'LCD = 40. 5/8 = 25/40. 3/5 = 24/40.', '24/40 < 25/40, so 3/5 is smaller.'], topicId: 'fractions', difficulty: 'hard' },
  { id: 'f13', question: 'What is 2/3 of 18?', answer: '12', hints: ['Divide by denominator, then multiply by numerator.', '18 ÷ 3 = 6. Then 6 × 2 = ?', '6 × 2 = 12.'], topicId: 'fractions', difficulty: 'easy' },
  { id: 'f14', question: 'A pie is cut into 8 equal slices. 3 slices are eaten. What fraction is left?', answer: '5/8', hints: ['Slices left = total − eaten.', '8 − 3 = 5 slices left.', '5 out of 8 = 5/8.'], topicId: 'fractions', difficulty: 'easy' },
  { id: 'f15', question: 'What is 3/4 of 48?', answer: '36', hints: ['Divide by 4, then multiply by 3.', '48 ÷ 4 = 12. Then 12 × 3 = ?', '12 × 3 = 36.'], topicId: 'fractions', difficulty: 'medium' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 5: Money (Rank 5)
// ─────────────────────────────────────────────────────────────────
const moneyQuestions: Question[] = [
  { id: 'm1', question: 'Mary has 5 quarters, 10 dimes, 3 nickels, 7 pennies. How much money?', answer: '$2.47', hints: ['Convert each: quarter=25¢, dime=10¢, nickel=5¢, penny=1¢.', '5×25=125, 10×10=100, 3×5=15, 7×1=7. Add all.', '125+100+15+7 = 247¢ = $2.47.'], topicId: 'money', difficulty: 'medium' },
  { id: 'm2', question: 'Jack has 4 quarters, 6 dimes, 8 nickels. How much total?', answer: '$2.00', hints: ['4×25=100¢, 6×10=60¢, 8×5=40¢.', '100+60+40 = 200¢.', '200¢ = $2.00.'], topicId: 'money', difficulty: 'medium' },
  { id: 'm3', question: 'Mia has $18. She buys a toy for $12. How much left?', answer: '$6', hints: ['Subtract cost from amount.', '$18 − $12 = ?', '$18 − $12 = $6.'], topicId: 'money', difficulty: 'easy' },
  { id: 'm4', question: '8 friends split a $96 restaurant bill evenly. How much each?', answer: '$12', hints: ['Divide total by number of people.', '$96 ÷ 8 = ?', '$96 ÷ 8 = $12 each.'], topicId: 'money', difficulty: 'easy' },
  { id: 'm5', question: 'Emily saves $45 per month. How much in 8 months?', answer: '$360', hints: ['Multiply monthly savings by months.', '$45 × 8 = ?', '$45 × 8 = $360.'], topicId: 'money', difficulty: 'easy' },
  { id: 'm6', question: 'A toy costs $7.50. You pay with $10. How much change?', answer: '$2.50', hints: ['Subtract price from amount paid.', '$10.00 − $7.50 = ?', '$10.00 − $7.50 = $2.50.'], topicId: 'money', difficulty: 'easy' },
  { id: 'm7', question: 'Pencils cost 35¢ each. How much for 6 pencils?', answer: '$2.10', hints: ['Multiply price by quantity.', '35¢ × 6 = ? cents.', '35 × 6 = 210¢ = $2.10.'], topicId: 'money', difficulty: 'medium' },
  { id: 'm8', question: 'A book costs $4.75 and a pen costs $1.25. How much together?', answer: '$6.00', hints: ['Add the two prices.', '$4.75 + $1.25 = ?', '$4.75 + $1.25 = $6.00.'], topicId: 'money', difficulty: 'easy' },
  { id: 'm9', question: 'You have $5.00. You buy 3 items at $1.25 each. How much left?', answer: '$1.25', hints: ['Find total cost, then subtract from $5.00.', '3 × $1.25 = $3.75 total cost.', '$5.00 − $3.75 = $1.25.'], topicId: 'money', difficulty: 'medium' },
  { id: 'm10', question: 'A store has a 25% discount on a $40 item. What is the sale price?', answer: '$30', hints: ['Find 25% of $40, then subtract.', '25% of $40 = $40 ÷ 4 = $10 discount.', '$40 − $10 = $30.'], topicId: 'money', difficulty: 'hard' },
  { id: 'm11', question: 'How many quarters make $3.75?', answer: '15', hints: ['Each quarter = 25¢. Divide total cents by 25.', '$3.75 = 375¢. 375 ÷ 25 = ?', '375 ÷ 25 = 15 quarters.'], topicId: 'money', difficulty: 'medium' },
  { id: 'm12', question: 'A bag of apples costs $2.40. How much for 5 bags?', answer: '$12.00', hints: ['Multiply price per bag by number of bags.', '$2.40 × 5 = ?', '$2.40 × 5 = $12.00.'], topicId: 'money', difficulty: 'medium' },
  { id: 'm13', question: 'Jake earns $8 per hour. He works 6 hours. He spends $15. How much does he have left?', answer: '$33', hints: ['Find earnings first, then subtract spending.', '8 × 6 = $48 earned. $48 − $15 = ?', '$48 − $15 = $33.'], topicId: 'money', difficulty: 'medium' },
  { id: 'm14', question: 'A lemonade stand earns $0.50 per cup. They sell 34 cups. How much earned?', answer: '$17.00', hints: ['Multiply price per cup by cups sold.', '$0.50 × 34 = ?', '0.50 × 34 = $17.00.'], topicId: 'money', difficulty: 'medium' },
  { id: 'm15', question: 'How many dimes equal $4.50?', answer: '45', hints: ['Each dime = 10¢. Divide total cents by 10.', '$4.50 = 450¢. 450 ÷ 10 = ?', '450 ÷ 10 = 45 dimes.'], topicId: 'money', difficulty: 'easy' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 6: Time (Rank 6)
// ─────────────────────────────────────────────────────────────────
const timeQuestions: Question[] = [
  { id: 't1', question: 'How many seconds in 9 minutes?', answer: '540', hints: ['60 seconds in 1 minute.', '9 × 60 = ?', '9 × 60 = 540 seconds.'], topicId: 'time', difficulty: 'easy' },
  { id: 't2', question: 'What is 19:35 in standard time (AM/PM)?', answer: '7:35 PM', hints: ['Hours ≥ 13 means PM. Subtract 12.', '19 − 12 = 7. So 7:__ PM.', '19:35 = 7:35 PM.'], topicId: 'time', difficulty: 'medium' },
  { id: 't3', question: 'Bus arrives every 15 min from 8:00 AM. You arrive at 9:20 AM. How long to wait?', answer: '10 minutes', hints: ['List bus times: 8:00, 8:15, 8:30... 9:15, 9:30.', 'Last bus before 9:20 was 9:15. Next is 9:30.', '9:30 − 9:20 = 10 minutes.'], topicId: 'time', difficulty: 'medium' },
  { id: 't4', question: 'How many minutes in 3 hours 45 minutes?', answer: '225', hints: ['Convert hours to minutes, then add.', '3 × 60 = 180 minutes.', '180 + 45 = 225 minutes.'], topicId: 'time', difficulty: 'easy' },
  { id: 't5', question: 'A movie starts at 2:45 PM and lasts 1 hour 50 minutes. When does it end?', answer: '4:35 PM', hints: ['Add 1 hour first, then add 50 minutes.', '2:45 + 1 hour = 3:45. Then 3:45 + 50 min.', '3:45 + 50 min = 4:35 PM.'], topicId: 'time', difficulty: 'medium' },
  { id: 't6', question: 'How many hours in 3 days?', answer: '72', hints: ['24 hours in 1 day.', '3 × 24 = ?', '3 × 24 = 72 hours.'], topicId: 'time', difficulty: 'easy' },
  { id: 't7', question: 'A class starts at 8:30 AM and ends at 11:15 AM. How long is the class?', answer: '2 hours 45 minutes', hints: ['Count from 8:30 to 11:15.', '8:30 to 11:30 = 3 hours. But 11:15 is 15 min before 11:30.', '3 hours − 15 min = 2 hours 45 minutes.'], topicId: 'time', difficulty: 'medium' },
  { id: 't8', question: 'What is 14:20 in standard time?', answer: '2:20 PM', hints: ['14 ≥ 13, so it is PM. Subtract 12.', '14 − 12 = 2.', '14:20 = 2:20 PM.'], topicId: 'time', difficulty: 'easy' },
  { id: 't9', question: 'How many minutes in 1 week?', answer: '10,080', hints: ['1 week = 7 days. 1 day = 24 hours. 1 hour = 60 minutes.', '7 × 24 = 168 hours. 168 × 60 = ?', '168 × 60 = 10,080 minutes.'], topicId: 'time', difficulty: 'hard' },
  { id: 't10', question: 'Sam starts homework at 4:15 PM and finishes at 5:40 PM. How long did it take?', answer: '1 hour 25 minutes', hints: ['Count from 4:15 to 5:40.', '4:15 to 5:15 = 1 hour. 5:15 to 5:40 = 25 min.', '1 hour + 25 min = 1 hour 25 minutes.'], topicId: 'time', difficulty: 'medium' },
  { id: 't11', question: 'A train leaves at 9:45 AM and arrives at 1:30 PM. How long is the journey?', answer: '3 hours 45 minutes', hints: ['Count from 9:45 AM to 1:30 PM.', '9:45 to 1:45 = 4 hours. But 1:30 is 15 min before 1:45.', '4 hours − 15 min = 3 hours 45 minutes.'], topicId: 'time', difficulty: 'hard' },
  { id: 't12', question: 'How many seconds in 1 hour?', answer: '3,600', hints: ['1 hour = 60 minutes. 1 minute = 60 seconds.', '60 × 60 = ?', '60 × 60 = 3,600 seconds.'], topicId: 'time', difficulty: 'medium' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 7: Measurement (Rank 7)
// ─────────────────────────────────────────────────────────────────
const measurementQuestions: Question[] = [
  { id: 'me1', question: 'A rectangular garden: length 15 m, width 8 m. What is the perimeter?', answer: '46 meters', hints: ['Perimeter = total distance around.', 'P = 2 × (length + width).', '2 × (15+8) = 2 × 23 = 46 m.'], topicId: 'measurement', difficulty: 'easy' },
  { id: 'me2', question: 'A floor is 12 ft long and 8 ft wide. How many 1×1 ft tiles needed?', answer: '96', hints: ['Area = length × width.', '12 × 8 = ?', '12 × 8 = 96 tiles.'], topicId: 'measurement', difficulty: 'easy' },
  { id: 'me3', question: 'Perimeter of a square garden is 36 m. What is each side?', answer: '9 meters', hints: ['Square has 4 equal sides. P = 4 × side.', '4 × side = 36. Side = 36 ÷ 4.', '36 ÷ 4 = 9 meters.'], topicId: 'measurement', difficulty: 'easy' },
  { id: 'me4', question: 'Sam builds a fence around a 5 yd × 7 yd garden. How many feet of fencing? (1 yd = 3 ft)', answer: '72 feet', hints: ['Find perimeter in yards, then convert.', 'P = 2×(5+7) = 24 yards. 24 × 3 = ?', '24 × 3 = 72 feet.'], topicId: 'measurement', difficulty: 'hard' },
  { id: 'me5', question: 'Two containers: 8 L 450 mL and 5 L 320 mL poured into one with 3 L 750 mL. Total?', answer: '17 L 520 mL', hints: ['Add liters and milliliters separately.', 'L: 8+5+3=16. mL: 450+320+750=1520 mL.', '1520 mL = 1 L 520 mL. Total: 17 L 520 mL.'], topicId: 'measurement', difficulty: 'hard' },
  { id: 'me6', question: 'A rectangle is 9 cm long and 5 cm wide. What is its area?', answer: '45 sq cm', hints: ['Area = length × width.', '9 × 5 = ?', '9 × 5 = 45 square cm.'], topicId: 'measurement', difficulty: 'easy' },
  { id: 'me7', question: 'How many centimeters in 3.5 meters?', answer: '350 cm', hints: ['1 meter = 100 centimeters.', '3.5 × 100 = ?', '3.5 × 100 = 350 cm.'], topicId: 'measurement', difficulty: 'easy' },
  { id: 'me8', question: 'A room is 18 ft long and 12 ft wide. How many 1×1 ft tiles needed?', answer: '216', hints: ['Area = length × width.', '18 × 12 = 18 × 10 + 18 × 2.', '180 + 36 = 216 tiles.'], topicId: 'measurement', difficulty: 'medium' },
  { id: 'me9', question: 'A triangle has base 8 m and height 6 m. What is its area?', answer: '24 sq m', hints: ['Area of triangle = (base × height) ÷ 2.', '(8 × 6) ÷ 2 = 48 ÷ 2.', '48 ÷ 2 = 24 square meters.'], topicId: 'measurement', difficulty: 'medium' },
  { id: 'me10', question: 'How many milliliters in 2.5 liters?', answer: '2,500 mL', hints: ['1 liter = 1,000 milliliters.', '2.5 × 1000 = ?', '2.5 × 1000 = 2,500 mL.'], topicId: 'measurement', difficulty: 'easy' },
  { id: 'me11', question: 'A square has perimeter 28 cm. What is its area?', answer: '49 sq cm', hints: ['Find side length first, then calculate area.', 'Side = 28 ÷ 4 = 7 cm. Area = 7 × 7.', '7 × 7 = 49 square cm.'], topicId: 'measurement', difficulty: 'medium' },
  { id: 'me12', question: 'How many grams in 3.2 kilograms?', answer: '3,200 g', hints: ['1 kilogram = 1,000 grams.', '3.2 × 1000 = ?', '3.2 × 1000 = 3,200 grams.'], topicId: 'measurement', difficulty: 'easy' },
  { id: 'me13', question: 'A path is 1.5 km long. How many meters is that?', answer: '1,500 m', hints: ['1 km = 1,000 meters.', '1.5 × 1000 = ?', '1.5 × 1000 = 1,500 meters.'], topicId: 'measurement', difficulty: 'easy' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 8: Number Patterns & Sequences (Rank 8)
// ─────────────────────────────────────────────────────────────────
const patternQuestions: Question[] = [
  { id: 'np1', question: 'Next three numbers: 4, 5, 9, 10, 16, 17, 25, 26, ___, ___, ___', answer: '36, 37, 49', hints: ['Look at pairs: (4,5),(9,10),(16,17),(25,26)...', 'First of each pair: 4,9,16,25 = perfect squares! 6²=?', '6²=36, pair=(36,37). Next: 7²=49. Answer: 36, 37, 49.'], topicId: 'patterns', difficulty: 'hard' },
  { id: 'np2', question: 'What comes next? 2, 4, 8, 16, 32, ___', answer: '64', hints: ['Each number is multiplied by something.', 'Each term × 2: 2×2=4, 4×2=8...', '32 × 2 = 64.'], topicId: 'patterns', difficulty: 'easy' },
  { id: 'np3', question: 'What comes next? 1, 4, 9, 16, 25, ___', answer: '36', hints: ['These are special numbers (n × n).', '1=1², 4=2², 9=3², 16=4², 25=5². Next: 6²=?', '6 × 6 = 36.'], topicId: 'patterns', difficulty: 'medium' },
  { id: 'np4', question: 'Fill in the missing number: 3, 6, ___, 12, 15', answer: '9', hints: ['Find the difference between terms.', 'Difference is always 3. 6 + 3 = ?', '6 + 3 = 9.'], topicId: 'patterns', difficulty: 'easy' },
  { id: 'np5', question: 'What are the next two numbers? 1, 1, 2, 3, 5, 8, 13, ___, ___', answer: '21, 34', hints: ['Each number is the sum of the two before it.', '5+8=13, 8+13=21, 13+21=?', '13+21=34. Next two: 21 and 34.'], topicId: 'patterns', difficulty: 'hard' },
  { id: 'np6', question: 'What comes next? 100, 91, 82, 73, 64, ___', answer: '55', hints: ['Find the difference between each term.', 'Each term decreases by 9.', '64 − 9 = 55.'], topicId: 'patterns', difficulty: 'easy' },
  { id: 'np7', question: 'What is the missing number? 5, 10, ___, 20, 25', answer: '15', hints: ['Find the pattern.', 'Each term adds 5.', '10 + 5 = 15.'], topicId: 'patterns', difficulty: 'easy' },
  { id: 'np8', question: 'What comes next? 1, 3, 6, 10, 15, ___', answer: '21', hints: ['Look at the differences: 2, 3, 4, 5...', 'Each difference increases by 1. Next difference = 6.', '15 + 6 = 21.'], topicId: 'patterns', difficulty: 'medium' },
  { id: 'np9', question: 'What are the next two? 2, 6, 18, 54, ___, ___', answer: '162, 486', hints: ['Each number is multiplied by something.', 'Each term × 3: 2×3=6, 6×3=18, 18×3=54...', '54×3=162, 162×3=486.'], topicId: 'patterns', difficulty: 'medium' },
  { id: 'np10', question: 'What comes next? 81, 27, 9, 3, ___', answer: '1', hints: ['Each number is divided by something.', 'Each term ÷ 3: 81÷3=27, 27÷3=9, 9÷3=3...', '3 ÷ 3 = 1.'], topicId: 'patterns', difficulty: 'medium' },
  { id: 'np11', question: 'Fill in: 2, 5, 11, 23, ___, ___', answer: '47, 95', hints: ['Look at the relationship: multiply then add.', 'Each term: ×2 then +1. 2×2+1=5, 5×2+1=11, 11×2+1=23...', '23×2+1=47, 47×2+1=95.'], topicId: 'patterns', difficulty: 'hard' },
  { id: 'np12', question: 'What is the 10th term in the sequence: 4, 7, 10, 13, ...?', answer: '31', hints: ['Find the common difference and use the formula.', 'Difference = 3. Term n = 4 + (n−1) × 3.', 'Term 10 = 4 + 9×3 = 4 + 27 = 31.'], topicId: 'patterns', difficulty: 'hard' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 9: Geometry (Rank 9)
// ─────────────────────────────────────────────────────────────────
const geometryQuestions: Question[] = [
  { id: 'g1', question: 'Triangle: base 8 m, height 6 m. What is the area?', answer: '24 sq m', hints: ['Area = (base × height) ÷ 2.', '(8 × 6) ÷ 2 = 48 ÷ 2.', '48 ÷ 2 = 24 sq m.'], topicId: 'geometry', difficulty: 'medium' },
  { id: 'g2', question: 'Room is 18 ft × 12 ft. How many 1×1 ft tiles needed?', answer: '216', hints: ['Area = length × width.', '18 × 12 = ?', '18 × 12 = 216 tiles.'], topicId: 'geometry', difficulty: 'easy' },
  { id: 'g3', question: 'How many sides does a hexagon have?', answer: '6', hints: ['"Hex" means six in Greek.', 'A honeycomb cell is a hexagon.', 'A hexagon has 6 sides.'], topicId: 'geometry', difficulty: 'easy' },
  { id: 'g4', question: 'Area of a square with side 7 cm?', answer: '49 sq cm', hints: ['Area = side × side.', '7 × 7 = ?', '7 × 7 = 49 sq cm.'], topicId: 'geometry', difficulty: 'easy' },
  { id: 'g5', question: 'How many angles does a triangle have?', answer: '3', hints: ['Count the corners of a triangle.', 'A triangle has 3 sides.', 'A triangle has 3 angles.'], topicId: 'geometry', difficulty: 'easy' },
  { id: 'g6', question: 'What is the perimeter of a rectangle 9 cm × 4 cm?', answer: '26 cm', hints: ['P = 2 × (length + width).', '2 × (9 + 4) = 2 × 13.', '2 × 13 = 26 cm.'], topicId: 'geometry', difficulty: 'easy' },
  { id: 'g7', question: 'A square has area 64 sq cm. What is its side length?', answer: '8 cm', hints: ['Area = side². Find the square root.', 'What number × itself = 64?', '8 × 8 = 64. Side = 8 cm.'], topicId: 'geometry', difficulty: 'medium' },
  { id: 'g8', question: 'How many faces does a cube have?', answer: '6', hints: ['Think of a dice. Count the flat surfaces.', 'Top, bottom, front, back, left, right.', 'A cube has 6 faces.'], topicId: 'geometry', difficulty: 'easy' },
  { id: 'g9', question: 'What is the sum of angles in a triangle?', answer: '180 degrees', hints: ['This is a key geometry fact to memorize.', 'All three angles of any triangle add up to the same amount.', 'The angles of a triangle always sum to 180°.'], topicId: 'geometry', difficulty: 'medium' },
  { id: 'g10', question: 'A rectangle has area 48 sq cm and width 6 cm. What is its length?', answer: '8 cm', hints: ['Area = length × width. Solve for length.', '48 = length × 6. Length = 48 ÷ 6.', '48 ÷ 6 = 8 cm.'], topicId: 'geometry', difficulty: 'medium' },
  { id: 'g11', question: 'How many vertices does a pentagon have?', answer: '5', hints: ['"Penta" means five.', 'A pentagon has 5 sides.', 'A pentagon has 5 vertices (corners).'], topicId: 'geometry', difficulty: 'easy' },
  { id: 'g12', question: 'What is the area of a right triangle with legs 6 cm and 8 cm?', answer: '24 sq cm', hints: ['Area = (base × height) ÷ 2.', '(6 × 8) ÷ 2 = 48 ÷ 2.', '48 ÷ 2 = 24 sq cm.'], topicId: 'geometry', difficulty: 'medium' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 10: Counting & Combinations (Rank 10)
// ─────────────────────────────────────────────────────────────────
const countingQuestions: Question[] = [
  { id: 'c1', question: 'Timmy has 3 pants (blue, black, green) and 3 shirts (yellow, purple, red). How many outfits?', answer: '9', hints: ['Each pair of pants can go with each shirt.', 'Multiply: 3 pants × 3 shirts.', '3 × 3 = 9 outfits.'], topicId: 'counting', difficulty: 'easy' },
  { id: 'c2', question: '30 children in a line. Sam is 12th from front, Jane is 7th from back. How many between them?', answer: '11', hints: ['Find Jane\'s position from front first.', 'Jane from front = 30−7+1 = 24th. Between 12th and 24th = ?', 'Positions 13 to 23 = 11 children.'], topicId: 'counting', difficulty: 'hard' },
  { id: 'c3', question: 'Amy has 24 Pokémon cards. Ben has twice as many as Amy but half as many as Cindy. Total cards?', answer: '168', hints: ['Find Ben and Cindy\'s cards.', 'Ben = 2×24 = 48. Cindy = 2×48 = 96.', '24 + 48 + 96 = 168 cards.'], topicId: 'counting', difficulty: 'medium' },
  { id: 'c4', question: 'Karen folds paper in half 4 times, makes 1 hole. How many holes after unfolding?', answer: '16', hints: ['Each fold doubles the layers.', '4 folds = 2⁴ = 16 layers.', '1 hole through 16 layers = 16 holes.'], topicId: 'counting', difficulty: 'hard' },
  { id: 'c5', question: 'How many 2-digit numbers can you make from digits 1, 2, 3 (no repeats)?', answer: '6', hints: ['List them systematically: 12, 13, 21, 23, 31, 32.', 'First digit: 3 choices. Second digit: 2 remaining choices.', '3 × 2 = 6 two-digit numbers.'], topicId: 'counting', difficulty: 'medium' },
  { id: 'c6', question: 'A restaurant has 4 main courses and 3 desserts. How many meal combinations?', answer: '12', hints: ['Each main course can be paired with each dessert.', '4 mains × 3 desserts = ?', '4 × 3 = 12 combinations.'], topicId: 'counting', difficulty: 'easy' },
  { id: 'c7', question: 'How many odd numbers are between 10 and 30?', answer: '10', hints: ['List odd numbers: 11, 13, 15, 17, 19, 21, 23, 25, 27, 29.', 'Count them.', 'There are 10 odd numbers between 10 and 30.'], topicId: 'counting', difficulty: 'medium' },
  { id: 'c8', question: 'In how many ways can you arrange 3 books on a shelf?', answer: '6', hints: ['First spot: 3 choices. Second: 2 remaining. Third: 1 remaining.', '3 × 2 × 1 = ?', '3 × 2 × 1 = 6 ways.'], topicId: 'counting', difficulty: 'medium' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 11: Logic & Reasoning (Rank 11)
// ─────────────────────────────────────────────────────────────────
const logicQuestions: Question[] = [
  { id: 'l1', question: 'On a dart board, you score 2, 3, or 5 per dart. 3 darts per round. Which total is NOT possible? (a)10 (b)12 (c)18 (d)30', answer: '(c) 18', hints: ['Maximum per round = 3 × 5 = 15.', '18 > 15, so it\'s impossible.', 'Answer: (c) 18 is not possible.'], topicId: 'logic', difficulty: 'hard' },
  { id: 'l2', question: 'A ball drops from 60 ft. Each bounce = half the previous height. Height after 3 bounces?', answer: '7.5 feet', hints: ['Divide by 2 each bounce.', 'Bounce 1: 30 ft. Bounce 2: 15 ft. Bounce 3: ?', '15 ÷ 2 = 7.5 feet.'], topicId: 'logic', difficulty: 'hard' },
  { id: 'l3', question: 'Ratio of apples to oranges is 3:2. There are 15 oranges. How many apples?', answer: '22.5', hints: ['Set up: 3/2 = apples/15.', '2 × apples = 3 × 15 = 45.', 'Apples = 45 ÷ 2 = 22.5.'], topicId: 'logic', difficulty: 'hard' },
  { id: 'l4', question: 'Mike is 15. Sister Sarah is 6 younger. Cousin Ben is 4 older than Sarah. How old is Ben?', answer: '13', hints: ['Find Sarah first, then Ben.', 'Sarah = 15−6 = 9. Ben = 9+4 = ?', 'Ben is 13 years old.'], topicId: 'logic', difficulty: 'medium' },
  { id: 'l5', question: 'I am thinking of a number. I double it and add 5. The result is 21. What is my number?', answer: '8', hints: ['Work backwards: subtract 5, then halve.', '21 − 5 = 16. 16 ÷ 2 = ?', '16 ÷ 2 = 8.'], topicId: 'logic', difficulty: 'medium' },
  { id: 'l6', question: 'If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?', answer: 'Yes', hints: ['Think of it as a chain: A→B→C.', 'Bloops are Razzies. Razzies are Lazzies. So Bloops are...', 'Yes, all Bloops are Lazzies.'], topicId: 'logic', difficulty: 'hard' },
  { id: 'l7', question: 'A number is divided by 4 and then 3 is subtracted. The result is 7. What is the number?', answer: '40', hints: ['Work backwards: add 3 first, then multiply by 4.', '7 + 3 = 10. 10 × 4 = ?', '10 × 4 = 40.'], topicId: 'logic', difficulty: 'medium' },
  { id: 'l8', question: 'In a race, Anna finished before Ben. Ben finished before Carol. Did Anna finish before Carol?', answer: 'Yes', hints: ['Order: Anna → Ben → Carol.', 'If Anna is before Ben, and Ben is before Carol...', 'Yes, Anna finished before Carol.'], topicId: 'logic', difficulty: 'easy' },
  { id: 'l9', question: 'A snail climbs 3 ft up a 10 ft wall each day but slides back 1 ft each night. How many days to reach the top?', answer: '4 days', hints: ['Net gain per day = 3−1 = 2 ft. But on the final day, it reaches the top before sliding.', 'After day 3: 3×2=6 ft. Day 4: climbs 3 more = 9 ft... wait, start of day 4 = 6 ft, +3 = 9 ft, not enough. Day 4 end = 8 ft. Day 5: 8+3=11 ≥ 10.', 'After day 1: 2ft. Day 2: 4ft. Day 3: 6ft. Day 4: 6+3=9, slides to 8. Day 5: 8+3=11 ≥ 10. Answer: 5 days.'], topicId: 'logic', difficulty: 'hard' },
  { id: 'l10', question: 'A farmer has chickens and cows. He counts 20 heads and 56 legs. How many cows?', answer: '8', hints: ['Chickens have 2 legs, cows have 4 legs. Total heads = 20.', 'Let cows = C. Chickens = 20−C. Legs: 4C + 2(20−C) = 56.', '4C + 40 − 2C = 56. 2C = 16. C = 8 cows.'], topicId: 'logic', difficulty: 'hard' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 12: Decimals (Rank 12)
// ─────────────────────────────────────────────────────────────────
const decimalQuestions: Question[] = [
  { id: 'd1', question: '3.5 + 2.7 = ?', answer: '6.2', hints: ['Line up decimal points and add.', '5+7=12 (write 2, carry 1). 3+2+1=6.', '3.5 + 2.7 = 6.2.'], topicId: 'decimals', difficulty: 'easy' },
  { id: 'd2', question: '8.4 − 3.9 = ?', answer: '4.5', hints: ['Line up decimal points and subtract.', 'Borrow: 14−9=5 (tenths). 7−3=4 (ones).', '8.4 − 3.9 = 4.5.'], topicId: 'decimals', difficulty: 'easy' },
  { id: 'd3', question: 'Car travels 60 mph for 2.5 hours. How far?', answer: '150 miles', hints: ['Distance = Speed × Time.', '60 × 2.5 = 60×2 + 60×0.5.', '120 + 30 = 150 miles.'], topicId: 'decimals', difficulty: 'medium' },
  { id: 'd4', question: '4.6 + 3.8 = ?', answer: '8.4', hints: ['Add tenths: 6+8=14, write 4 carry 1.', 'Add ones: 4+3+1=8.', '4.6 + 3.8 = 8.4.'], topicId: 'decimals', difficulty: 'easy' },
  { id: 'd5', question: '10.0 − 4.7 = ?', answer: '5.3', hints: ['Borrow from the ones place.', '10.0 − 4.7: think 10 − 4.7.', '10 − 5 = 5, then + 0.3 = 5.3.'], topicId: 'decimals', difficulty: 'easy' },
  { id: 'd6', question: 'What is 0.5 × 8?', answer: '4', hints: ['0.5 = 1/2. Half of 8 = ?', '8 ÷ 2 = 4.', '0.5 × 8 = 4.'], topicId: 'decimals', difficulty: 'easy' },
  { id: 'd7', question: 'Round 3.67 to the nearest tenth.', answer: '3.7', hints: ['Look at the hundredths digit.', 'Hundredths digit is 7. Since 7 ≥ 5, round up.', '3.67 → 3.7.'], topicId: 'decimals', difficulty: 'medium' },
  { id: 'd8', question: 'What is 2.5 × 4?', answer: '10', hints: ['2.5 × 4 = 2.5 + 2.5 + 2.5 + 2.5.', 'Or: 2 × 4 = 8, 0.5 × 4 = 2. Add them.', '8 + 2 = 10.'], topicId: 'decimals', difficulty: 'easy' },
  { id: 'd9', question: 'Order from smallest: 0.3, 0.03, 3.0, 0.33', answer: '0.03, 0.3, 0.33, 3.0', hints: ['Compare digit by digit from the decimal point.', '0.03 < 0.3 < 0.33 < 3.0.', 'Smallest to largest: 0.03, 0.3, 0.33, 3.0.'], topicId: 'decimals', difficulty: 'medium' },
  { id: 'd10', question: 'What is 12.5 ÷ 5?', answer: '2.5', hints: ['Divide as normal, keep track of decimal.', '12.5 ÷ 5: 10÷5=2, 2.5÷5=0.5.', '12.5 ÷ 5 = 2.5.'], topicId: 'decimals', difficulty: 'medium' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 13: Comparison & Ordering (Rank 13)
// ─────────────────────────────────────────────────────────────────
const comparisonQuestions: Question[] = [
  { id: 'co1', question: 'Order smallest to largest: 4,521 | 4,215 | 4,512 | 4,125', answer: '4125, 4215, 4512, 4521', hints: ['Compare hundreds first (all have 4 thousands).', '1 < 2 < 5 in hundreds place.', '4,125 → 4,215 → 4,512 → 4,521.'], topicId: 'comparison', difficulty: 'medium' },
  { id: 'co2', question: 'Which is greater: 2/5 or 3/8?', answer: '2/5', hints: ['Find common denominator.', 'LCD = 40. 2/5=16/40, 3/8=15/40.', '16/40 > 15/40, so 2/5 > 3/8.'], topicId: 'comparison', difficulty: 'medium' },
  { id: 'co3', question: 'A box has 24 red, 36 blue, 18 green balls. Total?', answer: '78', hints: ['Add all three amounts.', '24 + 36 = 60. Then 60 + 18 = ?', '60 + 18 = 78 balls.'], topicId: 'comparison', difficulty: 'easy' },
  { id: 'co4', question: 'Which is smaller: 0.45 or 0.5?', answer: '0.45', hints: ['Compare digit by digit.', '0.45 = 0.450. Compare: 0.450 vs 0.500.', '4 < 5 in tenths place, so 0.45 < 0.5.'], topicId: 'comparison', difficulty: 'easy' },
  { id: 'co5', question: 'Order from greatest: 1/2, 2/3, 3/4, 1/4', answer: '3/4, 2/3, 1/2, 1/4', hints: ['Convert to same denominator (12).', '1/2=6/12, 2/3=8/12, 3/4=9/12, 1/4=3/12.', 'Greatest first: 9/12, 8/12, 6/12, 3/12 = 3/4, 2/3, 1/2, 1/4.'], topicId: 'comparison', difficulty: 'medium' },
  { id: 'co6', question: 'True or False: 3,456 > 3,465', answer: 'False', hints: ['Compare digit by digit.', 'Thousands: 3=3. Hundreds: 4=4. Tens: 5 vs 6.', '5 < 6, so 3,456 < 3,465. False.'], topicId: 'comparison', difficulty: 'easy' },
  { id: 'co7', question: 'Which is the median of: 12, 7, 19, 3, 15?', answer: '12', hints: ['Median = middle value when sorted.', 'Sorted: 3, 7, 12, 15, 19. Middle value = ?', 'Middle (3rd of 5) = 12.'], topicId: 'comparison', difficulty: 'medium' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 14: Basic Probability (Rank 14)
// ─────────────────────────────────────────────────────────────────
const probabilityQuestions: Question[] = [
  { id: 'pr1', question: 'A box has 5 red, 4 blue, 3 green marbles. Probability of picking red?', answer: '5/12', hints: ['P = favorable ÷ total.', 'Total = 5+4+3 = 12. Red = 5.', 'P(red) = 5/12.'], topicId: 'probability', difficulty: 'medium' },
  { id: 'pr2', question: 'Flip a fair coin. Probability of heads?', answer: '1/2', hints: ['Coin has 2 sides.', '1 favorable (heads) out of 2 total.', 'P(heads) = 1/2.'], topicId: 'probability', difficulty: 'easy' },
  { id: 'pr3', question: 'Bag has 3 red, 3 blue, 3 yellow balls. Probability of blue?', answer: '1/3', hints: ['Total = 9. Blue = 3.', 'P = 3/9. Simplify.', '3/9 = 1/3.'], topicId: 'probability', difficulty: 'easy' },
  { id: 'pr4', question: 'Roll a fair die (1–6). Probability of rolling a 4?', answer: '1/6', hints: ['A die has 6 equally likely outcomes.', '1 favorable outcome (rolling 4) out of 6.', 'P(4) = 1/6.'], topicId: 'probability', difficulty: 'easy' },
  { id: 'pr5', question: 'Roll a fair die. Probability of rolling an even number?', answer: '1/2', hints: ['Even numbers on a die: 2, 4, 6.', '3 favorable outcomes out of 6 total.', 'P(even) = 3/6 = 1/2.'], topicId: 'probability', difficulty: 'easy' },
  { id: 'pr6', question: 'A bag has 2 red, 3 blue, 5 green marbles. Probability of NOT picking green?', answer: '1/2', hints: ['P(not green) = 1 − P(green).', 'P(green) = 5/10 = 1/2.', 'P(not green) = 1 − 1/2 = 1/2.'], topicId: 'probability', difficulty: 'medium' },
  { id: 'pr7', question: 'A spinner has 8 equal sections numbered 1–8. Probability of spinning a number > 5?', answer: '3/8', hints: ['Numbers > 5 on the spinner: 6, 7, 8.', '3 favorable outcomes out of 8 total.', 'P(>5) = 3/8.'], topicId: 'probability', difficulty: 'medium' },
];

// ─────────────────────────────────────────────────────────────────
// ASSEMBLE ALL TOPICS
// ─────────────────────────────────────────────────────────────────
export const topics: Topic[] = [
  { id: 'arithmetic', name: 'Arithmetic Operations', emoji: '➕', description: 'Addition, subtraction, multiplication & division', color: '#F59E0B', rank: 1, questions: arithmeticQuestions },
  { id: 'word-problems', name: 'Word Problems', emoji: '📖', description: 'Multi-step real-world math problems', color: '#10B981', rank: 2, questions: wordProblemQuestions },
  { id: 'place-value', name: 'Place Value', emoji: '🔢', description: 'Ones, tens, hundreds, thousands', color: '#8B5CF6', rank: 3, questions: placeValueQuestions },
  { id: 'fractions', name: 'Fractions', emoji: '🍕', description: 'Parts of a whole, comparing fractions', color: '#EF4444', rank: 4, questions: fractionQuestions },
  { id: 'money', name: 'Money', emoji: '💰', description: 'Coins, bills, making change', color: '#F97316', rank: 5, questions: moneyQuestions },
  { id: 'time', name: 'Time', emoji: '⏰', description: 'Clocks, AM/PM, time conversions', color: '#06B6D4', rank: 6, questions: timeQuestions },
  { id: 'measurement', name: 'Measurement', emoji: '📏', description: 'Length, weight, volume, area, perimeter', color: '#84CC16', rank: 7, questions: measurementQuestions },
  { id: 'patterns', name: 'Number Patterns', emoji: '🔄', description: 'Sequences, patterns, number rules', color: '#EC4899', rank: 8, questions: patternQuestions },
  { id: 'geometry', name: 'Geometry', emoji: '📐', description: 'Shapes, area, perimeter, properties', color: '#3B82F6', rank: 9, questions: geometryQuestions },
  { id: 'counting', name: 'Counting & Combinations', emoji: '🎯', description: 'Counting outfits, arrangements, possibilities', color: '#D97706', rank: 10, questions: countingQuestions },
  { id: 'logic', name: 'Logic & Reasoning', emoji: '🧠', description: 'Puzzles, deduction, critical thinking', color: '#6366F1', rank: 11, questions: logicQuestions },
  { id: 'decimals', name: 'Decimals', emoji: '🔵', description: 'Decimal numbers, operations, rounding', color: '#14B8A6', rank: 12, questions: decimalQuestions },
  { id: 'comparison', name: 'Comparison & Ordering', emoji: '⚖️', description: 'Greater than, less than, ordering numbers', color: '#A855F7', rank: 13, questions: comparisonQuestions },
  { id: 'probability', name: 'Basic Probability', emoji: '🎲', description: 'Chance, likelihood, simple probability', color: '#F43F5E', rank: 14, questions: probabilityQuestions },
];

export const getAllQuestions = (): Question[] => topics.flatMap(t => t.questions);
export const getQuestionsByTopic = (topicId: string): Question[] => topics.find(t => t.id === topicId)?.questions ?? [];
export const getTopic = (topicId: string): Topic | undefined => topics.find(t => t.id === topicId);
export const getTotalQuestionCount = (): number => getAllQuestions().length;
export const getSpeedDrillsByCategory = (category: string): SpeedDrill[] =>
  category === 'All' ? speedDrills : speedDrills.filter(d => d.category === category);
export const speedDrillCategories = ['All', 'Addition', 'Subtraction', 'Multiplication', 'Division', 'Mixed', 'Doubles', 'Squares'];
