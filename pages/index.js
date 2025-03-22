import Image from "next/image";
import styles from "styles/Home.module.scss";
import { Container } from "react-bootstrap";
import api from "api.service.js";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import CardWithCarousel from "components/CardWithCarousel";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { StickyAd, SideAd, Ad } from "components/Ads";
import {
  TvIndexPageDesktop,
  TvIndexPageMobile,
} from "components/Ads/adsVariable";
import ComapreCard from "components/ComapreCard";
import Reviews from "components/Reviews";
import { useRouter } from "next/router";
import remarkGfm from "remark-gfm";
import { tvComapreData } from "utlis/data";
import { endPoint } from "utlis/variables";
import { replaceImageUrl } from "utlis/constant";
import NewsCardWithCarousel from "components/NewsCardWithCarousel";
import TopComponent from "components/TopComponent";
import BrandsComponent from "components/BrandsComponent";
import AmazonBanner from "components/AmazonBanner";

export async function getStaticProps() {
  let [data, latestModels, news, reviews] = await Promise.all([
    api.getFetchCommonDataForAmpForTv(),
    api.generalFetchAmp(
      "Name slug minPrice brandSlug brandName brand",
      {
        status: { $eq: "launched" },
      },
      endPoint.tv,
      6,
      { createdAt: -1 }
    ),
    api.generalFetchAmpWithoutRedis(
      "smallDesc locale metaDescription slug title image createdAt",
      { newsFor: { $regex: "television", $options: "i" } },
      "newsarticle",
      6,
      { createdAt: -1 }
    ),
    api.generalFetchAmpWithoutRedis(
      "smallDesc locale metaDescription slug title image createdAt",
      { newsFor: { $regex: "television", $options: "i" } },
      "expert-review",
      6,
      { createdAt: -1 }
    ),
  ]);

  let footerDeatils;
  //  await api.generalFetchAmp(
  //   "",
  //   {
  //     pageLink: "https://www.comparos.in/mobiles",
  //   },
  //   "footer-content",
  //   1
  // );

  return {
    props: {
      isServer: false,
      data: data.data,
      news: news.data.data || [],
      reviews: reviews.data.data || [],
      latestData: latestModels.data.data,
      footerDeatils: footerDeatils?.data?.data || [],
      seo: {
        title:
          "Popular Televisions In India | Buy Tv online at best price in India",
        url: "https://tv.comparos.in",
        canonical: "https://tv.comparos.in",
        description:
          "TV - Buy Popular Television online at low prices in India. Choose from the wide range of LED TVs, Smart TVs, and Android TVs at comparos.in.",
      },
    },
    revalidate: 10,
  };
}

export default function Home({ data, latestData, footerDeatils, ...props }) {
  const router = useRouter();
  const [min, setMin] = useState(10000);
  const [max, setMax] = useState(20000);

  // const onSliderChange = (value) => {
  //   setValue(value);
  // };

  const findMobile = () => {
    router.push(`/search?budget=${min}-${max}`);
    // .then(() => window.scrollTo(0, 0));
  };
  // const priceAround = [
  //   {
  //     label: "10,000",
  //     value: "10000",
  //   },
  //   {
  //     label: "15,000",
  //     value: "15000",
  //   },
  //   {
  //     label: "20,000",
  //     value: "20000",
  //   },
  //   {
  //     label: "25,000",
  //     value: "25000",
  //   },
  //   {
  //     label: "30,000",
  //     value: "30000",
  //   },
  //   {
  //     label: "40,000",
  //     value: "40000",
  //   },
  // ];
  const priceAround = [
    {
      key: "10,000",
      value: "best-tv-under-10000-in-india",
    },
    {
      key: "15,000",
      value: "best-tv-under-15000-in-india",
    },
    {
      key: "20,000",
      value: "best-tv-under-20000-in-india",
    },
    {
      key: "25,000",
      value: "best-tv-under-25000-in-india",
    },
    {
      key: "30,000",
      value: "best-tv-under-30000-in-india",
    },
    {
      key: "40,000",
      value: "best-tv-under-40000-in-india",
    },
  ];

  const LinksArray = {
    brands: [
      { key: "Sony TV", value: "sony" },
      { key: "Oneplus TV", value: "oneplus" },
      { key: "VU TV", value: "vu" },
      { key: "LG TV", value: "lg" },
      { key: "Samsung TV", value: "samsung" },
      // { key: "Xiaomi", value: "xiaomi" },
      // { key: "Croma", value: "croma" },
      // { key: "AKai", value: "akai" },
      // { key: "TCL", value: "tcl" },
      { key: "All Brands", value: "brands", strong: true },
    ],
    features: [
      // { key: "21 Inch", value: "search?inch=21" },
      { key: "22 Inch", value: "search?inch=22" },
      { key: "24 Inch", value: "search?inch=24" },
      { key: "32 Inch", value: "search?inch=32" },
      { key: "40 Inch", value: "search?inch=40" },
      { key: "42 Inch", value: "search?inch=42" },
      { key: "43 Inch", value: "search?inch=43" },
      // { key: "50 Inch", value: "search?inch=50" },
    ],
    best: [
      {
        key: "Under 10,000",
        value: "best-tv-under-10000-in-india",
      },
      {
        key: "Under 20,000",
        value: "best-tv-under-20000-in-india",
      },
      {
        key: "Under 30,000",
        value: "best-tv-under-30000-in-india",
      },
      {
        key: "Under 40,000",
        value: "best-tv-under-40000-in-india",
      },
      {
        key: "Under 50,000",
        value: "best-tv-under-50000-in-india",
      },
    ],
  };
  const rangePriceForMobile = [
    {
      key: "Under 10,000",
      value: "best-tv-under-10000-in-india",
    },
    {
      key: "Under 20,000",
      value: "best-tv-under-20000-in-india",
    },
    {
      key: "Under 30,000",
      value: "best-tv-under-30000-in-india",
    },
    {
      key: "Under 40,000",
      value: "best-tv-under-40000-in-india",
    },
    {
      key: "Under 50,000",
      value: "best-tv-under-50000-in-india",
    },
  ];

  return (
    <>
      <StickyAd
        targetingArguments={"home"}
        mobileUrl={TvIndexPageMobile.sticky}
        desktopUrl={TvIndexPageDesktop.sticky}
        mobileSizes={TvIndexPageMobile.stickySizes}
        desktopSizes={TvIndexPageDesktop.stickySizes}
      />
      <Container className={styles.container}>
        <Ad
          margin={false}
          targetingArguments={"home"}
          mobileUrl={TvIndexPageMobile.top}
          desktopUrl={TvIndexPageDesktop.top}
          mobileSizes={TvIndexPageMobile.topSizes}
          desktopSizes={TvIndexPageDesktop.topSizes}
        />
        {/* <div className={styles.find_section}>
          <div className={styles.heading}>
            <h1>Find The Best Television For You</h1>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.left_section}>
              <div className={styles.price_text}>By Price</div>
              
              <div className={styles.input_section}>
                <div className={styles.box}>
                  <label htmlFor="min" className={styles.WebRupee_new}>
                    &#x20B9;
                  </label>
                  <input
                    id="min"
                    type="text"
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>
                <div className={styles.to_text}>to</div>
                <div className={styles.box}>
                  <label htmlFor="max" className={styles.WebRupee_new}>
                    &#x20B9;
                  </label>
                  <input
                    id="max"
                    type="text"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.find_button} onClick={findMobile}>
                Find Televisions
                <span> &gt; </span>
              </div>
              <div className={styles.price_around}>Price Around</div>
              <ul className={styles.prc_range}>
                {priceAround.map((price, i) => (
                  <li key={`price-${price?.value}`}>
                    <Link
                      prefetch={false}
                      href={`/best-tv-under-${price?.value}-in-india`}
                    >
                      &#x20B9; {price?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.right_section}>
              <div className={styles.box}>
                <ul>
                  <li>
                    <div className={styles.heading}>Televisions Brands</div>
                  </li>
                  <div className={styles.double_section}>
                    {LinksArray?.brands.map((link, i) => (
                      <li key={`link-${link?.value}`}>
                        <Link
                          prefetch={false}
                          href={`/${link.value}`}
                          title={link.key}
                        >
                          {link.key}
                        </Link>
                      </li>
                    ))}
                  </div>
                </ul>
                <ul>
                  <li>
                    <div className={styles.heading}>
                      Televisions By Screen Sizes
                    </div>
                  </li>
                  <div className={styles.double_section}>
                    {LinksArray?.features.map((link, i) => (
                      <li key={`feat-${link?.value}`}>
                        <Link
                          prefetch={false}
                          href={`/${link.value}`}
                          title={link.key}
                        >
                          {link.key}
                        </Link>
                      </li>
                    ))}
                  </div>
                </ul>
                <ul>
                  <li>
                    <div className={styles.heading}>
                      Best Televisions By Budget
                    </div>
                  </li>

                  {LinksArray?.best.map((link, i) => (
                    <li key={`best-${link?.value}`}>
                      <Link
                        prefetch={false}
                        href={`/${link.value}`}
                        title={link.key}
                      >
                        {link.key}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div> */}
        <TopComponent
          LinksArray={LinksArray}
          priceAround={priceAround}
          h1={"Find The Best Television For You"}
          // mostViewed={mostViewed}
          data={data}
          viewAllLink={"/search"}
          viewAllText={"View All TVs"}
          type={"tv"}
          rangePriceForMobile={rangePriceForMobile}
        />
        <AmazonBanner
          link={"https://amzn.to/3AcEfHT"}
          img={"electronic-devices-banner"}
        />

        <div className={styles.tabs_section}>
          {/* <h2>Popular Televisions Brands in India</h2>
          <div className={styles.brand_section}>
            {data.getmobileBrand.splice(0, 8).map((brand) => (
              <Link href={`/${brand?.slug}`} prefetch={false} key={brand?.Name}>
                <div className={styles.brand_card} key={brand?.Name}>
                  <div className={styles.image_box}>
                    <Image
                      src={replaceImageUrl(brand?.Image?.url)}
                      quality={100}
                      alt={`${brand?.Name}-televisions`}
                      fill={true}
                      sizes="(max-width: 768px) 100%"
                      placeholder="blur"
                      blurDataURL="https://via.placeholder.com/180x120"
                    />
                  </div>
                  <div className={styles.title}>{brand?.Name}</div>
                </div>
              </Link>
            ))}
          </div> */}
          <BrandsComponent
            h2={"Popular Televisions Brands in India"}
            data={data.getmobileBrand}
            type={"tv"}
            counts={7}
          />
        </div>

        <CardWithCarousel
          h2={"POPULAR TELEVISIONS IN INDIA"}
          data={data?.popularMobileFridge}
          viewAllText={"View All"}
          viewAllLink={"/popular"}
        />
        {/* <StoriesCard data={data.getNews} h2={"Stories that matter"} /> */}
        <Reviews data={props.reviews} h2={"Latest Reviews"} />
        <Row>
          <Col xs={12} sm={12} md={9}>
            <CardWithCarousel
              h2={"LATEST TELEVISIONS IN INDIA"}
              count={4}
              data={latestData}
              viewAllText={"View All"}
              viewAllLink={"/latest"}
            />
          </Col>
          <Col xs={12} sm={12} md={3}>
            <SideAd
              targetingArguments={"home"}
              marginTop={true}
              url={TvIndexPageDesktop.topSide}
              sizes={TvIndexPageDesktop.topSideSizes}
            />
          </Col>
        </Row>
        <CardWithCarousel
          h2={"Upcoming Televisions IN INDIA"}
          data={data?.upcomingFridgeModel}
          viewAllText={"View All"}
          viewAllLink={"/upcoming"}
        />

        <ComapreCard
          h2={"Popular Televisions Comparison"}
          data={tvComapreData}
          viewAllText={"View All"}
          viewAllLink={"/compare"}
        />
        <Ad
          margin={false}
          targetingArguments={"home"}
          mobileUrl={TvIndexPageMobile.medium}
          desktopUrl={TvIndexPageDesktop.medium}
          mobileSizes={TvIndexPageMobile.mediumSizes}
          desktopSizes={TvIndexPageDesktop.mediumSizes}
        />
        <div className={styles.tabs_section}>
          <h2>Search Televisions by Price</h2>
          <Tabs
            defaultActiveKey="1"
            mountOnEnter={true}
            unmountOnExit={true}
            className={styles.tabs}
          >
            <Tab eventKey="1" title="5-10 Thousands">
              <CardWithCarousel
                data={data.priceRange5to10}
                viewAllText={"View All"}
                viewAllLink={"/search?budget=5000-10000"}
              />
            </Tab>
            <Tab eventKey="2" title="10-15 Thousands">
              <CardWithCarousel
                data={data.priceRange10to15}
                viewAllText={"View All"}
                viewAllLink={"/search?budget=10000-15000"}
              />
            </Tab>

            <Tab eventKey="3" title="15-20 Thousands">
              <CardWithCarousel
                data={data.priceRange15to20}
                viewAllText={"View All"}
                viewAllLink={"/search?budget=15000-20000"}
              />
            </Tab>
            <Tab eventKey="4" title="Above 20 Thousands">
              <CardWithCarousel
                data={data.priceRange20above}
                // viewAllText={"View All"}
                // viewAllLink={"/best-tv-above-20000-in-india"}
              />
            </Tab>
          </Tabs>
        </div>

        {/* <Ad
          mobileUrl={TvIndexPageMobile.bottom}
          desktopUrl={TvIndexPageDesktop.bottom}
          mobileSizes={TvIndexPageMobile.bottomSizes}
          desktopSizes={TvIndexPageDesktop.bottomSizes}
        /> */}
        {footerDeatils?.length > 0 && (
          <div className={styles.footer_content}>
            <ReactMarkdown
              children={footerDeatils[0]?.description}
              remarkPlugins={[remarkGfm]}
            />
          </div>
        )}
        <NewsCardWithCarousel
          data={props.news}
          h2={"Latest Televisions News and articles"}
        />
        <Ad
          margin={false}
          targetingArguments={"home"}
          mobileUrl={TvIndexPageMobile.bottom}
          desktopUrl={TvIndexPageDesktop.bottom}
          mobileSizes={TvIndexPageMobile.bottomSizes}
          desktopSizes={TvIndexPageDesktop.bottomSizes}
        />
        <div className={styles.footer_content}>
          <p>
            At Comparos, our goal is to provide you with an exceptional shopping
            experience when it comes to purchasing a television. Our team of
            passionate experts stay up-to-date with the latest releases and
            trends in the market, ensuring that we offer a wide range of
            televisions that cater to different budgets and preferences.
          </p>

          <p>
            We understand that selecting the perfect television can be
            overwhelming, which is why we provide detailed product descriptions,
            in-depth reviews, and comparisons between different models to help
            you make an informed buying decision. Our unbiased team of experts
            writes our product descriptions and reviews, providing you with all
            the necessary information.
          </p>

          <p>
            Our website is designed to be user-friendly and easy to navigate,
            making it simple to find the right television for you. We are
            committed to providing exceptional customer service and ensuring
            that you find exactly what you are looking for.
          </p>

          <p>
            Choose Comparos for all your television needs, and we are confident
            that you will be satisfied with your purchase. Thank you for
            choosing Comparos!
          </p>
        </div>
      </Container>
    </>
  );
}
