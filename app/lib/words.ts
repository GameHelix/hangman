export type Category = {
  name: string;
  emoji: string;
  words: string[];
};

export const categories: Category[] = [
  {
    name: "Animals",
    emoji: "🐾",
    words: [
      "elephant", "crocodile", "butterfly", "flamingo", "chimpanzee",
      "rhinoceros", "porcupine", "chameleon", "wolverine", "platypus",
      "octopus", "penguin", "cheetah", "giraffe", "gorilla",
      "hedgehog", "kangaroo", "armadillo", "salamander", "albatross",
    ],
  },
  {
    name: "Countries",
    emoji: "🌍",
    words: [
      "australia", "argentina", "switzerland", "netherlands", "mozambique",
      "azerbaijan", "cambodia", "zimbabwe", "madagascar", "kazakhstan",
      "portugal", "indonesia", "venezuela", "ethiopia", "philippines",
      "bangladesh", "luxembourg", "nicaragua", "uzbekistan", "montenegro",
    ],
  },
  {
    name: "Technology",
    emoji: "💻",
    words: [
      "algorithm", "database", "javascript", "typescript", "blockchain",
      "kubernetes", "microservice", "encryption", "framework", "repository",
      "abstraction", "compiler", "interface", "polymorphism", "recursion",
      "bandwidth", "caching", "middleware", "authentication", "refactoring",
    ],
  },
  {
    name: "Food",
    emoji: "🍕",
    words: [
      "avocado", "lasagna", "croissant", "quesadilla", "bruschetta",
      "cappuccino", "guacamole", "tiramisu", "enchilada", "parmigiana",
      "prosciutto", "gazpacho", "bolognese", "tortellini", "chimichanga",
      "stroganoff", "succotash", "ratatouille", "jambalaya", "bibimbap",
    ],
  },
  {
    name: "Movies",
    emoji: "🎬",
    words: [
      "inception", "interstellar", "gladiator", "parasite", "joker",
      "endgame", "matrix", "memento", "arrival", "departed",
      "goodfellas", "prestige", "shawshank", "whiplash", "spotlight",
      "moonlight", "braveheart", "scarface", "casablanca", "psycho",
    ],
  },
  {
    name: "Science",
    emoji: "🔬",
    words: [
      "photosynthesis", "chromosome", "hypothesis", "relativity", "molecule",
      "neutron", "evolution", "ecosystem", "magnetism", "radiation",
      "mitosis", "diffusion", "catalyst", "velocity", "amplitude",
      "thermodynamics", "electrolysis", "spectroscopy", "biodiversity", "fermentation",
    ],
  },
];

export function getRandomWord(category?: string): { word: string; category: Category } {
  const pool = category
    ? categories.filter((c) => c.name === category)
    : categories;
  const cat = pool[Math.floor(Math.random() * pool.length)];
  const word = cat.words[Math.floor(Math.random() * cat.words.length)];
  return { word, category: cat };
}

export const MAX_WRONG = 6;
