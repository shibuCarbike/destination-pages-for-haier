import styles from "./index.module.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button, Container } from "react-bootstrap";
import { getEveryFirstLetterUpperCase } from "utlis/constant";
import Image from "next/image";
import { replaceImageUrl } from "utlis/constant";
import Link from "next/link";

export default function Card({ h2, data, count, negativeMargin }) {
  const getResponsive = () => {
    switch (count) {
      case 3:
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
      default:
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
    }
  };

  if (data?.length > 0) {
    return (
      <div
        className={`${styles.container} ${
          negativeMargin && styles.negativeMargin
        }`}
      >
        {h2 && <h2>{h2}</h2>}
        <section className={styles.desktop}>
          <Carousel responsive={getResponsive()} ssr={true}>
            {data.map((card, i) => (
              <Link
                key={`card-${i}${card.Name}`}
                href={`/news/${card?.slug}`}
                prefetch={false}
                passHref
                legacyBehavior
              >
                <a>
                  <div className={styles.card}>
                    <div className={styles.image_box}>
                      <Image
                        src={replaceImageUrl(card.image)}
                        fill={true}
                        quality={100}
                        alt={card?.title}
                        sizes="(max-width: 768px) 100%"
                        placeholder="blur"
                        blurDataURL="https://via.placeholder.com/180x120"
                      />
                    </div>
                    <div className={styles.title}>{card?.title}</div>
                    <Button>View Details</Button>
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
              href={`/news/${card?.slug}`}
              prefetch={false}
              passHref
              legacyBehavior
            >
              <a>
                <div className={styles.card}>
                  <div className={styles.image_box}>
                    <Image
                      src={replaceImageUrl(card.image)}
                      fill={true}
                      quality={100}
                      alt={card?.title}
                      sizes="(max-width: 768px) 100%"
                      placeholder="blur"
                      blurDataURL="https://via.placeholder.com/180x120"
                    />
                  </div>
                  <div className={styles.title}>{card?.title}</div>
                  <Button>View Details</Button>
                </div>
              </a>
            </Link>
          ))}
        </section>
      </div>
    );
  }
}
