import * as bin from './bin';

export const commandExists = async (command: string) => {
  const commands = await bin.getAllowedCommands(null);
  commands.push('clear');

  return commands.indexOf(command.split(' ')[0]) !== -1;
};
