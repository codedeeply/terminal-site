import { afterEach, describe, expect, it, vi } from 'vitest';
import { technologyQuotes } from '../../api';
import * as api from '../../api';
import { cowsay } from './cowsay';

describe('cowsay', () => {
  const emptyArguments: Array<[string[] | undefined]> = [
    [undefined],
    [[]],
    [['']],
  ];

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each(emptyArguments)(
    'renders a bundled quote when called with %j',
    async (args) => {
      vi.spyOn(Math, 'random').mockReturnValue(0);
      const output = await cowsay(args);
      const selected = technologyQuotes[0];

      expect(output).toContain(`“${selected.text}” — ${selected.author}`);
    },
  );

  it('joins explicit text without consulting the quote selector', async () => {
    const quoteSelector = vi.spyOn(api, 'getQuote');

    const output = await cowsay(['hello', 'from', 'the', 'terminal']);

    expect(output).toContain('hello from the terminal');
    expect(quoteSelector).not.toHaveBeenCalled();
  });
});
