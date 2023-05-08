import * as bin from './bin';

export const handleTabCompletion = async (
  command: string,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
) => {
  const commands = (await bin.getAllowedCommands(null)).filter((entry) =>
    entry.startsWith(command),
  );

  if (commands.length === 1) {
    setCommand(commands[0]);
  }
};
