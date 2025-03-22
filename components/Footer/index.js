import styles from "./index.module.scss";
import { Row, Col } from "react-bootstrap";
import React from "react";
import { facebookIcon, instaIcon, youtubeIcon } from "utlis/icons";
import Link from "next/link";
import Image from "next/image";
import { replaceImageUrl } from "utlis/constant";
const baseUrl = "https://www.comparos.in";

export default function Footer({ isSponser }) {
  const commonMenuIetms = [
    { label: "Mobiles", path: "https://www.comparos.in/mobiles" },
    { label: "Refrigerators", path: "https://www.comparos.in/refrigerators" },
    {
      label: "Air Conditioners",
      path: "https://www.comparos.in/air-conditioners",
    },
    { label: "Televisions", path: "/" },
    { label: "Watches", path: "https://www.comparos.in/watches" },
    { label: "Printers", path: "https://www.comparos.in/printers" },
    { label: "Laptops", path: "https://www.comparos.in/laptops" },
    {
      label: "Washing Machine",
      path: "https://www.comparos.in/washing-machine",
    },
    {
      label: "Air Purifiers",
      path: "https://www.comparos.in/air-purifiers",
    },
    {
      label: "Water Purifiers",
      path: "https://www.comparos.in/water-purifiers",
    },
  ];

  const iconClickHandel = (from) => {
    let url;
    switch (from) {
      case "cmv":
        url = "https://www.cmv360.com/";
        break;
      case "carbike":
        url = "https://www.carbike360.com/";
        break;
      case "instagram":
        url = "https://www.instagram.com/comparos.in/";
        break;
      case "youtube":
        // url = "https://www.instagram.com/comparos.in/";
        break;
      case "facebook":
        url = "https://www.facebook.com/comparos.in/";
        break;
      // case "":
      // 	break;
      // case "":
      // 	break;
    }

    if (url) {
      window.open(url, "_blank");
    }
  };

  const popularBrands = {
    Televisions: [
      {
        label: "Samsung",
        path: "samsung",
        redirect: true,
      },
      { label: "LG", path: "lg", redirect: true },
      { label: "Sony", path: "sony", redirect: true },
      {
        label: "Xiaomi (Mi)",
        path: "xiaomi",
        redirect: true,
      },
      { label: "TCL", path: "tcl", redirect: true },
      { label: "Vu", path: "vu", redirect: true },
      {
        label: "OnePlus",
        path: "oneplus",
        redirect: true,
      },
      {
        label: "Philips",
        path: "philips",
        redirect: true,
      },
      // { label: "Hisense", path: "hisense" },
    ],
    Mobiles: [
      { label: "Samsung", path: "mobiles/samsung" },
      { label: "Xiaomi (Redmi)", path: "mobiles/xiaomi" },
      { label: "Apple", path: "mobiles/apple" },
      { label: "OnePlus", path: "mobiles/oneplus" },
      { label: "Vivo", path: "mobiles/vivo" },
      { label: "Motorola", path: "mobiles/motorola" },
      { label: "Nokia", path: "mobiles/nokia" },
      { label: "Poco", path: "mobiles/poco" },
      { label: "IQOO", path: "mobiles/iqoo" },
    ],
    Laptops: [
      { label: "HP (Hewlett-Packard)", path: "laptops/hp" },
      { label: "Dell", path: "laptops/dell" },
      // { label: "Lenovo", path: "laptops/lenevo" },
      { label: "Asus", path: "laptops/asus" },
      { label: "Apple (MacBook)", path: "laptops/apple" },
      // { label: "Microsoft (Surface)", path: "laptops/microsoft" },
      // { label: "MSI", path: "laptops/msi" },
      // { label: "Toshiba", path: "laptops/toshiba" },
      { label: "Samsung", path: "laptops/samsung" },
    ],
    Watches: [
      { label: "Titan", path: "watches/titan" },
      { label: "Fastrack", path: "watches/fastrack" },
      { label: "Casio", path: "watches/casio" },
      { label: "Fossil", path: "watches/fossil" },
      { label: "Timex", path: "watches/timex" },
      { label: "Sonata", path: "watches/sonata" },
      // { label: "Daniel Wellington", path: "watches/hisense" },
      { label: "Michael Kors", path: "watches/michael-kors" },
      { label: "Tissot", path: "watches/tissot" },
      { label: "Citizen", path: "watches/citizen" },
    ],
  };

  const top10 = [
    { lable: "Mobile Phone Brands", path: `mobiles/brands` },
    { lable: "Watches Phone Brands", path: `watches/brands` },
    { lable: "Smartphones in India", path: `mobiles/latest` },
    { lable: "Laptops in India", path: `laptops` },
    { lable: "Smart Watches in India", path: `watches` },
    // {
    //   lable: "Smart TV in india",
    //   path: `/`,
    //   redirect: true,
    // },
    { lable: "AC Brands", path: `air-conditioners/brands` },
    { lable: "Printer", path: `printers` },
    { lable: "Washing Machine", path: `washing-machine` },
    // { lable: "Gaming Laptops in India", path: `laptops` },
  ];

  return (
    <Row className={styles.footer_row}>
      {!isSponser && (
        <>
          <Col md={12}>
            <div className={styles.other_site_section}>
              {/* <span onClick={() => iconClickHandel("comparos")}>COMPAROS</span>| */}
              <span onClick={() => iconClickHandel("cmv")}>
                <Image
                  src={replaceImageUrl(
                    "https://cmv360.s3.ap-southeast-1.amazonaws.com/cmv360_logo_white_2048x531_330a02f52f.png"
                  )}
                  width={100}
                  style={{ objectFit: "contain" }}
                  height={30}
                  alt={"cmv360"}
                  title={"cmv360"}
                  sizes="(max-width: 768px) 100%"
                  placeholder="blur"
                  blurDataURL="https://via.placeholder.com/180x120"
                />
              </span>
              |
              <span onClick={() => iconClickHandel("carbike")}>
                <Image
                  style={{ objectFit: "contain" }}
                  src={replaceImageUrl(
                    "https://cmv360.s3.ap-southeast-1.amazonaws.com/Car_Bike360_4dd5ed4154.png"
                  )}
                  width={100}
                  height={30}
                  alt={"Carbike360"}
                  title={"Carbike360"}
                  sizes="(max-width: 768px) 100%"
                  placeholder="blur"
                  blurDataURL="https://via.placeholder.com/180x120"
                />
              </span>
            </div>
          </Col>
          <Col xs={12} sm={12} md={2}>
            <div className={styles.heading}>Further Informations</div>
            <Link href={`/contact-us`} prefetch={false}>
              Contact Us
            </Link>
            <Link href={`/about-us`} prefetch={false}>
              About Us
            </Link>
            {/* <Link href={`/carrer-us`} prefetch={false}>
          Career
        </Link> */}
            <Link href={`/terms-and-condition`} prefetch={false}>
              Terms And Condition
            </Link>
            <Link href={`/privacy-policy`} prefetch={false}>
              Privacy Policy
            </Link>
            <Link href={`/advertise-with-us`} prefetch={false}>
              Advertise With Us
            </Link>
            <Link href="/sitemap" prefetch={false}>
              Sitemap
            </Link>
            <div className={styles.heading}>Registested Address</div>
            <p>Delente Technologies Pvt. Ltd.</p>
            <p>First Floor, Unit 101-102,</p>
            <p>M3M Cosmopolitan, Golf Course Extension Road, Sector-66,</p>
            <p>Pincode- 122002</p>
          </Col>
          <Col xs={12} sm={12} md={5}>
            <div className={styles.second_column}>
              <div>
                <div className={styles.heading}>Popular Brands</div>
                {Object.keys(popularBrands).map((x, i) => (
                  <div className={styles.links_box} key={`brands-${x}`}>
                    <span>{x} : </span>
                    {popularBrands[x].map((link, i) => {
                      if (x == "Televisions") {
                        return (
                          <React.Fragment key={`brand-${link.label}`}>
                            <Link
                              href={
                                link?.redirect
                                  ? `/${link.path}`
                                  : `${baseUrl}/${link.path}`
                              }
                              prefetch={false}
                            >
                              {link.label}
                            </Link>
                            {i < popularBrands[x].length - 1 && "|"}
                          </React.Fragment>
                        );
                      } else {
                        return (
                          <React.Fragment key={`brand-${link.label}`}>
                            <Link
                              href={
                                link?.redirect
                                  ? `/${link.path}`
                                  : `${baseUrl}/${link.path}`
                              }
                              prefetch={false}
                              passHref
                              legacyBehavior
                            >
                              <a target={"_blank"}>{link.label}</a>
                            </Link>
                            {i < popularBrands[x].length - 1 && "|"}
                          </React.Fragment>
                        );
                      }
                    })}
                  </div>
                ))}
              </div>
              <div>
                <div className={styles.heading}>Top 10</div>
                <Link prefetch={false} href={"/brands"}>
                  {" "}
                  Tv Brands
                </Link>
                {top10.map((link, i) => (
                  <Link
                    passHref
                    legacyBehavior
                    prefetch={false}
                    href={
                      link?.redirect ? link.path : `${baseUrl}/${link.path}`
                    }
                    key={`top-${i}-${link.lable}`}
                  >
                    <a target={"_blanck"}>{link.lable}</a>
                  </Link>
                ))}
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={2}>
            <div className={styles.third_column}>
              <div className={styles.heading}>News & Reviews</div>
              <Link href={`/news`} prefetch={false}>
                Televisions News
              </Link>
              {/* <Link href="/expert-reviews" prefetch={false}>
            Phone Reviews
          </Link> */}
              <Link
                href="https://www.comparos.in/news"
                prefetch={false}
                passHref
                legacyBehavior
              >
                <a target="_blanck">All News</a>
              </Link>
              <Link
                href="https://www.comparos.in/expert-reviews"
                prefetch={false}
                passHref
                legacyBehavior
              >
                <a target="_blanck">All Reviews</a>
              </Link>
              <Link
                href="https://www.comparos.in/expert-reviews"
                prefetch={false}
                passHref
                legacyBehavior
              >
                <a target="_blanck">All Articles</a>
              </Link>
            </div>
          </Col>
          <Col xs={12} sm={12} md={3}>
            <div className={styles.deatils_section}>
              <div className={styles.top_row}>
                <div className={styles.left_section}>
                  COMPAROS<span>Follow Us On</span>
                </div>
                <div className={styles.right_section}>
                  <Link
                    href="https://www.facebook.com/comparos.in/"
                    prefetch={false}
                    passHref
                    legacyBehavior
                  >
                    <a target="_blank">{facebookIcon}</a>
                  </Link>

                  <Link
                    href="https://www.instagram.com/comparos.in/"
                    prefetch={false}
                    passHref
                    legacyBehavior
                  >
                    <a target="_blank">{instaIcon}</a>
                  </Link>

                  <Link
                    href="https://www.youtube.com/@Comparos/"
                    prefetch={false}
                    passHref
                    legacyBehavior
                  >
                    <a target="_blank">{youtubeIcon}</a>
                  </Link>
                </div>
              </div>
              <div className={styles.desc}>
                Comparos.in is a one-stop destination, You can search for
                refrigerators, Air-Conditioners, mobiles, television and
                watches, according to your need, taste and style from everywhere
                and anywhere. Insight of the product, the website provides all
                the specifications and features of the product of various
                brands.
              </div>
              <div className={styles.suscribe_section}>
                <div className={styles.heading}>Subscribe Newsletter Now </div>
                <div className={styles.input_section}>
                  <input type="email" placeholder="email@domain.com" />
                  <button>Submit</button>
                </div>
                <p>Receive pricing updates, buying tips & more!</p>
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className={styles.common_fotter}>
              {commonMenuIetms.map((menuItem, i) => (
                <Link
                  href={`${menuItem.path}`}
                  key={`com-${i}`}
                  prefetch={false}
                  passHref
                  legacyBehavior
                >
                  <a target="_blank">{menuItem.label}</a>
                </Link>
              ))}
            </div>
          </Col>
        </>
      )}
      <Col md={12}>
        <div
          className={styles.copy_right_section}
          style={{ padding: isSponser && "0px", borderTop: isSponser && "0px" }}
        >
          © Copyright 2023 - Comparos. All Rights Reserved.
        </div>
      </Col>
    </Row>
  );
}
