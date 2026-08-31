export interface TechnologyQuote {
  text: string;
  author: string;
}

export const technologyQuotes: readonly TechnologyQuote[] = [
  {
    text: 'Programs must be written for people to read, and only incidentally for machines to execute.',
    author: 'Harold Abelson and Gerald Jay Sussman',
  },
  {
    text: 'Simplicity is prerequisite for reliability.',
    author: 'Edsger W. Dijkstra',
  },
  {
    text: 'The function of good software is to make the complex appear to be simple.',
    author: 'Grady Booch',
  },
  {
    text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    author: 'Martin Fowler',
  },
  {
    text: 'First, solve the problem. Then, write the code.',
    author: 'John Johnson',
  },
];

export const selectRandomQuote = (
  random: () => number = Math.random,
): TechnologyQuote => {
  const sample = random();
  const index = Math.min(
    Math.floor(
      Math.max(Number.isFinite(sample) ? sample : 0, 0) *
        technologyQuotes.length,
    ),
    technologyQuotes.length - 1,
  );

  return technologyQuotes[index];
};
