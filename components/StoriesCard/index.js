import styles from "./index.module.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button, Container } from "react-bootstrap";
import { getEveryFirstLetterUpperCase } from "utlis/constant";
import Image from "next/image";
import Link from "next/link";
import { replaceImageUrl } from "utlis/constant";

export default function StoriesCard({ h2, data, count }) {
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
      <div className={styles.container}>
        {h2 && <h2>{getEveryFirstLetterUpperCase(h2)}</h2>}
        <section className={styles.desktop}>
          <Carousel responsive={getResponsive()}>
            {data.map((card, i) => (
              <Link
                key={`card-${i}${card.Name}`}
                href={`/stories/${card?.slug}`}
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
                    <div className={styles.body}>
                      <div className={styles.time}> 1 day ago</div>
                      <div className={styles.title}>
                        {card?.title ||
                          "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available"}
                      </div>
                    </div>
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
              href={`/stories/${card?.slug}`}
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
                  <div className={styles.body}>
                    <div className={styles.time}> 1 day ago</div>
                    <div className={styles.title}>
                      {card?.title ||
                        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available"}
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </section>
      </div>
    );
  }
}
