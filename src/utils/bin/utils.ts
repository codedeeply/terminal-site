import packageJson from '../../../package.json';
import * as bin from './index';
import { formatDistanceToNow } from 'date-fns';
import { getQuote } from '../../api';
import { usageText } from '../usageText';

// Blacklist prevents certain commands from being autofilled or listed in help list
export const commandBlacklist = [
  'canWriteToClipboard',
  'getAllowedCommands',
  'commandBlacklist',
  'theme',
  'copyToClipboard',
  'triggerRestart',
  'restartResult',
];

export const getAllowedCommands = async (args: string[]): Promise<string[]> => {
  const commands = [];
  const commandsAll = Object.keys(bin)
    .sort()
    .forEach(function (command, index) {
      if (commandBlacklist.indexOf(command) > -1) {
        // It's blacklisted! Next...
        true;
      } else {
        commands.push(command);
      }
    });

  return commands;
};

export const help = async (args: string[]): Promise<string> => {
  const commands = await getAllowedCommands(args);

  return `Available commands:\n${commands.join(
    ', ',
  )}\n\n[tab]\t trigger completion.\n[ctrl+l] clear terminal.\n[ctrl+c] cancel command.`;
};

export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export class restartResult {
  success: boolean;
  message: string;
  timeoutID: any;
}

export const triggerRestart = async (timeInSeconds: number): Promise<restartResult> => {
  var result = new restartResult();
  result.success = false;
  result.message = 'An unexpected error occurred while triggering restart.';
  result.timeoutID = NaN;
  if (timeInSeconds > 10 || timeInSeconds < 0) {
    result.success = false;
    result.message = 'Number of seconds must be between 0 and 10.';
    return result;
  }
  try {
    const timeInMS = timeInSeconds * 1000;
    const restartTimeoutID = setTimeout(function () {
      localStorage.removeItem('restartTimeoutID');
      window.location.reload();
    }, timeInMS);
    result.success = true;
    result.message = 'Restarting your connection in ' + timeInSeconds + ' seconds.';
    result.timeoutID = restartTimeoutID;
  } catch {
    result.success = false;
    result.message = 'An unexpected error occurred while triggering restart.';
  }
  return result;
};

export const restart = async (args: string[]): Promise<string> => {
  const restartUsage = new usageText();
  const reason = args.join('+');
  var result = '';

  restartUsage.about = 'Restarts client connection to server.\n';
  restartUsage.usage =
    `
Usage:
  restart (<time in seconds [1s - 10s] | now>) [default: now]
  restart -a
  restart -h | --help

Options:
  -h --help     Show this screen.
  -a            Aborts a pending restart.
  `;

  const restartInSeconds = parseInt(reason);

  try {
    if (!isNaN(restartInSeconds)) {
      // is a number
      if (restartInSeconds > 10 || restartInSeconds < 0) {
        result = 'Number of seconds must be between 0 and 10.';
        return result;
      }
      const restartResultObj = await triggerRestart(restartInSeconds);
      localStorage.setItem('restartTimeoutID', restartResultObj.timeoutID);
      return restartResultObj.message;
    }
  } catch {}

  switch (reason) {
    case '--help':
    case '-h': {
      result = restartUsage.getFullUsage();
      break;
    }
    case '-a': {
      if (localStorage.getItem('restartTimeoutID') === null) {
        return 'There is no active restart to abort.';
      }
      clearTimeout(localStorage.getItem('restartTimeoutID'));
      localStorage.removeItem('restartTimeoutID');
      return 'The scheduled restart was aborted successfully.';
    }
    case 'now':
    default: {
      const restartResult = await triggerRestart(1.5);
      if (restartResult.success) {
        return 'Restarting your connection now...';
      } else {
        return restartResult.message;
      }
    }
  }
  return result;
};

export const whoami = async (args: string[]): Promise<string> => {
  return localStorage.getItem('ps1user');
};

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

export const portfolio = async (args: string[]): Promise<string> => {
  window.open('https://samthacker.me', '_self');

  return 'Opening portfolio...';
};

export const email = async (args: string[]): Promise<string> => {
  const reason = args.join('+');
  var result = '';

  var emailUsage = new usageText();
  emailUsage.about = 'Provides my email address in a number of formats.\n';

  emailUsage.usage = `
Usage:
  email (--copy | --open)
  email -h | --help

Options:
  -h --help     Show this screen.
  --copy        Copy output to clipboard instead of printing to screen.
  --open        Begins composing an email to me using mailto.
  `;

  if (!reason) {
    return emailUsage.getFullUsage();
  }

  switch (reason) {
    case '--help':
    case '-h': {
      result = emailUsage.getFullUsage();
      break;
    }
    case '--open': {
      window.open('mailto:code@codedeep.ly');
      return 'Opening mailto:code@codedeep.ly...';
      break;
    }
    case '--copy': {
      await copyToClipboard("code@codedeep.ly").then(
        () => {
          result = 'Copied email to clipboard successfully.';
        },
        () => {
          result = 'Unable to write to clipboard.';
        },
      );
      break;
    }
    default: {
      result = `Option not supported.\n${emailUsage.getUsage()}`;
    }
  }

  return result;
};

export const vi = async (args: string[]): Promise<string> => {
  return `why use vi? try 'emacs'.`;
};

export const vim = async (args: string[]): Promise<string> => {
  return `why use vim? try 'emacs'.`;
};

export const emacs = async (args?: string[]): Promise<string> => {
  return `really? emacs? you should be using 'vim'`;
};

export const nano = async (args?: string[]): Promise<string> => {
  return `you're much better off using 'vim'. trust me.`;
};

export const sudo = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  }, 1000);

  if (args[0] !== undefined) {
    return `Permission denied: unable to run the command '${args[0]}' as root.`;
  } else {
    return `Permission denied: unable to run the command as root.`;
  }
};

export const repo = async (args?: string[]): Promise<string> => {
  window.open('https://github.com/codedeeply/terminal-site', '_blank');

  return 'Opening repository...';
};

export const why = async (args?: string[]): Promise<string> => {
  const reason = args.join('+');
  var result = '';

  const whyUsage = new usageText();
  whyUsage.about = 'Why, indeed...\n';

  whyUsage.usage = `
Usage:
  why philosophical
  why nerdy
  why -h | --help

Options:
  -h --help     Show this screen.
  `;

  if (!reason) {
    return whyUsage.getFullUsage();
  }

  switch (reason) {
    case '--help':
    case '-h': {
      result = whyUsage.getFullUsage();
      break;
    }
    case 'philosophical': {
      result =
        'The terminal is an extension of all technology we use. It allows us to connect with it directly, to create a dialogue -- a conversation. But is this really a conversation if the answers to your queries have been determined before you even send them?';
      break;
    }
    case 'nerdy': {
      result = 'Because terminals are cool, why else?';
      break;
    }
    default: {
      result = `Option not supported.\n${whyUsage.getUsage()}`;
    }
  }

  return result;
};

export const uptime = async (args?: string[]): Promise<string> => {
  const visitedAt = new Date(
    localStorage.getItem('visitedAt') || new Date().toString(),
  );
  var uptime = formatDistanceToNow(visitedAt, { includeSeconds: true });

  return uptime;
};

export const quote = async (args?: string[]): Promise<string> => {
  const quote = await getQuote();

  return quote.quote;
};

/** Checks if copying an image to clipboard is supported by the browser.
 *  @see https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API (clipboard-write permission)
 */
export async function canWriteToClipboard() {
  try {
    const clipboardtest = 'clipboard-write';
    const result = await navigator.permissions.query({
      name: 'clipboard-write' as PermissionName,
    });
    return result.state == 'granted' || result.state == 'prompt';
  } catch (error) {
    return false;
  }
}

/** Easy function to handle copying content to the clipboard.
 * @param texttocopy - the content to copy to the clipboard
 * @returns true|false
 */
export const copyToClipboard = async (textToCopy): Promise<Boolean> => {
  var clipwriteable = await canWriteToClipboard();
  if (!clipwriteable) {
    return false;
  }
  var item_copy = [
    new ClipboardItem({
      'text/plain': new Blob([textToCopy], { type: 'text/plain' }),
    }),
  ];
  await navigator.clipboard.write(item_copy).then(
    () => {
      return true;
    },
    () => {
      return false;
    },
  );
  return false;
};

export const gpg = async (args?: string[]): Promise<string> => {
  var result = '';
  const reason = args.join('+');
  const fingerprint = '5B81 0DBB 6B90 EDBF 4350 CD9E E808 39F2 3C2A 5FE8';
  const fullpubkey =
    '—–BEGIN PGP PUBLIC KEY BLOCK—–\n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\n8eQVAIDYTPGv=knUz\n—–END PGP PUBLIC KEY BLOCK—–';

  const gpgUsage = new usageText();
  gpgUsage.about = 'Provides my public GPG information.\n';

  gpgUsage.usage = `
Usage:
  gpg public [--copy]
  gpg finger[print] [--copy]
  gpg -h | --help

Options:
  -h --help     Show this screen.
  --copy        Copy output to clipboard instead of printing to screen.
    `;

  if (!reason) {
    return gpgUsage.getFullUsage();
  }

  switch (reason) {
    case '--help':
    case '-h': {
      result = gpgUsage.getFullUsage();
      break;
    }
    case 'finger':
    case 'fingerprint': {
      result = fingerprint;
      break;
    }
    case 'finger+--copy':
    case 'fingerprint+--copy': {
      await copyToClipboard(fingerprint).then(
        () => {
          result = 'Copied fingerprint to clipboard successfully.';
        },
        () => {
          result = 'Unable to write to clipboard.';
        },
      );
      break;
    }
    case 'public+--copy': {
      await copyToClipboard(fullpubkey).then(
        () => {
          result = 'Copied public key to clipboard successfully.';
        },
        () => {
          result = 'Unable to write to clipboard.';
        },
      );
      break;
    }
    case 'public': {
      result = fullpubkey;
      break;
    }
    case 'private':
    case 'private+--copy': {
      result = "Hey! That's private. :P";
      break;
    }
    default: {
      result = `Option not suported.\n` + gpgUsage.getUsage();
    }
  }
  return result;
};

// export const username = async (args?: string[]): Promise<string> => {
//   const newname = args.join('+');
//   window.localStorage.setItem('ps1user', newname);
//   return 'Username changed to ' + newname;
// };

// export const exit = async (args?: string[]): Promise<string> => {
//   return 'Goodbye.';
// };

export const credits = (args?: string[]): string => {
  var credits = '';
  credits += `Repo: <a href="${packageJson.repository.url}" target="_blank">${packageJson.repository.url}</a>\n`;
  credits += `Forked from: <a href="https://github.com/m4tt72/terminal">https://github.com/m4tt72/terminal</a>\n`;
  return credits;
};

export const banner = (args?: string[]): string => {
  return `
  ╔██████╗ ██████╗ ██████╗ ███████╗██████╗ ███████╗███████╗██████╗ ██╗  ██╗   ██╗
  ██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔══██╗██╔════╝██╔════╝██╔══██╗██║  ╚██╗ ██╔╝
  ██║     ██║   ██║██║  ██║█████╗  ██║  ██║█████╗  █████╗  ██████╔╝██║   ╚████╔╝ 
  ██║     ██║   ██║██║  ██║██╔══╝  ██║  ██║██╔══╝  ██╔══╝  ██╔═══╝ ██║    ╚██╔╝  
  ╚██████╗╚██████╔╝██████╔╝███████╗██████╔╝███████╗███████╗██║██╗  ███████╗██║   
   ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚═════╝ ╚══════╝╚══════╝╚═╝╚═╝  ╚══════╝╚═╝  v${packageJson.version}

                              [ .: aka Sam Thacker :. ]
                              
Quick reference: 'about', 'email', 'portfolio', 'gpg'
Type 'help' to see list of available commands.

`;
};
