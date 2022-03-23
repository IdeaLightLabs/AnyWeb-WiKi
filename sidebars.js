/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],
  //   - CHANGELOG


  // But you can create a sidebar manually
  doc: [
    {
      type: 'category',
      label: '介绍',
      items: ['anyweb', 'intro'],
    },
    {
      type: 'category',
      label: '教程',
      items: ['quick_start', 'usage'],
    },
    {
      type: 'category',
      label: 'OAuth',
      items: [{
        type: 'category',
        label: '开始',
        items: ['OAuth/intro', 'OAuth/accessToken'],
      },
        {
          type: 'category',
          label: '接口',
          items: ['OAuth/userInfo'],
        }],
    },
    {
      type: 'category',
      label: '开放平台',
      items: [{
        type: 'category',
        label: '开始',
        items: ['Open/intro', 'Open/serviceToken'],
      },
        {
          type: 'category',
          label: '接口',
          items: ['Open/userInfo', 'Open/checkAddress'],
        }],
    },
    {
      type: 'category',
      label: 'API',
      items: [{
        id: 'API/modules',
        type: 'doc',
        label: '模块'
      }, 'API/classes/Provider'],
    },
    {
      type: 'doc',
      id: 'CHANGELOG',
      label: '更新日志',
    }
  ],
};

module.exports = sidebars;
