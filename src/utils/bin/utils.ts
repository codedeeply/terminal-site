import packageJson from '../../../package.json';
import * as bin from './index';
import { formatDistanceToNow } from 'date-fns';
import { getQuote } from '../../api';

export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(', ');

  return `Available commands:\n${commands}\n\n[tab]\t trigger completion.\n[ctrl+l] clear terminal.\n[ctrl+c] cancel command.`;
};

export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
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
  window.open('mailto:code@codedeep.ly');

  return 'Opening mailto:code@codedeep.ly...';
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
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');

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

  const usagetext = 'Usage: why [type]. Supported: why [philosophical, nerdy]';

  if (!reason) {
    return usagetext;
  }

  switch (reason) {
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
      result = 'Option not suported. ' + usagetext;
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

export const gpg = async (args?: string[]): Promise<string> => {
  const reason = args.join('+');
  var result = '';
  const fingerprint = '5B81 0DBB 6B90 EDBF 4350 CD9E E808 39F2 3C2A 5FE8';
  const fullpubkey =
    '—–BEGIN PGP PUBLIC KEY BLOCK—–\n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\n8eQVAIDYTPGv=knUz\n—–END PGP PUBLIC KEY BLOCK—–';

  const usagetext = 'Usage: gpg [type]. Supported: gpg [finger[print], public]';

  if (!reason) {
    return usagetext;
  }

  switch (reason) {
    case 'finger': {
      result = fingerprint;
      break;
    }
    case 'fingerprint':
      result = fingerprint;
      break;
    case 'public': {
      result = fullpubkey;
      break;
    }
    case 'private': {
      result = "Hey, that's private. :P";
      break;
    }
    default: {
      result = 'Option not suported. ' + usagetext;
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
