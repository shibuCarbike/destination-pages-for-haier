import { Row, Col, Button } from "react-bootstrap";
import styles from "./index.module.scss";
import Image from "next/image";
import NoDataFound from "components/NoDataFound";
import Link from "next/link";
import React from "react";
import { Ad, SideAd, StickyAd } from "components/Ads";
import {
  TvBrandPageMobile,
  TvBrandPageDesktop,
} from "components/Ads/adsVariable";
import { replaceImageUrl } from "utlis/constant";

export default function Box({
  boxFor,
  data,
  page,
  handleFilterClick,
  targetingArguments,
}) {
  return data.length > 0 ? (
    data.map((item, i) => (
      <React.Fragment key={`card-${i}`}>
        <Link href={`/${item?.brandSlug}/${item?.slug}`} prefetch={false}>
          <Row className={styles.box}>
            <Col xs={4} md={4} className={styles.image_box}>
              <div className={styles.image}>
                <Image
                  src={replaceImageUrl(item.angleImage)}
                  quality={100}
                  alt={item?.Name}
                  title={`${item?.brandName} ${item?.Name}`}
                  fill={true}
                  sizes="(max-width: 768px) 100%"
                  placeholder="blur"
                  blurDataURL="https://via.placeholder.com/180x120"
                />
              </div>
            </Col>
            <Col xs={8} md={5}>
              <div className={styles.name}>
                {" "}
                {item?.brandName} {item?.Name}
              </div>
              <div className={styles.rating_section}>
                <span>{item?.star}</span>
                {item?.userCount} Ratings & Reviews.
              </div>
              <ul className={styles.spec_ul}>
                {item?.usbSupports && <li>{item?.usbSupports}</li>}
                {item?.screen_type && item?.sizediagonal && (
                  <li>
                    {item?.sizediagonal} {item?.screen_type}
                  </li>
                )}
                {item?.resolution && <li>{item?.resolution}</li>}
                {item?.refresh_rate && (
                  <li>{item?.refresh_rate} Refresh Rate</li>
                )}
                {item?.warranty && <li>{item?.warranty} Warranty</li>}
                <span className={styles.price}>₹{item?.minPrice}</span>
              </ul>
            </Col>
            <Col xs={12} md={3}>
              <div className={styles.price_section}>
                <div className={styles.price}>₹{item?.minPrice}</div>
                {boxFor === "mobiles" && (
                  <div className={styles.color_section}>
                    {item?.all?.colors?.map((x, i2) => (
                      <div
                        key={`box-${i2}`}
                        className={styles.box}
                        style={{ "--color": x.hex }}
                        onClick={() => handelImageChange(x, i)}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Link>
        {i > 0 && (i + 1) % 6 === 0 && (
          <div className={styles.ads}>
            <Ad
              margin={false}
              mobileUrl={TvBrandPageMobile.medium}
              desktopUrl={TvBrandPageDesktop.medium}
              targetingArguments={targetingArguments}
              mobileSizes={TvBrandPageMobile.mediumSizes}
              desktopSizes={TvBrandPageDesktop.mediumSizes}
            />
          </div>
        )}
      </React.Fragment>
    ))
  ) : (
    <NoDataFound handleFilterClick={handleFilterClick} />
  );
}
