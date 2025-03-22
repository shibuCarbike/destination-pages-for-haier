import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { replaceImageUrl } from "utlis/constant";
import { getEveryFirstLetterUpperCase } from "utlis/constant";

export default function SideBrands({ data, h2, link }) {
  if (data?.length > 0) {
    return (
      <div className={styles.wrapper}>
        <h2>{getEveryFirstLetterUpperCase(h2)}</h2>
        <div className={styles.card_wrapper}>
          {data.map((item, i) => (
            <Link
              href={`/${item.brandSlug}/${item?.slug}`}
              key={item.Name}
              prefetch={false}
            >
              <div className={styles.card}>
                <div className={styles.image_box}>
                  <Image
                    fill={true}
                    alt={item?.Name}
                    title={item?.Name}
                    src={replaceImageUrl(item?.angleImage)}
                    sizes="(max-width: 768px) 100%"
                    placeholder="blur"
                    blurDataURL="https://via.placeholder.com/180x120"
                  />
                </div>
                <div className={styles.body}>
                  <div className={styles.name}>
                    {item?.brandName} {item?.Name}
                  </div>
                  <span>
                    {item.minPrice ? `₹ ${item.minPrice}` : "Onwards"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
