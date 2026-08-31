import { describe, expect, it } from 'vitest';
import { commandBlacklist, getAllowedCommands, help } from './utils';

describe('command discovery', () => {
  it('includes cowsay and excludes internal helpers', async () => {
    const commands = await getAllowedCommands([]);

    expect(commands).toContain('cowsay');
    expect(commands).not.toEqual(expect.arrayContaining(commandBlacklist));
  });

  it('lists cowsay in help without exposing internal helpers', async () => {
    const output = await help([]);

    expect(output).toContain('cowsay');
    commandBlacklist.forEach((command) =>
      expect(output).not.toContain(command),
    );
  });
});
