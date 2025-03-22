import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.scss";
import { replaceImageUrl } from "utlis/constant";
import Placeholder from "react-bootstrap/Placeholder";

export default function ReviewsComponent({ h2, data }) {
  if (data?.length > 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>{h2 || "Latest Reviews"}</h2>
          <Link href={`/expert-reviews`} prefetch={false}>
            View All
          </Link>
        </div>
        <section>
          <div className={styles.left_section}>
            <Link href={`/expert-reviews/${data[0].slug}`}>
              <div className={styles.image_box}>
                {data[0].image ? (
                  <Image
                    src={replaceImageUrl(data[0].image)}
                    fill={true}
                    alt={data[0].title}
                    sizes="(max-width: 768px) 100%"
                    placeholder="blur"
                    blurDataURL="https://via.placeholder.com/180x120"
                  />
                ) : (
                  <Placeholder animation="glow">
                    <Placeholder
                      xs={12}
                      style={{ width: "100%", height: "300px" }}
                    />
                  </Placeholder>
                )}
              </div>
              <div className={styles.body}>
                {/* <div className={styles.time}>1 day ago</div> */}
                <div title={data[0].title} className={styles.title}>
                  {data[0].title}
                </div>
              </div>
            </Link>
          </div>
          <div className={styles.right_section}>
            {data.slice(1).map((item, i) => (
              <Link
                key={item.slug}
                href={`/expert-reviews/${item.slug}`}
                prefetch={false}
              >
                <div className={styles.card}>
                  <div className={styles.image_box}>
                    <Image
                      src={replaceImageUrl(item.image)}
                      fill={true}
                      alt={item.title}
                      sizes="(max-width: 768px) 100%"
                      placeholder="blur"
                      blurDataURL="https://via.placeholder.com/180x120"
                    />
                  </div>
                  <div className={styles.body}>
                    {/* <div className={styles.time}>1 day ago</div> */}
                    <div className={styles.title}>{item.title}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    );
  }
}
