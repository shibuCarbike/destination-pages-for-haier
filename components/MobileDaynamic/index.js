import api from "api.service";
/* eslint-disable react/no-children-prop */
import Link from "next/link";
import Image from "next/image";
import Box from "components/Box";
import Loader from "components/Loader";
import { getRating } from "utlis/constant";
import { Ad, StickyAd, SideAd } from "components/Ads";
import styles from "styles/search.module.scss";
import React, { useState, useEffect } from "react";
import Content from "components/Content";
import {
  rightIcon,
  upIcon,
  downIcon,
  searchIcon,
  sortIcon,
  filterIcon,
} from "utlis/icons.js";
import {
  TvIndexPageDesktop,
  TvIndexPageMobile,
} from "components/Ads/adsVariable";
import {
  TvSelect,
  endPoint,
  TvSortOptions,
  defaultQuery,
  filtersItems,
} from "utlis/variables.js";
import {
  Container,
  Row,
  Col,
  Accordion,
  Breadcrumb,
  Offcanvas,
  Button,
} from "react-bootstrap";
import CustomTable from "components/CustomTable";
import SideSlider from "components/SideSlider";
import { useRouter } from "next/router";

let keysForStoredData = {
  brand: [],
};
Object.keys(filtersItems).forEach((item) => {
  keysForStoredData = { ...keysForStoredData, [item]: [] };
});

export default function Mobile(props) {
  const router = useRouter()?.query;
  const limit = 6;
  const [skip, setSKip] = useState(12);
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [query, setQuery] = useState(props.queryProp);
  const [showFilter, setShowFilter] = useState(false);
  const [activeShort, setActiveShort] = useState(null);
  const [brands, setBrands] = useState([...props.brands]);
  const [showMoreBrand, setShowMoreBrand] = useState(false);
  const [filterValue, setFilterValue] = useState({
    ...keysForStoredData,
  });
  const [storedFilters, setStoredFilters] = useState({
    brand: [],
    ...keysForStoredData,
  });
  const [data, setData] = useState([...props?.data]);
  const [queryUnder] = router.under
    .split("-")
    .map((item) => Number(item))
    .filter((item) => !Number.isNaN(item));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let newData = await api.generalFetchAmp(
        TvSelect,
        {
          ...query,
          ...(props?.upcomingPage ? {} : defaultQuery),
        },
        endPoint.tv,
        limit,
        { createdAt: -1 },
        skip
      );
      newData = newData?.data?.data;
      setData((prev) => [...prev, ...getRating(newData)]);

      if ((newData.length < 6 && newData.length > 0) || newData.length == 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      setLoading(false);
    };
    if (skip > 12 && !loading) {
      fetchData();
    }
  }, [skip]);

  const handleFilterClick = async (type, value) => {
    setShowFilter(false);
    setLoading(true);
    let index;
    let filters = { ...filterValue };
    let filterQuery = { ...query };
    window.scrollTo({ top: 0, behavior: "smooth" });
    switch (type) {
      case "clearAll":
        filters = keysForStoredData;
        break;

        // case "clearOne":
        //   Object.keys(filters).map((item) => {
        //     if (filters[item].includes(value)) {
        //       filters[item].splice(filters[item].indexOf(value), 1);
        //       filters = { ...filters, [item]: [...filters[item]] };
        //     }
        //   });
        //   break;

        // case "brand":
        if (filters?.brand?.includes(value)) {
          index = filters?.brand?.indexOf(value);
          filters?.brand?.splice(index, 1);
        } else {
          filters = { ...filters, brand: [...filters?.brand, value] };
        }
        break;

      // case "warranty":
      //   if (filters?.warranty?.includes(value)) {
      //     index = filters?.warranty?.indexOf(value);
      //     filters?.warranty?.splice(index, 1);
      //   } else {
      //     filters = { ...filters, warranty: [...filters?.warranty, value] };
      //   }
      //   break;
      // case "smartTv":
      //   if (filters?.smartTv?.includes(value)) {
      //     index = filters?.smartTv?.indexOf(value);
      //     filters?.smartTv?.splice(index, 1);
      //   } else {
      //     filters = { ...filters, smartTv: [...filters?.smartTv, value] };
      //   }
      //   break;
      // case "inch":
      //   if (filters?.inch?.includes(value)) {
      //     index = filters?.inch?.indexOf(value);
      //     filters?.inch?.splice(index, 1);
      //   } else {
      //     filters = { ...filters, inch: [...filters?.inch, value] };
      //   }
      //   break;
      // case "screenType":
      //   if (filters?.screenType?.includes(value)) {
      //     index = filters?.screenType?.indexOf(value);
      //     filters?.screenType?.splice(index, 1);
      //   } else {
      //     filters = { ...filters, screenType: [...filters?.screenType, value] };
      //   }
      //   break;
      // case "resolution":
      //   if (filters?.resolution?.includes(value)) {
      //     index = filters?.resolution?.indexOf(value);
      //     filters?.resolution?.splice(index, 1);
      //   } else {
      //     filters = { ...filters, resolution: [...filters?.resolution, value] };
      //   }
      //   break;
      // case "refreshRate":
      //   if (filters?.refreshRate?.includes(value)) {
      //     index = filters?.refreshRate?.indexOf(value);
      //     filters?.refreshRate?.splice(index, 1);
      //   } else {
      //     filters = {
      //       ...filters,
      //       refreshRate: [...filters?.refreshRate, value],
      //     };
      //   }
      //   break;
      // case "hdmiPorts":
      //   if (filters?.hdmiPorts?.includes(value)) {
      //     index = filters?.hdmiPorts?.indexOf(value);
      //     filters?.hdmiPorts?.splice(index, 1);
      //   } else {
      //     filters = { ...filters, hdmiPorts: [...filters?.hdmiPorts, value] };
      //   }
      //   break;
      // case "curved":
      //   if (filters?.curved?.includes(value)) {
      //     index = filters?.curved?.indexOf(value);
      //     filters?.curved?.splice(index, 1);
      //   } else {
      //     filters = { ...filters, curved: [...filters?.curved, value] };
      //   }
      //   break;
      case "budget":
        // if (filters?.budget?.includes(value)) {
        //   index = filters?.budget?.indexOf(value);
        //   filters?.budget?.splice(index, 1);
        // } else
        {
          filters = { ...filters, budget: value };
        }
        break;
      case "inch":
        if (filters?.inch?.includes(value)) {
          index = filters?.inch?.indexOf(value);
          filters?.inch?.splice(index, 1);
        } else {
          filters = { ...filters, inch: [...filters?.inch, value] };
        }
        break;

      case "screenType":
        if (filters?.screenType?.includes(value)) {
          index = filters?.screenType?.indexOf(value);
          filters?.screenType?.splice(index, 1);
        } else {
          filters = { ...filters, screenType: [...filters?.screenType, value] };
        }
        break;
      case "resolution":
        if (filters?.resolution?.includes(value)) {
          index = filters?.resolution?.indexOf(value);
          filters?.resolution?.splice(index, 1);
        } else {
          filters = { ...filters, resolution: [...filters?.resolution, value] };
        }
        break;
      case "smartTv":
        if (filters?.smartTv?.includes(value)) {
          index = filters?.smartTv?.indexOf(value);
          filters?.smartTv?.splice(index, 1);
        } else {
          filters = { ...filters, smartTv: [...filters?.smartTv, value] };
        }
        break;
    }
    if (filters?.budget?.length > 0) {
      if (filters?.budget[1] == 5000000) {
        filterQuery = {
          ...filterQuery,
          minComparePrice: { $gte: filters?.budget[0] },
        };
      } else if (filters?.budget[0] > 10000) {
        filterQuery = {
          ...filterQuery,
          minComparePrice: {
            $gte: filters?.budget[0],
            $lte: filters?.budget[1],
          },
        };
      } else {
        filterQuery = {
          ...filterQuery,
          minComparePrice: { $lte: Number(filters?.budget[1]) },
        };
      }
    }
    if (filters?.inch?.length > 0) {
      filterQuery = {
        ...filterQuery,
        sizediagonal: {
          $regex: filters?.inch[filters?.inch.length - 1],
          $options: "i",
        },
      };
    }
    if (filters?.screenType?.length > 0) {
      filterQuery = {
        ...filterQuery,
        screen_type: {
          $regex: filters?.screenType[filters?.screenType.length - 1],
          $options: "i",
        },
      };
    }
    if (filters?.resolution?.length > 0) {
      filterQuery = {
        ...filterQuery,
        resolution: {
          $regex: filters?.resolution[filters?.resolution.length - 1],
          $options: "i",
        },
      };
    }
    if (filters?.smartTv?.length > 0) {
      filterQuery = {
        ...filterQuery,
        smartTv: {
          $regex: filters?.smartTv[filters?.smartTv.length - 1],
          $options: "i",
        },
      };
    }

    // if (filters?.brand?.length > 0) {
    //   filterQuery = {
    //     ...filterQuery,
    //     brandSlug: { $in: filters?.brand },
    //   };
    // } else {
    //   delete filterQuery?.brandSlug;
    // }

    // if (filters?.smartTv?.length > 0) {
    //   filterQuery = {
    //     ...filterQuery,
    //     smartTv: {
    //       $regex: filters?.smartTv[filters?.smartTv.length - 1],
    //       $options: "i",
    //     },
    //   };
    // } else {
    //   delete filterQuery?.smartTv;
    // }

    // if (filters?.inch?.length > 0) {
    //   filterQuery = {
    //     ...filterQuery,
    //     sizediagonal: {
    //       $regex: filters?.inch[filters?.inch.length - 1],
    //       $options: "i",
    //     },
    //   };
    // } else {
    //   delete filterQuery?.inch;
    // }

    // if (filters?.screenType?.length > 0) {
    //   filterQuery = {
    //     ...filterQuery,
    //     screen_type: {
    //       $regex: filters?.screenType[filters?.screenType.length - 1],
    //       $options: "i",
    //     },
    //   };
    // } else {
    //   delete filterQuery?.screenType;
    // }

    // if (filters?.resolution?.length > 0) {
    //   filterQuery = {
    //     ...filterQuery,
    //     resolution: {
    //       $regex: filters?.resolution[filters?.resolution.length - 1],
    //       $options: "i",
    //     },
    //   };
    // } else {
    //   delete filterQuery?.resolution;
    // }

    // if (filters?.refreshRate?.length > 0) {
    //   filterQuery = {
    //     ...filterQuery,
    //     refresh_rate: {
    //       $regex: filters?.refreshRate[filters?.refreshRate.length - 1],
    //       $options: "i",
    //     },
    //   };
    // } else {
    //   delete filterQuery?.refreshRate;
    // }

    // if (filters?.hdmiPorts?.length > 0) {
    //   filterQuery = {
    //     ...filterQuery,
    //     hdmiPorts: {
    //       $regex: filters?.hdmiPorts[filters?.hdmiPorts?.length - 1],
    //       $options: "i",
    //     },
    //   };
    // } else {
    //   delete filterQuery?.hdmiPorts;
    // }

    // if (filters?.curved?.length > 0) {
    //   filterQuery = {
    //     ...filterQuery,
    //     curved: {
    //       $regex: filters?.curved[filters?.curved.length - 1],
    //       $options: "i",
    //     },
    //   };
    // } else {
    //   delete filterQuery?.curved;
    // }

    // if (filters?.warranty?.length > 0) {
    //   filterQuery = {
    //     ...filterQuery,
    //     warranty: {
    //       $regex: filters?.warranty[filters?.warranty.length - 1],
    //       $options: "i",
    //     },
    //   };
    // } else {
    //   delete filterQuery?.warranty;
    // }

    let newData = await api.generalFetchAmp(
      TvSelect,
      {
        ...filterQuery,
        ...defaultQuery,
      },
      endPoint.tv,
      limit,
      { createdAt: -1 }
    );

    newData = newData?.data?.data;
    setData(getRating(newData));
    setFilterValue(filters);
    setSKip(0);
    setQuery(filterQuery);
    setLoading(false);
    setHasMore(newData?.length >= 6 ? true : false);
  };

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
  const filterItem = [
    {
      title: "Screen Size",
      key: "inch",
      options: [
        { Name: "21 inch (53.34 cm)", slug: "21" },
        { Name: "22 inch ( 55.88 cm)", slug: "22" },
        { Name: "24 inch (60.96 cm)", slug: "24" },
        { Name: "32 inch (81.28 cm)", slug: "32" },
        { Name: "40 inch (101.6 cm)", slug: "40" },
        { Name: "42 inch (106.68 cm)", slug: "42" },
        { Name: "43 inch (109.22 cm)", slug: "43" },
        { Name: "50 inch (127 cm)", slug: "50" },
      ],
    },
    // {
    //   title: "Price",
    //   key: "budget",
    //   options: [
    //     { Name: "15000-25000", slug: "15000-25000" },
    //     { Name: "25000-35000", slug: "25000-35000" },
    //     { Name: "35000-45000", slug: "35000-45000" },
    //     { Name: "45000-55000", slug: "45000-55000" },
    //     { Name: "55000-65000", slug: "55000-65000" },
    //     { Name: "65000-75000", slug: "65000-75000" },
    //     { Name: "75000-85000", slug: "75000-85000" },
    //   ],
    // },

    {
      title: "Type of TV",
      key: "screenType",
      options: [
        { Name: "QLED", slug: "QLED" },
        { Name: "LCD TV", slug: "lcd" },
        { Name: "LED TV", slug: "led" },
        // { Name: "AMOLED", slug: "amoled" },
      ],
    },
    {
      title: "Resolution",
      key: "resolution",
      options: [
        { Name: "UHD", slug: "uhd" },
        { Name: "HD", slug: "hd" },
      ],
    },
    {
      title: "Smart TV",
      key: "smartTv",
      options: [
        { Name: "Yes", slug: "yes" },
        { Name: "No", slug: "no" },
      ],
    },
  ];
 
  return (
    <Container>
      <style>{`
          body {
          background-color: #f1f3f6;
          }
      `}</style>
      {loading && <Loader />}

      <StickyAd
        mobileUrl={TvIndexPageMobile.sticky}
        desktopUrl={TvIndexPageDesktop.sticky}
        desktopSizes={TvIndexPageDesktop.stickySizes}
        mobileSizes={TvIndexPageMobile.stickySizes}
        targetingArguments={"under"}
      />

      <Ad
        targetingArguments={"under"}
        mobileUrl={TvIndexPageMobile.top}
        desktopUrl={TvIndexPageDesktop.top}
        mobileSizes={TvIndexPageMobile.topSizes}
        desktopSizes={TvIndexPageDesktop.topSizes}
      />

      {props?.desc?.length > 0 ? (
        <Content
          h1={props?.h1}
          data={props?.desc}
          tableHeading={`Top TV Under ${props.paramsUnder}`}
          tableHighlightContent={props?.tableHighlightContent}
          tabelData={props?.tabelData}
        />
      ) : (
        <h1 className="seo_heading">{props.h1}</h1>
      )}

      <Row className={styles.row}>
        <Col md={3}>
          {/* <div className={styles.filter_box}>
            <h2 className={styles.reset_wrapper}>
              Filters
              <span onClick={() => handleFilterClick("clearAll")}>
                clear all
              </span>
            </h2>
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Brand</Accordion.Header>
                <Accordion.Body>
                  <div className={styles.search_div}>
                    {searchIcon}
                    <input
                      type="text"
                      value={search}
                      placeholder="Search For Brands"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <ul>
                    {brands
                      ?.filter((item) =>
                        item.Name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map(
                        (brand, i) =>
                          (!showMoreBrand ? i < 5 : true) && (
                            <li key={`brand-${i}`}>
                              <input
                                value={brand.slug}
                                onChange={(e) =>
                                  handleFilterClick("brand", e.target.value)
                                }
                                type="checkbox"
                                id={brand.Name}
                                checked={filterValue?.brand?.includes(
                                  brand.slug
                                )}
                              />
                              <label htmlFor={brand.Name}>{brand.Name}</label>
                            </li>
                          )
                      )}
                  </ul>
                  <div
                    className={styles.show_more}
                    onClick={() => setShowMoreBrand((prev) => !prev)}
                  >
                    {!showMoreBrand ? (
                      <>Show Less {upIcon}</>
                    ) : (
                      <>Show More {downIcon}</>
                    )}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              {Object.keys(filtersItems).map((item, i) => (
                <Accordion.Item eventKey={i + 1} key={`desk-${item}-${i}`}>
                  <Accordion.Header>{item.replace(/_/g, " ")}</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      {filtersItems[item].map((element, i) => (
                        <li key={`desk-ul-${item}-${i}`}>
                          <input
                            value={element.value}
                            onChange={(e) =>
                              handleFilterClick(item, e.target.value)
                            }
                            type="checkbox"
                            checked={filterValue[item]?.includes(element.value)}
                          />
                          {element.label}
                        </li>
                      ))}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div> */}
          <SideSlider
            filterItem={filterItem}
            // setShowMore={setShowMore}
            setShowFilter={setShowFilter}
            // filterValue={filterValue}
            handleFilterClick={handleFilterClick}
            storedFilters={storedFilters}
            under={queryUnder}
          />
          {/* <SideAd
            sticky={true}
            marginTop={true}
            sizes={TvIndexPageDesktop.topSideSizes}
            url={TvIndexPageDesktop.topSide}
            targetingArguments="daynamic-mobile"
          /> */}
        </Col>
        <Col md={9}>
          <div className={styles.right_box}>
            <div className={styles.filter_row}>
              <div className={styles.bread_crumb}>
                <Link href="/">Home</Link>
                {rightIcon}
                <Link href="/">Televisions</Link>
              </div>
              {/* <div className={styles.show_count}>Showing 1 – 24 of 330 results</div> */}
              <div className={styles.sort_by}>
                Sort By{" "}
                {TvSortOptions.map((button, i) => (
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

            <Box
              data={data}
              boxFor="mobiles"
              targetingArguments={"under"}
              handleFilterClick={handleFilterClick}
            />
            {hasMore && (
              <Button
                onClick={() => {
                  if (!loading) {
                    setSKip((prev) => prev + limit);
                    // setPageNumber((prev) => prev + 1);
                  }
                }}
                className="loading_button"
              >
                Load More
              </Button>
            )}
          </div>
        </Col>
        <CustomTable
          style={{ marginTop: "10px" }}
          h2={`TV Under ${props?.paramsUnder?.toLocaleString(
            "en-IN"
          )} Key Highlights`}
          bgColor="#f0f2f4"
          breakpoint={2}
          tableHeading={`Top 10 Popular Televisions`}
          tableHighlightContent={props?.tableHighlightContent}
          tabelData={props?.tabelData}
          data={props?.highlightTableData}
          // noWrapCount={3}
        />

        <div className={`${styles.faqs} my-3`}>
          <Accordion defaultActiveKey="0">
            <h2>
              FAQs of TV Under {props?.paramsUnder?.toLocaleString("en-IN")}
            </h2>
            {props?.faqData?.map((item, index) => (
              <Accordion.Item eventKey={item}>
                <Accordion.Header>{item?.question}</Accordion.Header>
                <Accordion.Body>
                  <div dangerouslySetInnerHTML={{ __html: item?.answer }} />
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
        <Breadcrumb style={{ marginTop: 20 }}>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>
            {props?.contentDetails?.h2 || "Televisions"}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.sticky_buttons}>
          <Button onClick={() => setShowSort(true)}>
            {sortIcon}
            Sort
          </Button>
          <Button onClick={() => setShowFilter(true)}>
            {filterIcon} FIlters
          </Button>
        </div>
      </Row>

      <Ad
        mobileUrl={TvIndexPageMobile.bottom}
        desktopUrl={TvIndexPageDesktop.bottom}
        mobileSizes={TvIndexPageMobile.bottomSizes}
        desktopSizes={TvIndexPageDesktop.bottomSizes}
        targetingArguments={"under"}
      />

      {/* sort offcanvas */}
      <Offcanvas
        placement={"bottom"}
        show={showSort}
        onHide={() => setShowSort(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sort</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className={styles.mobile_sort_body}>
            {TvSortOptions.map((x, i) => (
              <label key={`mob-short${i}`}>
                <input
                  type="radio"
                  checked={activeShort == i}
                  onChange={() => {
                    handelSortCLick(x, i);
                    setShowSort(false);
                  }}
                  value={x}
                  name="group1"
                />
                {x}
              </label>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* filter offcanvas */}
      <Offcanvas
        placement={"bottom"}
        style={{ height: "60vh" }}
        show={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>FILTERS</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className={styles.mobile_filter}>
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Brand</Accordion.Header>
                <Accordion.Body>
                  <div className={styles.search_div}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                    <input
                      type="text"
                      value={search}
                      placeholder="Search For Brands"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <ul>
                    {brands
                      ?.filter((item) =>
                        item.Name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map(
                        (brand, i) =>
                          (!showMoreBrand ? i < 5 : true) && (
                            <li key={`brand-${i}`}>
                              <input
                                value={brand.slug}
                                onChange={(e) =>
                                  handleFilterClick("brand", e.target.value)
                                }
                                type="checkbox"
                                id={brand.Name}
                                checked={filterValue?.brand?.includes(
                                  brand.slug
                                )}
                              />
                              <label htmlFor={brand.Name}>{brand.Name}</label>
                            </li>
                          )
                      )}
                  </ul>
                  <div
                    className={styles.show_more}
                    onClick={() => setShowMoreBrand((prev) => !prev)}
                  >
                    {!showMoreBrand ? (
                      <>Show Less {upIcon}</>
                    ) : (
                      <>Show More {downIcon}</>
                    )}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              {Object.keys(filtersItems).map((item, i) => (
                <Accordion.Item eventKey={i + 1} key={`desk-${item}-${i}`}>
                  <Accordion.Header>{item.replace(/_/g, " ")}</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      {filtersItems[item].map((element, i) => (
                        <li key={`desk-ul-${item}-${i}`}>
                          <input
                            value={element.value}
                            onChange={(e) =>
                              handleFilterClick(item, e.target.value)
                            }
                            type="checkbox"
                            checked={filterValue[item]?.includes(element.value)}
                          />
                          {element.label}
                        </li>
                      ))}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}
