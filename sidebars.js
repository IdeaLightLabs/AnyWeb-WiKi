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
    // But you can create a sidebar manually
    doc: [
        {
            type: 'category',
            label: 'AnyWeb',
            items: ['AnyWeb/intro'],
        },
        {
            type: 'category',
            label: 'AnyWeb JS SDK',
            items: [
                'SDK/intro',
                'SDK/quick_start',
                {
                    type: 'doc',
                    id: 'SDK/usage',
                    label: 'SDK 接口',
                },
                {
                    type: 'doc',
                    id: 'SDK/CHANGELOG',
                    label: '更新日志',
                }
            ],
        },
        {
            type: 'category',
            label: 'Service 接口',
            items: [
                {
                    type: 'doc',
                    id: 'Service/intro',
                    label: '介绍（区别、错误码）',
                },
                'Service/serviceToken',
                'Service/checkAddresses',
            ]
        },
        {
            type: 'category',
            label: 'OAuth 接口',
            items: [
                {
                    type: 'doc',
                    id: 'OAuth/intro',
                    label: '介绍（区别、错误码）',
                },
                'OAuth/accessToken',
                'OAuth/userInfo',
            ],
        },
        {
            type: 'category',
            label: '产品计费',
            items: [
                {
                    type: 'doc',
                    id: 'Billing/index',
                    label: '计费概述',
                },
            ]
        },
    ],
};

module.exports = sidebars;
