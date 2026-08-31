import axios from 'axios';
import config from '../../config.json';
import { selectRandomQuote } from './quotes';

export { selectRandomQuote, technologyQuotes } from './quotes';
export type { TechnologyQuote } from './quotes';

export const getProjects = async () => {
  const { data } = await axios.get(
    `https://api.github.com/users/${config.social.github}/repos`,
  );

  return data;
};

export const getBio = async () => {
  const { data } = await axios.get(config.bioUrl);

  return data;
};

export const getWeather = async (city: string) => {
  const { data } = await axios.get(`https://wttr.in/${city}?ATm`);

  return data;
};

export const getQuote = (random: () => number = Math.random) => {
  const { text, author } = selectRandomQuote(random);

  return {
    quote: `“${text}” — ${author}`,
  };
};
