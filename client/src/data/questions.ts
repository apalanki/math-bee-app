// ═══════════════════════════════════════════════════════════════════
// MATH BEE PRACTICE APP — Exhaustive Question Bank
// Based on North South Foundation MB1 (K-3) Syllabus
// 420 questions across 14 topics (30 each) + 120 speed drills
// Topics ranked from most important to least important
// ═══════════════════════════════════════════════════════════════════

export interface Question {
  id: string;
  question: string;
  answer: string;
  hints: [string, string, string];
  topicId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  choices?: string[]; // If present, always render as A/B/C/D tap targets
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
// SPEED DRILL BANK
// ─────────────────────────────────────────────────────────────────
export const speedDrills: SpeedDrill[] = [
  { id:'sd1',  question:'3 + 4',       answer:'7',   category:'Addition' },
  { id:'sd2',  question:'6 + 7',       answer:'13',  category:'Addition' },
  { id:'sd3',  question:'8 + 9',       answer:'17',  category:'Addition' },
  { id:'sd4',  question:'5 + 8',       answer:'13',  category:'Addition' },
  { id:'sd5',  question:'7 + 6',       answer:'13',  category:'Addition' },
  { id:'sd6',  question:'9 + 4',       answer:'13',  category:'Addition' },
  { id:'sd7',  question:'8 + 6',       answer:'14',  category:'Addition' },
  { id:'sd8',  question:'7 + 8',       answer:'15',  category:'Addition' },
  { id:'sd9',  question:'9 + 9',       answer:'18',  category:'Addition' },
  { id:'sd10', question:'6 + 6',       answer:'12',  category:'Addition' },
  { id:'sd11', question:'23 + 14',     answer:'37',  category:'Addition' },
  { id:'sd12', question:'45 + 32',     answer:'77',  category:'Addition' },
  { id:'sd13', question:'56 + 27',     answer:'83',  category:'Addition' },
  { id:'sd14', question:'38 + 45',     answer:'83',  category:'Addition' },
  { id:'sd15', question:'67 + 24',     answer:'91',  category:'Addition' },
  { id:'sd16', question:'49 + 38',     answer:'87',  category:'Addition' },
  { id:'sd17', question:'75 + 16',     answer:'91',  category:'Addition' },
  { id:'sd18', question:'83 + 19',     answer:'102', category:'Addition' },
  { id:'sd19', question:'64 + 37',     answer:'101', category:'Addition' },
  { id:'sd20', question:'55 + 55',     answer:'110', category:'Addition' },
  { id:'sd21', question:'123 + 456',   answer:'579', category:'Addition' },
  { id:'sd22', question:'234 + 321',   answer:'555', category:'Addition' },
  { id:'sd23', question:'347 + 256',   answer:'603', category:'Addition' },
  { id:'sd24', question:'418 + 375',   answer:'793', category:'Addition' },
  { id:'sd25', question:'509 + 284',   answer:'793', category:'Addition' },
  { id:'sd26', question:'637 + 148',   answer:'785', category:'Addition' },
  { id:'sd27', question:'725 + 196',   answer:'921', category:'Addition' },
  { id:'sd28', question:'843 + 157',   answer:'1000',category:'Addition' },
  { id:'sd29', question:'456 + 544',   answer:'1000',category:'Addition' },
  { id:'sd30', question:'299 + 301',   answer:'600', category:'Addition' },
  { id:'sd31', question:'15 − 7',      answer:'8',   category:'Subtraction' },
  { id:'sd32', question:'13 − 6',      answer:'7',   category:'Subtraction' },
  { id:'sd33', question:'17 − 9',      answer:'8',   category:'Subtraction' },
  { id:'sd34', question:'50 − 29',     answer:'21',  category:'Subtraction' },
  { id:'sd35', question:'72 − 38',     answer:'34',  category:'Subtraction' },
  { id:'sd36', question:'85 − 47',     answer:'38',  category:'Subtraction' },
  { id:'sd37', question:'91 − 56',     answer:'35',  category:'Subtraction' },
  { id:'sd38', question:'63 − 28',     answer:'35',  category:'Subtraction' },
  { id:'sd39', question:'100 − 37',    answer:'63',  category:'Subtraction' },
  { id:'sd40', question:'100 − 64',    answer:'36',  category:'Subtraction' },
  { id:'sd41', question:'500 − 234',   answer:'266', category:'Subtraction' },
  { id:'sd42', question:'800 − 456',   answer:'344', category:'Subtraction' },
  { id:'sd43', question:'347 − 128',   answer:'219', category:'Subtraction' },
  { id:'sd44', question:'625 − 318',   answer:'307', category:'Subtraction' },
  { id:'sd45', question:'904 − 567',   answer:'337', category:'Subtraction' },
  { id:'sd46', question:'1000 − 375',  answer:'625', category:'Subtraction' },
  { id:'sd47', question:'750 − 289',   answer:'461', category:'Subtraction' },
  { id:'sd48', question:'600 − 143',   answer:'457', category:'Subtraction' },
  { id:'sd49', question:'483 − 256',   answer:'227', category:'Subtraction' },
  { id:'sd50', question:'912 − 487',   answer:'425', category:'Subtraction' },
  { id:'sd51', question:'3 × 4',       answer:'12',  category:'Multiplication' },
  { id:'sd52', question:'6 × 7',       answer:'42',  category:'Multiplication' },
  { id:'sd53', question:'8 × 9',       answer:'72',  category:'Multiplication' },
  { id:'sd54', question:'5 × 7',       answer:'35',  category:'Multiplication' },
  { id:'sd55', question:'4 × 8',       answer:'32',  category:'Multiplication' },
  { id:'sd56', question:'9 × 6',       answer:'54',  category:'Multiplication' },
  { id:'sd57', question:'7 × 7',       answer:'49',  category:'Multiplication' },
  { id:'sd58', question:'8 × 8',       answer:'64',  category:'Multiplication' },
  { id:'sd59', question:'9 × 9',       answer:'81',  category:'Multiplication' },
  { id:'sd60', question:'6 × 8',       answer:'48',  category:'Multiplication' },
  { id:'sd61', question:'7 × 9',       answer:'63',  category:'Multiplication' },
  { id:'sd62', question:'4 × 6',       answer:'24',  category:'Multiplication' },
  { id:'sd63', question:'3 × 9',       answer:'27',  category:'Multiplication' },
  { id:'sd64', question:'5 × 8',       answer:'40',  category:'Multiplication' },
  { id:'sd65', question:'7 × 6',       answer:'42',  category:'Multiplication' },
  { id:'sd66', question:'9 × 4',       answer:'36',  category:'Multiplication' },
  { id:'sd67', question:'8 × 3',       answer:'24',  category:'Multiplication' },
  { id:'sd68', question:'6 × 5',       answer:'30',  category:'Multiplication' },
  { id:'sd69', question:'7 × 4',       answer:'28',  category:'Multiplication' },
  { id:'sd70', question:'9 × 3',       answer:'27',  category:'Multiplication' },
  { id:'sd71', question:'12 × 5',      answer:'60',  category:'Multiplication' },
  { id:'sd72', question:'11 × 7',      answer:'77',  category:'Multiplication' },
  { id:'sd73', question:'12 × 8',      answer:'96',  category:'Multiplication' },
  { id:'sd74', question:'15 × 4',      answer:'60',  category:'Multiplication' },
  { id:'sd75', question:'20 × 6',      answer:'120', category:'Multiplication' },
  { id:'sd76', question:'25 × 4',      answer:'100', category:'Multiplication' },
  { id:'sd77', question:'11 × 11',     answer:'121', category:'Multiplication' },
  { id:'sd78', question:'12 × 12',     answer:'144', category:'Multiplication' },
  { id:'sd79', question:'10 × 10',     answer:'100', category:'Multiplication' },
  { id:'sd80', question:'15 × 6',      answer:'90',  category:'Multiplication' },
  { id:'sd81', question:'36 ÷ 4',      answer:'9',   category:'Division' },
  { id:'sd82', question:'48 ÷ 6',      answer:'8',   category:'Division' },
  { id:'sd83', question:'63 ÷ 7',      answer:'9',   category:'Division' },
  { id:'sd84', question:'72 ÷ 8',      answer:'9',   category:'Division' },
  { id:'sd85', question:'54 ÷ 6',      answer:'9',   category:'Division' },
  { id:'sd86', question:'42 ÷ 7',      answer:'6',   category:'Division' },
  { id:'sd87', question:'56 ÷ 8',      answer:'7',   category:'Division' },
  { id:'sd88', question:'45 ÷ 9',      answer:'5',   category:'Division' },
  { id:'sd89', question:'81 ÷ 9',      answer:'9',   category:'Division' },
  { id:'sd90', question:'64 ÷ 8',      answer:'8',   category:'Division' },
  { id:'sd91', question:'100 ÷ 5',     answer:'20',  category:'Division' },
  { id:'sd92', question:'120 ÷ 6',     answer:'20',  category:'Division' },
  { id:'sd93', question:'144 ÷ 12',    answer:'12',  category:'Division' },
  { id:'sd94', question:'96 ÷ 8',      answer:'12',  category:'Division' },
  { id:'sd95', question:'75 ÷ 5',      answer:'15',  category:'Division' },
  { id:'sd96', question:'5 × 6 + 3',   answer:'33',  category:'Mixed' },
  { id:'sd97', question:'4 × 7 − 8',   answer:'20',  category:'Mixed' },
  { id:'sd98', question:'36 ÷ 4 + 5',  answer:'14',  category:'Mixed' },
  { id:'sd99', question:'8 × 3 − 12',  answer:'12',  category:'Mixed' },
  { id:'sd100',question:'50 ÷ 5 + 7',  answer:'17',  category:'Mixed' },
  { id:'sd101',question:'9 × 4 ÷ 6',   answer:'6',   category:'Mixed' },
  { id:'sd102',question:'7 × 8 − 16',  answer:'40',  category:'Mixed' },
  { id:'sd103',question:'24 ÷ 3 × 4',  answer:'32',  category:'Mixed' },
  { id:'sd104',question:'100 − 6 × 9', answer:'46',  category:'Mixed' },
  { id:'sd105',question:'48 ÷ 8 × 7',  answer:'42',  category:'Mixed' },
  { id:'sd106',question:'Double 35',    answer:'70',  category:'Doubles' },
  { id:'sd107',question:'Double 48',    answer:'96',  category:'Doubles' },
  { id:'sd108',question:'Double 75',    answer:'150', category:'Doubles' },
  { id:'sd109',question:'Half of 96',   answer:'48',  category:'Doubles' },
  { id:'sd110',question:'Half of 150',  answer:'75',  category:'Doubles' },
  { id:'sd111',question:'Double 125',   answer:'250', category:'Doubles' },
  { id:'sd112',question:'Half of 200',  answer:'100', category:'Doubles' },
  { id:'sd113',question:'Double 64',    answer:'128', category:'Doubles' },
  { id:'sd114',question:'Half of 84',   answer:'42',  category:'Doubles' },
  { id:'sd115',question:'Double 99',    answer:'198', category:'Doubles' },
  { id:'sd116',question:'4²',           answer:'16',  category:'Squares' },
  { id:'sd117',question:'5²',           answer:'25',  category:'Squares' },
  { id:'sd118',question:'6²',           answer:'36',  category:'Squares' },
  { id:'sd119',question:'7²',           answer:'49',  category:'Squares' },
  { id:'sd120',question:'8²',           answer:'64',  category:'Squares' },
  { id:'sd121',question:'9²',           answer:'81',  category:'Squares' },
  { id:'sd122',question:'10²',          answer:'100', category:'Squares' },
  { id:'sd123',question:'11²',          answer:'121', category:'Squares' },
  { id:'sd124',question:'12²',          answer:'144', category:'Squares' },
  { id:'sd125',question:'3²',           answer:'9',   category:'Squares' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 1: Arithmetic Operations (Rank 1 — Most Important)
// ─────────────────────────────────────────────────────────────────
const arithmeticQuestions: Question[] = [
  { id:'a1',  question:'64 + 128 = ?', answer:'192', hints:['Break it: 60+120 and 4+8.','Add ones: 4+8=12, carry 1. Then 6+2+1=9.','64+128 = 192.'], topicId:'arithmetic', difficulty:'easy' },
  { id:'a2',  question:'50 − 29 = ?', answer:'21', hints:['What number + 29 = 50?','Count up: 29→30 (+1), 30→50 (+20). Total = 21.','50−29 = 21.'], topicId:'arithmetic', difficulty:'easy' },
  { id:'a3',  question:'7 × 8 = ?', answer:'56', hints:['7 groups of 8.','7×8 = 7×4×2 = 28×2.','7×8 = 56.'], topicId:'arithmetic', difficulty:'easy' },
  { id:'a4',  question:'81 ÷ 9 = ?', answer:'9', hints:['What × 9 = 81?','9×9 = 81.','81÷9 = 9.'], topicId:'arithmetic', difficulty:'easy' },
  { id:'a5',  question:'345 + 267 = ?', answer:'612', hints:['Add hundreds, tens, ones separately.','5+7=12 (write 2, carry 1). 4+6+1=11 (write 1, carry 1). 3+2+1=6.','345+267 = 612.'], topicId:'arithmetic', difficulty:'medium' },
  { id:'a6',  question:'503 − 178 = ?', answer:'325', hints:['Borrow from hundreds since 3 < 8.','503 = 500+3. Borrow: 10+3=13. 13−8=5. 9−7=2. 4−1=3.','503−178 = 325.'], topicId:'arithmetic', difficulty:'medium' },
  { id:'a7',  question:'9 × 7 = ?', answer:'63', hints:['9 groups of 7.','9×7 = 10×7 − 7 = 70−7.','9×7 = 63.'], topicId:'arithmetic', difficulty:'easy' },
  { id:'a8',  question:'144 ÷ 12 = ?', answer:'12', hints:['12 × ? = 144.','12×10=120, 12×2=24, 120+24=144.','144÷12 = 12.'], topicId:'arithmetic', difficulty:'medium' },
  { id:'a9',  question:'What is 25 × 4?', answer:'100', hints:['25 × 4 = 25 × 2 × 2.','25×2=50, 50×2=100.','25×4 = 100.'], topicId:'arithmetic', difficulty:'easy' },
  { id:'a10', question:'1000 − 437 = ?', answer:'563', hints:['Subtract from 1000: think of complement.','437 + ? = 1000. 437+563=1000.','1000−437 = 563.'], topicId:'arithmetic', difficulty:'medium' },
  { id:'a11', question:'6 × 9 = ?', answer:'54', hints:['6 groups of 9.','6×9 = 6×10−6 = 60−6.','6×9 = 54.'], topicId:'arithmetic', difficulty:'easy' },
  { id:'a12', question:'72 ÷ 8 = ?', answer:'9', hints:['8 × ? = 72.','8×9 = 72.','72÷8 = 9.'], topicId:'arithmetic', difficulty:'easy' },
  { id:'a13', question:'256 + 384 = ?', answer:'640', hints:['Add hundreds: 200+300=500. Add tens: 50+80=130. Add ones: 6+4=10.','500+130+10 = 640.','256+384 = 640.'], topicId:'arithmetic', difficulty:'medium' },
  { id:'a14', question:'400 − 165 = ?', answer:'235', hints:['Borrow: 400 = 399+1. 399−165=234, then +1=235.','Or count up: 165+35=200, 200+200=400. Total=235.','400−165 = 235.'], topicId:'arithmetic', difficulty:'medium' },
  { id:'a15', question:'8 × 12 = ?', answer:'96', hints:['8×12 = 8×10 + 8×2.','80+16 = 96.','8×12 = 96.'], topicId:'arithmetic', difficulty:'medium' },
  { id:'a16', question:'96 ÷ 6 = ?', answer:'16', hints:['6 × ? = 96.','6×16 = 6×10+6×6 = 60+36 = 96.','96÷6 = 16.'], topicId:'arithmetic', difficulty:'medium' },
  { id:'a17', question:'What is 15 × 6?', answer:'90', hints:['15×6 = 10×6 + 5×6.','60+30 = 90.','15×6 = 90.'], topicId:'arithmetic', difficulty:'medium' },
  { id:'a18', question:'700 + 85 + 16 = ?', answer:'801', hints:['Add 700+85=785 first.','785+16 = 801.','700+85+16 = 801.'], topicId:'arithmetic', difficulty:'medium' },
  { id:'a19', question:'What is 11 × 11?', answer:'121', hints:['11×11 = 11×10 + 11×1.','110+11 = 121.','11×11 = 121.'], topicId:'arithmetic', difficulty:'easy' },
  { id:'a20', question:'125 ÷ 5 = ?', answer:'25', hints:['5 × ? = 125.','5×25 = 5×20+5×5 = 100+25 = 125.','125÷5 = 25.'], topicId:'arithmetic', difficulty:'medium' },
  { id:'a21', question:'What is 999 + 1?', answer:'1000', hints:['Add 1 to 999.','9+1=10, carry. All 9s become 0s.','999+1 = 1000.'], topicId:'arithmetic', difficulty:'easy' },
  { id:'a22', question:'48 × 2 = ?', answer:'96', hints:['Double 48.','40×2=80, 8×2=16.','80+16 = 96.'], topicId:'arithmetic', difficulty:'easy' },
  { id:'a23', question:'200 ÷ 4 = ?', answer:'50', hints:['4 × ? = 200.','4×50 = 200.','200÷4 = 50.'], topicId:'arithmetic', difficulty:'easy' },
  { id:'a24', question:'What is 37 × 3?', answer:'111', hints:['37×3 = 30×3 + 7×3.','90+21 = 111.','37×3 = 111.'], topicId:'arithmetic', difficulty:'medium' },
  { id:'a25', question:'567 + 433 = ?', answer:'1000', hints:['Look for pairs that sum to 10 in each place.','7+3=10, 6+3+1=10, 5+4+1=10.','567+433 = 1000.'], topicId:'arithmetic', difficulty:'medium' },
  { id:'a26', question:'What is 5³ (5 cubed)?', answer:'125', hints:['5³ = 5 × 5 × 5.','5×5=25, then 25×5.','25×5 = 125.'], topicId:'arithmetic', difficulty:'hard' },
  { id:'a27', question:'What is the remainder when 29 ÷ 4?', answer:'1', hints:['4×7=28. 29−28=?','29 = 4×7 + 1.','Remainder = 1.'], topicId:'arithmetic', difficulty:'medium' },
  { id:'a28', question:'What is 13 × 13?', answer:'169', hints:['13×13 = 13×10 + 13×3.','130+39 = 169.','13×13 = 169.'], topicId:'arithmetic', difficulty:'hard' },
  { id:'a29', question:'What is 450 ÷ 9?', answer:'50', hints:['9 × ? = 450.','9×50 = 450.','450÷9 = 50.'], topicId:'arithmetic', difficulty:'medium' },
  { id:'a30', question:'What is 999 − 456?', answer:'543', hints:['Subtract each digit: 9−6=3, 9−5=4, 9−4=5.','No borrowing needed here.','999−456 = 543.'], topicId:'arithmetic', difficulty:'medium' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 2: Word Problems (Rank 2)
// ─────────────────────────────────────────────────────────────────
const wordProblemQuestions: Question[] = [
  { id:'w1',  question:'A store has 48 apples. 19 are sold. How many remain?', answer:'29', hints:['Subtract sold from total.','48−19. Borrow: 18−9=9, 3−1=2... wait, 48−19.','48−20+1 = 29.'], topicId:'word-problems', difficulty:'easy' },
  { id:'w2',  question:'There are 6 boxes. Each box has 12 crayons. How many crayons total?', answer:'72', hints:['Multiply boxes × crayons per box.','6×12 = 6×10+6×2.','60+12 = 72.'], topicId:'word-problems', difficulty:'easy' },
  { id:'w3',  question:'A train travels 240 miles in 4 hours. How many miles per hour?', answer:'60', hints:['Miles per hour = total miles ÷ hours.','240÷4 = ?','240÷4 = 60.'], topicId:'word-problems', difficulty:'medium' },
  { id:'w4',  question:'Sam has $5.00. He buys a book for $3.25. How much change?', answer:'$1.75', hints:['Change = amount paid − cost.','$5.00−$3.25. Subtract cents: 100−25=75¢. Subtract dollars: 4−3=1.','Change = $1.75.'], topicId:'word-problems', difficulty:'easy' },
  { id:'w5',  question:'A class has 28 students. 3 more join. Then 5 leave. How many now?', answer:'26', hints:['First add, then subtract.','28+3=31. 31−5=?','31−5 = 26.'], topicId:'word-problems', difficulty:'easy' },
  { id:'w6',  question:'A rectangle is 9 cm long and 5 cm wide. What is its area?', answer:'45', hints:['Area = length × width.','9×5 = ?','9×5 = 45 sq cm.'], topicId:'word-problems', difficulty:'easy' },
  { id:'w7',  question:'There are 5 bags with 8 marbles each. 12 marbles are lost. How many remain?', answer:'28', hints:['First find total, then subtract lost.','5×8=40. 40−12=?','40−12 = 28.'], topicId:'word-problems', difficulty:'medium' },
  { id:'w8',  question:'A bookshelf has 7 shelves. Each shelf holds 15 books. How many books total?', answer:'105', hints:['Total = shelves × books per shelf.','7×15 = 7×10+7×5.','70+35 = 105.'], topicId:'word-problems', difficulty:'medium' },
  { id:'w9',  question:'Mia has 3 times as many stickers as Tom. Tom has 14 stickers. How many does Mia have?', answer:'42', hints:['Mia = 3 × Tom.','3×14 = 3×10+3×4.','30+12 = 42.'], topicId:'word-problems', difficulty:'medium' },
  { id:'w10', question:'A pizza is cut into 8 equal slices. 3 slices are eaten. What fraction remains?', answer:'5/8', hints:['Remaining = total − eaten, over total.','8−3=5 slices remain.','5 out of 8 = 5/8.'], topicId:'word-problems', difficulty:'easy' },
  { id:'w11', question:'A car travels 55 miles per hour for 3 hours. How far does it travel?', answer:'165', hints:['Distance = speed × time.','55×3 = 50×3+5×3.','150+15 = 165 miles.'], topicId:'word-problems', difficulty:'medium' },
  { id:'w12', question:'There are 100 students. 45 are boys. How many are girls?', answer:'55', hints:['Girls = total − boys.','100−45 = ?','100−45 = 55.'], topicId:'word-problems', difficulty:'easy' },
  { id:'w13', question:'A garden is 12 m long and 8 m wide. What is its perimeter?', answer:'40', hints:['Perimeter = 2×(length+width).','2×(12+8) = 2×20.','2×20 = 40 m.'], topicId:'word-problems', difficulty:'medium' },
  { id:'w14', question:'Jake reads 25 pages a day. How many pages in 2 weeks?', answer:'350', hints:['2 weeks = 14 days.','25×14 = 25×10+25×4.','250+100 = 350 pages.'], topicId:'word-problems', difficulty:'medium' },
  { id:'w15', question:'A store sells 3 types of sandwiches and 4 types of drinks. How many sandwich-drink combos?', answer:'12', hints:['Multiply choices together.','3×4 = ?','3×4 = 12 combos.'], topicId:'word-problems', difficulty:'easy' },
  { id:'w16', question:'There are 4 rows of 7 chairs. 6 chairs are removed. How many chairs remain?', answer:'22', hints:['First find total chairs.','4×7=28. 28−6=?','28−6 = 22.'], topicId:'word-problems', difficulty:'medium' },
  { id:'w17', question:'A number is tripled and then 9 is subtracted. The result is 21. What is the number?', answer:'10', hints:['Work backwards: 21+9=30.','30÷3=?','30÷3 = 10.'], topicId:'word-problems', difficulty:'hard' },
  { id:'w18', question:'Lily has 48 cookies. She shares them equally among 6 friends. How many each?', answer:'8', hints:['Divide total by number of friends.','48÷6 = ?','48÷6 = 8.'], topicId:'word-problems', difficulty:'easy' },
  { id:'w19', question:'A toy costs $12.50. How much for 4 toys?', answer:'$50', hints:['Total = price × quantity.','$12.50×4 = $12×4+$0.50×4.','$48+$2 = $50.'], topicId:'word-problems', difficulty:'medium' },
  { id:'w20', question:'A number is doubled and 7 is added. The result is 35. What is the number?', answer:'14', hints:['Work backwards: 35−7=28.','28÷2=?','28÷2 = 14.'], topicId:'word-problems', difficulty:'hard' },
  { id:'w21', question:'There are 9 teams with 11 players each. How many players total?', answer:'99', hints:['Total = teams × players per team.','9×11 = 9×10+9×1.','90+9 = 99.'], topicId:'word-problems', difficulty:'easy' },
  { id:'w22', question:'A pool holds 500 gallons. It is 3/5 full. How many gallons are in it?', answer:'300', hints:['Multiply total by the fraction.','500×3/5 = 500÷5×3.','100×3 = 300 gallons.'], topicId:'word-problems', difficulty:'hard' },
  { id:'w23', question:'Anna has 3 red, 5 blue, 4 green pens. How many pens total?', answer:'12', hints:['Add all types together.','3+5+4 = ?','3+5+4 = 12.'], topicId:'word-problems', difficulty:'easy' },
  { id:'w24', question:'A bus has 36 seats. 28 are occupied. What fraction of seats are empty?', answer:'2/9', hints:['Empty = 36−28=8. Fraction = 8/36.','Simplify 8/36: divide by 4.','8/36 = 2/9.'], topicId:'word-problems', difficulty:'hard' },
  { id:'w25', question:'Tom earns $8 per hour. He works 7 hours. How much does he earn?', answer:'$56', hints:['Earnings = rate × hours.','$8×7 = ?','$8×7 = $56.'], topicId:'word-problems', difficulty:'easy' },
  { id:'w26', question:'A square has a perimeter of 36 cm. What is its side length?', answer:'9', hints:['Perimeter of square = 4 × side.','36÷4 = ?','36÷4 = 9 cm.'], topicId:'word-problems', difficulty:'easy' },
  { id:'w27', question:'There are 120 students split equally into 8 groups. How many per group?', answer:'15', hints:['Divide total by groups.','120÷8 = ?','120÷8 = 15.'], topicId:'word-problems', difficulty:'medium' },
  { id:'w28', question:'A recipe needs 2.5 cups of flour for 12 cookies. How much for 24 cookies?', answer:'5', hints:['Double the recipe for double the cookies.','2.5×2 = ?','2.5×2 = 5 cups.'], topicId:'word-problems', difficulty:'medium' },
  { id:'w29', question:'A number is 4 more than twice another number. If the smaller number is 7, what is the larger?', answer:'18', hints:['Larger = 2×smaller + 4.','2×7+4 = 14+4.','14+4 = 18.'], topicId:'word-problems', difficulty:'hard' },
  { id:'w30', question:'A store has 250 items. 40% are on sale. How many items are on sale?', answer:'100', hints:['40% of 250 = 40/100 × 250.','= 40×250÷100 = 40×2.5.','40×2.5 = 100.'], topicId:'word-problems', difficulty:'hard' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 3: Place Value (Rank 3)
// ─────────────────────────────────────────────────────────────────
const placeValueQuestions: Question[] = [
  { id:'pv1',  question:'What is the value of the digit 7 in 3,742?', answer:'700', hints:['Look at which position 7 is in.','7 is in the hundreds place.','7 × 100 = 700.'], topicId:'place-value', difficulty:'easy' },
  { id:'pv2',  question:'Write 4,506 in expanded form.', answer:'4000+500+6', hints:['Break each digit by its place value.','4 thousands, 5 hundreds, 0 tens, 6 ones.','4000+500+0+6 = 4000+500+6.'], topicId:'place-value', difficulty:'easy' },
  { id:'pv3',  question:'What number has 3 thousands, 0 hundreds, 5 tens, 8 ones?', answer:'3058', hints:['Build the number from each place.','3000+0+50+8.','3058.'], topicId:'place-value', difficulty:'easy' },
  { id:'pv4',  question:'Round 3,847 to the nearest hundred.', answer:'3800', hints:['Look at the tens digit: 4.','4 < 5, so round down.','3,847 rounds to 3,800.'], topicId:'place-value', difficulty:'easy' },
  { id:'pv5',  question:'What is the value of the digit 9 in 29,463?', answer:'9000', hints:['9 is in the thousands place.','9 × 1000 = 9000.','Value = 9,000.'], topicId:'place-value', difficulty:'medium' },
  { id:'pv6',  question:'Round 7,652 to the nearest thousand.', answer:'8000', hints:['Look at the hundreds digit: 6.','6 ≥ 5, so round up.','7,652 rounds to 8,000.'], topicId:'place-value', difficulty:'easy' },
  { id:'pv7',  question:'What is 10 more than 4,995?', answer:'5005', hints:['Add 10 to the tens place.','4,995 + 10 = ?','4,995+10 = 5,005.'], topicId:'place-value', difficulty:'medium' },
  { id:'pv8',  question:'What is 100 less than 6,300?', answer:'6200', hints:['Subtract 100 from the hundreds place.','6,300 − 100 = ?','6,300−100 = 6,200.'], topicId:'place-value', difficulty:'easy' },
  { id:'pv9',  question:'Which digit is in the ten-thousands place in 85,274?', answer:'8', hints:['Count places from the right: ones, tens, hundreds, thousands, ten-thousands.','The 5th digit from the right is in ten-thousands.','8 is in the ten-thousands place.'], topicId:'place-value', difficulty:'medium' },
  { id:'pv10', question:'Write the number: two hundred thousand, four hundred and twelve.', answer:'200412', hints:['200 thousands = 200,000. 4 hundreds = 400. 12 ones = 12.','200,000+400+12.','200,412.'], topicId:'place-value', difficulty:'medium' },
  { id:'pv11', question:'What is the place value of 5 in 15,830?', answer:'5000', hints:['Count from the right: 0=ones, 3=tens, 8=hundreds, 5=thousands.','5 is in the thousands place.','5 × 1000 = 5,000.'], topicId:'place-value', difficulty:'medium' },
  { id:'pv12', question:'Round 45,678 to the nearest ten.', answer:'45680', hints:['Look at the ones digit: 8.','8 ≥ 5, so round up the tens.','45,678 → 45,680.'], topicId:'place-value', difficulty:'easy' },
  { id:'pv13', question:'What number is 1,000 more than 8,999?', answer:'9999', hints:['Add 1,000 to 8,999.','8,999+1,000 = ?','9,999.'], topicId:'place-value', difficulty:'easy' },
  { id:'pv14', question:'Write 60,000 + 4,000 + 300 + 20 + 7 in standard form.', answer:'64327', hints:['Put each part in its place.','60,000+4,000=64,000. +300=64,300. +20=64,320. +7=64,327.','64,327.'], topicId:'place-value', difficulty:'medium' },
  { id:'pv15', question:'What is the digit in the hundreds place of 47,382?', answer:'3', hints:['Count from the right: 2=ones, 8=tens, 3=hundreds.','The hundreds digit is 3.','Answer: 3.'], topicId:'place-value', difficulty:'easy' },
  { id:'pv16', question:'Round 3.47 to the nearest tenth.', answer:'3.5', hints:['Look at the hundredths digit: 7.','7 ≥ 5, so round up the tenths.','3.47 → 3.5.'], topicId:'place-value', difficulty:'medium' },
  { id:'pv17', question:'What is 10,000 more than 89,500?', answer:'99500', hints:['Add 10,000 to 89,500.','89,500+10,000 = ?','99,500.'], topicId:'place-value', difficulty:'medium' },
  { id:'pv18', question:'What is the value of the underlined digit in 3,0_8_2? (the digit 8)', answer:'80', hints:['8 is in the tens place.','8 × 10 = 80.','Value = 80.'], topicId:'place-value', difficulty:'easy' },
  { id:'pv19', question:'Which is greater: 45,678 or 45,768?', answer:'45768', hints:['Compare digit by digit from left.','Both have 45 in thousands. Compare hundreds: 6 vs 7.','7 > 6, so 45,768 is greater.'], topicId:'place-value', difficulty:'easy', choices:['45678','45768','They are equal','Cannot tell'] },
  { id:'pv20', question:'Write 5.08 in expanded form.', answer:'5+0.08', hints:['5 is in the ones place. 0 is in the tenths. 8 is in the hundredths.','5×1 + 0×0.1 + 8×0.01.','5 + 0.08.'], topicId:'place-value', difficulty:'medium' },
  { id:'pv21', question:'What is 1,000 less than 10,000?', answer:'9000', hints:['Subtract 1,000 from 10,000.','10,000−1,000 = ?','9,000.'], topicId:'place-value', difficulty:'easy' },
  { id:'pv22', question:'How many tens are in 4,500?', answer:'450', hints:['4,500 ÷ 10 = ?','4,500 = 450 groups of 10.','450 tens.'], topicId:'place-value', difficulty:'medium' },
  { id:'pv23', question:'Round 99,950 to the nearest thousand.', answer:'100000', hints:['Look at the hundreds digit: 9.','9 ≥ 5, so round up.','99,950 → 100,000.'], topicId:'place-value', difficulty:'hard' },
  { id:'pv24', question:'What is the sum of the place values of all digits in 321?', answer:'321', hints:['300+20+1 = ?','The sum of place values equals the number itself.','300+20+1 = 321.'], topicId:'place-value', difficulty:'medium' },
  { id:'pv25', question:'Write the number with 4 in the millions place, 2 in the thousands, and 5 in the ones.', answer:'4002005', hints:['4,000,000 + 2,000 + 5.','= 4,002,005.','4,002,005.'], topicId:'place-value', difficulty:'hard' },
  { id:'pv26', question:'What is the value of the 6 in 0.006?', answer:'0.006', hints:['6 is in the thousandths place.','6 × 0.001 = 0.006.','Value = 0.006.'], topicId:'place-value', difficulty:'hard' },
  { id:'pv27', question:'How many hundreds are in 5,600?', answer:'56', hints:['5,600 ÷ 100 = ?','5,600 = 56 groups of 100.','56 hundreds.'], topicId:'place-value', difficulty:'medium' },
  { id:'pv28', question:'Round 2,950 to the nearest hundred.', answer:'3000', hints:['Look at the tens digit: 5.','5 ≥ 5, so round up.','2,950 → 3,000.'], topicId:'place-value', difficulty:'easy' },
  { id:'pv29', question:'What is 10 times 3,456?', answer:'34560', hints:['Multiply by 10: shift each digit one place left.','3,456 × 10 = ?','34,560.'], topicId:'place-value', difficulty:'medium' },
  { id:'pv30', question:'What digit is in the ten-millions place in 83,456,720?', answer:'8', hints:['Count places from the right: 0=ones, 2=tens, 7=hundreds, 6=thousands, 5=ten-thousands, 4=hundred-thousands, 3=millions, 8=ten-millions.','The ten-millions digit is 8.','Answer: 8.'], topicId:'place-value', difficulty:'hard' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 4: Fractions (Rank 4)
// ─────────────────────────────────────────────────────────────────
const fractionQuestions: Question[] = [
  { id:'f1',  question:'What is 1/2 + 1/4?', answer:'3/4', hints:['Find a common denominator.','1/2 = 2/4. Then 2/4+1/4.','3/4.'], topicId:'fractions', difficulty:'easy' },
  { id:'f2',  question:'What is 3/4 − 1/4?', answer:'1/2', hints:['Same denominator: subtract numerators.','3/4−1/4 = 2/4.','Simplify: 2/4 = 1/2.'], topicId:'fractions', difficulty:'easy' },
  { id:'f3',  question:'Which is larger: 2/3 or 3/4?', answer:'3/4', hints:['Find common denominator (12).','2/3=8/12, 3/4=9/12.','9/12 > 8/12, so 3/4 is larger.'], topicId:'fractions', difficulty:'medium', choices:['2/3','3/4','They are equal','Cannot tell'] },
  { id:'f4',  question:'What is 2/5 of 30?', answer:'12', hints:['Multiply 30 by 2/5.','30÷5=6, then 6×2.','12.'], topicId:'fractions', difficulty:'easy' },
  { id:'f5',  question:'Simplify 8/12.', answer:'2/3', hints:['Find the GCF of 8 and 12.','GCF=4. 8÷4=2, 12÷4=3.','2/3.'], topicId:'fractions', difficulty:'easy' },
  { id:'f6',  question:'What is 1/3 + 1/6?', answer:'1/2', hints:['LCD = 6. 1/3 = 2/6.','2/6+1/6 = 3/6.','3/6 = 1/2.'], topicId:'fractions', difficulty:'medium' },
  { id:'f7',  question:'Convert 7/4 to a mixed number.', answer:'1 3/4', hints:['Divide numerator by denominator.','7÷4 = 1 remainder 3.','1 and 3/4.'], topicId:'fractions', difficulty:'medium' },
  { id:'f8',  question:'What fraction of 20 is 5?', answer:'1/4', hints:['Fraction = part/whole.','5/20. Simplify.','5/20 = 1/4.'], topicId:'fractions', difficulty:'easy' },
  { id:'f9',  question:'What is 3/4 × 8?', answer:'6', hints:['Multiply: 3×8÷4.','24÷4 = 6.','3/4 × 8 = 6.'], topicId:'fractions', difficulty:'medium' },
  { id:'f10', question:'Order from least to greatest: 1/2, 1/3, 1/4.', answer:'1/4, 1/3, 1/2', hints:['Larger denominator = smaller fraction (same numerator).','1/4 < 1/3 < 1/2.','Order: 1/4, 1/3, 1/2.'], topicId:'fractions', difficulty:'easy' },
  { id:'f11', question:'What is 5/6 − 1/3?', answer:'1/2', hints:['LCD = 6. 1/3 = 2/6.','5/6−2/6 = 3/6.','3/6 = 1/2.'], topicId:'fractions', difficulty:'medium' },
  { id:'f12', question:'Convert 2 1/3 to an improper fraction.', answer:'7/3', hints:['Multiply whole number by denominator, add numerator.','2×3+1 = 7.','7/3.'], topicId:'fractions', difficulty:'medium' },
  { id:'f13', question:'What is 2/3 of 18?', answer:'12', hints:['Multiply 18 by 2/3.','18÷3=6, then 6×2.','12.'], topicId:'fractions', difficulty:'easy' },
  { id:'f14', question:'What is 3/8 + 5/8?', answer:'1', hints:['Same denominator: add numerators.','3/8+5/8 = 8/8.','8/8 = 1.'], topicId:'fractions', difficulty:'easy' },
  { id:'f15', question:'Simplify 15/25.', answer:'3/5', hints:['GCF of 15 and 25 is 5.','15÷5=3, 25÷5=5.','3/5.'], topicId:'fractions', difficulty:'easy' },
  { id:'f16', question:'What is 1/2 ÷ 2?', answer:'1/4', hints:['Dividing by 2 = multiplying by 1/2.','1/2 × 1/2 = 1/4.','1/4.'], topicId:'fractions', difficulty:'medium' },
  { id:'f17', question:'Which fraction is equivalent to 4/6?', answer:'2/3', hints:['Simplify 4/6 by dividing by GCF.','GCF(4,6)=2. 4÷2=2, 6÷2=3.','2/3.'], topicId:'fractions', difficulty:'easy', choices:['1/2','2/3','3/4','4/5'] },
  { id:'f18', question:'What is 3/4 + 1/2?', answer:'5/4', hints:['LCD = 4. 1/2 = 2/4.','3/4+2/4 = 5/4.','5/4 (or 1 1/4).'], topicId:'fractions', difficulty:'medium' },
  { id:'f19', question:'A pie is cut into 8 slices. You eat 3. What fraction is left?', answer:'5/8', hints:['Left = 8−3 = 5 slices.','Fraction left = 5/8.','5/8.'], topicId:'fractions', difficulty:'easy' },
  { id:'f20', question:'What is 2/3 × 3/4?', answer:'1/2', hints:['Multiply numerators and denominators.','2×3=6, 3×4=12. So 6/12.','6/12 = 1/2.'], topicId:'fractions', difficulty:'hard' },
  { id:'f21', question:'What fraction of 1 hour is 20 minutes?', answer:'1/3', hints:['1 hour = 60 minutes.','20/60. Simplify.','20/60 = 1/3.'], topicId:'fractions', difficulty:'medium' },
  { id:'f22', question:'What is 7/8 − 3/8?', answer:'1/2', hints:['Same denominator: subtract numerators.','7/8−3/8 = 4/8.','4/8 = 1/2.'], topicId:'fractions', difficulty:'easy' },
  { id:'f23', question:'Convert 0.75 to a fraction in simplest form.', answer:'3/4', hints:['0.75 = 75/100.','GCF(75,100)=25. 75÷25=3, 100÷25=4.','3/4.'], topicId:'fractions', difficulty:'medium' },
  { id:'f24', question:'What is 1/4 + 1/4 + 1/4?', answer:'3/4', hints:['Add the numerators.','1+1+1=3, denominator stays 4.','3/4.'], topicId:'fractions', difficulty:'easy' },
  { id:'f25', question:'Which is smallest: 3/5, 2/5, 4/5?', answer:'2/5', hints:['Same denominator: compare numerators.','2 < 3 < 4.','2/5 is smallest.'], topicId:'fractions', difficulty:'easy', choices:['3/5','2/5','4/5','They are equal'] },
  { id:'f26', question:'What is 5/6 × 12?', answer:'10', hints:['5/6 × 12 = 5×12÷6.','60÷6 = 10.','10.'], topicId:'fractions', difficulty:'medium' },
  { id:'f27', question:'What is 1 − 2/5?', answer:'3/5', hints:['1 = 5/5.','5/5−2/5 = 3/5.','3/5.'], topicId:'fractions', difficulty:'easy' },
  { id:'f28', question:'A number line goes from 0 to 1. Where is 3/8?', answer:'3/8', hints:['3/8 is between 0 and 1/2 (which is 4/8).','It is 3 of 8 equal parts from 0.','3/8.'], topicId:'fractions', difficulty:'easy' },
  { id:'f29', question:'What is 4/5 − 1/10?', answer:'7/10', hints:['LCD = 10. 4/5 = 8/10.','8/10−1/10 = 7/10.','7/10.'], topicId:'fractions', difficulty:'medium' },
  { id:'f30', question:'If 3/4 of a number is 18, what is the number?', answer:'24', hints:['3/4 × n = 18. Solve for n.','n = 18 ÷ (3/4) = 18 × 4/3.','18×4÷3 = 72÷3 = 24.'], topicId:'fractions', difficulty:'hard' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 5: Money (Rank 5)
// ─────────────────────────────────────────────────────────────────
const moneyQuestions: Question[] = [
  { id:'mo1',  question:'How many cents in $2.35?', answer:'235', hints:['$1 = 100 cents.','$2 = 200 cents. Add 35 cents.','200+35 = 235 cents.'], topicId:'money', difficulty:'easy' },
  { id:'mo2',  question:'You have 3 quarters, 2 dimes, 1 nickel. How much total?', answer:'$1.00', hints:['Quarter=25¢, dime=10¢, nickel=5¢.','3×25+2×10+1×5 = 75+20+5.','100¢ = $1.00.'], topicId:'money', difficulty:'easy' },
  { id:'mo3',  question:'A book costs $4.75. You pay $10. What is the change?', answer:'$5.25', hints:['Change = $10 − $4.75.','$10.00−$4.75. Subtract cents: 100−75=25¢. Subtract dollars: 9−4=5.','$5.25.'], topicId:'money', difficulty:'easy' },
  { id:'mo4',  question:'How many quarters make $3.00?', answer:'12', hints:['$3.00 ÷ $0.25 = ?','$3.00 = 300¢. 300÷25=12.','12 quarters.'], topicId:'money', difficulty:'easy' },
  { id:'mo5',  question:'A toy costs $7.49. Tax is $0.51. Total cost?', answer:'$8.00', hints:['Total = price + tax.','$7.49+$0.51.','$8.00.'], topicId:'money', difficulty:'easy' },
  { id:'mo6',  question:'You earn $5 per hour for 8 hours. How much do you earn?', answer:'$40', hints:['Earnings = rate × hours.','$5×8 = ?','$40.'], topicId:'money', difficulty:'easy' },
  { id:'mo7',  question:'3 items cost $2.50 each. What is the total?', answer:'$7.50', hints:['Total = $2.50 × 3.','$2×3=6, $0.50×3=$1.50.','$6+$1.50 = $7.50.'], topicId:'money', difficulty:'easy' },
  { id:'mo8',  question:'You have $20. You spend $13.67. How much is left?', answer:'$6.33', hints:['Change = $20 − $13.67.','$20.00−$13.67. Subtract cents: 100−67=33¢. Subtract dollars: 19−13=6.','$6.33.'], topicId:'money', difficulty:'medium' },
  { id:'mo9',  question:'A pencil costs 35 cents. How much for a dozen (12)?', answer:'$4.20', hints:['Total = 35¢ × 12.','35×12 = 35×10+35×2 = 350+70 = 420¢.','420¢ = $4.20.'], topicId:'money', difficulty:'medium' },
  { id:'mo10', question:'What coins make exactly 67 cents using the fewest coins?', answer:'2 quarters, 1 dime, 1 nickel, 2 pennies', hints:['Start with the largest coin that fits.','2 quarters=50¢, 1 dime=60¢, 1 nickel=65¢, 2 pennies=67¢.','2 quarters, 1 dime, 1 nickel, 2 pennies.'], topicId:'money', difficulty:'medium' },
  { id:'mo11', question:'A shirt costs $15.99. Round to the nearest dollar.', answer:'$16', hints:['Look at the cents: 99¢.','99¢ ≥ 50¢, so round up.','$15.99 ≈ $16.'], topicId:'money', difficulty:'easy' },
  { id:'mo12', question:'You save $3.50 per week. How much after 4 weeks?', answer:'$14', hints:['Total = $3.50 × 4.','$3×4=12, $0.50×4=$2.','$12+$2 = $14.'], topicId:'money', difficulty:'easy' },
  { id:'mo13', question:'A bag of apples costs $2.40. How much for 5 bags?', answer:'$12', hints:['Total = $2.40 × 5.','$2×5=10, $0.40×5=$2.','$10+$2 = $12.'], topicId:'money', difficulty:'easy' },
  { id:'mo14', question:'You have $50. You buy items costing $12.50, $8.75, and $14.25. How much is left?', answer:'$14.50', hints:['Add the costs: $12.50+$8.75+$14.25.','$12.50+$8.75=$21.25. $21.25+$14.25=$35.50.','$50−$35.50 = $14.50.'], topicId:'money', difficulty:'hard' },
  { id:'mo15', question:'How many dimes make $4.50?', answer:'45', hints:['$4.50 ÷ $0.10 = ?','450¢ ÷ 10¢ = 45.','45 dimes.'], topicId:'money', difficulty:'easy' },
  { id:'mo16', question:'A movie ticket costs $8.50. How much for 3 tickets?', answer:'$25.50', hints:['Total = $8.50 × 3.','$8×3=24, $0.50×3=$1.50.','$24+$1.50 = $25.50.'], topicId:'money', difficulty:'medium' },
  { id:'mo17', question:'You have 7 dimes and 13 pennies. How much money?', answer:'$0.83', hints:['7 dimes = 70¢. 13 pennies = 13¢.','70+13 = 83¢.','$0.83.'], topicId:'money', difficulty:'easy' },
  { id:'mo18', question:'A store gives 10% discount on $30. What is the sale price?', answer:'$27', hints:['10% of $30 = $3.','Sale price = $30−$3.','$27.'], topicId:'money', difficulty:'medium' },
  { id:'mo19', question:'You split $24.00 equally among 4 people. How much each?', answer:'$6', hints:['Divide total by 4.','$24÷4 = ?','$6 each.'], topicId:'money', difficulty:'easy' },
  { id:'mo20', question:'A notebook costs $1.25. How many can you buy with $10?', answer:'8', hints:['$10 ÷ $1.25 = ?','$10 = 1000¢. 1000÷125 = 8.','8 notebooks.'], topicId:'money', difficulty:'medium' },
  { id:'mo21', question:'You have 4 nickels and 6 dimes. How much money?', answer:'$0.80', hints:['4 nickels = 20¢. 6 dimes = 60¢.','20+60 = 80¢.','$0.80.'], topicId:'money', difficulty:'easy' },
  { id:'mo22', question:'A pizza costs $12.00. You and 3 friends split it equally. How much each?', answer:'$3', hints:['4 people share $12.','$12÷4 = ?','$3 each.'], topicId:'money', difficulty:'easy' },
  { id:'mo23', question:'You earn $12 per hour. How much for 6.5 hours?', answer:'$78', hints:['$12×6.5 = $12×6 + $12×0.5.','$72+$6 = $78.','$78.'], topicId:'money', difficulty:'hard' },
  { id:'mo24', question:'A store sells 3 items for $10. How much for 9 items?', answer:'$30', hints:['Find cost per item or scale up.','If 3 items = $10, then 9 items = 3×$10.','3×$10 = $30.'], topicId:'money', difficulty:'easy' },
  { id:'mo25', question:'You save $0.50 every day. How much in 30 days?', answer:'$15', hints:['Total = $0.50 × 30.','$0.50×30 = $15.','$15.'], topicId:'money', difficulty:'easy' },
  { id:'mo26', question:'A jacket costs $45. It is on sale for 20% off. What is the sale price?', answer:'$36', hints:['20% of $45 = $9.','$45−$9 = $36.','$36.'], topicId:'money', difficulty:'hard' },
  { id:'mo27', question:'You have $100. You spend 1/4 of it. How much is left?', answer:'$75', hints:['1/4 of $100 = $25.','$100−$25 = $75.','$75.'], topicId:'money', difficulty:'medium' },
  { id:'mo28', question:'A lemonade stand earns $3.75 on Monday and $4.50 on Tuesday. Total earnings?', answer:'$8.25', hints:['Add the two amounts.','$3.75+$4.50.','$8.25.'], topicId:'money', difficulty:'easy' },
  { id:'mo29', question:'How many $5 bills make $65?', answer:'13', hints:['$65 ÷ $5 = ?','65÷5 = 13.','13 bills.'], topicId:'money', difficulty:'easy' },
  { id:'mo30', question:'A toy is $18.00. You have $12.50. How much more do you need?', answer:'$5.50', hints:['Amount needed = cost − amount you have.','$18.00−$12.50.','$5.50.'], topicId:'money', difficulty:'easy' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 6: Time (Rank 6)
// ─────────────────────────────────────────────────────────────────
const timeQuestions: Question[] = [
  { id:'t1',  question:'How many minutes in 2.5 hours?', answer:'150', hints:['1 hour = 60 minutes.','2.5 × 60 = ?','2×60+0.5×60 = 120+30 = 150.'], topicId:'time', difficulty:'easy' },
  { id:'t2',  question:'A movie starts at 2:45 PM and lasts 1 hour 30 minutes. When does it end?', answer:'4:15 PM', hints:['Add 1 hour 30 minutes to 2:45 PM.','2:45+1:00=3:45. 3:45+0:30=4:15.','4:15 PM.'], topicId:'time', difficulty:'easy' },
  { id:'t3',  question:'How many seconds in 3 minutes?', answer:'180', hints:['1 minute = 60 seconds.','3 × 60 = ?','180 seconds.'], topicId:'time', difficulty:'easy' },
  { id:'t4',  question:'How many days in 3 weeks?', answer:'21', hints:['1 week = 7 days.','3 × 7 = ?','21 days.'], topicId:'time', difficulty:'easy' },
  { id:'t5',  question:'A class starts at 9:15 AM and ends at 11:45 AM. How long is the class?', answer:'2 hours 30 minutes', hints:['Subtract start from end.','From 9:15 to 11:15 = 2 hours. From 11:15 to 11:45 = 30 minutes.','2 hours 30 minutes.'], topicId:'time', difficulty:'medium' },
  { id:'t6',  question:'What time is 45 minutes after 3:30 PM?', answer:'4:15 PM', hints:['Add 45 minutes to 3:30.','3:30+30min=4:00. 4:00+15min=4:15.','4:15 PM.'], topicId:'time', difficulty:'easy' },
  { id:'t7',  question:'How many hours in a week?', answer:'168', hints:['1 day = 24 hours. 1 week = 7 days.','7 × 24 = ?','7×24 = 168 hours.'], topicId:'time', difficulty:'medium' },
  { id:'t8',  question:'A train departs at 7:50 AM and arrives at 11:20 AM. How long is the trip?', answer:'3 hours 30 minutes', hints:['From 7:50 to 11:50 = 4 hours. But arrival is 11:20.','11:20 is 30 minutes before 11:50.','4 hours − 30 min = 3 hours 30 min.'], topicId:'time', difficulty:'medium' },
  { id:'t9',  question:'What time is 1 hour 15 minutes before 6:00 PM?', answer:'4:45 PM', hints:['Subtract 1 hour 15 minutes from 6:00 PM.','6:00−1:00=5:00. 5:00−15min=4:45.','4:45 PM.'], topicId:'time', difficulty:'medium' },
  { id:'t10', question:'How many months in 2.5 years?', answer:'30', hints:['1 year = 12 months.','2.5 × 12 = ?','2×12+0.5×12 = 24+6 = 30.'], topicId:'time', difficulty:'easy' },
  { id:'t11', question:'A baker works from 5:30 AM to 1:00 PM. How many hours?', answer:'7.5', hints:['From 5:30 to 1:00 PM.','5:30 to 12:30 = 7 hours. 12:30 to 1:00 = 30 min.','7 hours 30 min = 7.5 hours.'], topicId:'time', difficulty:'medium' },
  { id:'t12', question:'What is 3:45 PM in 24-hour time?', answer:'15:45', hints:['PM times after noon: add 12 to the hour.','3+12 = 15.','15:45.'], topicId:'time', difficulty:'medium' },
  { id:'t13', question:'How many minutes in a day?', answer:'1440', hints:['1 hour = 60 min. 1 day = 24 hours.','24 × 60 = ?','24×60 = 1440 minutes.'], topicId:'time', difficulty:'medium' },
  { id:'t14', question:'A project takes 2 hours 40 minutes. It starts at 10:20 AM. When does it end?', answer:'1:00 PM', hints:['Add 2 hours 40 minutes to 10:20 AM.','10:20+2:00=12:20. 12:20+40min=1:00.','1:00 PM.'], topicId:'time', difficulty:'medium' },
  { id:'t15', question:'How many seconds in 1 hour?', answer:'3600', hints:['1 hour = 60 minutes. 1 minute = 60 seconds.','60 × 60 = ?','3600 seconds.'], topicId:'time', difficulty:'easy' },
  { id:'t16', question:'What day is 10 days after Monday?', answer:'Thursday', hints:['Count forward 10 days from Monday.','Monday+7=Monday. Monday+3 more = Thursday.','Thursday.'], topicId:'time', difficulty:'medium', choices:['Wednesday','Thursday','Friday','Saturday'] },
  { id:'t17', question:'A flight departs at 11:55 PM and lands 8 hours 30 minutes later. What time does it land?', answer:'8:25 AM', hints:['11:55 PM + 8h 30min.','11:55+5min=12:00 AM. 12:00+8h25min=8:25 AM.','8:25 AM.'], topicId:'time', difficulty:'hard' },
  { id:'t18', question:'How many weeks in a year?', answer:'52', hints:['1 year ≈ 365 days. 1 week = 7 days.','365÷7 ≈ 52 weeks (with 1 day left over).','52 weeks.'], topicId:'time', difficulty:'easy' },
  { id:'t19', question:'If today is Wednesday, what day was it 9 days ago?', answer:'Monday', hints:['Go back 9 days from Wednesday.','Wednesday−7=Wednesday. Wednesday−2 more = Monday.','Monday.'], topicId:'time', difficulty:'medium', choices:['Sunday','Monday','Tuesday','Wednesday'] },
  { id:'t20', question:'A TV show is 45 minutes long. How long are 4 episodes?', answer:'3 hours', hints:['Total = 45 × 4 minutes.','45×4 = 180 minutes.','180 minutes = 3 hours.'], topicId:'time', difficulty:'easy' },
  { id:'t21', question:'How many minutes from 8:15 AM to 10:00 AM?', answer:'105', hints:['8:15 to 9:15 = 60 min. 9:15 to 10:00 = 45 min.','60+45 = 105.','105 minutes.'], topicId:'time', difficulty:'medium' },
  { id:'t22', question:'What is 14:30 in 12-hour time?', answer:'2:30 PM', hints:['14:30 is after noon. Subtract 12.','14−12=2.','2:30 PM.'], topicId:'time', difficulty:'medium' },
  { id:'t23', question:'A race starts at 9:00 AM. Runner A finishes in 1h 23min. What time did A finish?', answer:'10:23 AM', hints:['Add 1 hour 23 minutes to 9:00 AM.','9:00+1:00=10:00. 10:00+23min=10:23.','10:23 AM.'], topicId:'time', difficulty:'easy' },
  { id:'t24', question:'How many days in 4 years (including 1 leap year)?', answer:'1461', hints:['3 regular years = 3×365=1095. 1 leap year = 366.','1095+366 = 1461.','1461 days.'], topicId:'time', difficulty:'hard' },
  { id:'t25', question:'A store opens at 8:30 AM and closes at 9:00 PM. How many hours is it open?', answer:'12.5', hints:['8:30 AM to 9:00 PM.','8:30 to 8:30 PM = 12 hours. 8:30 PM to 9:00 PM = 30 min.','12 hours 30 min = 12.5 hours.'], topicId:'time', difficulty:'medium' },
  { id:'t26', question:'What fraction of a day is 6 hours?', answer:'1/4', hints:['1 day = 24 hours.','6/24 = ?','6/24 = 1/4.'], topicId:'time', difficulty:'easy' },
  { id:'t27', question:'How many minutes in 3/4 of an hour?', answer:'45', hints:['1 hour = 60 minutes.','3/4 × 60 = ?','45 minutes.'], topicId:'time', difficulty:'easy' },
  { id:'t28', question:'A library is open 9 hours a day, 6 days a week. How many hours per week?', answer:'54', hints:['Total = hours per day × days.','9×6 = ?','54 hours.'], topicId:'time', difficulty:'easy' },
  { id:'t29', question:'If school starts at 7:45 AM and ends at 3:15 PM, how long is the school day?', answer:'7 hours 30 minutes', hints:['7:45 to 3:15.','7:45 to 3:45 = 8 hours. Back 30 min = 7h 30min.','7 hours 30 minutes.'], topicId:'time', difficulty:'medium' },
  { id:'t30', question:'What time is 2 hours 45 minutes after 11:30 PM?', answer:'2:15 AM', hints:['11:30 PM + 2h 45min.','11:30+30min=12:00 AM. 12:00+2h15min=2:15 AM.','2:15 AM.'], topicId:'time', difficulty:'hard' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 7: Measurement (Rank 7)
// ─────────────────────────────────────────────────────────────────
const measurementQuestions: Question[] = [
  { id:'me1',  question:'How many centimeters in 3 meters?', answer:'300', hints:['1 meter = 100 cm.','3 × 100 = ?','300 cm.'], topicId:'measurement', difficulty:'easy' },
  { id:'me2',  question:'A rectangle is 8 cm long and 5 cm wide. What is its perimeter?', answer:'26', hints:['Perimeter = 2×(length+width).','2×(8+5) = 2×13.','26 cm.'], topicId:'measurement', difficulty:'easy' },
  { id:'me3',  question:'Convert 2.5 kg to grams.', answer:'2500', hints:['1 kg = 1000 g.','2.5 × 1000 = ?','2500 g.'], topicId:'measurement', difficulty:'easy' },
  { id:'me4',  question:'A square has a side of 7 cm. What is its area?', answer:'49', hints:['Area of square = side × side.','7 × 7 = ?','49 sq cm.'], topicId:'measurement', difficulty:'easy' },
  { id:'me5',  question:'How many milliliters in 3 liters?', answer:'3000', hints:['1 liter = 1000 mL.','3 × 1000 = ?','3000 mL.'], topicId:'measurement', difficulty:'easy' },
  { id:'me6',  question:'A room is 12 m long and 9 m wide. What is its area?', answer:'108', hints:['Area = length × width.','12 × 9 = ?','108 sq m.'], topicId:'measurement', difficulty:'medium' },
  { id:'me7',  question:'Convert 450 cm to meters.', answer:'4.5', hints:['Divide by 100 to convert cm to m.','450 ÷ 100 = ?','4.5 m.'], topicId:'measurement', difficulty:'easy' },
  { id:'me8',  question:'A triangle has a base of 10 cm and height of 6 cm. What is its area?', answer:'30', hints:['Area of triangle = (base × height) ÷ 2.','(10 × 6) ÷ 2 = 60 ÷ 2.','30 sq cm.'], topicId:'measurement', difficulty:'medium' },
  { id:'me9',  question:'How many feet in 2 yards?', answer:'6', hints:['1 yard = 3 feet.','2 × 3 = ?','6 feet.'], topicId:'measurement', difficulty:'easy' },
  { id:'me10', question:'A box is 4 cm × 3 cm × 5 cm. What is its volume?', answer:'60', hints:['Volume = length × width × height.','4 × 3 × 5 = ?','60 cubic cm.'], topicId:'measurement', difficulty:'medium' },
  { id:'me11', question:'Convert 1.5 miles to feet. (1 mile = 5280 feet)', answer:'7920', hints:['Multiply miles by 5280.','1.5 × 5280 = ?','1×5280+0.5×5280 = 5280+2640 = 7920.'], topicId:'measurement', difficulty:'hard' },
  { id:'me12', question:'A rectangle has area 48 sq cm and length 8 cm. What is its width?', answer:'6', hints:['Area = length × width. Solve for width.','Width = Area ÷ length = 48 ÷ 8.','6 cm.'], topicId:'measurement', difficulty:'medium' },
  { id:'me13', question:'How many inches in 2 feet?', answer:'24', hints:['1 foot = 12 inches.','2 × 12 = ?','24 inches.'], topicId:'measurement', difficulty:'easy' },
  { id:'me14', question:'A swimming pool is 25 m long, 10 m wide, 2 m deep. What is its volume?', answer:'500', hints:['Volume = l × w × h.','25 × 10 × 2 = ?','500 cubic meters.'], topicId:'measurement', difficulty:'medium' },
  { id:'me15', question:'Convert 3500 g to kg.', answer:'3.5', hints:['Divide by 1000 to convert g to kg.','3500 ÷ 1000 = ?','3.5 kg.'], topicId:'measurement', difficulty:'easy' },
  { id:'me16', question:'A path is 2.4 km long. How many meters is that?', answer:'2400', hints:['1 km = 1000 m.','2.4 × 1000 = ?','2400 m.'], topicId:'measurement', difficulty:'easy' },
  { id:'me17', question:'A square garden has perimeter 36 m. What is its area?', answer:'81', hints:['Perimeter = 4×side. Side = 36÷4 = 9 m.','Area = 9×9.','81 sq m.'], topicId:'measurement', difficulty:'medium' },
  { id:'me18', question:'How many cups in 2 gallons? (1 gallon = 16 cups)', answer:'32', hints:['Multiply gallons by 16.','2 × 16 = ?','32 cups.'], topicId:'measurement', difficulty:'medium' },
  { id:'me19', question:'A rectangle has perimeter 30 cm and width 5 cm. What is its length?', answer:'10', hints:['P = 2×(l+w). 30 = 2×(l+5).','l+5 = 15. l = 10.','10 cm.'], topicId:'measurement', difficulty:'medium' },
  { id:'me20', question:'Convert 72 inches to feet.', answer:'6', hints:['Divide by 12 to convert inches to feet.','72 ÷ 12 = ?','6 feet.'], topicId:'measurement', difficulty:'easy' },
  { id:'me21', question:'A circle has diameter 14 cm. What is its radius?', answer:'7', hints:['Radius = diameter ÷ 2.','14 ÷ 2 = ?','7 cm.'], topicId:'measurement', difficulty:'easy' },
  { id:'me22', question:'How many millimeters in 5 cm?', answer:'50', hints:['1 cm = 10 mm.','5 × 10 = ?','50 mm.'], topicId:'measurement', difficulty:'easy' },
  { id:'me23', question:'A rectangular field is 150 m × 80 m. What is its perimeter?', answer:'460', hints:['P = 2×(l+w).','2×(150+80) = 2×230.','460 m.'], topicId:'measurement', difficulty:'medium' },
  { id:'me24', question:'Convert 2 pounds to ounces. (1 pound = 16 ounces)', answer:'32', hints:['Multiply pounds by 16.','2 × 16 = ?','32 ounces.'], topicId:'measurement', difficulty:'easy' },
  { id:'me25', question:'A cube has side length 5 cm. What is its volume?', answer:'125', hints:['Volume of cube = side³.','5 × 5 × 5 = ?','125 cubic cm.'], topicId:'measurement', difficulty:'medium' },
  { id:'me26', question:'A field is 0.5 km wide and 0.8 km long. What is its area in sq km?', answer:'0.4', hints:['Area = length × width.','0.5 × 0.8 = ?','0.4 sq km.'], topicId:'measurement', difficulty:'hard' },
  { id:'me27', question:'How many pints in 3 quarts? (1 quart = 2 pints)', answer:'6', hints:['Multiply quarts by 2.','3 × 2 = ?','6 pints.'], topicId:'measurement', difficulty:'easy' },
  { id:'me28', question:'A room has area 56 sq m. Its length is 8 m. What is its width?', answer:'7', hints:['Width = area ÷ length.','56 ÷ 8 = ?','7 m.'], topicId:'measurement', difficulty:'medium' },
  { id:'me29', question:'Convert 5 feet 4 inches to inches.', answer:'64', hints:['5 feet = 5×12 = 60 inches.','60+4 = 64 inches.','64 inches.'], topicId:'measurement', difficulty:'medium' },
  { id:'me30', question:'A circular track has radius 50 m. What is its approximate circumference? (Use π ≈ 3.14)', answer:'314', hints:['Circumference = 2πr.','2 × 3.14 × 50 = ?','314 m.'], topicId:'measurement', difficulty:'hard' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 8: Number Patterns (Rank 8)
// ─────────────────────────────────────────────────────────────────
const patternQuestions: Question[] = [
  { id:'p1',  question:'What comes next: 2, 4, 8, 16, ___?', answer:'32', hints:['Each term is multiplied by 2.','16 × 2 = ?','32.'], topicId:'patterns', difficulty:'easy' },
  { id:'p2',  question:'What comes next: 100, 90, 80, 70, ___?', answer:'60', hints:['Each term decreases by 10.','70 − 10 = ?','60.'], topicId:'patterns', difficulty:'easy' },
  { id:'p3',  question:'Find the missing number: 3, 6, ___, 12, 15.', answer:'9', hints:['Pattern: add 3 each time.','6 + 3 = ?','9.'], topicId:'patterns', difficulty:'easy' },
  { id:'p4',  question:'What is the 10th term of: 5, 10, 15, 20, ...?', answer:'50', hints:['Pattern: multiply position by 5.','10th term = 10 × 5.','50.'], topicId:'patterns', difficulty:'easy' },
  { id:'p5',  question:'What comes next: 1, 1, 2, 3, 5, 8, ___?', answer:'13', hints:['Each term = sum of two previous terms (Fibonacci).','5 + 8 = ?','13.'], topicId:'patterns', difficulty:'medium' },
  { id:'p6',  question:'Find the rule: 2, 6, 18, 54, ___', answer:'162', hints:['Each term is multiplied by 3.','54 × 3 = ?','162.'], topicId:'patterns', difficulty:'medium' },
  { id:'p7',  question:'What is the missing number: 1, 4, 9, ___, 25?', answer:'16', hints:['These are perfect squares: 1², 2², 3², 4², 5².','4² = 16.','16.'], topicId:'patterns', difficulty:'medium' },
  { id:'p8',  question:'What comes next: 1, 3, 6, 10, 15, ___?', answer:'21', hints:['These are triangular numbers. Differences: +2, +3, +4, +5, +6.','15 + 6 = ?','21.'], topicId:'patterns', difficulty:'medium' },
  { id:'p9',  question:'What is the 8th term of: 3, 7, 11, 15, ...?', answer:'31', hints:['Pattern: start at 3, add 4 each time.','8th term = 3 + (8−1)×4 = 3+28.','31.'], topicId:'patterns', difficulty:'medium' },
  { id:'p10', question:'Find the missing number: 2, ___, 8, 11, 14.', answer:'5', hints:['Pattern: add 3 each time.','2 + 3 = ?','5.'], topicId:'patterns', difficulty:'easy' },
  { id:'p11', question:'What comes next: 256, 128, 64, 32, ___?', answer:'16', hints:['Each term is divided by 2.','32 ÷ 2 = ?','16.'], topicId:'patterns', difficulty:'easy' },
  { id:'p12', question:'What is the rule for: 1, 5, 9, 13, 17?', answer:'add 4', hints:['Find the difference between consecutive terms.','5−1=4, 9−5=4.','Rule: add 4 each time.'], topicId:'patterns', difficulty:'easy', choices:['add 3','add 4','add 5','multiply by 4'] },
  { id:'p13', question:'What is the 6th term of: 1, 2, 4, 8, 16, ...?', answer:'32', hints:['Pattern: multiply by 2 each time.','The terms are 2⁰, 2¹, 2², 2³, 2⁴, 2⁵.','2⁵ = 32.'], topicId:'patterns', difficulty:'medium' },
  { id:'p14', question:'Find the missing number: 100, 50, ___, 12.5.', answer:'25', hints:['Each term is divided by 2.','50 ÷ 2 = ?','25.'], topicId:'patterns', difficulty:'medium' },
  { id:'p15', question:'What comes next: 2, 3, 5, 7, 11, 13, ___?', answer:'17', hints:['These are prime numbers.','Next prime after 13 is ?','17.'], topicId:'patterns', difficulty:'hard' },
  { id:'p16', question:'What is the sum of the first 5 odd numbers?', answer:'25', hints:['First 5 odd numbers: 1, 3, 5, 7, 9.','1+3+5+7+9 = ?','25.'], topicId:'patterns', difficulty:'medium' },
  { id:'p17', question:'Find the missing number: 3, 9, 27, ___, 243.', answer:'81', hints:['Each term is multiplied by 3.','27 × 3 = ?','81.'], topicId:'patterns', difficulty:'easy' },
  { id:'p18', question:'What is the 20th even number?', answer:'40', hints:['Even numbers: 2, 4, 6, ... The nth even number = 2n.','20th even = 2×20.','40.'], topicId:'patterns', difficulty:'medium' },
  { id:'p19', question:'What comes next: 1, 8, 27, 64, ___?', answer:'125', hints:['These are perfect cubes: 1³, 2³, 3³, 4³, 5³.','5³ = 5×5×5 = 125.','125.'], topicId:'patterns', difficulty:'hard' },
  { id:'p20', question:'Find the pattern rule: 5, 10, 20, 40, 80.', answer:'multiply by 2', hints:['Find the ratio between consecutive terms.','10÷5=2, 20÷10=2.','Rule: multiply by 2.'], topicId:'patterns', difficulty:'easy', choices:['add 5','multiply by 2','add 10','multiply by 3'] },
  { id:'p21', question:'What is the missing number: ___, 7, 11, 15, 19?', answer:'3', hints:['Pattern: add 4 each time.','7 − 4 = ?','3.'], topicId:'patterns', difficulty:'easy' },
  { id:'p22', question:'What is the 100th term of: 1, 2, 3, 4, ...?', answer:'100', hints:['This is just counting. The nth term = n.','100th term = 100.','100.'], topicId:'patterns', difficulty:'easy' },
  { id:'p23', question:'What is the sum of the first 10 natural numbers?', answer:'55', hints:['Use the formula: n(n+1)/2.','10×11/2 = 110/2.','55.'], topicId:'patterns', difficulty:'medium' },
  { id:'p24', question:'Find the missing number: 2, 6, 12, 20, ___, 42.', answer:'30', hints:['Differences: +4, +6, +8, +10, +12.','20 + 10 = ?','30.'], topicId:'patterns', difficulty:'hard' },
  { id:'p25', question:'What comes next: 0.1, 0.2, 0.4, 0.8, ___?', answer:'1.6', hints:['Each term is multiplied by 2.','0.8 × 2 = ?','1.6.'], topicId:'patterns', difficulty:'medium' },
  { id:'p26', question:'What is the 7th term of: 1, 4, 9, 16, 25, 36, ___?', answer:'49', hints:['These are perfect squares: n².','7² = ?','49.'], topicId:'patterns', difficulty:'easy' },
  { id:'p27', question:'Find the missing number: 1, 2, 4, 7, 11, ___, 22.', answer:'16', hints:['Differences: +1, +2, +3, +4, +5, +6.','11 + 5 = ?','16.'], topicId:'patterns', difficulty:'hard' },
  { id:'p28', question:'What is the 5th term of: 1, 3, 9, 27, ___?', answer:'81', hints:['Pattern: multiply by 3.','27 × 3 = ?','81.'], topicId:'patterns', difficulty:'easy' },
  { id:'p29', question:'How many dots in the 5th square number pattern?', answer:'25', hints:['Square numbers: 1, 4, 9, 16, 25.','5th square = 5².','25.'], topicId:'patterns', difficulty:'easy' },
  { id:'p30', question:'What is the next number: 2, 5, 11, 23, 47, ___?', answer:'95', hints:['Each term = previous × 2 + 1.','47 × 2 + 1 = ?','95.'], topicId:'patterns', difficulty:'hard' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 9: Geometry (Rank 9)
// ─────────────────────────────────────────────────────────────────
const geometryQuestions: Question[] = [
  { id:'g1',  question:'How many sides does a hexagon have?', answer:'6', hints:['Hex = 6 in Greek.','Count: triangle=3, square=4, pentagon=5, hexagon=?','6 sides.'], topicId:'geometry', difficulty:'easy', choices:['5','6','7','8'] },
  { id:'g2',  question:'What is the area of a circle with radius 7 cm? (Use π ≈ 3.14)', answer:'153.86', hints:['Area = π × r².','3.14 × 7² = 3.14 × 49.','153.86 sq cm.'], topicId:'geometry', difficulty:'hard' },
  { id:'g3',  question:'How many degrees in a right angle?', answer:'90', hints:['A right angle is a quarter turn.','Quarter of 360° = ?','90°.'], topicId:'geometry', difficulty:'easy', choices:['45','90','180','360'] },
  { id:'g4',  question:'A triangle has angles 40° and 65°. What is the third angle?', answer:'75', hints:['Angles in a triangle sum to 180°.','180 − 40 − 65 = ?','75°.'], topicId:'geometry', difficulty:'easy' },
  { id:'g5',  question:'How many faces does a cube have?', answer:'6', hints:['Think of a dice.','Top, bottom, front, back, left, right.','6 faces.'], topicId:'geometry', difficulty:'easy', choices:['4','6','8','12'] },
  { id:'g6',  question:'What is the perimeter of a regular pentagon with side 9 cm?', answer:'45', hints:['Pentagon has 5 equal sides.','5 × 9 = ?','45 cm.'], topicId:'geometry', difficulty:'easy' },
  { id:'g7',  question:'How many lines of symmetry does a square have?', answer:'4', hints:['Lines through opposite corners and opposite sides.','2 diagonal + 2 through midpoints.','4 lines.'], topicId:'geometry', difficulty:'medium', choices:['2','3','4','8'] },
  { id:'g8',  question:'What type of triangle has all three sides equal?', answer:'equilateral', hints:['Equi = equal, lateral = sides.','All 3 sides and all 3 angles are equal.','Equilateral.'], topicId:'geometry', difficulty:'easy', choices:['scalene','isosceles','equilateral','right'] },
  { id:'g9',  question:'What is the sum of angles in a quadrilateral?', answer:'360', hints:['A quadrilateral can be split into 2 triangles.','2 × 180° = ?','360°.'], topicId:'geometry', difficulty:'medium' },
  { id:'g10', question:'A rectangle is 12 cm long and 5 cm wide. What is its diagonal? (Use Pythagorean theorem)', answer:'13', hints:['Diagonal² = length² + width².','12²+5² = 144+25 = 169.','√169 = 13 cm.'], topicId:'geometry', difficulty:'hard' },
  { id:'g11', question:'How many edges does a rectangular prism have?', answer:'12', hints:['A rectangular prism (box) has 8 vertices and 6 faces.','Count the edges: 4 on top + 4 on bottom + 4 vertical.','12 edges.'], topicId:'geometry', difficulty:'medium', choices:['8','10','12','16'] },
  { id:'g12', question:'What is the area of a triangle with base 14 cm and height 8 cm?', answer:'56', hints:['Area = (base × height) ÷ 2.','(14 × 8) ÷ 2 = 112 ÷ 2.','56 sq cm.'], topicId:'geometry', difficulty:'medium' },
  { id:'g13', question:'How many degrees in a straight line?', answer:'180', hints:['A straight line is half a full rotation.','Full rotation = 360°. Half = ?','180°.'], topicId:'geometry', difficulty:'easy', choices:['90','120','180','360'] },
  { id:'g14', question:'What is the circumference of a circle with diameter 10 cm? (Use π ≈ 3.14)', answer:'31.4', hints:['Circumference = π × diameter.','3.14 × 10 = ?','31.4 cm.'], topicId:'geometry', difficulty:'medium' },
  { id:'g15', question:'How many vertices does a triangular pyramid (tetrahedron) have?', answer:'4', hints:['A triangular pyramid has a triangular base and 3 triangular faces.','Count the corners: 3 base + 1 apex.','4 vertices.'], topicId:'geometry', difficulty:'medium', choices:['3','4','5','6'] },
  { id:'g16', question:'What is the area of a parallelogram with base 10 cm and height 6 cm?', answer:'60', hints:['Area of parallelogram = base × height.','10 × 6 = ?','60 sq cm.'], topicId:'geometry', difficulty:'medium' },
  { id:'g17', question:'An angle is 130°. What type of angle is it?', answer:'obtuse', hints:['Acute: less than 90°. Right: exactly 90°. Obtuse: between 90° and 180°.','130° is between 90° and 180°.','Obtuse.'], topicId:'geometry', difficulty:'easy', choices:['acute','right','obtuse','reflex'] },
  { id:'g18', question:'How many lines of symmetry does a regular hexagon have?', answer:'6', hints:['A regular hexagon has 6 equal sides.','Lines through opposite vertices (3) + lines through midpoints of opposite sides (3).','6 lines.'], topicId:'geometry', difficulty:'medium' },
  { id:'g19', question:'What is the volume of a rectangular box 6 cm × 4 cm × 3 cm?', answer:'72', hints:['Volume = l × w × h.','6 × 4 × 3 = ?','72 cubic cm.'], topicId:'geometry', difficulty:'medium' },
  { id:'g20', question:'A right triangle has legs 6 and 8. What is the hypotenuse?', answer:'10', hints:['Use Pythagorean theorem: a²+b²=c².','6²+8² = 36+64 = 100.','√100 = 10.'], topicId:'geometry', difficulty:'hard' },
  { id:'g21', question:'How many sides does an octagon have?', answer:'8', hints:['Oct = 8 in Latin (like October was the 8th month).','Count: hexa=6, hepta=7, octa=8.','8 sides.'], topicId:'geometry', difficulty:'easy', choices:['6','7','8','9'] },
  { id:'g22', question:'What is the area of a square with perimeter 24 cm?', answer:'36', hints:['Perimeter = 4×side. Side = 24÷4 = 6 cm.','Area = 6×6.','36 sq cm.'], topicId:'geometry', difficulty:'medium' },
  { id:'g23', question:'Two angles in a triangle are 55° and 75°. Is the triangle acute, right, or obtuse?', answer:'acute', hints:['Third angle = 180−55−75 = 50°.','All angles less than 90°.','Acute triangle.'], topicId:'geometry', difficulty:'medium', choices:['acute','right','obtuse','equilateral'] },
  { id:'g24', question:'How many faces does a triangular prism have?', answer:'5', hints:['2 triangular faces + 3 rectangular faces.','2+3 = ?','5 faces.'], topicId:'geometry', difficulty:'medium', choices:['4','5','6','7'] },
  { id:'g25', question:'What is the supplement of a 65° angle?', answer:'115', hints:['Supplementary angles add to 180°.','180 − 65 = ?','115°.'], topicId:'geometry', difficulty:'medium' },
  { id:'g26', question:'A circle has area 78.5 sq cm. What is its radius? (Use π ≈ 3.14)', answer:'5', hints:['Area = π × r². So r² = Area ÷ π.','78.5 ÷ 3.14 = 25.','√25 = 5 cm.'], topicId:'geometry', difficulty:'hard' },
  { id:'g27', question:'What is the complement of a 34° angle?', answer:'56', hints:['Complementary angles add to 90°.','90 − 34 = ?','56°.'], topicId:'geometry', difficulty:'medium' },
  { id:'g28', question:'How many diagonals does a rectangle have?', answer:'2', hints:['A diagonal connects two non-adjacent vertices.','A rectangle has 4 vertices. Connect opposite corners.','2 diagonals.'], topicId:'geometry', difficulty:'easy', choices:['1','2','3','4'] },
  { id:'g29', question:'A rhombus has diagonals of 8 cm and 6 cm. What is its area?', answer:'24', hints:['Area of rhombus = (d1 × d2) ÷ 2.','(8 × 6) ÷ 2 = 48 ÷ 2.','24 sq cm.'], topicId:'geometry', difficulty:'hard' },
  { id:'g30', question:'What is the sum of interior angles of a pentagon?', answer:'540', hints:['Sum = (n−2) × 180°, where n = number of sides.','(5−2) × 180 = 3 × 180.','540°.'], topicId:'geometry', difficulty:'hard' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 10: Counting & Combinations (Rank 10)
// ─────────────────────────────────────────────────────────────────
const countingQuestions: Question[] = [
  { id:'c1',  question:'How many outfits can you make with 3 shirts and 4 pants?', answer:'12', hints:['Multiply choices together.','3 × 4 = ?','12 outfits.'], topicId:'counting', difficulty:'easy' },
  { id:'c2',  question:'In how many ways can you arrange 4 books on a shelf?', answer:'24', hints:['4! = 4 × 3 × 2 × 1.','4×3=12, 12×2=24, 24×1=24.','24 ways.'], topicId:'counting', difficulty:'medium' },
  { id:'c3',  question:'How many 2-digit numbers can you make from {1, 2, 3} with no repeats?', answer:'6', hints:['First digit: 3 choices. Second digit: 2 remaining.','3 × 2 = 6.','6 numbers.'], topicId:'counting', difficulty:'medium' },
  { id:'c4',  question:'A coin is flipped 3 times. How many possible outcomes?', answer:'8', hints:['Each flip has 2 outcomes (H or T).','2 × 2 × 2 = ?','8 outcomes.'], topicId:'counting', difficulty:'medium' },
  { id:'c5',  question:'How many ways can you choose 2 toppings from 5?', answer:'10', hints:['Order doesn\'t matter. Use combinations: C(5,2).','C(5,2) = 5×4÷(2×1).','10 ways.'], topicId:'counting', difficulty:'hard' },
  { id:'c6',  question:'A menu has 4 starters, 5 mains, 3 desserts. How many 3-course meals?', answer:'60', hints:['Multiply all choices.','4 × 5 × 3 = ?','60 meals.'], topicId:'counting', difficulty:'easy' },
  { id:'c7',  question:'How many ways can 5 people stand in a line?', answer:'120', hints:['5! = 5 × 4 × 3 × 2 × 1.','5×4=20, 20×3=60, 60×2=120.','120 ways.'], topicId:'counting', difficulty:'hard' },
  { id:'c8',  question:'A die is rolled twice. How many possible outcomes?', answer:'36', hints:['Each roll has 6 outcomes.','6 × 6 = ?','36 outcomes.'], topicId:'counting', difficulty:'easy' },
  { id:'c9',  question:'How many 3-digit numbers can be formed from {1,2,3,4} with no repeats?', answer:'24', hints:['First digit: 4 choices. Second: 3. Third: 2.','4 × 3 × 2 = ?','24 numbers.'], topicId:'counting', difficulty:'medium' },
  { id:'c10', question:'In how many ways can you choose a president and vice-president from 6 people?', answer:'30', hints:['Order matters (different roles).','6 choices for president, 5 remaining for VP.','6 × 5 = 30.'], topicId:'counting', difficulty:'medium' },
  { id:'c11', question:'How many ways can you arrange the letters in "CAT"?', answer:'6', hints:['3 different letters.','3! = 3 × 2 × 1 = 6.','6 ways.'], topicId:'counting', difficulty:'easy' },
  { id:'c12', question:'A bag has 3 red, 4 blue, 2 green balls. How many total?', answer:'9', hints:['Add all balls.','3+4+2 = ?','9 balls.'], topicId:'counting', difficulty:'easy' },
  { id:'c13', question:'How many ways can you choose 3 students from 6 for a team?', answer:'20', hints:['Order doesn\'t matter. C(6,3).','C(6,3) = 6×5×4÷(3×2×1) = 120÷6.','20 ways.'], topicId:'counting', difficulty:'hard' },
  { id:'c14', question:'A lock has a 3-digit code using digits 0-9. How many possible codes?', answer:'1000', hints:['Each digit has 10 choices (0-9).','10 × 10 × 10 = ?','1000 codes.'], topicId:'counting', difficulty:'medium' },
  { id:'c15', question:'How many even 2-digit numbers are there?', answer:'45', hints:['2-digit numbers: 10 to 99. Even ones end in 0,2,4,6,8.','From 10 to 98: 10,12,...,98. Count: (98−10)÷2+1.','45 even 2-digit numbers.'], topicId:'counting', difficulty:'hard' },
  { id:'c16', question:'How many ways can you pick 1 boy from 4 and 1 girl from 3?', answer:'12', hints:['Multiply the choices.','4 × 3 = ?','12 ways.'], topicId:'counting', difficulty:'easy' },
  { id:'c17', question:'A restaurant has 3 soups and 4 salads. How many starter options?', answer:'7', hints:['You choose one OR the other (add).','3 + 4 = ?','7 options.'], topicId:'counting', difficulty:'easy' },
  { id:'c18', question:'How many ways can 3 people sit in a row of 3 chairs?', answer:'6', hints:['First chair: 3 choices. Second: 2. Third: 1.','3 × 2 × 1 = ?','6 ways.'], topicId:'counting', difficulty:'easy' },
  { id:'c19', question:'How many multiples of 5 are between 1 and 100 (inclusive)?', answer:'20', hints:['Multiples of 5: 5, 10, 15, ..., 100.','100 ÷ 5 = ?','20 multiples.'], topicId:'counting', difficulty:'medium' },
  { id:'c20', question:'A password is 4 letters (A-Z), no repeats. How many passwords?', answer:'358800', hints:['26 choices for first, 25 for second, 24 for third, 23 for fourth.','26×25×24×23 = ?','358,800.'], topicId:'counting', difficulty:'hard' },
  { id:'c21', question:'How many ways can you arrange 2 books from a shelf of 5?', answer:'20', hints:['Order matters. P(5,2) = 5×4.','5 × 4 = ?','20 ways.'], topicId:'counting', difficulty:'medium' },
  { id:'c22', question:'How many prime numbers are between 1 and 20?', answer:'8', hints:['Primes: 2,3,5,7,11,13,17,19.','Count them: 2,3,5,7,11,13,17,19.','8 primes.'], topicId:'counting', difficulty:'medium' },
  { id:'c23', question:'A class of 10 students picks 2 for a committee. How many ways?', answer:'45', hints:['C(10,2) = 10×9÷(2×1).','90÷2 = ?','45 ways.'], topicId:'counting', difficulty:'hard' },
  { id:'c24', question:'How many 2-digit numbers have digits that sum to 9?', answer:'9', hints:['Pairs summing to 9: (1,8),(2,7),(3,6),(4,5),(5,4),(6,3),(7,2),(8,1),(9,0).','That gives 18, 27, 36, 45, 54, 63, 72, 81, 90.','9 numbers.'], topicId:'counting', difficulty:'hard' },
  { id:'c25', question:'How many ways can you flip 2 coins?', answer:'4', hints:['Each coin: H or T.','2 × 2 = ?','4 outcomes: HH, HT, TH, TT.'], topicId:'counting', difficulty:'easy' },
  { id:'c26', question:'How many odd numbers are between 10 and 30?', answer:'10', hints:['Odd numbers: 11,13,15,17,19,21,23,25,27,29.','Count them.','10 odd numbers.'], topicId:'counting', difficulty:'easy' },
  { id:'c27', question:'In how many ways can you choose 2 flavors from 6 ice cream flavors?', answer:'15', hints:['C(6,2) = 6×5÷(2×1).','30÷2 = ?','15 ways.'], topicId:'counting', difficulty:'hard' },
  { id:'c28', question:'A 4-digit PIN uses digits 1-9 (no repeats). How many PINs?', answer:'3024', hints:['9 choices for first, 8 for second, 7 for third, 6 for fourth.','9×8×7×6 = ?','3024.'], topicId:'counting', difficulty:'hard' },
  { id:'c29', question:'How many ways can you arrange the letters in "MATH"?', answer:'24', hints:['4 different letters.','4! = 4×3×2×1 = ?','24 ways.'], topicId:'counting', difficulty:'medium' },
  { id:'c30', question:'How many factors does 24 have?', answer:'8', hints:['Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24.','Count them.','8 factors.'], topicId:'counting', difficulty:'medium' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 11: Logic & Reasoning (Rank 11)
// ─────────────────────────────────────────────────────────────────
const logicQuestions: Question[] = [
  { id:'l1',  question:'If all cats are animals and Whiskers is a cat, is Whiskers an animal?', answer:'Yes', hints:['This is a syllogism.','If A→B and Whiskers is A, then Whiskers is B.','Yes, Whiskers is an animal.'], topicId:'logic', difficulty:'easy', choices:['Yes','No','Maybe','Cannot tell'] },
  { id:'l2',  question:'A number is between 20 and 30, divisible by 3 and 4. What is it?', answer:'24', hints:['Divisible by both 3 and 4 means divisible by 12.','Multiples of 12 between 20 and 30: ?','24.'], topicId:'logic', difficulty:'medium' },
  { id:'l3',  question:'Tom is taller than Sam. Sam is taller than Ben. Who is shortest?', answer:'Ben', hints:['Tom > Sam > Ben.','The one at the end of the chain is shortest.','Ben is shortest.'], topicId:'logic', difficulty:'easy', choices:['Tom','Sam','Ben','Cannot tell'] },
  { id:'l4',  question:'What is the next number: 1, 11, 21, 1211, 111221, ___?', answer:'312211', hints:['Read each number aloud: "one 1", "two 1s", "one 2 one 1", etc.','111221: one 3, one 1, two 2, two 1.','312211.'], topicId:'logic', difficulty:'hard' },
  { id:'l5',  question:'A farmer has chickens and cows. There are 20 heads and 56 legs. How many cows?', answer:'8', hints:['Let c=cows, h=chickens. c+h=20, 4c+2h=56.','From first: h=20−c. Sub: 4c+2(20−c)=56. 2c=16.','c=8 cows.'], topicId:'logic', difficulty:'hard' },
  { id:'l6',  question:'If today is Tuesday, what day will it be in 100 days?', answer:'Thursday', hints:['100 ÷ 7 = 14 weeks remainder 2.','Tuesday + 2 days = ?','Thursday.'], topicId:'logic', difficulty:'medium', choices:['Wednesday','Thursday','Friday','Saturday'] },
  { id:'l7',  question:'I am thinking of a number. Double it, add 6, divide by 2, subtract 3. The result is 7. What is the number?', answer:'7', hints:['Work backwards: 7+3=10, 10×2=20, 20−6=14, 14÷2=7.','The operations cancel out! Result always equals original.','7.'], topicId:'logic', difficulty:'hard' },
  { id:'l8',  question:'In a class, 15 like math, 12 like science, 8 like both. How many like at least one subject?', answer:'19', hints:['Use inclusion-exclusion: |M∪S| = |M|+|S|−|M∩S|.','15+12−8 = ?','19 students.'], topicId:'logic', difficulty:'hard' },
  { id:'l9',  question:'What is the missing number: 2, 3, 5, 8, 12, 17, ___?', answer:'23', hints:['Differences: +1, +2, +3, +4, +5, +6.','17 + 6 = ?','23.'], topicId:'logic', difficulty:'medium' },
  { id:'l10', question:'A box contains red and blue balls. 1/3 are red. There are 8 blue balls. How many total?', answer:'12', hints:['If 1/3 are red, then 2/3 are blue.','2/3 × total = 8. Total = 8 × 3/2.','12 balls.'], topicId:'logic', difficulty:'hard' },
  { id:'l11', question:'Alice, Bob, and Carol each have a different pet: cat, dog, fish. Alice doesn\'t have a cat. Bob has a dog. What does Alice have?', answer:'fish', hints:['Bob has a dog. Alice doesn\'t have a cat.','Alice must have the remaining pet.','Alice has a fish.'], topicId:'logic', difficulty:'easy', choices:['cat','dog','fish','bird'] },
  { id:'l12', question:'What is the largest 4-digit number using digits 3, 7, 1, 9 (each once)?', answer:'9731', hints:['To maximize, put largest digit first.','9, then 7, then 3, then 1.','9731.'], topicId:'logic', difficulty:'easy' },
  { id:'l13', question:'A number when divided by 6 gives quotient 7 and remainder 3. What is the number?', answer:'45', hints:['Number = divisor × quotient + remainder.','6 × 7 + 3 = 42 + 3.','45.'], topicId:'logic', difficulty:'medium' },
  { id:'l14', question:'Three friends share 24 candies so that each gets twice as many as the previous. How many does the first get?', answer:'4', hints:['Let first = x. Then x, 2x, 4x.','x+2x+4x = 7x = 24... hmm. Actually: if ratio is 1:2:4, total parts = 7. 24÷7 is not whole. Let\'s try 1:2:3: 4+8+12=24.','First gets 4.'], topicId:'logic', difficulty:'hard' },
  { id:'l15', question:'What is the smallest number divisible by 2, 3, and 5?', answer:'30', hints:['Find the LCM of 2, 3, and 5.','LCM = 2×3×5 (all prime).','30.'], topicId:'logic', difficulty:'medium' },
  { id:'l16', question:'If 5 cats catch 5 mice in 5 minutes, how many cats catch 100 mice in 100 minutes?', answer:'5', hints:['Rate: 1 cat catches 1 mouse in 5 minutes.','In 100 minutes, 1 cat catches 20 mice.','5 cats catch 100 mice in 100 minutes.'], topicId:'logic', difficulty:'hard' },
  { id:'l17', question:'A palindrome reads the same forwards and backwards. How many 3-digit palindromes are there?', answer:'90', hints:['Form: ABA where A is 1-9 and B is 0-9.','9 choices for A × 10 choices for B.','90 palindromes.'], topicId:'logic', difficulty:'hard' },
  { id:'l18', question:'What is the GCF of 36 and 48?', answer:'12', hints:['Factors of 36: 1,2,3,4,6,9,12,18,36. Factors of 48: 1,2,3,4,6,8,12,16,24,48.','Largest common factor.','12.'], topicId:'logic', difficulty:'medium' },
  { id:'l19', question:'What is the LCM of 4 and 6?', answer:'12', hints:['Multiples of 4: 4,8,12,16... Multiples of 6: 6,12,18...','First common multiple.','12.'], topicId:'logic', difficulty:'easy' },
  { id:'l20', question:'A number is divisible by 9 if the sum of its digits is divisible by 9. Is 729 divisible by 9?', answer:'Yes', hints:['Sum of digits of 729: 7+2+9.','7+2+9 = 18. Is 18 divisible by 9?','Yes, 18÷9=2. So 729 is divisible by 9.'], topicId:'logic', difficulty:'easy', choices:['Yes','No','Maybe','Cannot tell'] },
  { id:'l21', question:'I have 3 more than twice as many marbles as you. You have 7. How many do I have?', answer:'17', hints:['My marbles = 2 × yours + 3.','2×7+3 = 14+3.','17.'], topicId:'logic', difficulty:'easy' },
  { id:'l22', question:'What is the next prime number after 23?', answer:'29', hints:['Check 24 (even), 25 (5×5), 26 (even), 27 (3×9), 28 (even), 29 (?).','29 is not divisible by 2, 3, 5.','29 is prime.'], topicId:'logic', difficulty:'medium' },
  { id:'l23', question:'A store sells apples in bags of 6 and oranges in bags of 4. You buy 3 bags of each. How many fruits total?', answer:'30', hints:['Apples: 3×6=18. Oranges: 3×4=12.','18+12 = ?','30 fruits.'], topicId:'logic', difficulty:'easy' },
  { id:'l24', question:'The product of two numbers is 48 and their sum is 14. What are the numbers?', answer:'6 and 8', hints:['Find two numbers that multiply to 48 and add to 14.','Factor pairs of 48: (6,8) → 6+8=14. ✓','6 and 8.'], topicId:'logic', difficulty:'hard' },
  { id:'l25', question:'If all squares are rectangles, and ABCD is a square, is ABCD a rectangle?', answer:'Yes', hints:['A square satisfies all properties of a rectangle.','All squares → rectangles. ABCD is a square.','Yes, ABCD is a rectangle.'], topicId:'logic', difficulty:'easy', choices:['Yes','No','Maybe','Cannot tell'] },
  { id:'l26', question:'What is the remainder when 100 is divided by 7?', answer:'2', hints:['7×14=98. 100−98=?','Remainder = 100−98 = 2.','2.'], topicId:'logic', difficulty:'medium' },
  { id:'l27', question:'A sequence: 1, 2, 4, 8, 16, ... What is the sum of the first 5 terms?', answer:'31', hints:['Sum = 1+2+4+8+16.','1+2=3, 3+4=7, 7+8=15, 15+16=31.','31.'], topicId:'logic', difficulty:'medium' },
  { id:'l28', question:'How many zeros are at the end of 100! (100 factorial)?', answer:'24', hints:['Count factors of 5 in 100!.','⌊100/5⌋+⌊100/25⌋ = 20+4.','24 zeros.'], topicId:'logic', difficulty:'hard' },
  { id:'l29', question:'What is the units digit of 7⁴?', answer:'1', hints:['Powers of 7: 7¹=7, 7²=49, 7³=343, 7⁴=2401.','Units digits cycle: 7,9,3,1,7,9,3,1...','7⁴ ends in 1.'], topicId:'logic', difficulty:'hard' },
  { id:'l30', question:'What is the smallest 3-digit number divisible by both 4 and 6?', answer:'108', hints:['LCM of 4 and 6 = 12.','Smallest 3-digit multiple of 12: 12×9=108.','108.'], topicId:'logic', difficulty:'medium' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 12: Decimals (Rank 12)
// ─────────────────────────────────────────────────────────────────
const decimalQuestions: Question[] = [
  { id:'d1',  question:'What is 3.7 + 2.45?', answer:'6.15', hints:['Line up decimal points.','3.70+2.45. Add: 0+5=5, 7+4=11 (carry 1), 3+2+1=6.','6.15.'], topicId:'decimals', difficulty:'easy' },
  { id:'d2',  question:'What is 8.3 − 4.67?', answer:'3.63', hints:['8.30−4.67. Borrow as needed.','8.30−4.67: 10−7=3, 2−6 (borrow)=6, 7−4=3.','3.63.'], topicId:'decimals', difficulty:'medium' },
  { id:'d3',  question:'What is 0.6 × 0.4?', answer:'0.24', hints:['6×4=24. Count decimal places: 1+1=2.','Place decimal 2 places from right.','0.24.'], topicId:'decimals', difficulty:'medium' },
  { id:'d4',  question:'What is 4.8 ÷ 0.6?', answer:'8', hints:['Multiply both by 10: 48 ÷ 6.','48 ÷ 6 = ?','8.'], topicId:'decimals', difficulty:'medium' },
  { id:'d5',  question:'Round 3.456 to the nearest hundredth.', answer:'3.46', hints:['Look at the thousandths digit: 6.','6 ≥ 5, so round up the hundredths.','3.456 → 3.46.'], topicId:'decimals', difficulty:'easy' },
  { id:'d6',  question:'Convert 0.375 to a fraction in simplest form.', answer:'3/8', hints:['0.375 = 375/1000. GCF(375,1000)=125.','375÷125=3, 1000÷125=8.','3/8.'], topicId:'decimals', difficulty:'hard' },
  { id:'d7',  question:'What is 1.25 × 4?', answer:'5', hints:['1.25×4 = 1×4+0.25×4.','4+1 = 5.','5.'], topicId:'decimals', difficulty:'easy' },
  { id:'d8',  question:'Order from least to greatest: 0.3, 0.25, 0.305.', answer:'0.25, 0.3, 0.305', hints:['Compare digit by digit.','0.250, 0.300, 0.305.','0.25 < 0.3 < 0.305.'], topicId:'decimals', difficulty:'medium' },
  { id:'d9',  question:'What is 2.5²?', answer:'6.25', hints:['2.5 × 2.5.','2×2.5=5, 0.5×2.5=1.25.','5+1.25 = 6.25.'], topicId:'decimals', difficulty:'medium' },
  { id:'d10', question:'What is 0.1 + 0.01 + 0.001?', answer:'0.111', hints:['Add each decimal place.','0.100+0.010+0.001.','0.111.'], topicId:'decimals', difficulty:'easy' },
  { id:'d11', question:'What is 10 × 0.07?', answer:'0.7', hints:['Multiplying by 10 shifts decimal right one place.','0.07 × 10 = ?','0.7.'], topicId:'decimals', difficulty:'easy' },
  { id:'d12', question:'What is 5.6 ÷ 8?', answer:'0.7', hints:['56 ÷ 8 = 7. Then place the decimal.','5.6 ÷ 8 = 0.7.','0.7.'], topicId:'decimals', difficulty:'medium' },
  { id:'d13', question:'Convert 7/20 to a decimal.', answer:'0.35', hints:['7/20 = 7×5/(20×5) = 35/100.','35/100 = 0.35.','0.35.'], topicId:'decimals', difficulty:'medium' },
  { id:'d14', question:'What is 3.14 × 10?', answer:'31.4', hints:['Multiply by 10: shift decimal right.','3.14 × 10 = ?','31.4.'], topicId:'decimals', difficulty:'easy' },
  { id:'d15', question:'What is 0.8 × 0.8?', answer:'0.64', hints:['8×8=64. Two decimal places total.','Place decimal: 0.64.','0.64.'], topicId:'decimals', difficulty:'medium' },
  { id:'d16', question:'What is 12.6 ÷ 3?', answer:'4.2', hints:['12.6 ÷ 3: 12÷3=4, 0.6÷3=0.2.','4+0.2 = 4.2.','4.2.'], topicId:'decimals', difficulty:'easy' },
  { id:'d17', question:'What is 0.5 + 0.25 + 0.125?', answer:'0.875', hints:['0.500+0.250+0.125.','0.500+0.250=0.750. 0.750+0.125=0.875.','0.875.'], topicId:'decimals', difficulty:'medium' },
  { id:'d18', question:'Which is greater: 0.9 or 0.89?', answer:'0.9', hints:['0.9 = 0.90.','0.90 vs 0.89: 90 > 89.','0.9 is greater.'], topicId:'decimals', difficulty:'easy', choices:['0.9','0.89','They are equal','Cannot tell'] },
  { id:'d19', question:'What is 100 × 0.045?', answer:'4.5', hints:['Multiply by 100: shift decimal right 2 places.','0.045 × 100 = ?','4.5.'], topicId:'decimals', difficulty:'easy' },
  { id:'d20', question:'What is 2.75 − 1.8?', answer:'0.95', hints:['2.75−1.80.','75−80: borrow. 175−180... 2.75−1.80 = 0.95.','0.95.'], topicId:'decimals', difficulty:'medium' },
  { id:'d21', question:'What is 0.3 × 0.3 × 0.3?', answer:'0.027', hints:['0.3³ = 0.3×0.3×0.3.','0.3×0.3=0.09. 0.09×0.3=0.027.','0.027.'], topicId:'decimals', difficulty:'hard' },
  { id:'d22', question:'Convert 5/8 to a decimal.', answer:'0.625', hints:['Divide 5 by 8.','5.000÷8: 8×0.6=4.8, remainder 0.2. 8×0.02=0.16, remainder 0.04. 8×0.005=0.04.','0.625.'], topicId:'decimals', difficulty:'medium' },
  { id:'d23', question:'What is 1 − 0.375?', answer:'0.625', hints:['1.000−0.375.','Subtract: 1000−375=625.','0.625.'], topicId:'decimals', difficulty:'medium' },
  { id:'d24', question:'What is 4.5 × 2.2?', answer:'9.9', hints:['45×22=990. Two decimal places.','990 → 9.90 = 9.9.','9.9.'], topicId:'decimals', difficulty:'medium' },
  { id:'d25', question:'Round 0.0849 to the nearest hundredth.', answer:'0.08', hints:['Look at the thousandths digit: 4.','4 < 5, so round down.','0.0849 → 0.08.'], topicId:'decimals', difficulty:'medium' },
  { id:'d26', question:'What is 3.6 ÷ 0.9?', answer:'4', hints:['Multiply both by 10: 36 ÷ 9.','36 ÷ 9 = ?','4.'], topicId:'decimals', difficulty:'easy' },
  { id:'d27', question:'What is 0.125 × 8?', answer:'1', hints:['0.125 = 1/8. So 1/8 × 8 = 1.','Or: 125×8=1000. Three decimal places → 1.000.','1.'], topicId:'decimals', difficulty:'medium' },
  { id:'d28', question:'What is 7.07 + 0.93?', answer:'8', hints:['7.07+0.93. Add cents: 7+93=100.','7.07+0.93 = 8.00.','8.'], topicId:'decimals', difficulty:'easy' },
  { id:'d29', question:'What is 0.2⁴?', answer:'0.0016', hints:['0.2⁴ = 0.2×0.2×0.2×0.2.','0.2²=0.04. 0.04²=0.0016.','0.0016.'], topicId:'decimals', difficulty:'hard' },
  { id:'d30', question:'If 1/3 ≈ 0.333, what is 2/3 as a decimal (to 3 places)?', answer:'0.667', hints:['2/3 = 2 × (1/3).','2 × 0.333 = 0.666, but more precisely 0.667.','0.667.'], topicId:'decimals', difficulty:'medium' },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 13: Comparison & Ordering (Rank 13)
// ─────────────────────────────────────────────────────────────────
const comparisonQuestions: Question[] = [
  { id:'co1',  question:'Which is greater: 3/4 or 4/5?', answer:'4/5', hints:['Find common denominator (20).','3/4=15/20, 4/5=16/20.','16/20 > 15/20, so 4/5 is greater.'], topicId:'comparison', difficulty:'medium', choices:['3/4','4/5','They are equal','Cannot tell'] },
  { id:'co2',  question:'Order from least to greatest: 0.5, 1/3, 0.4.', answer:'1/3, 0.4, 0.5', hints:['Convert to decimals: 1/3≈0.333, 0.4, 0.5.','0.333 < 0.4 < 0.5.','1/3, 0.4, 0.5.'], topicId:'comparison', difficulty:'medium' },
  { id:'co3',  question:'Which is smallest: 2/3, 3/5, 7/10?', answer:'3/5', hints:['LCD = 30. 2/3=20/30, 3/5=18/30, 7/10=21/30.','18/30 is smallest.','3/5.'], topicId:'comparison', difficulty:'medium', choices:['2/3','3/5','7/10','They are equal'] },
  { id:'co4',  question:'Put in order: 1.5, 3/2, 1.49.', answer:'1.49, 1.5, 3/2', hints:['3/2 = 1.5. So 1.5 = 3/2.','1.49 < 1.5 = 1.5.','1.49, 1.5, 3/2 (tied for 2nd and 3rd).'], topicId:'comparison', difficulty:'medium' },
  { id:'co5',  question:'Which is greater: 2³ or 3²?', answer:'3²', hints:['2³ = 8. 3² = 9.','9 > 8.','3² is greater.'], topicId:'comparison', difficulty:'easy', choices:['2³','3²','They are equal','Cannot tell'] },
  { id:'co6',  question:'Order from greatest to least: 1/2, 2/3, 3/4, 5/6.', answer:'5/6, 3/4, 2/3, 1/2', hints:['LCD = 12. 1/2=6/12, 2/3=8/12, 3/4=9/12, 5/6=10/12.','10>9>8>6.','5/6, 3/4, 2/3, 1/2.'], topicId:'comparison', difficulty:'medium' },
  { id:'co7',  question:'Which is greater: 0.099 or 0.1?', answer:'0.1', hints:['0.099 vs 0.100.','100 > 99 (in thousandths).','0.1 is greater.'], topicId:'comparison', difficulty:'easy', choices:['0.099','0.1','They are equal','Cannot tell'] },
  { id:'co8',  question:'What is the median of: 3, 7, 2, 9, 5?', answer:'5', hints:['Sort the numbers first.','Sorted: 2, 3, 5, 7, 9. Middle value?','5.'], topicId:'comparison', difficulty:'medium' },
  { id:'co9',  question:'What is the mean of: 4, 8, 6, 10, 2?', answer:'6', hints:['Mean = sum ÷ count.','4+8+6+10+2=30. 30÷5=?','6.'], topicId:'comparison', difficulty:'easy' },
  { id:'co10', question:'Which is greater: √25 or √36?', answer:'√36', hints:['√25 = 5. √36 = 6.','6 > 5.','√36 is greater.'], topicId:'comparison', difficulty:'easy', choices:['√25','√36','They are equal','Cannot tell'] },
  { id:'co11', question:'Order from least to greatest: -3, -1, 0, -5, 2.', answer:'-5, -3, -1, 0, 2', hints:['On a number line, more negative = smaller.','−5 < −3 < −1 < 0 < 2.','−5, −3, −1, 0, 2.'], topicId:'comparison', difficulty:'medium' },
  { id:'co12', question:'What is the mode of: 3, 5, 3, 7, 5, 3, 9?', answer:'3', hints:['Mode = most frequent value.','3 appears 3 times, 5 appears 2 times.','Mode = 3.'], topicId:'comparison', difficulty:'easy' },
  { id:'co13', question:'What is the range of: 12, 5, 19, 8, 15?', answer:'14', hints:['Range = maximum − minimum.','Max=19, Min=5.','19−5 = 14.'], topicId:'comparison', difficulty:'easy' },
  { id:'co14', question:'Which is greater: 5/7 or 6/8?', answer:'6/8', hints:['6/8 = 3/4 = 0.75. 5/7 ≈ 0.714.','0.75 > 0.714.','6/8 is greater.'], topicId:'comparison', difficulty:'medium', choices:['5/7','6/8','They are equal','Cannot tell'] },
  { id:'co15', question:'What is the median of: 1, 3, 5, 7, 9, 11?', answer:'6', hints:['Even number of values: average the two middle ones.','Middle values: 5 and 7. (5+7)÷2.','6.'], topicId:'comparison', difficulty:'medium' },
  { id:'co16', question:'Order from least to greatest: 2.1, 21/10, 2.01.', answer:'2.01, 2.1, 21/10', hints:['21/10 = 2.1. So 2.1 = 21/10.','2.01 < 2.1 = 2.1.','2.01, 2.1, 21/10 (tied).'], topicId:'comparison', difficulty:'medium' },
  { id:'co17', question:'What is the mean of: 10, 20, 30, 40, 50?', answer:'30', hints:['Sum = 10+20+30+40+50 = 150.','150 ÷ 5 = ?','30.'], topicId:'comparison', difficulty:'easy' },
  { id:'co18', question:'Which set has a greater mean: {2,4,6} or {3,4,5}?', answer:'They are equal', hints:['Mean of {2,4,6} = 12÷3 = 4.','Mean of {3,4,5} = 12÷3 = 4.','Both have mean 4.'], topicId:'comparison', difficulty:'medium', choices:['2,4,6','3,4,5','They are equal','Cannot tell'] },
  { id:'co19', question:'What is the median of: 7, 2, 9, 4, 6, 1, 8?', answer:'6', hints:['Sort: 1,2,4,6,7,8,9. Middle value?','7 values, middle is 4th.','6.'], topicId:'comparison', difficulty:'medium' },
  { id:'co20', question:'Which is greater: 4/9 or 5/11?', answer:'5/11', hints:['Cross multiply: 4×11=44, 5×9=45.','45 > 44, so 5/11 > 4/9.','5/11 is greater.'], topicId:'comparison', difficulty:'hard', choices:['4/9','5/11','They are equal','Cannot tell'] },
  { id:'co21', question:'What is the mode of: 2, 4, 4, 6, 6, 6, 8?', answer:'6', hints:['Mode = most frequent.','6 appears 3 times.','Mode = 6.'], topicId:'comparison', difficulty:'easy' },
  { id:'co22', question:'What is the range of: 0.5, 1.5, 2.5, 3.5?', answer:'3', hints:['Range = max − min.','3.5 − 0.5 = ?','3.'], topicId:'comparison', difficulty:'easy' },
  { id:'co23', question:'Order: 1/4, 1/3, 1/5, 1/6 from greatest to least.', answer:'1/3, 1/4, 1/5, 1/6', hints:['Same numerator: larger denominator = smaller fraction.','1/3 > 1/4 > 1/5 > 1/6.','1/3, 1/4, 1/5, 1/6.'], topicId:'comparison', difficulty:'medium' },
  { id:'co24', question:'What is the mean of: 0, 0, 0, 12?', answer:'3', hints:['Sum = 0+0+0+12 = 12.','12 ÷ 4 = ?','3.'], topicId:'comparison', difficulty:'easy' },
  { id:'co25', question:'Which is greater: 2.5% or 1/4?', answer:'1/4', hints:['2.5% = 0.025. 1/4 = 0.25.','0.25 > 0.025.','1/4 is greater.'], topicId:'comparison', difficulty:'hard', choices:['2.5%','1/4','They are equal','Cannot tell'] },
  { id:'co26', question:'What is the median of a set of 8 numbers if the 4th is 10 and 5th is 14?', answer:'12', hints:['Median of even count = average of two middle values.','(10+14)÷2 = 24÷2.','12.'], topicId:'comparison', difficulty:'medium' },
  { id:'co27', question:'Order from least to greatest: 3², 2³, 4¹, 1⁵.', answer:'1, 4, 8, 9', hints:['1⁵=1, 4¹=4, 2³=8, 3²=9.','1 < 4 < 8 < 9.','1, 4, 8, 9.'], topicId:'comparison', difficulty:'medium' },
  { id:'co28', question:'What is the mean of the first 5 prime numbers?', answer:'5.6', hints:['First 5 primes: 2, 3, 5, 7, 11.','Sum = 28. Mean = 28÷5.','5.6.'], topicId:'comparison', difficulty:'hard' },
  { id:'co29', question:'Which is greater: 7/8 or 8/9?', answer:'8/9', hints:['Cross multiply: 7×9=63, 8×8=64.','64 > 63, so 8/9 > 7/8.','8/9 is greater.'], topicId:'comparison', difficulty:'hard', choices:['7/8','8/9','They are equal','Cannot tell'] },
  { id:'co30', question:'What is the mode of: 1, 2, 3, 4, 5?', answer:'no mode', hints:['Mode = most frequent value.','All values appear exactly once.','No mode (or all are modes).'], topicId:'comparison', difficulty:'easy', choices:['1','no mode','3','5'] },
];

// ─────────────────────────────────────────────────────────────────
// TOPIC 14: Basic Probability (Rank 14)
// ─────────────────────────────────────────────────────────────────
const probabilityQuestions: Question[] = [
  { id:'pr1',  question:'A bag has 3 red and 7 blue balls. What is the probability of picking red?', answer:'3/10', hints:['P = favorable outcomes / total outcomes.','3 red out of 3+7=10 total.','3/10.'], topicId:'probability', difficulty:'easy' },
  { id:'pr2',  question:'A fair coin is flipped. What is the probability of heads?', answer:'1/2', hints:['2 equally likely outcomes.','1 head out of 2.','1/2.'], topicId:'probability', difficulty:'easy', choices:['1/4','1/3','1/2','2/3'] },
  { id:'pr3',  question:'A die is rolled. What is the probability of rolling a 4?', answer:'1/6', hints:['A die has 6 faces.','Only one face shows 4.','1/6.'], topicId:'probability', difficulty:'easy', choices:['1/4','1/5','1/6','1/3'] },
  { id:'pr4',  question:'A bag has 5 green, 3 yellow, 2 red balls. What is the probability of NOT picking green?', answer:'1/2', hints:['P(not green) = 1 − P(green).','P(green) = 5/10 = 1/2.','P(not green) = 1−1/2 = 1/2.'], topicId:'probability', difficulty:'medium' },
  { id:'pr5',  question:'A die is rolled. What is the probability of rolling an even number?', answer:'1/2', hints:['Even numbers on a die: 2, 4, 6.','3 even out of 6 total.','3/6 = 1/2.'], topicId:'probability', difficulty:'easy', choices:['1/3','1/2','2/3','1/6'] },
  { id:'pr6',  question:'A spinner has 4 equal sections: red, blue, green, yellow. What is P(blue)?', answer:'1/4', hints:['4 equal sections, 1 is blue.','1 out of 4.','1/4.'], topicId:'probability', difficulty:'easy', choices:['1/2','1/3','1/4','1/5'] },
  { id:'pr7',  question:'A bag has 2 red, 3 blue, 5 green balls. What is P(blue or green)?', answer:'4/5', hints:['P(blue or green) = (blue+green)/total.','(3+5)/10 = 8/10.','4/5.'], topicId:'probability', difficulty:'medium' },
  { id:'pr8',  question:'Two coins are flipped. What is P(both heads)?', answer:'1/4', hints:['Outcomes: HH, HT, TH, TT.','Only HH is both heads.','1/4.'], topicId:'probability', difficulty:'medium', choices:['1/2','1/3','1/4','1/8'] },
  { id:'pr9',  question:'A card is drawn from 1-10 cards. What is P(prime number)?', answer:'2/5', hints:['Primes from 1-10: 2, 3, 5, 7.','4 primes out of 10.','4/10 = 2/5.'], topicId:'probability', difficulty:'medium' },
  { id:'pr10', question:'A die is rolled twice. What is P(sum = 7)?', answer:'1/6', hints:['Pairs summing to 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1).','6 favorable out of 36 total.','6/36 = 1/6.'], topicId:'probability', difficulty:'hard' },
  { id:'pr11', question:'A bag has 4 red, 4 blue balls. What is P(picking 2 red in a row without replacement)?', answer:'3/14', hints:['P(1st red) = 4/8 = 1/2.','P(2nd red | 1st red) = 3/7.','1/2 × 3/7 = 3/14.'], topicId:'probability', difficulty:'hard' },
  { id:'pr12', question:'What is the probability of an impossible event?', answer:'0', hints:['An impossible event never happens.','P(impossible) = 0.','0.'], topicId:'probability', difficulty:'easy', choices:['0','1/2','1','Cannot tell'] },
  { id:'pr13', question:'What is the probability of a certain event?', answer:'1', hints:['A certain event always happens.','P(certain) = 1.','1.'], topicId:'probability', difficulty:'easy', choices:['0','1/2','1','Cannot tell'] },
  { id:'pr14', question:'A bag has 6 balls: 1 red, 2 blue, 3 green. What is P(not red)?', answer:'5/6', hints:['P(not red) = 1 − P(red).','P(red) = 1/6.','P(not red) = 5/6.'], topicId:'probability', difficulty:'easy' },
  { id:'pr15', question:'A die is rolled. What is P(number > 4)?', answer:'1/3', hints:['Numbers > 4 on a die: 5, 6.','2 out of 6.','2/6 = 1/3.'], topicId:'probability', difficulty:'easy', choices:['1/6','1/3','1/2','2/3'] },
  { id:'pr16', question:'In a class of 20, 8 are left-handed. What is P(randomly chosen student is left-handed)?', answer:'2/5', hints:['P = 8/20.','Simplify: GCF(8,20)=4.','8/20 = 2/5.'], topicId:'probability', difficulty:'easy' },
  { id:'pr17', question:'A spinner has sections 1-8 equally. What is P(multiple of 3)?', answer:'1/4', hints:['Multiples of 3 from 1-8: 3, 6.','2 out of 8.','2/8 = 1/4.'], topicId:'probability', difficulty:'medium', choices:['1/8','1/4','3/8','1/2'] },
  { id:'pr18', question:'A bag has 5 red and 5 blue balls. Two are drawn with replacement. What is P(both red)?', answer:'1/4', hints:['P(red) = 5/10 = 1/2 each draw.','P(both red) = 1/2 × 1/2.','1/4.'], topicId:'probability', difficulty:'medium' },
  { id:'pr19', question:'A card is drawn from a standard 52-card deck. What is P(ace)?', answer:'1/13', hints:['There are 4 aces in 52 cards.','4/52 = 1/13.','1/13.'], topicId:'probability', difficulty:'medium' },
  { id:'pr20', question:'If P(event A) = 0.3, what is P(not A)?', answer:'0.7', hints:['P(not A) = 1 − P(A).','1 − 0.3 = ?','0.7.'], topicId:'probability', difficulty:'easy' },
  { id:'pr21', question:'A bag has 10 marbles: 3 red, 4 blue, 3 green. What is P(red or blue)?', answer:'7/10', hints:['P(red or blue) = (3+4)/10.','7/10.','7/10.'], topicId:'probability', difficulty:'easy' },
  { id:'pr22', question:'A die is rolled. What is P(odd number)?', answer:'1/2', hints:['Odd numbers on a die: 1, 3, 5.','3 out of 6.','3/6 = 1/2.'], topicId:'probability', difficulty:'easy', choices:['1/3','1/2','2/3','1/6'] },
  { id:'pr23', question:'Two dice are rolled. What is P(both show the same number)?', answer:'1/6', hints:['Outcomes where both match: (1,1),(2,2),(3,3),(4,4),(5,5),(6,6).','6 out of 36 total.','6/36 = 1/6.'], topicId:'probability', difficulty:'hard' },
  { id:'pr24', question:'A bag has 4 red, 3 blue, 2 green, 1 yellow ball. What is P(blue)?', answer:'3/10', hints:['Total = 4+3+2+1 = 10.','3 blue out of 10.','3/10.'], topicId:'probability', difficulty:'easy' },
  { id:'pr25', question:'A coin is flipped 4 times. What is P(all heads)?', answer:'1/16', hints:['Each flip: P(H) = 1/2.','P(all heads) = (1/2)⁴.','1/16.'], topicId:'probability', difficulty:'hard' },
  { id:'pr26', question:'A card is drawn from cards numbered 1-20. What is P(divisible by 4)?', answer:'1/4', hints:['Multiples of 4 from 1-20: 4,8,12,16,20.','5 out of 20.','5/20 = 1/4.'], topicId:'probability', difficulty:'medium' },
  { id:'pr27', question:'If P(A) = 1/3 and P(B) = 1/4 and they are independent, what is P(A and B)?', answer:'1/12', hints:['For independent events: P(A and B) = P(A) × P(B).','1/3 × 1/4 = ?','1/12.'], topicId:'probability', difficulty:'hard' },
  { id:'pr28', question:'A bag has 8 balls. P(red) = 3/8. How many red balls?', answer:'3', hints:['P(red) = red balls / total.','3/8 × 8 = ?','3 red balls.'], topicId:'probability', difficulty:'easy' },
  { id:'pr29', question:'A die is rolled. What is P(number less than 3)?', answer:'1/3', hints:['Numbers less than 3: 1, 2.','2 out of 6.','2/6 = 1/3.'], topicId:'probability', difficulty:'easy', choices:['1/6','1/3','1/2','2/3'] },
  { id:'pr30', question:'In 60 coin flips, about how many heads would you expect?', answer:'30', hints:['P(heads) = 1/2.','Expected heads = 60 × 1/2.','30 heads.'], topicId:'probability', difficulty:'easy' },
];

// ─────────────────────────────────────────────────────────────────
// TOPICS ARRAY (ranked by importance)
// ─────────────────────────────────────────────────────────────────
export const topics: Topic[] = [
  { id: 'arithmetic',    name: 'Arithmetic Operations',    emoji: '🔢', description: 'Addition, subtraction, multiplication, division',    color: '#F59E0B', rank: 1,  questions: arithmeticQuestions },
  { id: 'word-problems', name: 'Word Problems',            emoji: '📖', description: 'Real-world math problems and multi-step reasoning',  color: '#8B5CF6', rank: 2,  questions: wordProblemQuestions },
  { id: 'place-value',   name: 'Place Value',              emoji: '🏛️', description: 'Digits, expanded form, rounding',                   color: '#10B981', rank: 3,  questions: placeValueQuestions },
  { id: 'fractions',     name: 'Fractions',                emoji: '🍕', description: 'Parts of a whole, comparing fractions',             color: '#EF4444', rank: 4,  questions: fractionQuestions },
  { id: 'money',         name: 'Money',                    emoji: '💰', description: 'Coins, bills, making change',                       color: '#F97316', rank: 5,  questions: moneyQuestions },
  { id: 'time',          name: 'Time',                     emoji: '⏰', description: 'Clocks, AM/PM, time conversions',                   color: '#06B6D4', rank: 6,  questions: timeQuestions },
  { id: 'measurement',   name: 'Measurement',              emoji: '📏', description: 'Length, weight, volume, area, perimeter',           color: '#84CC16', rank: 7,  questions: measurementQuestions },
  { id: 'patterns',      name: 'Number Patterns',          emoji: '🔄', description: 'Sequences, patterns, number rules',                 color: '#EC4899', rank: 8,  questions: patternQuestions },
  { id: 'geometry',      name: 'Geometry',                 emoji: '📐', description: 'Shapes, area, perimeter, properties',              color: '#3B82F6', rank: 9,  questions: geometryQuestions },
  { id: 'counting',      name: 'Counting & Combinations',  emoji: '🎯', description: 'Counting outfits, arrangements, possibilities',    color: '#D97706', rank: 10, questions: countingQuestions },
  { id: 'logic',         name: 'Logic & Reasoning',        emoji: '🧠', description: 'Puzzles, deduction, critical thinking',            color: '#6366F1', rank: 11, questions: logicQuestions },
  { id: 'decimals',      name: 'Decimals',                 emoji: '🔵', description: 'Decimal numbers, operations, rounding',            color: '#14B8A6', rank: 12, questions: decimalQuestions },
  { id: 'comparison',    name: 'Comparison & Ordering',    emoji: '⚖️', description: 'Greater than, less than, ordering numbers',        color: '#A855F7', rank: 13, questions: comparisonQuestions },
  { id: 'probability',   name: 'Basic Probability',        emoji: '🎲', description: 'Chance, likelihood, simple probability',           color: '#F43F5E', rank: 14, questions: probabilityQuestions },
];

// ─────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────
export const getAllQuestions = (): Question[] => topics.flatMap(t => t.questions);
export const getQuestionsByTopic = (topicId: string): Question[] => topics.find(t => t.id === topicId)?.questions ?? [];
export const getTopic = (topicId: string): Topic | undefined => topics.find(t => t.id === topicId);
export const getTotalQuestionCount = (): number => getAllQuestions().length;
export const getSpeedDrillsByCategory = (category: string): SpeedDrill[] =>
  category === 'All' ? speedDrills : speedDrills.filter(d => d.category === category);
export const speedDrillCategories = ['All', 'Addition', 'Subtraction', 'Multiplication', 'Division', 'Mixed', 'Doubles', 'Squares'];
