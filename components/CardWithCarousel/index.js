import styles from "./index.module.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button, Container } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { getEveryFirstLetterUpperCase } from "utlis/constant";
import { replaceImageUrl } from "utlis/constant";

export default function NewsCard({
  h2,
  data,
  count,
  allText,
  viewAllText,
  viewAllLink,
}) {
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
            items: 5,
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
        className={`${styles.container} ${!h2 ? styles.wihtouth2 : ""} ${
          allText ? styles.allDeatils : ""
        }`}
      >
        {h2 && <h2>{h2}</h2>}
        <section className={styles.desktop}>
          <Carousel responsive={getResponsive(count)} ssr={true}>
            {data.map((card, i) => (
              <Link
                key={`card-${i}${card.Name}`}
                href={`/${card?.brandSlug}/${card?.slug}`}
                prefetch={false}
                passHref
                legacyBehavior
              >
                <a>
                  <div className={styles.card}>
                    <div className={styles.image_box}>
                      <Image
                        src={replaceImageUrl(card.angleImage)}
                        fill={true}
                        sizes="(max-width: 768px) 100%"
                        quality={100}
                        title={`${card.brandName} ${card?.Name}`}
                        alt={card?.Name}
                        placeholder="blur"
                        blurDataURL="https://via.placeholder.com/180x120"
                      />
                    </div>
                    <div className={styles.title}>
                      {" "}
                      {card?.brandName} {card?.Name}
                    </div>
                    <div className={styles.price}>₹ {card?.minPrice}</div>
                    <Button variant="secondary">View Details</Button>
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
              href={`/${card?.brandSlug}/${card?.slug}`}
              prefetch={false}
              passHref
              legacyBehavior
            >
              <a>
                <div className={styles.card}>
                  <div className={styles.image_box}>
                    <Image
                      src={replaceImageUrl(card.angleImage)}
                      fill={true}
                      quality={100}
                      alt={card?.Name}
                      sizes="(max-width: 768px) 100%"
                      placeholder="blur"
                      blurDataURL="https://via.placeholder.com/180x120"
                    />
                  </div>
                  <div className={styles.title}>{card?.Name}</div>
                  <div className={styles.price}>₹ {card?.minPrice}</div>
                  <Button variant="secondary">View Details</Button>
                </div>
              </a>
            </Link>
          ))}
        </section>
        {viewAllText && (
          <Link href={viewAllLink} prefetch={false} legacyBehavior passHref>
            <a>
              <span className={styles.viewAllDiv}>
                <p>{viewAllText}</p>
                <Image
                  src={"/images/right-arrow.png"}
                  width={12}
                  height={11}
                  alt="right-arrow"
                />
              </span>
            </a>
          </Link>
        )}
      </div>
    );
  }
}
