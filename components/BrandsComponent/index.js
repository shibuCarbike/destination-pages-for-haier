import React, { useState } from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";
import { getEveryFirstLetterUpperCase } from "utlis/constant";
import { replaceImageUrl } from "utlis/constant";
import BrandsWithCrousel from "components/BrandsWithCrousel";
function BrandsComponent(props) {
  const { data, type, counts } = props;
  const [show, setShow] = useState(false);
  let listData = show ? data : data?.slice(0, 14);
   
  return (
    <div className={styles.brandsMainComponent}>
      <h2>{props?.h2}</h2>
      <div className={styles.brandsComponentDesktop}>
        <div
          className={`${styles.brandsInnerComponent} ${show && styles.open}`}
          style={{ "--counts": counts, "--max-height": "300px" }}
        >
          {listData?.map((brand, index) => {
            return (
              <Link
                href={`/${brand?.slug}`}
                prefetch={false}
                key={brand?.Name}
                passHref
              >
                <div
                  className={`${styles.brand_card} ${
                    (index + 1) % counts == 0 && styles.removeBorder
                  }`}
                  key={brand?.Name}
                >
                  <div className={styles.image_box}>
                    <Image
                      src={replaceImageUrl(brand?.Image?.url)}
                      quality={100}
                      alt={`${brand?.Name}-${type}`}
                      fill={true}
                      title={
                        (brand?.Name.length < 4
                          ? brand?.Name.toUpperCase()
                          : brand?.Name) +
                        "  " +
                        "Televisions "
                      }
                      // priority={index < 14 ? true : false}
                      sizes="(max-width: 768px) 100%"
                      placeholder="blur"
                      blurDataURL="https://via.placeholder.com/180x120"
                    />
                  </div>
                  <div className={styles.title}>
                    {" "}
                    {brand?.Name?.length < 4
                      ? brand?.Name.toUpperCase()
                      : brand?.Name}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className={styles.allBrandsTextDiv} onClick={() => setShow(!show)}>
          <p>{`View ${show ? "Less" : "All"} Brands`}</p>
          <Image
            className={show ? styles.upArrow : styles.downArrow}
            src={"/images/right-arrow.png"}
            width={13}
            height={13}
            alt="right-arrow"
          />
        </div>
      </div>
      <div className={styles.brandsMobileComponent}>
        <BrandsWithCrousel
          data={data}
          type={type}
          viewAllLink={`/brands`}
          viewAllText="View All"
        />
      </div>
    </div>
  );
}

export default BrandsComponent;
