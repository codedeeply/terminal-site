import { getProjects } from '../../api';

export const projects = async (args: string[]): Promise<string> => {
  const projects = await getProjects();
  var projectslist;

  projectslist = projects
    .filter((repo) => !repo.fork)
    .map(
      (repo) =>
        `${repo.name} - <a class="text-light-blue dark:text-dark-blue underline" href="${repo.html_url}" target="_blank">${repo.html_url}</a>`,
    )
    .join('\n');

  return (
    "A sampling of my GitHub projects. For my work portfolio, try 'portfolio'! \n\n" +
    projectslist
  );
};
