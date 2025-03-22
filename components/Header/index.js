import { Container, NavDropdown, Row, Col } from "react-bootstrap";
import styles from "./index.module.scss";
import Image from "next/image";
import AsyncSelect from "react-select/async";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Offcanvas from "react-bootstrap/Offcanvas";
import Accordion from "react-bootstrap/Accordion";
import Nav from "react-bootstrap/Nav";
import api from "api.service.js";
import { getEveryFirstLetterUpperCase } from "utlis/constant";
import menuItems from 'utlis/HeaderItems'
const baseUrl = "https://comparos.in";
const Header = ({ isSponser, ...props }) => {
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);



  const commonMenuIetms = [
    { label: "Mobiles", path: "https://www.comparos.in/mobiles" },
    { label: "Refrigerators", path: "https://www.comparos.in/refrigerators" },
    {
      label: "Air Conditioners",
      path: "https://www.comparos.in/air-conditioners",
    },
    // { label: "Televisions", path: "https://tv.comparos.in/" },
    { label: "Watches", path: "https://www.comparos.in/watches" },
    { label: "Printers", path: "https://www.comparos.in/printers" },
    { label: "Laptops", path: "https://www.comparos.in/laptops" },
    {
      label: "Washing Machine",
      path: "https://www.comparos.in/washing-machine",
    },
  ];

  const comapreData = [
    {
      label: "Haier 598L 3-Door Convertible Side-by-Side Refrigerator with WiFi-Enabled Smart Sense AI (HRT-683ISU1) vs LG GL-B257EPZ3 650 L 3 Star Inverter Frost Free Side By Side Door Refrigerator",
      path: "/refrigerator/haier-598l-3-door-convertible-side-by-side-refrigerator-with-wifi-enabled-smart-sense-ai-hrt-683isu1-vs-lg-gl-b257epz3-650-l-3-star-inverter-frost-free-side-by-side-door-refrigerator",
    },
    {
      label: "Haier 598L 3-Door Convertible Side-by-Side Refrigerator with WiFi-Enabled Smart Sense AI (HRT-683ISU1) vs Samsung RS76CG8113SL 653L Side by Side Refrigerator",
      path: "/refrigerator/haier-598l-3-door-convertible-side-by-side-refrigerator-with-wifi-enabled-smart-sense-ai-hrt-683isu1-vs-samsung-rs76cg8113sl-653l-side-by-side-refrigerator",
    },
   
  ];

  const loadOptions = async (inputValue, callback) => {
    if (inputValue.length > 1) {
      var res = await api.globalSearchComparos(inputValue);
      var result = res.data.map((x) => {
        return {
          label: x.name.charAt(0).toUpperCase() + x.name.slice(1),
          value: x.slug,
          type: x.type,
          brandSlug: x.brandSlug,
        };
      });

      let pages = [];
      res.data.forEach((element) => {
        if (
          inputValue.toLowerCase() == element.brandSlug &&
          pages.filter((x) => x.brandSlug == element.brandSlug)?.length == 0
        ) {
          pages.push({
            label: `All ${getEveryFirstLetterUpperCase(
              element.brandSlug + " " + element.type
            )}`,
            brandSlug: element.brandSlug,
          });
        }
      });

      result = [...pages, ...result];

      callback(result);
    } else {
      setTimeout(() => {
        callback([
          {
            brandName: "Haier Televisions",
            brandSlug: "haier",
            value: "haier-le55b9500u-55-inch-led-4k-tv",
            type: "/",
            label: "Haier Televisions 55 inch LED 4K TV",
          },
          {
            type: "televisions",
            label: "Sony Bravia",
            value: "sony-bravia-kd-43x7500h-43-inch-led-4k-tv",
            brandSlug: "sony",
          },
          {
            brandName: "LG Televisions",
            brandSlug: "lg",
            value: "lg-50um7290ptd-50-inch-led-4k-tv",
            type: "televisions",
            label: "LG Televisions 50 inch LED 4K TV",
          },

          {
            brandName: "Samsung Televisions",
            brandSlug: "samsung",
            value: "samsung-ua65tue60ak-65-inch-led-4k-tv",
            type: "televisions",
            label: "Samsung Televisions 65 inch LED 4K TV",
          },
          {
            brandName: "Samsung Televisions",
            brandSlug: "samsung",
            value: "samsung-ua50tue60ak-50-inch-led-4k-tv",
            type: "televisions",
            label: "Samsung Televisions 50 inch LED 4K TV",
          },
        ]);
      }, 500);
    }
  };

  return (
    <>
      <div className={styles.container} id="header">
        <Container>
          <Row className={styles.upper_nav}>
            <Col md={isSponser ? 2 : 4}>
              <Link
                href={"/"}
                prefetch={false}
                className={`${styles.logo} ${
                  isSponser ? styles.isSponser : ""
                }`}
              >
                <img src="/assets/header/logo1.png" alt="site logo" />
              </Link>
            </Col>
            {isSponser && (
              <Col md={4}>
                {isSponser && (
                  <>
                    <div className={styles.Comp_nav}>
                      <NavDropdown title="More Comparisions">
                        {comapreData?.map((menuItem, i) => (
                          <Link
                            href={menuItem.path}
                            key={`common-after-${i}`}
                            passHref
                            legacyBehavior
                            prefetch={false}
                          >
                            <a target="_blank">{menuItem.label}</a>
                          </Link>
                        ))}
                      </NavDropdown>
                    </div>
                  </>
                )}
              </Col>
            )}

            <Col md={4} className={styles.search}>
              {!isSponser && (
                <>
                  <label htmlFor="react-select-searchBar-input">Hi</label>
                  <AsyncSelect
                    onChange={(e) => {
                      if (e.value) {
                        router.push(`/${e.brandSlug}/${e.value}`);
                      } else {
                        router.push(`/${e.brandSlug}`);
                      }
                    }}
                    id="searchBar"
                    instanceId="searchBar"
                    placeholder="Search for exp. Haier or, LG"
                    cacheOptions
                    loadOptions={loadOptions}
                    defaultOptions
                  />
                </>
              )}
            </Col>

            <Col md={4} className={styles.icons}>
              {!isSponser && (
                <>
                  {commonMenuIetms.map((menuItem, i) => {
                    return (
                      i < 3 && (
                        <React.Fragment key={`common-first-${menuItem.label}`}>
                          <Link
                            href={menuItem.path}
                            key={`com-${i}`}
                            passHref
                            legacyBehavior
                            prefetch={false}
                          >
                            <a target="_blank">{menuItem.label}</a>
                          </Link>
                          |
                        </React.Fragment>
                      )
                    );
                  })}
                  <NavDropdown title="More">
                    {commonMenuIetms.slice(3).map((menuItem, i) => (
                      <Link
                        href={menuItem.path}
                        key={`common-after-${i}`}
                        passHref
                        legacyBehavior
                        prefetch={false}
                      >
                        <a target="_blank">{menuItem.label}</a>
                      </Link>
                    ))}
                  </NavDropdown>
                </>
              )}
            </Col>
          </Row>
        </Container>
        {!isSponser && (
          <div className={styles.lower_nav}>
            <Container>
              <div className={styles.lower_nav_content}>
                {Object.keys(menuItems).map((menuItem, menuIndex) => (
                  <NavDropdown
                    title={menuItem.replace(/_/g, " ")}
                    key={`desk-${menuItem}`}
                  >
                    <div className={styles.wrraper}>
                      {Object.keys(menuItems[menuItem]).map((item, i) => (
                        <div key={`desk-${item}`}>
                          {item != "routeTo" && item != "_" && item != "__" && (
                            <div className={styles.heading}>
                              {item.replace(/_/g, " ")}
                            </div>
                          )}
                          <ul>
                            {Array.isArray(menuItems[menuItem][item]) &&
                              menuItems[menuItem][item]?.map((element) => (
                                <li key={`desk-${element.label}`}>
                                  <Link
                                    legacyBehavior
                                    prefetch={false}
                                    href={`/${element.path}`}
                                  >
                                    {element.label}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </NavDropdown>
                ))}
              </div>
            </Container>
          </div>
        )}
      </div>
      <div
        className={`${styles.mobile_menu}  ${
          isSponser ? styles.isSponser : ""
        }`}
        id="mobile_header"
      >
        <Row>
          {!isSponser ? (
            <>
              <Col xs={3}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  className="bi bi-list menuIcon"
                  viewBox="0 0 16 16"
                  onClick={() => setShowMobileMenu(true)}
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </Col>
              <Col xs={6}>
                <Link href={"/"} prefetch={false} className={styles.image_box}>
                  <img src="/assets/header/logo1.png" alt="site logo" />
                </Link>
              </Col>
              <Col xs={3}></Col>
              <Col xs={12}>
                <label htmlFor="react-select-mobile_searchBar-input">Hi</label>
                <AsyncSelect
                  // className="searchBar"
                  onChange={(e) => {
                    if (e.value) {
                      router.push(`/${e.brandSlug}/${e.value}`);
                    } else {
                      router.push(`/${e.brandSlug}`);
                    }
                  }}
                  id="mobile_searchBar"
                  instanceId="mobile_searchBar"
                  placeholder="Search for exp. Haier or, LG"
                  cacheOptions
                  loadOptions={loadOptions}
                  defaultOptions
                />
              </Col>
            </>
          ) : (
            <>
              <Col xs={7} style={{ padding: 0 }}>
                <Link href={"/"} prefetch={false} className={styles.image_box}>
                  <img src="/assets/header/logo1.png" alt="site logo" />
                </Link>
              </Col>
              {isSponser && (
                <Col xs={5}>
                  {isSponser && (
                    <>
                      <div className={styles.Comp_nav}>
                        <NavDropdown title="More Comparisions">
                          {comapreData?.map((menuItem, i) => (
                            <Link
                              href={menuItem.path}
                              key={`common-after-${i}`}
                              passHref
                              legacyBehavior
                              prefetch={false}
                            >
                              <a target="_blank">{menuItem.label}</a>
                            </Link>
                          ))}
                        </NavDropdown>
                      </div>
                    </>
                  )}
                </Col>
              )}
            </>
          )}
        </Row>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>*/}
      </div>

      <Offcanvas
        placement="start"
        show={showMobileMenu}
        // visible={true}
        onHide={() => setShowMobileMenu(false)}
        style={{ width: "80%" }}
        className={styles.mobile_off_canvas}
      >
        <Offcanvas.Body style={{ padding: "0px" }}>
          <div className={styles.top_pages}>
            {commonMenuIetms.map((menuItem, i) => (
              <Link href={menuItem.path} key={`mobile-${menuItem}`}>
                {menuItem.label}
              </Link>
            ))}
          </div>
          <Accordion defaultActiveKey="99" flush>
            <Link href="/" passHref prefetch={false} legacyBehavior>
              <a>
                <div className={styles.homeLink}>
                  <img src="/assets/icons/home.png" alt="home" />
                  Home
                </div>
              </a>
            </Link>
            {Object.keys(menuItems).map((menuItem, menuIndex) => {
              return (
                <React.Fragment key={`mob-${menuItem}`}>
                  <Accordion.Item eventKey={menuIndex}>
                    <Accordion.Header>
                      {menuItem.replace(/_/g, " ")}
                    </Accordion.Header>
                    <Accordion.Body>
                      {Object.keys(menuItems[menuItem]).map((item, i) => {
                        if (item != "routeTo" && item != "_" && item != "__") {
                          return (
                            <Accordion
                              defaultActiveKey="99"
                              flush
                              key={`mob-${item}`}
                            >
                              <Accordion.Item eventKey={menuIndex}>
                                <Accordion.Header>
                                  {item.replace(/_/g, " ")}
                                </Accordion.Header>
                                <Accordion.Body>
                                  <ul>
                                    {menuItems[menuItem][item].map(
                                      (element) => (
                                        <li key={`mob-${element.label}`}>
                                          <Link
                                            legacyBehavior
                                            prefetch={false}
                                            href={`/${element.path}`}
                                          >
                                            {element.label}
                                          </Link>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          );
                        } else {
                          return (
                            <ul key={`mob-${item}`}>
                              {Array.isArray(menuItems[menuItem][item]) &&
                                menuItems[menuItem][item].map((element) => (
                                  <li key={`mob-${element.label}`}>
                                    <Link
                                      legacyBehavior
                                      prefetch={false}
                                      href={`/${element.path}`}
                                    >
                                      {element.label}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          );
                        }
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                </React.Fragment>
              );
            })}
            <div
              style={{
                marginLeft: "20px",
                marginTop: 5,
              }}
              onClick={() => router.push("/coupon")}
            >
              Coupon
              <span
                style={{
                  background: "var(--primary-color)",
                  color: "var(--white)",
                  padding: "5px 10px",
                  marginLeft: 5,
                  borderRadius: 4,
                }}
              >
                New
              </span>
            </div>
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;
