import { describe, expect, it } from 'vitest';
import { getQuote, selectRandomQuote, technologyQuotes } from './index';

describe('bundled technology quotes', () => {
  it('selects deterministic quotes at both random boundaries', () => {
    expect(selectRandomQuote(() => 0)).toBe(technologyQuotes[0]);
    expect(selectRandomQuote(() => 1)).toBe(
      technologyQuotes[technologyQuotes.length - 1],
    );
  });

  it('formats a selected quote with its author', () => {
    const selected = technologyQuotes[1];

    expect(getQuote(() => 1 / technologyQuotes.length)).toEqual({
      quote: `“${selected.text}” — ${selected.author}`,
    });
  });
});
