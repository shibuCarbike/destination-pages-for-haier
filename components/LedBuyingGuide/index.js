import React, { useState } from 'react'
import styles from './index.module.scss'
import Image from 'next/image';
import { upIcon, downIcon } from "utlis/icons";
function BuyingGuide(props) {
    let [isOpen, setIsOpen] = useState(false)
    const { h2, data } = props
    return (
        <div className={styles.container}>
            {h2 && <h2>{h2}</h2>}
            <div className={styles.authorInfo}>
                <div className={styles.authorImg}>
                    <Image
                        src={data.authorImg}
                        width={50}
                        height={50}
                    />
                </div>
                <div className={styles.title}>
                    <h3>{data?.subHeading}</h3>
                    <p>by {data?.author}</p>
                </div>

            </div>

            <div style={{ "--height": ` 370px` }}
                className={`${styles.content} ${isOpen && styles.open}`}
            >
                <div dangerouslySetInnerHTML={{ __html: data?.content }} />

            </div>
            <div className={`${styles.button_div} ${isOpen && styles.collapsed}`}>
                <button
                    onClick={() => {
                        setIsOpen((prev) => !prev);
                    }}
                >
                    {!isOpen ? "Read More" : "Read Less"}
                    {!isOpen ? downIcon : upIcon}
                </button>
            </div>

        </div>
    )
}

export default BuyingGuide