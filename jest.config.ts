import { getJestProjects } from '@nrwl/jest';

export default {
  projects: getJestProjects(),
  globalSetup: 'jest-preset-angular/global-setup',
};
