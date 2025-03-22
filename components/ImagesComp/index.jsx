import styles from "./index.module.scss";
import Carousel from "react-multi-carousel";
import Image from "next/image";
import Link from "next/link";

export default function ImagesComponent({ h2, data, vehicleType, ...props }) {
  if (data?.length > 0 ) {
    return (
      <div
        className={`${styles.ic_wrapper} ${
          props.hideShadow ? styles.hideShadow : "all-shadow"
        }`}
      >
        <h2 style={{ marginBottom: "15px", marginTop: "10px" }}>
          {h2 ? h2 : "All Images"}
        </h2>
        <Carousel
          removeArrowOnDeviceType={["tablet", "mobile"]}
          responsive={responsiveNews}
          ssr={true}
        >
          {data?.map((item, index) => {
            return (
              <Link
                href={`/${item?.brandSlug}/${item?.slug}/images`}
                key={item?.Name + index}
                prefetch={false}
              >
                <div className={styles.ic_card}>
                  <div className={styles.allImagesBox}>
                    {item?.imagesData?.map((x, i) => {
                      if (i < 3) {
                        return (
                          <div
                            key={x + i}
                            className={styles.img_box}
                            style={{
                              gridArea: { 0: "first", 1: "second", 2: "third" }[
                                i
                              ],
                            }}
                          >
                            <Image
                              fill
                              style={{ objectFit: "contain" }}
                              src={x.image?.url || x?.url || x?.angleImage || x}
                              alt={item?.brandName + " " + item?.Name}
                              title={item?.brandName + " " + item?.Name}
                              sizes="(max-width: 768px) 100vw"
                            />
                          </div>
                        );
                      }
                    })}
                  </div>
                  <div className={styles.ic_content_box}>
                    <div className={styles.titles}>
                      <p>{item?.brandName}</p>
                      <p>{item?.name}</p>
                    </div>
                    <div className={styles.images_length}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="#645f62"
                        className="bi bi-image"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
                      </svg>
                      {/* <p>{item?.imagesData?.length}</p> */}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </Carousel>
      </div>
    );
  }
}

const responsiveNews = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
    // partialVisibilityGutter: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    // partialVisibilityGutter: 10,
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 2,
    partialVisibilityGutter: 20,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    partialVisibilityGutter: 20,
  },
};
