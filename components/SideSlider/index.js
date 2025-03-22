import React, { useState } from "react";
import { Accordion, Form, Button } from "react-bootstrap";
import Slider from "rc-slider";
import { downIcon, filterIcon, searchIcon, upIcon } from "utlis/icons";
import { Offcanvas } from "react-bootstrap";
import "rc-slider/assets/index.css";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import { CONFIG_FILES } from "next/dist/shared/lib/constants";

function SideSlider(props) {
  const router = useRouter()?.query;
  const {
    handleFilterClick,
    filterValue,
    filterItem,
    resetfiltersArray,
    storedFilters,
  } = props;

  const queryBudget =
    router?.budget && router?.budget?.split(" ")?.length > 1
      ? router?.budget?.split(" ")?.map((item) => Number(item))
      : [10000, props?.under || 5000000];
  const [priceRange, setPriceRange] = useState(queryBudget);
  const [showFilter, setShowFilter] = useState(false);

  const onSliderChange = (value) => {
    setPriceRange(value);
  };
  const handleApplyPrice = () => {
    handleFilterClick("budget", priceRange);
  };
  const handleSliderChange = (value) => {
    setPriceRange(value);
  };

  // const isChecked =
  //   filterValue && item && item.key
  //     ? filterValue[item.key] === item.slug
  //     : false;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.filter_box}>
          <div className={styles.filter_section}>
            <div className={styles.heading}>
              <Image
                src={"/images/filter.png"}
                width={20}
                height={20}
                alt="filter-icon"
              />
              <h2 className={styles.h2}>Filter</h2>
            </div>
            <div className={styles.reset_filters}>
              <span onClick={() => handleFilterClick("clearAll")}>
                clear all
              </span>
            </div>
          </div>

          {/* <Accordion > */}

          <div className={styles.topFilters}>
            <h2>PRICE</h2>
            <div className={styles.priceSlider}>
              <Slider
                className={styles.slider}
                range
                allowCross={false}
                min={10000}
                max={5000000}
                defaultValue={priceRange}
                step={1000}
                onChange={onSliderChange}
                count={1}
              />
              <div className={styles.priceValue}>
                <span>₹{priceRange[0]?.toLocaleString("en-US")}</span>
                <span>{`₹${priceRange[1]?.toLocaleString("en-US")}${
                  priceRange[1] == 5000000 ? "+" : ""
                }`}</span>
              </div>
              <div className={styles.button}>
                <Button onClick={handleApplyPrice}>Go</Button>
              </div>
            </div>
          </div>
          <></>
          <Accordion flush defaultActiveKey={[0]} alwaysOpen>
            {filterItem?.map((data, idx1) => {
              return (
                <Accordion.Item eventKey={idx1} key={`filterItem${idx1}`}>
                  <Accordion.Header>{data?.title}</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      {data?.options?.map((item, i) => (
                        <li key={`${item?.key}-${i}`}>
                          <input
                            value={item?.slug}
                            onChange={(e) => {
                              handleFilterClick(data.key, e.target.value);
                            }}
                            type="checkbox"
                            className={styles.check_box}
                            id={item.Name}
                            // checked={filterValue[item?.key] == item.slug}
                            checked={storedFilters?.inch?.includes(item.slug)}
                          />
                          <label htmlFor={item?.Name}>{item?.Name}</label>
                        </li>
                      ))}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>

          {/* </Accordion> */}
        </div>
      </div>
      <div className={styles.mobileWrapper}>
        <div className={styles.sticky_buttons}>
          <Button variant="primary" onClick={() => setShowFilter(true)}>
            {filterIcon}Filters
          </Button>
        </div>

        {/* filter offcanvas */}
        <Offcanvas
          className={styles.offcanvas_filter}
          placement={"bottom"}
          show={showFilter}
          onHide={() => setShowFilter(false)}
        >
          <Offcanvas.Header
            closeButton
            style={{ padding: "1rem 2rem", fontWeight: "bold" }}
          >
            <Offcanvas.Title></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className={styles.mobile_filter}>
              <div className={styles.filter_box}>
                <div className={styles.filter_section}>
                  <div className={styles.heading}>
                    <Image
                      src={"/images/filter.png"}
                      width={20}
                      height={20}
                      alt="filter-icon"
                    />
                    <h2 className={styles.h2}>Filter</h2>
                  </div>
                  <div className={styles.reset_filters}>
                    <span onClick={() => handleFilterClick("clearAll")}>
                      clear all
                    </span>
                  </div>
                </div>
                {/* <Accordion > */}
                <div className={styles.topFilters}>
                  <h2>PRICE</h2>
                  <div className={styles.priceSlider}>
                    <Slider
                      className={styles.slider}
                      range
                      allowCross={false}
                      min={10000}
                      max={5000000}
                      defaultValue={priceRange}
                      step={1000}
                      onChange={onSliderChange}
                      count={1}
                    />
                    <div className={styles.priceValue}>
                      <span>₹{priceRange[0]?.toLocaleString("en-US")}</span>
                      <span>{`₹${priceRange[1]?.toLocaleString("en-US")}${
                        priceRange[1] == 5000000 ? "+" : ""
                      }`}</span>
                    </div>
                    <div className={styles.button}>
                      <Button onClick={handleApplyPrice}>Go</Button>
                    </div>
                  </div>
                </div>
                <Accordion flush defaultActiveKey={[0]} alwaysOpen>
                  {filterItem?.map((data, idx1) => {
                    return (
                      <Accordion.Item eventKey={idx1} key={`filterItem${idx1}`}>
                        <Accordion.Header>{data?.title}</Accordion.Header>
                        <Accordion.Body>
                          <ul>
                            {data?.options?.map((item, i) => (
                              <li key={`${item?.key}-${i}`}>
                                <input
                                  value={item?.slug}
                                  onChange={(e) => {
                                    handleFilterClick(data.key, e.target.value);
                                  }}
                                  type="checkbox"
                                  className={styles.check_box}
                                  id={item.Name}
                                  // checked={filterValue[item?.key] == item.slug}
                                  checked={storedFilters?.inch?.includes(
                                    item.slug
                                  )}
                                />
                                <label htmlFor={item?.Name}>{item?.Name}</label>
                              </li>
                            ))}
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                    );
                  })}
                </Accordion>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}

export default SideSlider;
