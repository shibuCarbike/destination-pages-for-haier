import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./index.module.scss";
import { upIcon, downIcon } from "utlis/icons";
import { replaceImageUrl } from "utlis/constant";
import { getEveryFirstLetterUpperCase } from "utlis/constant";

export default function SideBrands({ data, h2 }) {
  const [showMore, setShowMore] = useState(false);

  if (data?.length > 0) {
    return (
      <div className={styles.wrapper}>
        <h2>{getEveryFirstLetterUpperCase(h2) || "Explore Other Brands"}</h2>
        {data.map(
          (brand, i) =>
            (!showMore ? i < 6 : true) && (
              <Link href={`/${brand?.slug}`} key={brand.Name} prefetch={false}>
                <div className={styles.brand_card}>
                  <div className={styles.image_box}>
                    <Image
                      src={replaceImageUrl(brand?.Image)}
                      fill={true}
                      alt={brand?.Name}
                      title={brand?.Name}
                      sizes="(max-width: 768px) 100%"
                      placeholder="blur"
                      blurDataURL="https://via.placeholder.com/180x120"
                    />
                  </div>
                  {brand?.Name}
                </div>
              </Link>
            )
        )}
        <button onClick={() => setShowMore((prev) => !prev)}>
          {!showMore ? <>Show More {downIcon} </> : <>Show Less {upIcon}</>}
        </button>
      </div>
    );
  }
}
