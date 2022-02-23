import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
    title: string;
    image: string;
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: '快速上手',
        image: '/img/undraw_docusaurus_mountain.svg',
        description: (
            <>
                AnyWeb JS SDK易于上手，只需初始化SDK即可自动化注入使用
            </>
        ),
    },
    {
        title: '轻量快速',
        image: '/img/undraw_docusaurus_tree.svg',
        description: (
            <>
                AnyWeb JS SDK轻量快速，快速响应
            </>
        ),
    },
    {
        title: '跨平台',
        image: '/img/undraw_docusaurus_react.svg',
        description: (
            <>
                AnyWeb JS SDK跨平台，支持App和H5等平台唤起
            </>
        ),
    },
];

function Feature({ title, image, description }: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <img
                    className={styles.featureSvg}
                    alt={title}
                    src={useBaseUrl(image)}
                />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): JSX.Element {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
