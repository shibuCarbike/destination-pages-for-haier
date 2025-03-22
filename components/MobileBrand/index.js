import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import api from "api.service";
import styles from "styles/common.module.scss";
import React, { useState, useEffect } from "react";
import Box from "components/Box";
import { Ad, StickyAd, SideAd } from "components/Ads";
import {
  TvBrandPageDesktop,
  TvBrandPageMobile,
} from "components/Ads/adsVariable";
import { getRating, getEveryFirstLetterUpperCase } from "utlis/constant.js";
import { rightIcon, upIcon, downIcon } from "utlis/icons.js";
import Content from "components/Content";
import SideBrands from "components/SideBrands";
import NewsCardWithCarousel from "components/NewsCardWithCarousel";
import SideCards from "components/SideCards";
import Loader from "components/Loader";
import { Accordion } from "react-bootstrap";
import Faq from "components/Faq";
import Budgets from "components/Budgets/index";
import {
  TvSelect,
  MobileSortOptions,
  defaultQuery,
  endPoint,
} from "utlis/variables";
import { Container, Row, Col, Breadcrumb, Button } from "react-bootstrap";
import BrandsComponent from "components/BrandsComponent";
import menuItems from "utlis/HeaderItems";
import ImagesComponent from "components/ImagesComp";
import ComapreCard from "components/ComapreCard";
import Youtube from "components/Youtube";
// import InstaEmbed from "components/InstaEmbed";

export default function MobileBrand(props) {
  const limit = 6;
  const router = useRouter();
  const [skip, setSkip] = useState(12);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(props.data || []);
  const [activeShort, setActiveShort] = useState(null);

  const handelSortCLick = (type, i) => {
    switch (type) {
      case "Popularity":
        data.sort(
          (a, b) => Number(a?.modelPopularity) - Number(b?.modelPopularity)
        );
        setData(data);
        break;
      case "Price -- Low to High":
        data.sort(
          (a, b) =>
            Number(a.minPrice.replace(/,/g, "")) -
            Number(b.minPrice.replace(/,/g, ""))
        );
        setData(data);
        break;
      case "Price -- High to Low":
        data.sort(
          (a, b) =>
            Number(b.minPrice.replace(/,/g, "")) -
            Number(a.minPrice.replace(/,/g, ""))
        );
        setData(data);
        break;
      case "Newest First":
        data.sort(
          (a, b) =>
            Number(
              b?.launchedAt
                ?.replace(/:/g, "")
                .replace(/-/g, "")
                .replace(/ /, "")
            ) -
            Number(
              a?.launchedAt
                ?.replace(/:/g, "")
                .replace(/-/g, "")
                .replace(/ /, "")
            )
        );
        setData(data);
        break;
    }
    setActiveShort(i);
  };
  const modelImages = data
    ?.slice(0, 6)
    ?.map((x) => {
      let imagesData = x?.images
        ? [x?.angleImage, ...(x?.images || [])]
        : [x?.angleImage];
      if (imagesData?.length >= 3) {
        return { ...x, imagesData };
      }
    })
    .filter(Boolean);

  return (
    <>
      {loading && <Loader />}
      <StickyAd
        targetingArguments={{ brand: props?.brand }}
        mobileUrl={TvBrandPageMobile.sticky}
        desktopUrl={TvBrandPageDesktop.sticky}
        mobileSizes={TvBrandPageMobile.stickySizes}
        desktopSizes={TvBrandPageDesktop.stickySizes}
      />
      <Container>
        <Ad
          targetingArguments={{ brand: props?.brand }}
          mobileUrl={TvBrandPageMobile.top}
          desktopUrl={TvBrandPageDesktop.top}
          mobileSizes={TvBrandPageMobile.topSizes}
          desktopSizes={TvBrandPageDesktop.topSizes}
        />
        {props?.brandInfo?.Description ? (
          <>
            <Content
              h1={`${
                props?.brand?.length < 4
                  ? props?.brand?.toUpperCase()
                  : getEveryFirstLetterUpperCase(props.brand, "-")
              }  Televisions `}
              data={props?.brandHighlight}
              tableHeading={`Best ${getEveryFirstLetterUpperCase(
                props.brand,
                ""
              )} TV Price in India`}
              tableHighlightContent={props?.tableHighlightContent}
              tabelData={props?.tabelData}
            />
            {/* <Content
            shadow={true}
            markdown={true}
            height={70}
            tableHeading={`Best  ${
              props?.brand?.length < 4
                ? props?.brand?.toUpperCase()
                : getEveryFirstLetterUpperCase(props.brand, "-")
            }TV Price in India`}
          

            tabelData={props?.tabelData}
            data={props?.brandHighlight}
            // h1={`${props?.brand} Televisions in India`}
            h1={`${
              props?.brand?.length < 4
                ? props?.brand?.toUpperCase()
                : getEveryFirstLetterUpperCase(props.brand, "-")
            }  Televisions `}
          /> */}
          </>
        ) : (
          <h1 className="seo_heading">{`${getEveryFirstLetterUpperCase(
            props.brand,
            "-"
          )} Televisions Price In India`}</h1>
        )}
        <Row className={styles.row}>
          <Col md={9}>
            <div className={styles.left_box}>
              <div className={styles.filter_row}>
                <div className={styles.bread_crumb}>
                  <Link href="/">Home</Link>
                  {rightIcon}
                  <Link href="/">Televisions</Link>
                </div>
                <div className={styles.sort_by}>
                  By{" "}
                  {MobileSortOptions.map((button, i) => (
                    <span
                      onClick={() => handelSortCLick(button, i)}
                      className={`${i === activeShort && "active"}`}
                      key={`button-${i}`}
                    >
                      {button}
                    </span>
                  ))}
                </div>
              </div>

              <Box data={data} boxFor="mobiles" />
              {hasMore && (
                <Button
                  onClick={async () => {
                    if (loading) return;
                    setLoading(true);
                    let res = await api.generalFetchAmp(
                      TvSelect,
                      {
                        brandSlug: props?.brand,
                        ...defaultQuery,
                      },
                      endPoint.tv,
                      6,
                      { createdAt: -1 },
                      skip
                    );
                    if (res?.data?.data?.length < 6) {
                      setHasMore(false);
                    }
                    setLoading(false);
                    setData((prev) => [...prev, ...getRating(res.data.data)]);
                    setSkip((prev) => prev + 6);
                  }}
                  className="loading_button"
                >
                  Load More
                </Button>
              )}
            </div>

            <BrandsComponent
              h2={"Similar Tv Brands"}
              data={props.brands}
              type="Tv"
              counts={7}
            />

            <Budgets
              h2={"Find TV of your Choice"}
              data={menuItems.Televisions.Price_Range}
            />
            <div className="left_box margin">
              <NewsCardWithCarousel
                negativeMargin={true}
                h2={`${
                  props?.brand?.length < 4
                    ? props?.brand?.toUpperCase()
                    : getEveryFirstLetterUpperCase(props.brand, "-")
                } Televisions News In India`}
                data={props.news}
                count={3}
              />
              <Ad
                targetingArguments={{ brand: props?.brand }}
                mobileUrl={TvBrandPageMobile.medium}
                desktopUrl={TvBrandPageDesktop.medium}
                mobileSizes={TvBrandPageMobile.mediumSizes}
                desktopSizes={TvBrandPageDesktop.mediumSizes}
              />
            </div>
            <ComapreCard
              data={props.compareData}
              h2={"Popular Televisions Comparisons"}
            />
            {props?.youtubeVideos?.length > 0 && (
              <Youtube h2={`Tv Videos`} data={props?.youtubeVideos} />
            )}
            <ImagesComponent
              // h2={`${props?.brandInfo?.Name} Watches Images`}
              data={modelImages}
              vehicleType={"TV"}
            />
            <Faq
              margin={true}
              h2={`${props?.brandInfo?.Name} Televisions `}
              data={props?.faqData}
            />
            {/* <div className={`${styles.faqs} my-3`}>
              <Accordion defaultActiveKey="0">
                <h2>{`${props?.brandInfo?.Name} Watch FAQs`}</h2>
                {props?.faqData?.map((item, index) => (
                  <Accordion.Item eventKey={item}>
                    <Accordion.Header>{item?.question}</Accordion.Header>
                    <Accordion.Body>
                      <div dangerouslySetInnerHTML={{ __html: item?.answer }} />
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div> */}
          </Col>
          <Col md={3} className={styles.right_section}>
            <SideAd
              targetingArguments={{ brand: props?.brand }}
              url={TvBrandPageDesktop.topSide}
              sizes={TvBrandPageDesktop.topSideSizes}
            />
            {/* <InstaEmbed url={props?.instaLinks} /> */}
            <SideBrands data={props?.brands} />
            <SideCards
              data={props?.upcomingMobiles}
              h2={`${props?.brand} Upcoming Televisions`}
            />
            <SideCards
              data={props?.expiredMobileData}
              h2={`${props?.brand} Discontinued Televisions`}
            />
            <SideAd
              sticky={true}
              targetingArguments={{ brand: props?.brand }}
              url={TvBrandPageDesktop.medium}
              sizes={TvBrandPageDesktop.mediumSideSizes}
            />
          </Col>
        </Row>

        <Ad
          margin={true}
          targetingArguments={{ brand: props?.brand }}
          mobileUrl={TvBrandPageMobile.bottom}
          desktopUrl={TvBrandPageDesktop.bottom}
          mobileSizes={TvBrandPageMobile.bottomSizes}
          desktopSizes={TvBrandPageDesktop.bottomSizes}
        />
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/">Televisions</Breadcrumb.Item>
          <Breadcrumb.Item active>
            {getEveryFirstLetterUpperCase(props.brand)}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "ItemList",
            itemListElement: data.map((x, i) => {
              return {
                "@type": "ListItem",
                position: i + 1,
                name: x?.Name,
                url: `https://tv.comparos.in/${x.brandSlug}/${x.slug}`,
              };
            }),
          }),
        }}
      ></script>
    </>
  );
}
