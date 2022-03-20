// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'AnyWeb Wiki',
    tagline: '强合规的区块链钱包',
    url: 'https://anyweb.cc',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'IdeaLightLabs', // Usually your GitHub org/user name.
    projectName: 'AnyWeb-JS-SDK', // Usually your repo name.

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    // editUrl: 'https://github.com/IdeaLightLabs/AnyWeb-JS-SDK',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // editUrl:
                    //     'https://github.com/IdeaLightLabs/AnyWeb-JS-SDK',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            /* algolia: {
                 // The application ID provided by Algolia
                 appId: 'YOUR_APP_ID',

                 // Public API key: it is safe to commit it
                 apiKey: 'YOUR_SEARCH_API_KEY',

                 indexName: 'YOUR_INDEX_NAME',

                 // Optional: see doc section below
                 contextualSearch: true,

                 // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
                 // externalUrlRegex: 'external\\.com|domain\\.com',

                 // Optional: Algolia search parameters
                 // searchParameters: {},

                 //... other Algolia params
             },*/
            navbar: {
                title: 'AnyWeb WiKi',
                logo: {
                    alt: 'My Site Logo',
                    src: 'img/logo.svg',
                    width: 17
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'intro',
                        position: 'left',
                        label: '文档',
                    },
                    {
                        href: 'https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/issues',
                        label: '反馈',
                        position: 'left'
                    },
                    {
                        href: 'https://github.com/IdeaLightLabs/AnyWeb-JS-SDK',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Docs',
                        items: [
                            {
                                label: 'Tutorial',
                                to: '/docs/intro',
                            },
                        ],
                    },
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'Discussions',
                                href: 'https://github.com/IdeaLightLabs/AnyWeb-JS-SDK/discussions',
                            },
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'GitHub',
                                href: 'https://github.com/IdeaLightLabs/AnyWeb-JS-SDK',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} IdeaLight (Hangzhou) Technology Co., Ltd. Built with Docusaurus.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
                additionalLanguages: ['java'],
            },
        }),
};

module.exports = config;
