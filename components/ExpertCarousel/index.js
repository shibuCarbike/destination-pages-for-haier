import Image from "next/image";
import Carousel from "react-multi-carousel";
import styles from "./index.module.scss";
import { replaceImageUrl } from "../../utlis/constant";
import Link from "next/link";

export default function AdviceArticlesCarousel({
  carouselData,
  h2,
  type,
  ...props
}) {
  // Responsive settings for the carousel
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // Slide only one item at a time
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
      partialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 50,
    },
  };
  return (
    <div className={styles.aac_wrapper}>
      <h2>{h2 ? h2 : `Advice You Can Trust`}</h2>
      <section className={styles.desktop}>
        <Carousel
          swipeable
          draggable
          responsive={responsive}
          ssr={true} // Means to render carousel on server-side
          removeArrowOnDeviceType={["tablet", "mobile"]}
          partialVisbile={true}
        >
          {carouselData.map((item, index) => (
            <Link
              href={`https://www.comparos.in/${type}/${item?.slug}`}
              prefetch={false}
              key={`aac_wrapper${index}`}
              className={styles.aac_card}
            >
              <div className={styles.aac_img_box}>
                <Image
                  fill
                  src={replaceImageUrl(item.image)}
                  alt={item?.title}
                  title={item?.title}
                />
              </div>
              <p className={styles.tag}>COMPAROS</p>
              <div className={styles.aac_content_box}>
                <h3 title={item?.title}>
                  {item?.title?.length > 45
                    ? item?.title.slice(0, 45) + "..."
                    : item?.title}
                </h3>
                <p>
                  {item?.smallDesc.length > 120
                    ? item?.smallDesc.slice(0, 120) + "..."
                    : item?.smallDesc}
                </p>
              </div>
            </Link>
          ))}
        </Carousel>
      </section>
      <section className={styles.mobile}>
        {carouselData.map((item, index) => (
          <Link
            href={`https://www.comparos.in/${type}/${item?.slug}`}
            prefetch={false}
            key={`aac_wrapper${index}`}
            className={styles.aac_card}
          >
            <div className={styles.aac_img_box}>
              <Image
                fill
                src={item.image}
                alt={item?.title}
                title={item?.title}
              />
            </div>
            <p className={styles.tag}>COMPAROS</p>
            <div className={styles.aac_content_box}>
              <h3 title={item?.title}>
                {item?.title?.length > 45
                  ? item?.title.slice(0, 45) + "..."
                  : item?.title}
              </h3>
              <p>
                {item?.smallDesc.length > 120
                  ? item?.smallDesc.slice(0, 120) + "..."
                  : item?.smallDesc}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
