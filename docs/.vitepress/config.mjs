import {createRequire} from 'module';

import {defineConfig} from '@lando/vitepress-theme-default-plus/config';

const require = createRequire(import.meta.url);

const {name, version} = require('../../package.json');
const landoPlugin = name.replace('@lando/', '');

export default defineConfig({
  title: 'Lando Php Plugin',
  description: 'The offical Lando plugin for Php.',
  landoDocs: 3,
  landoPlugin,
  version,
  head: [
    ['meta', {name: 'viewport', content: 'width=device-width, initial-scale=1'}],
    ['link', {rel: 'icon', href: '/php/favicon.ico', size: 'any'}],
    ['link', {rel: 'icon', href: '/php/favicon.svg', type: 'image/svg+xml'}],
  ],
  themeConfig: {
    sidebar: sidebar(),
  },
});

function sidebar() {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        {text: 'Introduction', link: '/'},
        {text: 'Installation', link: '/install'},
        {text: 'Configuration', link: '/config'},
        {text: 'Extensions', link: '/extensions'},
        {text: 'Caveats', link: '/caveats'},
      ],
    },
    {
      text: 'Contribution',
      collapsed: true,
      items: [
        {text: 'Development', link: '/development'},
        {text: 'Team', link: '/team'},
      ],
    },
    {
      text: 'Help & Support',
      collapsed: true,
      items: [
        {text: 'GitHub', link: 'https://github.com/lando/php/issues/new/choose'},
        {text: 'Slack', link: 'https://www.launchpass.com/devwithlando'},
        {text: 'Contact Us', link: '/support'},
      ],
    },
    {text: 'Guides', link: '/guides', activeMatch: '/guides'},
    {text: 'Examples', link: 'https://github.com/lando/php/tree/main/examples'},
  ];
};
