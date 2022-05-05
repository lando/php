const customTheme = require('@lando/vuepress-theme-default-plus');

module.exports = {
  lang: 'en-US',
  title: 'Lando',
  description: 'Lando PHP Plugin Documentation',
  base: '/php/',
  head: [
    ['meta', {name: 'viewport', content: 'width=device-width, initial-scale=1'}],
    ['link', {rel: 'icon', href: '/php/favicon.ico', size: 'any'}],
    ['link', {rel: 'icon', href: '/php/favicon.svg', type: 'image/svg+xml'}],
    ['link', {rel: 'preconnect', href: '//fonts.googleapis.com'}],
    ['link', {rel: 'preconnect', href: '//fonts.gstatic.com', crossorigin: true}],
    ['link', {rel: 'stylesheet', href: '//fonts.googleapis.com/css2?family=Lexend:wght@500&display=swap'}],
  ],
  theme: customTheme({
    landoDocs: true,
    logo: '/images/icon.svg',
    docsDir: 'docs',
    docsBranch: 'main',
    repo: 'lando/php',
    sidebarHeader: {
      title: 'PHP Plugin',
      icon: '/images/phpicon.png',
    },
    sidebar: [
      {
        text: 'Getting Started',
        link: '/index.html',
      },
      '/config.html',
      '/caveats.html',
      '/extensions.html',
      {
        text: 'Guides',
        collapsible: true,
        children: [
          {
            text: 'Accessing PHP Logs',
            link: '/accessing-logs.html',
          },
          {
            text: 'Installing extensions',
            link: '/installing-extensions.html',
          },
          {
            text: 'Installing node',
            link: '/installing-node.html',
          },
        ],
      },
      '/support.html',
      {text: 'Examples', link: 'https://github.com/lando/php/tree/main/examples'},
      {text: 'Release Notes', link: 'https://github.com/lando/php/releases'},
      '/development.html',
    ],
  }),
};
