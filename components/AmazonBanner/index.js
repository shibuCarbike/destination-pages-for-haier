import React from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import Image from 'next/image';

function AmazonBanner(props) {
    const { link, img } = props;
    return (
        <Link href={link} passHref legacyBehavior>
            <a target='_blank'>
                <div className={styles.banner_wrapper}>
                    <Image
                        className={styles.desktop}
                        quality={100}
                        alt={"banner-img"}
                        src={`/images/amazon/desktop/${img}.webp`}
                        fill={true}
                    />
                    <Image
                        className={styles.mobile}
                        quality={100}
                        alt={"banner-img"}
                        src={`/images/amazon/mobile/${img}.webp`}
                        fill={true}
                    />
                </div>
            </a>
        </Link>
    )
}

export default AmazonBanner;    