import styles from "./index.module.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { replaceImageUrl } from "utlis/constant";
export default function ComapreCardNew({ h2, data, count }) {
  const getResponsive = () => {
    switch (count) {
      case 2:
        return {
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2,
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
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
            items: 3,
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
          },
        };
    }
  };

  if (data?.length > 0) {
    return (
      <div className={styles.container}>
        {h2 && <h2>{h2 || "Heading is needed"}</h2>}
        <section className={styles.desktop}>
          <Carousel responsive={getResponsive(count)} ssr={true}>
            {data.map((card, i) => (
              <Link
                key={`card-${i}${card.Name}`}
                href={`/led/${card.slug1}-vs-${card.slug2}`}
                prefetch={false}
                passHref
                legacyBehavior
              >
                <a>
                  <div className={styles.card}>
                    <div className={styles.inner_card}>
                      <div className={styles.image_box}>
                        <Image
                          src={replaceImageUrl(card.image1)}
                          fill={true}
                          quality={100}
                          alt={card?.name1}
                          sizes="(max-width: 768px) 100%"
                          placeholder="blur"
                          blurDataURL="https://via.placeholder.com/180x120"
                        />
                      </div>
                      <div className={styles.title}>{card?.name1}</div>
                      <div className={styles.price}>₹ {card?.minPrice1}</div>
                    </div>
                    <div className={styles.vs_border}>
                      <div className={styles.absolute_part}>
                        <span className="vs2">VS</span>
                      </div>
                    </div>
                    <div className={styles.inner_card}>
                      <div className={styles.image_box}>
                        <Image
                          src={replaceImageUrl(card.image2)}
                          fill={true}
                          quality={100}
                          alt={card?.name2}
                          sizes="(max-width: 768px) 100%"
                          placeholder="blur"
                          blurDataURL="https://via.placeholder.com/180x120"
                        />
                      </div>
                      <div className={styles.title}>{card?.name2}</div>
                      <div className={styles.price}>₹ {card?.minPrice2}</div>
                    </div>
                    <button variant="secondary">Compare Now</button>
                  </div>
                </a>
              </Link>
            ))}
          </Carousel>
        </section>
        <section className={styles.mobile}>
          {data.map((card, i) => (
            <Link
              key={`card-${i}${card.Name}`}
              href={`/led/${card.slug1}-vs-${card.slug2}`}
              prefetch={false}
              passHref
              legacyBehavior
            >
              <a>
                <div className={styles.card}>
                  <div className={styles.inner_card}>
                    <div className={styles.image_box}>
                      <Image
                        src={replaceImageUrl(card.image1)}
                        fill={true}
                        quality={100}
                        alt={card?.name1}
                        sizes="(max-width: 768px) 100%"
                        placeholder="blur"
                        blurDataURL="https://via.placeholder.com/180x120"
                      />
                    </div>
                    <div className={styles.title}>{card?.name1}</div>
                    <div className={styles.price}>₹ {card?.minPrice1}</div>
                  </div>
                  <div className={styles.vs_border}>
                    <div className={styles.absolute_part}>
                      <span className="vs2">VS</span>
                    </div>
                  </div>
                  <div className={styles.inner_card}>
                    <div className={styles.image_box}>
                      <Image
                        src={replaceImageUrl(card.image2)}
                        fill={true}
                        quality={100}
                        alt={card?.name2}
                        sizes="(max-width: 768px) 100%"
                        placeholder="blur"
                        blurDataURL="https://via.placeholder.com/180x120"
                      />
                    </div>
                    <div className={styles.title}>{card?.name2}</div>
                    <div className={styles.price}>₹ {card?.minPrice2}</div>
                  </div>
                  <button variant="secondary">Compare Now</button>
                </div>
              </a>
            </Link>
          ))}
        </section>
      </div>
    );
  }
}
