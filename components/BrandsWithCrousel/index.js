import styles from "./index.module.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Link from "next/link";
import { getEveryFirstLetterUpperCase, replaceImageUrl } from "utlis/constant";
import { useRouter } from "next/router";
import { useState } from "react";

export default function BrandsWithCrousel({ h2, data, count, type,viewAllText, viewAllLink }) {
  const router = useRouter();
  let path = router.asPath?.split("/")[1];
  const [colors, setColors] = useState({
    color: null,
    gradient: null,
  });



  const getResponsive = () => {
    switch (count) {
      case 4:
        return {
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
          },
        };
      default:
        return {
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4,
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
          },
        };
    }
  };

  if (data?.length > 0) {
    return (
      <div className={`${styles.container}`}>
        {h2 && <h2>{h2}</h2>}
        <section className={styles.mobile}>
          {
            data?.map((brand, i) => (
              <Link
                key={`brand-${i}${brand.Name}`}
                href={`/${brand?.slug}`}
                prefetch={false}
                passHref
                legacyBehavior
              >
                <a>
                  <div className={styles.card}>
                    <div className={styles.image_box}>
                      <Image
                        src={replaceImageUrl(brand.Image?.url)}
                        fill={true}
                        title={brand?.Name}
                        quality={100}
                        // priority={i < 6 ? true : false}
                        alt={`${brand?.Name}_logo`}
                        sizes="(max-width: 768px) 100%"
                        placeholder="blur"
                        blurDataURL="https://via.placeholder.com/180x120"
                      />
                    </div>
                    <div className={styles.title}>{brand?.Name}</div>


                  </div>
                </a>
              </Link>
            ))
          }



        </section>
        <div>
          {viewAllText && <Link
            href={viewAllLink}
            prefetch={false}
            legacyBehavior
            passHref
          >
            <a>
              <span className={styles.viewAllDiv}>
                <p>
                  {viewAllText}
                </p>
                <Image
                  src={'/images/right-arrow.png'}
                  width={12}
                  height={12}
                  alt='right-arrow'
                />
              </span>

            </a>
          </Link>}
        </div>
      </div>
    );
  }
}
