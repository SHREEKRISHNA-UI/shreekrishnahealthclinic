export default function handler(req, res) {
  const tests = [
    {
      id: 1,
      title: 'General Knowledge Mock Test',
      category: 'General',
      difficulty: 'Easy',
      duration: 30,
      description: 'A comprehensive 5-question test on general knowledge covering history, geography, and science.',
      questions: [
        {
          text: 'What is the capital of France?',
          options: ['Rome', 'Paris', 'Berlin', 'Madrid'],
          correct: 1
        },
        {
          text: 'What is 2 + 2?',
          options: ['3', '4', '5', '22'],
          correct: 1
        },
        {
          text: 'Which planet is known as the Red Planet?',
          options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
          correct: 1
        },
        {
          text: 'Who wrote "Hamlet"?',
          options: ['Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Jane Austen'],
          correct: 1
        },
        {
          text: 'What is the boiling point of water at sea level (°C)?',
          options: ['90', '100', '110', '120'],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      title: 'Science Fundamentals',
      category: 'Science',
      difficulty: 'Medium',
      duration: 45,
      description: 'Test your understanding of basic physics, chemistry, and biology concepts.',
      questions: [
        {
          text: 'What is the chemical formula for water?',
          options: ['CO2', 'H2O', 'O2', 'NaCl'],
          correct: 1
        },
        {
          text: 'Which organ is responsible for pumping blood?',
          options: ['Brain', 'Lungs', 'Heart', 'Liver'],
          correct: 2
        },
        {
          text: 'What does DNA stand for?',
          options: [
            'Deoxyribonucleic Acid',
            'Dynamic Nucleic Acid',
            'Dextrose Nucleic Acid',
            'None of the above'
          ],
          correct: 0
        },
        {
          text: 'What is the SI unit of force?',
          options: ['Joule', 'Newton', 'Watt', 'Pascal'],
          correct: 1
        },
        {
          text: 'At what temperature does ice melt?',
          options: ['0°F', '32°F', '100°C', '-10°C'],
          correct: 1
        }
      ]
    },
    {
      id: 3,
      title: 'World History',
      category: 'History',
      difficulty: 'Medium',
      duration: 40,
      description: 'Explore key events and figures from world history.',
      questions: [
        {
          text: 'In which year did World War II end?',
          options: ['1943', '1944', '1945', '1946'],
          correct: 2
        },
        {
          text: 'Who was the first President of the United States?',
          options: [
            'Thomas Jefferson',
            'George Washington',
            'Abraham Lincoln',
            'Benjamin Franklin'
          ],
          correct: 1
        },
        {
          text: 'Which empire built the Great Wall of China?',
          options: ['Roman Empire', 'Mongol Empire', 'Chinese Empire', 'Ottomans'],
          correct: 2
        },
        {
          text: 'What was the primary cause of the French Revolution?',
          options: ['Military defeat', 'Economic crisis', 'Religious conflict', 'Plague'],
          correct: 1
        },
        {
          text: 'Which ancient wonder of the world still stands today?',
          options: [
            'Colossus of Rhodes',
            'Hanging Gardens',
            'Great Pyramid of Giza',
            'Lighthouse of Alexandria'
          ],
          correct: 2
        }
      ]
    },
    {
      id: 4,
      title: 'Geography Challenge',
      category: 'Geography',
      difficulty: 'Hard',
      duration: 35,
      description: 'Test your geographical knowledge with challenging questions about countries, capitals, and landmarks.',
      questions: [
        {
          text: 'Which is the smallest country in the world?',
          options: ['Monaco', 'San Marino', 'Vatican City', 'Liechtenstein'],
          correct: 2
        },
        {
          text: 'What is the longest river in the world?',
          options: ['Amazon', 'Yangtze', 'Nile', 'Mississippi'],
          correct: 2
        },
        {
          text: 'Which mountain range contains Mount Everest?',
          options: ['Alps', 'Himalayas', 'Andes', 'Rockies'],
          correct: 1
        },
        {
          text: 'How many continents are there?',
          options: ['5', '6', '7', '8'],
          correct: 2
        },
        {
          text: 'What is the capital of Australia?',
          options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
          correct: 2
        }
      ]
    },
    {
      id: 5,
      title: 'Mathematics Basics',
      category: 'Mathematics',
      difficulty: 'Easy',
      duration: 30,
      description: 'Master fundamental mathematical concepts with this beginner-friendly test.',
      questions: [
        {
          text: 'What is 15 × 3?',
          options: ['35', '40', '45', '50'],
          correct: 2
        },
        {
          text: 'What is 100 ÷ 4?',
          options: ['20', '25', '30', '35'],
          correct: 1
        },
        {
          text: 'What is the square root of 144?',
          options: ['10', '11', '12', '13'],
          correct: 2
        },
        {
          text: 'What is 7² (7 squared)?',
          options: ['42', '49', '56', '63'],
          correct: 1
        },
        {
          text: 'What is 20% of 200?',
          options: ['20', '30', '40', '50'],
          correct: 2
        }
      ]
    }
  ]
  res.status(200).json(tests)
}
