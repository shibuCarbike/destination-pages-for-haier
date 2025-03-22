import React, { useState } from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import MultiRangeSlider from "components/MultiRangeSlider";
import { getEveryFirstLetterUpperCase, replaceImageUrl } from "utlis/constant";
import { useRouter } from "next/router";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import Image from "next/image";
function TopComponent(props) {
  const {
    // onClickFind,
    priceAround,
    LinksArray,
    h1,
    mostViewed,
    data,
    viewAllLink,
    viewAllText,
    type,
    rangePriceForMobile,
  } = props;
  let priceMinValue = 10000,
    priceMaxValue = 50000;
  const router = useRouter();
  const [min, setMin] = useState(priceMinValue);
  const [max, setMax] = useState(priceMaxValue);

  const onClickFind = () => {
    router.push(`/search?budget=${min}-${max}`);
  };

  return (
    <Row className={styles.TopMainComponent}>
      <Col md={9} className={styles.container}>
        <div className={styles.heading}>
          <h1>{h1}</h1>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.left_section}>
            <div className={styles.price_text}>By Price</div>
            <MultiRangeSlider
              minVal={min}
              maxVal={max}
              min={priceMinValue}
              max={priceMaxValue}
              setMinVal={setMin}
              setMaxVal={setMax}
              onChange={({ min, max }) =>
                console.log(`min = ${min}, max = ${max}`)
              }
            />
            <div className={styles.input_section}>
              <div className={styles.box}>
                <label htmlFor="min" className={styles.WebRupee_new}>
                  &#x20B9;
                </label>
                <input
                  id="min"
                  type="text"
                  value={min.toLocaleString("en-US")}
                  disabled={true}
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
                  value={max.toLocaleString("en-US")}
                  disabled={true}
                  onChange={(e) => setMax(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.find_button} onClick={onClickFind}>
              Find Televisions
            </div>
            <div className={styles.price_around}>Price Around</div>
            <ul className={styles.prc_range}>
              {priceAround.map((price, i) => (
                <li key={`${price?.value}`}>
                  <Link prefetch={false} href={`/${price?.value}`}>
                    &#x20B9; {price?.key}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.right_section}>
            <div className={styles.box}>
              <ul>
                <li>
                  <div className={styles.heading}>By Brands</div>
                </li>
                <div className={styles.double_section}>
                  {LinksArray?.brands.map((link, i) => (
                    <li key={`link-${link?.value}`}>
                      <Link
                        prefetch={false}
                        href={`/${link.value}`}
                        title={link.key}
                      >
                        {`${link.key}`}
                      </Link>
                    </li>
                  ))}
                </div>
              </ul>
              <ul>
                <li>
                  <div className={styles.heading}>By Screen Sizes</div>
                </li>
                <div className={styles.double_section}>
                  {LinksArray?.features.map((link, i) => (
                    <li key={`feat-${link?.value}`}>
                      <Link
                        prefetch={false}
                        href={`/${link.value}`}
                        title={link.key}
                      >
                        {`${link.key}`}
                      </Link>
                    </li>
                  ))}
                </div>
              </ul>
              <ul>
                <li>
                  <div className={styles.heading}>By Budget</div>
                </li>

                {LinksArray?.best?.map((link, i) => (
                  <li key={`${link?.value}`}>
                    <Link
                      prefetch={false}
                      href={`/${link.value}`}
                      title={link.key}
                    >
                      {`${link.key}`}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.find_section_mobile}>
          <div className={styles.tabs_section}>
            <Tabs
              defaultActiveKey="1"
              className={styles.tabs}
              mountOnEnter={true}
              unmountOnExit={true}
            >
              <Tab eventKey="1" title="BY BRANDS">
                <div className={styles.filterBoxDiv}>
                  {LinksArray?.brands?.map((data) => (
                    <div
                      className={styles.filterDiv}
                      onClick={() => {
                        router.push(`/${data?.value}`);
                      }}
                    >
                      <p className={styles.filterText}>{data?.key}</p>
                    </div>
                  ))}
                </div>
              </Tab>
              <Tab eventKey="2" title="BY SCREEN SIZES">
                <div className={styles.filterBoxDiv}>
                  {LinksArray?.features?.map((data) => (
                    <div
                      className={styles.filterDiv}
                      onClick={() => {
                        router.push(`/${data?.value}`);
                      }}
                    >
                      <p className={styles.filterText}>{data?.key}</p>
                    </div>
                  ))}
                </div>
              </Tab>
              <Tab eventKey="3" title="BY BUDGET">
                <div className={styles.filterBoxDiv}>
                  {LinksArray?.best?.map((data) => (
                    <div
                      className={styles.filterDiv}
                      onClick={() => {
                        router.push(`/${data?.value}`);
                      }}
                    >
                      <p className={styles.filterText}>{data?.key}</p>
                    </div>
                  ))}
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </Col>
      <Col md={3} className={styles.featuredAcDiv}>
        <p>Featured Televisions</p>
        {data?.popularMobileFridge &&
          data?.popularMobileFridge?.slice(0, 2)?.map((data, i) => {
            return (
              <Link
                key={`card-${i}${data.Name}`}
                href={`/${data?.brandSlug}/${data?.slug}`}
                prefetch={false}
                passHref
                legacyBehavior
              >
                <a>
                  <div className={styles.productDiv}>
                    <Image
                      src={data?.angleImage}
                      width={100}
                      height={100}
                      priority={true}
                      alt={data?.Name}
                      title={`${data.brandName} ${data?.Name}`}
                    />
                    <p className={styles.productName}>
                      {data?.Name?.slice(0, 25) + "..."}
                    </p>
                    <p className={styles.productPrice}> ₹ {data?.minPrice}</p>
                  </div>
                </a>
              </Link>
            );
          })}
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
      </Col>
    </Row>
  );
}

export default TopComponent;
