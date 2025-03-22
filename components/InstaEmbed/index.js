import React from "react";
import { InstagramEmbed } from "react-social-media-embed";
import styles from "./index.module.scss";
import { Carousel } from "react-bootstrap";
const instaCrouselSizes = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function InstaEmbed(props) {
  const { url } = props;
  let instaUrls;
  if (url?.length) {
    instaUrls = url?.split(",");
    instaUrls = instaUrls?.map((instaUrl, i) => {
      return instaUrl?.trim();
    });
  } else {
    instaUrls = [
      "https://www.instagram.com/p/C4vD2yFvxmu",
      "https://www.instagram.com/p/CdsE8ddLxut",
    ];
  }

  return (
    <div className={styles.instagramDiv}>
      <Carousel responsive={instaCrouselSizes} slide={false}>
        {instaUrls?.map((data, index) => {
          return (
            <Carousel.Item>
              {data?.length && <InstagramEmbed url={data} />}
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

export default InstaEmbed;
