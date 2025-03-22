import {
  closeIcon,
  edit,
  check,
  bulb,
  rightIcon,
  info as infoIcon,
} from "utlis/icons";
import Link from "next/link";
import api from "api.service";
import Image from "next/image";
import Faq from "components/Faq";
import Cities from "utlis/cities";
import { star } from "utlis/icons";
import { useRouter } from "next/router";
import { getCompareData, getSimilarCompareData, sponserData } from "utlis/data";
import styles from "./index.module.scss";
import Modal from "react-bootstrap/Modal";
import { endPoint } from "utlis/variables";
import Content from "components/Content";
import AsyncSelect from "react-select/async";
import FilterPageLoader from "components/Loader";
import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import ComapreCardNew from "components/ComapreCardNew";
import { Row, Col } from "react-bootstrap";

import moment from "moment";
let select =
  "slug Name minPrice specs.specification modelName avgRating brandName sizediagonal screen_type";
import { getEveryFirstLetterUpperCase, replaceImageUrl } from "utlis/constant";

import YouTube from "react-youtube";
import NewsBox from "components/NewsBox";
import BuyingGuide from "components/LedBuyingGuide";
import ProsCons from "components/LedProsCons";
import AdviceArticlesCarousel from "components/ExpertCarousel/index";
import { CompareProducts, destinationProducts } from "utlis/destinationData";
const THUMBS_UP_FILL = (
  <svg
    style={{
      position: "absolute",
      left: "0%",
      top: "20%",
    }}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="white"
    className="bi bi-hand-thumbs-up-fill"
    viewBox="0 0 16 16"
  >
    <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
  </svg>
);
const THUMBS_DOWN_FILL = (
  <svg
    style={{
      position: "absolute",
      left: "0%",
      top: "25%",
    }}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="white"
    className="bi bi-hand-thumbs-down-fill"
    viewBox="0 0 16 16"
  >
    <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z" />
  </svg>
);
let compareTableContent = [
  {
    name: "Brand",
    key: "brandName",
  },
  {
    name: "Price",
    key: "minPrice",
  },
  {
    name: "Screen Size",
    key: "sizediagonal",
  },
  {
    name: "Televisions Type",
    key: "screen_type",
  },
  // {
  //   name: "Refresh Rate",
  //   key: "refresh_rate",
  // },
];
export const getServerSideProps = async ({ params }) => {
  let promises = [];
  
  let response = params?.slug.split("-vs-").flatMap((element) => {
    
    return destinationProducts.filter((data)=>data.slug ==element)
  });

  const expertRivews = {
    "haier-mini-led-h65m95eux-vs-samsung-mini-led-65qn90dau": [
      "haier-h65m95eux-65-inch-qd-mini-led-4k-tv-review",
      "haier-h65m95eux-vs-samsung-neo-qn90d-a-comprehensive-65-inch-4k-tv-comparison",
      "samsung-mini-led-65qn90dau-detailed-review",
    ],
    "haier-mini-led-h65m95eux-vs-lg-mini-led-65qned90sqa": [
      "haier-h65m95eux-65-inch-qd-mini-led-4k-tv-review",
      "haier-mini-led-vs-lg-qned-unveiling-the-display-technology-differences",
      "lg-qned-90-tv-comprehensive-review-of-features-and-performance",
    ],
    "haier-mini-led-h65m95eux-vs-sony-bravia-7-mini-led-k-65xr70": [
      "haier-h65m95eux-65-inch-qd-mini-led-4k-tv-review",
      "sony-bravia-7-mini-led-k-65xr70-vs-haier-mini-led-h65m95eux",
      "elevate-your-viewing-experience-with-the-sony-bravia-7-mini-led-k-65xr70",
    ],
  }[params?.slug];

  promises.push(
    api.generalFetchAmpWithoutRedis(
      "smallDesc locale metaDescription slug title image createdAt avgRating",
      {
        newsFor: { $regex: "television", $options: "i" },
        slug: {
          $in: [
            "haier-uaier-unveils-c11-the-new-4k-oled-smart-tv-with-dolby-atmos-in-india",
            "65-inch-OLED-4k-samsung-tv-enjoy-the-view",
            "the-ultimate-visual-experience-LG's-65-Inch-OLED-4k-tv",
            "best-65-Inch-OLED-TV-in-India-2023-buyer-guide-and-top-picks",
          ],
        },
      },
      "newsarticle",
      "",
      { createdAt: -1 }
    )
  );

  let expertReviewsData = await api.generalFetchAmpWithoutRedis(
    "smallDesc locale metaDescription slug title image createdAt ",
    {
      slug: {
        $in: expertRivews?.length
          ? expertRivews
          : [
              "haier-h65m95eux-65-inch-qd-mini-led-4k-tv-review",
              "haier-h65m95eux-vs-samsung-neo-qn90d-a-comprehensive-65-inch-4k-tv-comparison",
              "samsung-mini-led-65qn90dau-detailed-review",
            ],
      },
    },
    "expert-review",
    "",
    { createdAt: -1 }
  );

  expertReviewsData = expertReviewsData?.data?.data.map((x) => {
    return {
      slug: x?.slug,
      smallDesc: x?.smallDesc,
      title: x?.title,
      image: x?.image,
      createdAt: x?.createdAt,
    };
  });


  let compareModels = {
    "haier-598l-3-door-convertible-side-by-side-refrigerator-with-wifi-enabled-smart-sense-ai-hrt-683kgu1": {
      title:
        " LG QNED 90 MiniLED 65-Inch vs Haier H65M95E MiniLED 65-Inch - Comparos.In",
      description:
        " LG QNED 90 MiniLED 65-Inch Comparison at Comparos.In. Compare Haier Mini LED and LG Mini LED Prices, Features, Pros & Cons, Technology, Style, and much more.",
    },
    "samsung-rs76cg8113sl-653l-side-by-side-refrigerator": {
      title:
        "Samsung QN90D 65-Inch vs Haier H65M95E MiniLED 65-Inch - Comparos.In",
      description:
        " Samsung QN90D  65v-Inch vs Haier H65M95E MiniLED 65-Inch Comparison at Comparos.In. Compare Haier Mini LED and LG Mini LED Prices, Features, Pros & Cons, Technology, Style, and much more.",
    },
    "sony-bravia-7-mini-led-k-65xr70": {
      title:
        "Sony BRAVIA 7 Mini LED K-65XR70 65-Inch vs Haier H65M95E MiniLED 65-Inch Price, Specs, Features",
      description:
        " Sony BRAVIA 7 Mini LED K-65XR70 65-Inch vs Haier H65M95E MiniLED 65-Inch Comparison. Compare Sony BRAVIA 7 Mini LED K-65XR70 65-Inch vs Haier H65M95E MiniLED 65-Inch Price in India, Resolution, Display, Features, Expert Reviews & Decide Which One is Best to Buy.",
    },
    "samsung-65S95cak-1m-63cm-65-s95c-oled-4k-smart-tv": {
      title: `${getEveryFirstLetterUpperCase(
        params.slug,
        "-"
      )} Comparison – Prices & Specs`,
      description:
        "Compare Television Models - Comparos.in is providing a facility of new Televisions comparison based on prices, specs, reviews & other features. Compare Televisions & then buy online.",
    },
    "sony-a80l-ultra-hd-4k-smart-led-tv": {
      title: `${getEveryFirstLetterUpperCase(
        params.slug,
        "-"
      )} Comparison – Prices & Specs`,
      description:
        "Compare Television Models - Comparos.in is providing a facility of new Televisions comparison based on prices, specs, reviews & other features. Compare Televisions & then buy online.",
    },
    "lg-g3-65-4k-smart-tv": {
      title: `${getEveryFirstLetterUpperCase(
        params.slug,
        "-"
      )} Comparison – Prices & Specs`,
      description:
        "Compare Television Models - Comparos.in is providing a facility of new Televisions comparison based on prices, specs, reviews & other features. Compare Televisions & then buy online",
    },
  };

  let selectedMobile = response
  
  // let compareTable = {
  //   th: ["Key Highlights", selectedMobile[0]?.Name, selectedMobile[1]?.Name],
  //   td: [],
  // };
  // compareTableContent?.forEach((item) => {
  //   compareTable?.td?.push(item?.name);
  //   compareTable?.td?.push(
  //     item?.key == "minPrice"
  //       ? `₹${selectedMobile[0][item?.key]}`
  //       : selectedMobile[0][item?.key]
  //   );
  //   compareTable?.td?.push(
  //     item?.key == "minPrice"
  //       ? `₹${selectedMobile[1][item?.key]}`
  //       : selectedMobile[1][item?.key]
  //   );
  // });

  let news = response[response.length - 1]?.data?.data || [];
  let allExpertReviews = expertReviewsData;
  if (expertRivews?.length) {
    let review1 = expertReviewsData?.filter(
      (data) => data?.slug == expertRivews[0]
    );
    let review2 = expertReviewsData?.filter(
      (data) => data?.slug == expertRivews[1]
    );
    let review3 = expertReviewsData?.filter(
      (data) => data?.slug == expertRivews[2]
    );
    allExpertReviews = [...review1, ...review2, ...review3];
  }

  if (selectedMobile?.length > 0) {
    
    return {
      props: {
       
        allExpertReviews,
        news,
        selectedMobile,
        slug: params?.slug,
        params,
        expertReviewsData,
        seo: {
          title: "",
          url: ``,
          canonical: ``,
          description:""
            
        },
        revalidate: 1800,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};

export default function Compare(props) {
  const { params } = props;
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm();
  const router = useRouter();
  const [info, setInfo] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState(1);
  const [show, setShow] = useState(false);
  const [news, setNews] = useState(props.news);
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCity, setSelectedCity] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);
  const [videoVisible, setVideoVisibel] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [visibleAdvantage, setVisibleAdvantage] = useState(false);
  const [visibleLeadForm, setVisibleLeadForm] = useState(false);
  const [isDesktopScrolled, setIsDesktopScrolled] = useState(false);
  const [selectedMobile, setSelectedMobile] = useState([
    ...props?.selectedMobile,
  ]);
  const [sponserDataForPage, setSponserDataForPage] = useState(sponserData);
  const [cities, setCities] = useState(
    Cities.map((x) => {
      return { ...x, label: x.name, value: x.slug };
    })
  );

  // youtube options
  const opts = {
    height: "400px",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const BannerImage = {
    "haier-mini-led-h65m95eux": {
      Top_Banner: {
        image: "/haierSponser/MINITop.webp",
      },
      Mid_Banner: {
        // image: "/haierSponser/baner-medium.webp",
        // image: "/haierSponser/middle_banner_mini.webp",
        image: "/haierSponser/Mini LED banner-06.webp",
      },
      Bottom_Banner: {
        // image: "/haierSponser/bottom_banner_mini.webp",
        image: "/haierSponser/Mini LED banner-04.webp",
      },
    },
    "haier-c11-65-inch-oled-android-smart-led-tv": {
      Top_Banner: {
        // image: "/haierSponser/c11Top.png",
        image: "/haierSponser/c11-top-banner.webp",
      },
      Mid_Banner: {
        image: "/haierSponser/c11Top.png",
      },
      Bottom_Banner: {
        image: "/haierSponser/banner-bottom.webp",
      },
    },
  };

  // const BannerMobile = {
  //   "haier-mini-led-h65m95eux": {
  //     Top_Banner: {
  //       image: "/haierSponser/bannertop.webp",
  //     },
  //     Mid_Banner: {
  //       image: "/haierSponser/baner-medium.webp",
  //     },
  //     Bottom_Banner: {
  //       image: "/haierSponser/banner-bottom.webp",
  //     },
  //   },
  //   "haier-c11-65-inch-oled-android-smart-led-tv": {
  //     Top_Banner: {
  //       image: "/haierSponser/c11-banner.webp",
  //     },
  //     Mid_Banner: {
  //       image: "/haierSponser/baner-medium.webp",
  //     },
  //     Bottom_Banner: {
  //       image: "/haierSponser/banner-bottom.webp",
  //     },
  //   },
  // };
  const staticItem = {
    "haier-598l-3-door-convertible-side-by-side-refrigerator-with-wifi-enabled-smart-sense-ai-hrt-683kgu1'": {
      Display: {
        image: "display3",
        value: [
          {
            value:
              "QDMINI LED | High Contrast | 4K HDR | 100% Color Gamut | Pure Black | Wide Angle, True Colors | Eye Protection | Eco-friendly | 144Hz | Dolby Vision IQ | MEMC | 2000 NITS",
          },
          {
            modalImage: "vision",
            highlight: true,
            info: `Dolby Vision IQ: Elevating your viewing experience with dynamic, real-time optimization of Dolby Vision content for any lighting condition.`,
            value: "Dolby Vision IQ | HLG | High Contrast Ratio",
          },
        ],
      },
      Design: {
        image: "code3",
        value: [
          {
            modalImage: "metal",
            highlight: true,
            info: "Unleash boundless beauty with our metal bezel-less device - an edge-to-edge masterpiece of elegance and innovation.  Best In the Industry Stand Design by Haire OLED.",
            value: "Metal Bezel-less",
          },
          {
            // modalImage: "sound",
            // info: "Best In the Industry Stand Design",
            // highlight: true,
            value: "Ultra-slim Design | Elegant Annular Runway Stand ",
          },
        ],
      },
      Operating_System: {
        image: "gear3",
        value: [
          {
            modalImage: "googleTv",
            value: "Google TV",
            info: "Google TV: Unifies streaming, live TV, apps for a seamless, interactive home entertainment experience. You get the best UI experience with Haire C11 TV",
            highlight: true,
          },
        ],
      },
      voice_assitance: {
        image: "voice3",
        value: [
          {
            modalImage: "voice1",
            highlight: true,
            info: `Your intelligent virtual assistant, simplifying tasks and answering questions with voice or text. It's your helpful companion.`,
            value: "Google Assistant | Far Field",
          },
        ],
      },
      Sound: {
        image: "musical3",
        value: [
          { value: "60W Harman Kardon" },
          {
            modalImage: "atmos",
            info: "Best Audio Experience with Dobly Atmos & Harman Kardon",
            highlight: true,
            value: "Dolby Atmos | 3D Immersive Sound | Front Firing",
          },
        ],
      },
      Tech_Spec: {
        image: "a3",
        value: [
          { value: "Netflix, Prime Video | Ok Google" },
          {
            info: "Experience the future of gaming with our 120 Hz display, ALLM (Auto Low Latency Mode), and dedicated Game Mode. Immerse yourself in ultra-smooth gameplay and lag-free action. Elevate your gaming experience to the next level with cutting-edge technology that keeps you at the forefront of the gaming world.",
            highlight: true,
            modalImage: "game",
            value: "120 Hz / ALLM / Game Mode",
          },
          // { value: "3GB/32 GB" },
          // { value: "Google Chromecast Built-in" },
          // { value: "Bluetooth" },
          // { value: "Smart Remote" },
        ],
      },
    },

    "samsung-rs76cg8113sl-653l-side-by-side-refrigerator": {
      Display: {
        image: "display3",
        value: [
          {
            value:
              "QDMINI LED | High Contrast | 4K HDR | 100% Color Gamut | Pure Black | Wide Angle, True Colors | Eye Protection | Eco-friendly | 144Hz | Dolby Vision IQ | MEMC | 2000 NITS",
          },
          {
            modalImage: "vision",
            highlight: true,
            info: `Dolby Vision IQ: Elevating your viewing experience with dynamic, real-time optimization of Dolby Vision content for any lighting condition.`,
            value: "Dolby Vision IQ | HLG | High Contrast Ratio",
          },
        ],
      },
      Design: {
        image: "code3",
        value: [
          {
            modalImage: "metal",
            highlight: true,
            info: "Unleash boundless beauty with our metal bezel-less device - an edge-to-edge masterpiece of elegance and innovation.  Best In the Industry Stand Design by Haire OLED.",
            value: "Metal Bezel-less",
          },
          {
            // modalImage: "sound",
            // info: "Best In the Industry Stand Design",
            // highlight: true,
            value: "Slim Design | Elegant Annular Runway Stand ",
          },
        ],
      },
      Operating_System: {
        image: "gear3",
        value: [
          {
            modalImage: "googleTv",
            value: "Google TV",
            info: "Google TV: Unifies streaming, live TV, apps for a seamless, interactive home entertainment experience. You get the best UI experience with Haire C11 TV",
            highlight: true,
          },
        ],
      },
      voice_assitance: {
        image: "voice3",
        value: [
          {
            modalImage: "voice1",
            highlight: true,
            info: `Your intelligent virtual assistant, simplifying tasks and answering questions with voice or text. It's your helpful companion.`,
            value: "Google Assistant | Far Field",
          },
        ],
      },
      Sound: {
        image: "musical3",
        value: [
          { value: "60W Harman Kardon, Dolby Atmos" },
          {
            modalImage: "atmos",
            info: "Best Audio Experience with Dobly Atmos & Harman Kardon",
            highlight: true,
            value: "Dolby Atmos | 3D Immersive Sound | Front Firing",
          },
        ],
      },
      Tech_Spec: {
        image: "a3",
        value: [
          {
            value: "QD MINI LED, Google TV, Harmon Kardon, Dolby Atmos",
          },
          {
            info: "Experience the future of gaming with our 120 Hz display, ALLM (Auto Low Latency Mode), and dedicated Game Mode. Immerse yourself in ultra-smooth gameplay and lag-free action. Elevate your gaming experience to the next level with cutting-edge technology that keeps you at the forefront of the gaming world.",
            highlight: true,
            modalImage: "game",
            value: "120 Hz / ALLM / Game Mode",
          },
          // { value: "3GB/32 GB" },
          // { value: "Google Chromecast Built-in" },
          // { value: "Bluetooth" },
          // { value: "Smart Remote" },
        ],
      },
    },
  }[params?.slug.split("-vs-")[0]];

  const selectedStatic = {
    "sony-a80l-ultra-hd-4k-smart-led-tv": {
      Display: {
        value: [
          "Cognitive Processor XR | XR OLED Contrast Pro | Unmatched XR 4K Upscaling | XR Motion Clarity",
          "Dolby Vision | HLG | High Contrast Ratio ",
        ],
      },
      Design: {
        value: ["Metal Bezel-less", "Slim"],
      },
      Operating_System: {
        value: ["Google TV"],
      },
      voice_assitance: {
        value: ["Apple airplay | Far-Field | Google Assitant"],
      },
      Sound: {
        value: ["60W", "Dolby Atmos |  3D Immersive Sound | Front Firing"],
      },
      Tech_Spec: {
        value: [
          " Netflix, Prime Video, Hotstar",
          "100 Hz / ALLM / Game Mode ",
          // "32GB",
          // "Google Chromecast Built-in",
          // "Bluetooth",
          // "Smart Remote",
        ],
      },
    },
    "lg-g3-65-4k-smart-tv": {
      Display: {
        value: [
          "α9 AI Processor 4K Gen6 | AI Super Upscaling 4K",
          "Dolby Vision | HLG | HDR 10 | Pixel Dimming",
        ],
      },
      Design: {
        value: ["Slim & Unique ", "Stand Design"],
      },
      Operating_System: {
        value: ["WebOS"],
      },
      voice_assitance: {
        value: [
          "AI ThinQ, Built-in Google Assistant & Alexa | Apple Airplay 2 & Homekit | Far-Field",
        ],
      },
      Sound: {
        value: [
          "60W",
          "Dolby Atmos | Down Firing Speaker Direction | AI Sound | Clear Voice Pro",
        ],
      },
      Tech_Spec: {
        value: [
          "Netflix, Prime Video | Ok Google",
          "120 Hz / ALLM / Game Mode",
          // "N/A",
          // "Mirroring",
          // "Bluetooth",
          // "Smart Remote",
        ],
      },
    },
    "samsung-65S95cak-1m-63cm-65-s95c-oled-4k-smart-tv": {
      Display: {
        value: [
          "Quantum 4K-Processor | Motion Xcelerator Turbo+ | HDR 10+ | HLG ",
          "Contrast Enhancer | AI Upscale | Film Mode",
        ],
      },
      Design: {
        value: ["Metel bezeless", "Slim"],
      },
      Operating_System: {
        value: ["Tizen"],
      },
      voice_assitance: {
        value: ["Bixby | Far-field"],
      },
      Sound: {
        value: ["70W", "Dolby Atmos | Q-Symphony | Adaptive Sound"],
      },
      Tech_Spec: {
        value: [
          " Netflix, Prime Video, Hotstar",
          "144 Hz / ALLM / Game Mode / Freesync ",
          // "N/A",
          // "Mirroring",
          // "Bluetooth",
          // "Smart Remote",
        ],
      },
    },
    "lg-mini-led-65qned90sqa": {
      Display: {
        value: [
          "QNED Colour PRO | 4K HDR | α8 AI Processor 4K | Pure Black | Eco-friendly | 120Hz | Dolby Vision | HDR 10 / HLG | 1400 NITS",
          "Ultra Slim TV",
        ],
      },
      Design: {
        value: ["Slim & Unique Stand Design", ""],
      },
      Operating_System: {
        value: ["webOS"],
      },
      voice_assitance: {
        value: ["ThinQ AI web OS"],
      },
      Sound: {
        value: ["Dolby Atmos", "Audio Formats Supported"],
      },
      Tech_Spec: {
        value: [
          "QNEDThinQ AI, Web OS",

          // " Netflix, Prime Video, Hotstar",
          // "100 Hz / ALLM / Game Mode ",
          //"32GB",
          // "Google Chromecast Built-in",
          // "Bluetooth",
          // "Smart Remote",
        ],
      },
    },
    "samsung-mini-led-65qn90dau": {
      Display: {
        value: [
          "Samsung QLED Technology lNQ4 AI Gen2 Processor drives all-around performance with 4K AI Upscaling",
          "Ultra Slim TV ",
        ],
      },
      Design: {
        value: ["Neo slim design", ""],
      },
      Operating_System: {
        value: ["Tizen"],
      },
      voice_assitance: {
        value: ["Google Assistant"],
      },
      Sound: {
        value: ["60 W", "Dolby Atmos"],
      },
      Tech_Spec: {
        value: [
          "Netflix, Prime Video",
          "",
          // "120 Hz / ALLM / Game Mode",
          // "N/A",
          // "Mirroring",
          // "Bluetooth",
          // "Smart Remote",
        ],
      },
    },
    undefined: {
      Display: {
        value: [],
      },
      Design: {
        value: [],
      },
      "Operating_System_</br>&_voice_assitance": {
        value: [],
      },
      Sound: {
        value: [],
      },
      Tech_Spec: {
        value: [],
      },
    },
    "sony-bravia-7-mini-led-k-65xr70": {
      Display: {
        value: [
          "4K Mini LED | XR Processor | 4K 120 | XR Backlight MasterDrive | XR Contrast Booster(20) | XR Triluminos PRO | XR Motion Clarity | XR Clear Image | Dolby Vision",
          "",
        ],
      },
      Design: {
        value: ["Bezeless", "Slim design"],
      },
      Operating_System: {
        value: ["Google TV"],
      },
      voice_assitance: {
        value: ["Google Assistant "],
      },
      Sound: {
        value: ["40 W", "Dolby Atmos"],
      },
      Tech_Spec: {
        value: [
          "Netflix, Prime Video",
          "",
          // "N/A",
          // "Mirroring",
          // "Bluetooth",
          // "Smart Remote",
        ],
      },
    },
  }[selectedMobile[1]?.slug];

  // const selectedStatic = {
  //   "lg-mini-led-65qned90sqa": {
  //     Display: {
  //       value: [
  //         "4K HDR | α8 AI Processor 4K | Pure Black | Eco-friendly | 120Hz ",
  //         "Ultra Slim TV",
  //       ],
  //     },
  //     Design: {
  //       value: ["Metel bezeless", ""],
  //     },
  //     Operating_System: {
  //       value: ["webOS Smart TV"],
  //     },
  //     voice_assitance: {
  //       value: ["Google Assistant"],
  //     },
  //     Sound: {
  //       value: [
  //         "α8 AI Sound Pro (Virtual 9.1.2 Up-mix)",
  //         "Audio Formats Supported",
  //       ],
  //     },
  //     Tech_Spec: {
  //       value: [
  //         "Netflix, Prime Video",
  //         "Bluetooth",
  //         // " Netflix, Prime Video, Hotstar",
  //         // "100 Hz / ALLM / Game Mode ",
  //         // "32GB",
  //         // "Google Chromecast Built-in",
  //         // "Bluetooth",
  //         // "Smart Remote",
  //       ],
  //     },
  //   },
  //   "samsung-mini-led-65qn90dau": {
  //     Display: {
  //       value: [
  //         "Motion Xcelerator 120Hz | ALLM | VRR | HGIG | 1253 NITS",
  //         "Ultra Slim TV ",
  //       ],
  //     },
  //     Design: {
  //       value: ["Neo Slim", "4K UHD TV"],
  //     },
  //     Operating_System: {
  //       value: ["Tizen™ Smart TV"],
  //     },
  //     voice_assitance: {
  //       value: ["Alexa "],
  //     },
  //     Sound: {
  //       value: ["60 W", "Dolby Atmos  Objects Tracking "],
  //     },
  //     Tech_Spec: {
  //       value: [
  //         "Netflix, Prime Video | Ok Google",
  //         "Smart Remote",
  //         // "120 Hz / ALLM / Game Mode",
  //         // "N/A",
  //         // "Mirroring",
  //         // "Bluetooth",
  //         // "Smart Remote",
  //       ],
  //     },
  //
  //
  //
  //   },
  // }[selectedMobile[1]?.slug];

  const loadOptions = async (inputValue, callback) => {
    if (inputValue.length > 1) {
      let res = cities.filter((x) =>
        x.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      callback(res);
    } else {
      setTimeout(() => {
        callback(cities);
      }, 500);
    }
  };

  const removeSelectedItems = async (i) => {
    let data = [];
    selectedMobile.forEach((x, index) => {
      if (index != i) {
        data.push(x);
      }
    });
    setSelectedMobile(data);
    setShow(true);
  };

  const onSubmit = async (data) => {
    setName(data.name);
    try {
      setSubmitLoading(true);
      let fromData = {
        ...data,
        location: selectedCity,
        category: "television",
      };
      await api.customerLead(fromData);
      // await api.mailForLeadSend({
      //   ...fromData,
      //   city: fromData?.location,
      //   date: moment().format("MMMM Do YYYY, h:mm:ss a"),
      // });
      setStep(2);
    } catch (e) {
    } finally {
      setSubmitLoading(false);
    }
  };

  const onSubmit1 = async (data, type) => {
    setName(data.name);
    try {
      setSubmitLoading(true);
      let fromData = {
        ...data,
        location: selectedCity,
        category: "refrigerator-compare-promotion",
      };
      await api.customerLead(fromData);
      // await api.mailForLeadSend({
      //   ...fromData,
      //   city: fromData?.location,
      //   date: moment().format("MMMM Do YYYY, h:mm:ss a"),
      // });
      setStep(2);
      setVisibleLeadForm(true);
      reset({});
    } catch (e) {
    } finally {
      setSubmitLoading(false);
    }
  };

  const listItemClicked = async (slug) => {
    try {
      setLoading(true);
      let index = selectedMobile.findIndex((x) => x.slug == slug);
      if (index == -1) {
        let data = await api.generalFetchAmp(
          select,
          { slug: slug },
          endPoint.tv,
          1
        );
        setSelectedMobile((prev) => [...prev, data?.data?.data[0]]);
        setShow(false);
      } else {
        alert("Can't Add Same Television Model");
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const naviagteTo = (id) => {
    let { height } = document
      .getElementById("compareSection")
      .getBoundingClientRect();
    const yOffset = -Number(height);
    const element = document.getElementById(id);
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const staticContent = {
    "samsung-65S95cak-1m-63cm-65-s95c-oled-4k-smart-tv": {
      h1: 'Haier C11 65 Inch Oled Android Smart Led Tv vs Samsung 1m 63cm(65") S95c Oled 4k Smart Tv',
      content: `<p> The <bold> Samsung 1m 63cm S95c OLED4k Smart TV</bold> and the <bold> <bold>Haier C11 65-inch OLED Android Smart LED TV </bold></bold> are two of the most popular and requested models in the Indian Market.Customers find it challenging to choose between the <bold> <bold>Samsung OLED TV</bold> and Haier C11 OLED TV</bold> because they both have advanced features and excellent sound and picture quality.</p>
      <p><bold>Samsung’s Smart OLED TVs not</bold> only deliver high-quality entertainment but also fit seamlessly into your living space with their sleek and modern design. The <bold>Samsung 63cm (65") S95c Oled 4k Smart TV</bold> is a true example of Samsung's commitment to providing updated technology and television features to its customers. </p>
      <p>To assist you in making an informed choice, we have listed the main differences between the <bold>Haier C11 Smart TV</bold> and the <bold>Samsung 65-inch TV</bold> below.</p>
      `,
    },
    "sony-a80l-ultra-hd-4k-smart-led-tv": {
      h1: "Haier C11 65 Inch OLED Android Smart LED TV vs Sony Bravia TV 65 Inches XR Series 4K Ultra HD Smart OLED Google",
      content: ` <p> Two top high - demanding contenders in the world of high - quality TVs are the <bold> <bold>Haier C11 65-inch OLED Android Smart LED TV </bold></bold> and the <bold> Sony Bravia TV 65 - inch XR Series 4K Ultra HD Smart OLED Google.</bold> Both, Haier and Sony Bravia offer up - to - date features and stunning picture quality, leaving a difficult choice for the consumers to decide which one to bring into their living room. </p>
      <p>With <bold>Sony Bravia TV 65 Inches XR Series OLED TV</bold> you experience a whole new level of home entertainment with its advanced <bold>Sony’s XR Series</bold> technology. The <bold>XR Series TV </bold>models continue Sony's tradition to lead the television industry with advanced image and sound processing. The <bold>Sony Bravia OLED 65 Inches TV’s </bold> stylish design and smart features make this TV a top choice for anyone who wants a cinematic experience at home.</p>
      <p>Below we have displayed key differences between <bold>the Sony 65-inch TV and the Haier Smart TV</bold> to help you make an informed decision.</p>
    `,
    },
    "lg-g3-65-4k-smart-tv": {
      h1: "Haier C11 65 Inch OLED Android Smart LED TV vs LG 65 Inch OLED 4K TV ",
      content: `<p> In the never - ending demand for top - tier TVs, we have the <bold> <bold>Haier C11 65-inch OLED Android Smart LED TV </bold></bold> and the <bold> LG 65 - inch OLED 4K TV</bold>.Both models are known for their exceptional features and outstanding qualities.</p>
      <p><bold>LG's 65-inch OLED 4K TV</bold> is top in technology, combining sleek design with jaw-dropping display quality. This <bold>LG OLED 65 TV</bold> is recognised for its 4K resolution which gives you a different experience of watching television. LG's smart features are a cherry on top. Whether you're a cinephile or a gamer, this TV caters to your needs. Commitment to quality extends to audio as well, the <bold>LG OLED 4K TV</bold> also includes advanced sound technologies, delivering a theater-like experience. </p>
      <p>Below, a detailed table is mentioned that will help you gain a better understanding of the television you would want to buy.</p>

    `,
    },
    "lg-mini-led-65qned90sqa": {
      h1: "Haier H65M95E MiniLED vs LG QNED 90 MiniLED  Comparison ",
      content: `<p> <bold>Haier’s M95E Series QD-Mini LED TVs</bold> feature Quantum Dot technology, a 144Hz refresh rate, and advanced Harman Kardon audio for a vibrant viewing experience. In comparison,<bold> LG’s QNED Mini LED TVs</bold> use NanoCell technology with Precision Dimming Pro and a 120Hz refresh rate, focusing on intelligent picture processing and high-quality audio. Both offer 4K resolution and smart features, but Haier emphasizes higher refresh rates and richer colors, while LG highlights superior dimming and AI-driven enhancements. Haier provides a 2-year warranty, whereas LG offers a standard 1-2 year warranty depending on the region.
</p>`,
    },
    "samsung-mini-led-65qn90dau": {
      h1: "Haier H65M95E MiniLED vs Samsung QN90D  Comparison  ",
      content: `The <bold>Haier M95E QD-Mini LED 4K Smart TV</bold> and <bold>Samsung Neo QLED 4K Smart TV (QN90D)</bold> offer impressive features, catering to different needs. The<bold> Samsung QN90D </bold>comes with superior quantum dot technology and a powerful AI processor, ideal for vibrant visuals and smooth performance. Conversely, the <bold>Haier M95E</bold> focuses on high refresh rates and Dolby Vision IQ, making it suitable for gaming and high dynamic range content. Both TVs come with advanced connectivity options and smart features, though their specific strengths cater to different preferences.
`,
    },
    "sony-bravia-7-mini-led-k-65xr70": {
      h1: "Haier H65M95E MiniLED vs Sony BRAVIA 7 Mini LED K-65XR70 Comparison",
      content: `For an unparalleled home entertainment experience, the <bold>Haier H65M95EUX 65-Inch QD-Mini LED 4K TV</bold> and <bold>Sony BRAVIA 7 Mini LED K-65XR70  </bold>offer top-notch features that set them apart. The <bold>BRAVIA K-65XR70</bold> excels with its cutting-edge Mini LED technology, sleek design, and immersive Acoustic Multi-Audio with Dolby Atmos, all powered by Google TV. Meanwhile, the <bold>Haier H65M95EUX</bold> shines with its stunning 2000 nits peak brightness, 144Hz refresh rate, and advanced gaming features. Both models deliver extraordinary performance, with BRAVIA's elegance and sound quality leading the way.
`,
    },
  }[selectedMobile[1]?.slug];

  const faq = {
    "samsung-65S95cak-1m-63cm-65-s95c-oled-4k-smart-tv": [
      {
        ques: `What are the key features of the Haier OLED 65 - inch TV and the Samsung 65 - inch TV ? `,
        ans: `<bold> Haier C11 65 - inch TV</bold> offers a sleek design, an Android operating system, and OLED display technology.In contrast, the <bold> Samsung OLED TV</bold> includes impressive sound and OLED display quality and advanced smart features.`,
      },
      {
        ques: `What does “1m 63cm" refers to in Samsung 1m 63cm (65") S95c Oled 4k Smart TV`,
        ans: `The "1m 63cm" refers to the screen size, which translates to a stunning 65 - inch OLED display.Additionally, the display offers vibrant colours and deep blacks. <bold> S95c Oled Smart TV’s</bold> 4K resolution ensures that every detail on the screen is sharp and clear.`,
      },
      {
        ques: `How does the picture quality compare between the Haier C11 OLED TV 65 inch and Samsung 65 Inch OLED TV ? `,
        ans: `The <bold> C11 Haier 65 - inch</bold> model provides deep blacks and vibrant colours, while the <bold> Samsung OLED TV 65 - inch </bold> features impressive OLED technology and 4K Ultra HD resolution, delivering exceptional picture quality in both cases.`,
      },
      {
        ques: `What are the differences in smart features and operating systems of these newly launched TVs ? `,
        ans: `The <bold> Haier C11 TV</bold> utilizes the Android operating system, allowing access to a wide range of apps and services.On the other hand, this <bold> Samsung S95c 4k Smart TV</bold> employs its Tizen operating system with a user - friendly interface and compatibility with various applications.`,
      },
      {
        ques: `Is there a significant difference in sound quality between the Haier C11 Smart TV and Samsung OLED TV 65 Inch ? `,
        ans: `The <bold> Samsung OLED TV 65 - inch </bold> often features advanced audio technologies like Dolby Atmos and Acoustic Surface Audio, while the Haier Android TV may have its sound enhancements. `,
      },
      {
        ques: `How do the prices of Samsung OLED TVs and Haier C11 compare in the Indian market ? `,
        ans: `Both are <bold> 65 - inch OLED TVs</bold> and when it comes to their modern features, the <bold> <bold>price of the Haier TV </bold></bold> and the <bold> Samsung 65 - inch TV price in India</bold> is cost - effective.`,
      },
    ],
    "sony-a80l-ultra-hd-4k-smart-led-tv": [
      {
        ques: `What are the key features of the Haier OLED TV and the Sony 65 - inch TV ? `,
        ans: `<bold> Haier C11 TV </bold> offers a sleek design, an Android operating system, and OLED display technology.In contrast, the <bold> Sony Bravia OLED TV</bold> features 4K Ultra HD resolution and Google integration.`,
      },
      {
        ques: `How does the picture quality compare between the Haier C11 OLED TV 65 inch and Sony 65 Inch OLED TV ? `,
        ans: `The <bold> C11 Haier 65 - inch </bold> model provides deep blacks and vibrant colours, while the <bold> Sony OLED TV 65 - inch</bold> boasts the impressive XR Series and 4K Ultra HD resolution for a crystal - clear viewing experience, both delivering exceptional picture quality.`,
      },
      {
        ques: `What are the differences in smart features and operating systems of these neewly launched TVs ? `,
        ans: `The <bold> Haier C11 TV </bold> utilizes the Android operating system, allowing access to a wide range of apps and services.On the other hand, this <bold> Sony Bravia XR Series LED TV</bold> integrates with Google, providing seamless access to Google services and apps.`,
      },
      {
        ques: `Can you tell me more about Sony's XR Series technology and its benefits in the Bravia TV?`,
        ans: `<bold>Sony's XR Series</bold> technology is an advanced image and sound processing system that enhances picture and audio quality. Sony 65-inch Bravia TV offers features like XR Triluminos Pro for wider color gamuts, XR 4K Upscaling for upscaling content to near-4K quality, and XR Motion Clarity for smoother motion handling. These features make the <bold>Sony Bravia XR Series TV</bold> stand out for its image and sound quality.`,
      },
      {
        ques: `Is there a significant difference in sound quality between the Haier C11 Smart TV and Sony Bravia XR Series TVs?`,
        ans: `The <bold>Sony Croma OLED TV</bold> often features advanced audio technologies like Dolby Atmos and Acoustic Surface Audio, while the <bold>Haier Android TV</bold> may have its sound enhancements. `,
      },
      {
        ques: `How do the prices of Sony OLED TV 65 inch and Haier C11 compare in the Indian market?`,
        ans: `Both are <bold>65-inch OLED TVs </bold>and when it comes to their modern features, the <bold>price of the Haier TV </bold> and the <bold>Sony 65-inch TV price in India </bold> is cost-effective.`,
      },
    ],
    "lg-g3-65-4k-smart-tv": [
      {
        ques: `Is there anything special about LG's 65-inch OLED 4K TV?`,
        ans: `This <bold>65-inch LG OLED 4K TV</bold> offers a huge 65-inch screen, brilliant 4K resolution, advanced smart features, and immersive audio technologies, such as Dolby Atmos.`,
      },
      {
        ques: `How do the 65 OLED TV and Haier C11 Smart TV differ from each other?`,
        ans: `The <bold>LG 65-inch TV dimensions</bold> offers superior picture quality with OLED technology and features like webOS, while the <bold>Haier C11 Smart TV</bold> is more budget-friendly but with a standard LED display and basic smart TV functions.`,
      },
      {
        ques: `What are the available connectivity options in both the televisions?`,
        ans: `The<bold> Haier C11 </bold>offers standard connectivity options such as HDMI and USB ports, while the<bold> LG OLED 65 TV </bold> provides a comprehensive range of connectivity options, including HDMI, USB, and more.`,
      },
      {
        ques: `Can you elaborate on LG OLED TV 4k’s audio technologies and their benefits?`,
        ans: `<bold>LG's television </bold> audio technologies like Dolby Atmos and Acoustic Surface Audio provide exceptional sound quality, delivering a theatre-like experience in the comfort of your home.`,
      },
      {
        ques: `How does the price of the LG 65-inch OLED 4K TV compare to the Haier C11 OLED TV?`,
        ans: `With advanced features, both <bold>Haier C11 65-inch OLED Android Smart LED TV </bold> and the <bold>65-inch LG OLED TV price in India</bold> are competitive and appealing to consumers looking for high-quality entertainment options.`,
      },
    ],
    "samsung-mini-led-65qn90dau": [
      {
        ques: `What are the key features of the Samsung Neo QLED 4K QN90D
?`,
        ans: `The Samsung QN90D features advanced quantum dot technology, a powerful NQ4 AI Gen 2 processor, and HDR10+ support, providing vibrant visuals and smooth performance. It also includes Tizen OS for easy navigation and has 4 HDMI ports.
`,
      },
      {
        ques: `What makes the Haier M95E QD-Mini LED unique
?`,
        ans: `The Haier M95E stands out with its high refresh rate of 144Hz and Dolby Vision IQ support, making it excellent for gaming and high-quality video content. It also uses Google TV, which offers a wide range of apps and personalized recommendations.
`,
      },
      {
        ques: `Which TV is better for gaming
?`,
        ans: `The Haier M95E is better for gaming due to its 144Hz refresh rate and HDMI 2.1 support, which allows for smoother and more responsive gameplay compared to the Samsung QN90D.
`,
      },
      {
        ques: `Which TV has higher power consumption
?`,
        ans: `The Samsung QN90D consumes more power, with a consumption rate of 225W. The Haier M95E’s power consumption details are not specified, but it is generally expected to be lower`,
      },
      {
        ques: `Is the Haier M95E worth the higher price compared to the Samsung QN90D
?`,
        ans: `Yes, the Haier M95E justifies its higher price with a 144Hz refresh rate and Dolby Vision IQ support, ideal for gaming and superior HDR quality. Its integration with `,
      },
    ],
    "lg-mini-led-65qned90sqa": [
      {
        ques: `What are the main benefits of the Haier M95E Series QD-Mini LED TV?
`,
        ans: ` The Haier M95E features a 144Hz refresh rate, Quantum Dot technology for vibrant colors, and advanced Harman Kardon audio. It also offers Google TV for a comprehensive app experience.
`,
      },
      {
        ques: `How does the LG QNED Mini LED TV's picture quality compare to the Haier M95E
?`,
        ans: `LG’s QNED Mini LED uses NanoCell with Precision Dimming Pro for better contrast, while Haier’s Quantum Dot technology provides superior color vibrancy and higher peak brightness.

`,
      },
      {
        ques: ` What are the differences in audio performance between the Haier M95E and LG QNED Mini LED TVs?`,
        ans: `The Haier M95E includes Harman Kardon speakers with Dolby Atmos for enhanced sound quality, whereas the LG QNED Mini LED offers 40W output with Dolby Atmos and AI Sound Pro`,
      },
      {
        ques: ` How do the gaming features of the Haier M95E and LG QNED Mini LED TVs differ
?`,
        ans: `Haier’s M95E supports a 144Hz refresh rate, VRR, and ALLM for optimal gaming, while LG’s QNED Mini LED features a 120Hz refresh rate and FreeSync for good gaming performance.
`,
      },
      {
        ques: `What are the pricing and warranty differences between these two TV models?`,
        ans: `The Haier M95E is priced at INR 1,55,990 with a 2-year warranty, while the LG QNED Mini LED costs INR 1,83,000 but comes with a longer 5-year warranty.
.`,
      },
    ],
    "sony-bravia-7-mini-led-k-65xr70": [
      {
        ques: `What is the price difference between the Sony BRAVIA 7 Mini LED K-65XR70 and the Haier H65M95EUX?
`,
        ans: `The Sony BRAVIA 7 Mini LED K-65XR70 is priced at ₹2,99,990, while the Haier H65M95EUX is priced at ₹1,55,990, making the Haier TV significantly more affordable.
`,
      },
      {
        ques: `Is the Haier H65M95EUX a good value for its price?
?
`,
        ans: `Yes, the Haier H65M95EUX offers excellent value with its high brightness, advanced features, and lower price compared to the Sony BRAVIA 7.
`,
      },
      {
        ques: `Are there any ongoing discounts on these models?
?
`,
        ans: `The Haier H65M95EUX’s MRP is ₹1,99,990, potentially offering discounts compared to its current price of ₹1,55,990, while the Sony BRAVIA 7 does not list specific discounts.
`,
      },
      {
        ques: `How does the refresh rate affect the viewing experience??
`,
        ans: `The Haier H65M95EUX has a 144Hz refresh rate, offering smoother motion compared to the 120Hz of the Sony BRAVIA 7`,
      },
      {
        ques: `Which TV is better for bright rooms?
?
`,
        ans: `The Haier H65M95EUX’s 2000 nits peak brightness makes it more suitable for bright rooms compared to the Sony BRAVIA 7.
`,
      },
      {
        ques: `Does the Haier H65M95EUX support voice control?
?
`,
        ans: `Yes, the Haier H65M95EUX supports voice control via Google Assistant, similar to the Sony BRAVIA 7.
`,
      },
    ],
  }[selectedMobile[1]?.slug];

  //   const faq = {
  //     "samsung-mini-led-65qn90dau": [
  //       {
  //         ques: `What are the key features of the Samsung Neo QLED 4K QN90D
  // ?`,
  //         ans: `The Samsung QN90D features advanced quantum dot technology, a powerful NQ4 AI Gen 2 processor, and HDR10+ support, providing vibrant visuals and smooth performance. It also includes Tizen OS for easy navigation and has 4 HDMI ports.
  // `,
  //       },
  //       {
  //         ques: `What makes the Haier M95E QD-Mini LED unique
  // ?`,
  //         ans: `The Haier M95E stands out with its high refresh rate of 144Hz and Dolby Vision IQ support, making it excellent for gaming and high-quality video content. It also uses Google TV, which offers a wide range of apps and personalized recommendations.
  // `,
  //       },
  //       {
  //         ques: `Which TV is better for gaming
  // ?`,
  //         ans: `The Haier M95E is better for gaming due to its 144Hz refresh rate and HDMI 2.1 support, which allows for smoother and more responsive gameplay compared to the Samsung QN90D.
  // `,
  //       },
  //       {
  //         ques: `Which TV has higher power consumption
  // ?`,
  //         ans: `The Samsung QN90D consumes more power, with a consumption rate of 225W. The Haier M95E’s power consumption details are not specified, but it is generally expected to be lower`,
  //       },
  //       {
  //         ques: `Is the Haier M95E worth the higher price compared to the Samsung QN90D
  // ?`,
  //         ans: `Yes, the Haier M95E justifies its higher price with a 144Hz refresh rate and Dolby Vision IQ support, ideal for gaming and superior HDR quality. Its integration with `,
  //       },
  //     ],

  //     "lg-mini-led-65qned90sqa": [
  //       {
  //         ques: `What are the main benefits of the Haier M95E Series QD-Mini LED TV?
  // `,
  //         ans: ` The Haier M95E features a 144Hz refresh rate, Quantum Dot technology for vibrant colors, and advanced Harman Kardon audio. It also offers Google TV for a comprehensive app experience.
  // `,
  //       },
  //       {
  //         ques: `How does the LG QNED Mini LED TV's picture quality compare to the Haier M95E
  // ?`,
  //         ans: `LG’s QNED Mini LED uses NanoCell with Precision Dimming Pro for better contrast, while Haier’s Quantum Dot technology provides superior color vibrancy and higher peak brightness.

  // `,
  //       },
  //       {
  //         ques: ` What are the differences in audio performance between the Haier M95E and LG QNED Mini LED TVs?`,
  //         ans: `The Haier M95E includes Harman Kardon speakers with Dolby Atmos for enhanced sound quality, whereas the LG QNED Mini LED offers 40W output with Dolby Atmos and AI Sound Pro`,
  //       },
  //       {
  //         ques: ` How do the gaming features of the Haier M95E and LG QNED Mini LED TVs differ
  // ?`,
  //         ans: `Haier’s M95E supports a 144Hz refresh rate, VRR, and ALLM for optimal gaming, while LG’s QNED Mini LED features a 120Hz refresh rate and FreeSync for good gaming performance.
  // `,
  //       },
  //       {
  //         ques: `What are the pricing and warranty differences between these two TV models?`,
  //         ans: `The Haier M95E is priced at INR 1,55,990 with a 2-year warranty, while the LG QNED Mini LED costs INR 1,83,000 but comes with a longer 5-year warranty.
  // .`,
  //       },
  //       //       {
  //       //         ques: ` Who owns Haier
  //       // ?`,
  //       //         ans: `Haier is owned by Zhang Ruimin, who is the current chairman of the company.`,
  //       //       },
  //     ],
  //   }[selectedMobile[1]?.slug];

  let buyingGuideData = {
    subHeading: "All you need to know in 10 easy steps",
    authorImg: "/images/aman-author.webp",
    author: "Aman Singh",
    content: `
    When buying a TV, there are several factors to consider to ensure you get the best value for your money and a TV that suits your needs. Here are some things to look out for:<br/><br/>

<p>1. <b>Screen Size</b>: Consider the dimensions of the room where the TV will be placed. Measure the distance between your seating area and the TV. Generally, for a comfortable viewing experience, the screen size should be appropriate for the viewing distance. You can use online calculators to determine the optimal screen size based on viewing distance.<br/><br/></p>

<p>2. <b>Resolution</b>: Higher resolution TVs provide sharper images with more detail. However, the benefits of higher resolutions like 4K or 8K are more noticeable on larger screens. For smaller screens or if you're sitting far away, a Full HD (1080p) TV might suffice.<br/><br/></p>

<p>3. <b>Refresh Rate</b>: The refresh rate refers to how many times per second the TV refreshes the image on the screen. A higher refresh rate, such as 120Hz or 240Hz, reduces motion blur and delivers smoother images, which is particularly important for action-packed scenes, sports, and gaming. <br/><br/></p>

<p>4. <b>HDR (High Dynamic Range)</b>: HDR enhances the contrast and color accuracy of the picture, resulting in more vibrant and lifelike images. Look for TVs that support HDR formats like HDR10, Dolby Vision, or HLG (Hybrid Log-Gamma) for a wider range of colors and brighter highlights. HDR content is becoming increasingly common on streaming platforms and Blu-ray discs, so having HDR support ensures compatibility with future content.<br/><br/></p>

<p>5. <b>Panel Type</b>: Different panel technologies offer varying levels of picture quality and viewing angles. OLED panels provide deep blacks, infinite contrast ratios, and wide viewing angles, making them ideal for dark room environments and critical viewing. QLED and LED/LCD panels offer brighter images and are more suitable for well-lit rooms, but they may have limitations in terms of contrast and viewing angles.<br/><br/></p>

<p>6. <b>Smart Features</b>: Smart TVs come with built-in Wi-Fi connectivity and pre-installed apps for streaming content from popular services like Netflix, Amazon Prime Video, and Disney+. Consider the user interface and ease of navigation when choosing a smart TV. Some smart TVs also offer voice control features, allowing you to control the TV and search for content using voice commands.<br/><br/></p>

<p>7. <b>Connectivity</b>: Ensure that the TV has an adequate number of HDMI and USB ports to connect your external devices, such as gaming consoles, Blu-ray players, and set-top boxes. Additionally, consider features like Bluetooth connectivity for wireless audio streaming and screen mirroring capabilities for casting content from your smartphone or tablet.<br/><br/></p>

<p>8. <b>Audio Quality</b>: While external sound systems like soundbars or home theater systems can enhance the audio experience, the built-in speakers of the TV also play a role, especially if you're not planning to invest in additional audio equipment. Look for TVs with powerful speakers, clear dialogue reproduction, and immersive sound technologies like Dolby Atmos or DTS:X for a more cinematic audio experience.<br/><br/></p>

<p>9. <b>Brand Reputation and Reviews</b>: Research the reputation of the TV brand, including factors like reliability, customer service, and software support. Read reviews from reputable sources and consider feedback from other consumers to get an idea of the TV's performance in real-world scenarios. Popular brands with a strong track record for quality and customer satisfaction include Haier ,Samsung, LG, Sony, and TCL.<br/><br/></p>

<p>10. <b>Price and Value</b>: Set a budget based on your requirements and prioritize features that are most important to you. Compare prices across different brands and retailers ,Remember that while price is an important consideration, it's equally essential to invest in a TV that meets your needs and provides a satisfying viewing experience over the long term.<br/><br/></p>
  `,
  };

  let hierProsCons = {
    "haier-c11-65-inch-oled-android-smart-led-tv": {
      name: `Haier C11 65 Inch OLED Android Smart LED TV`,
      pros: `
      <ul>
      <li>Inbuilt ChromeCast</li>
      <li>Great Audio Output</li>
      <li>Comes with Motion Compensation Technology (MEMC) feature with variable  Refresh Rate</li>
      <li>Stunning Display Visual</li>
      </ul>
      `,
      cons: `<ul><li>No AI Upscaling till 4K </li></ul>`,
    },
    "haier-mini-led-h65m95eux": {
      name: `Haier-Mini-LED-H65M95EUX`,
      pros: `<ul>
    <li>2000 Nits Peak Brightness.
</li>
    <li>144 Hz suitable for most gaming and video content.
</li>
<li>Dolby Vision IQ for superiror Picture.
</li>
    
    <li>Harmon Kardon sound with 60W.
</li>
<li>AMD freesync Pro for lag free gaming.
</li>
<li>wifi 6 for smooth and hassle free entertaimment.
</li>
<li>Superior Design with front firing speakers.</li>
    
    </ul>
    `,
      cons: `<ul><li>No AI Upscaling till 4K </li></ul>`,
    },
  }[params?.slug.split("-vs-")[0]];

  let prosCons = {
    "lg-g3-65-4k-smart-tv": {
      name: "LG G3 65 4K Smart TV",
      pros: `
        <ul>
            <li>Great Display</li>
            <li>Slim Design</li>
          </ul>
        `,
      cons: `
        <ul>
        <li>Expensive</li>
        <li>No Chromecast</li>
        </ul>
        `,
    },
    "sony-a80l-ultra-hd-4k-smart-led-tv": {
      name: "Sony A80L Ultra HD (4K) Smart LED TV",
      pros: `<ul><li>Great Motion Clarity
          </li>
          <li>Supports HDMI Signal
          </li>
          </ul>
          `,
      cons: `
        <ul>
         <li>Only 100 Hz Refresh Rate</li>
         <li>Average Sound Quality</li>
         <li>Expensive</li>
        </ul>
          `,
    },
    "samsung-65S95cak-1m-63cm-65-s95c-oled-4k-smart-tv": {
      name: 'Samsung 1m 63cm (65") S95C OLED 4K Smart TV',
      pros: `
        <ul>
        <li>144 Hz Refresh Rate</li>
        <li>Impressive Audio Quality
        </li>
        </ul>
        `,
      cons: `<ul>
        <li>Tizen OS</li>
        <li>Less HDMI Ports</li>
       </ul>
       `,
    },

    "lg-mini-led-65qned90sqa": {
      name: "LG QNED90 65 inch Ultra HD 4K Smart Mini LED TV (65QNED90SQA)",
      pros: `
      <ul> 
         <li>NanoCell technology for improved color accuracy and contrast.</li>
         <li>120Hz is suitable for most gaming and video content.</li>
         <li>40W sound output with Dolby Atmos and AI Sound Pro.</li>
         <li>FreeSync support and Game Optimizer for better performance.</li>
        </ul>
      `,
      cons: `
      <ul>
      <li>Expensive</li>
      </ul>
      `,
    },
    "samsung-mini-led-65qn90dau": {
      name: "Samsung 65 inch QN90D Neo QLED 4K Smart TV (65QN90DAU)",
      pros: `<ul><li>Advanced NQ4 AI Gen 2 processor for enhanced performance.
        </li>
        <li>Tizen OS offers a smooth, user-friendly interface.
        </li>
        <li>Superior QLED panel with HDR10+ support.</li>
        <li>Good build quality and aesthetics.
        </li>
        <li>4 HDMI ports for versatile connectivity.
        </li>
        </ul>
        `,
      cons: `
      <ul>
       
       <li>High Price.
</li>
      
      </ul>
        `,
    },
    "sony-bravia-7-mini-led-k-65xr70": {
      name: "Sony BRAVIA 7 Mini LED K-65XR70",
      pros: `
      <ul> 
         <li>Superior 4K display with BRAVIA Mini LED technology for sharp and vibrant visuals.</li>
         <li>BRAVIA Acoustic Multi-Audio with Dolby Atmos for immersive sound.</li>
         <li>Google TV with BRAVIA voice recognition and extensive app support.</li>
        </ul>
      `,
      cons: `
      <ul>
      <li>High Price.</li>
        
      </ul>
      `,
    },
  }[selectedMobile[1]?.slug];

  useEffect(() => {
    setIsMobileView(window.innerWidth < 768 ? true : false);
    import("@justinribeiro/lite-youtube");

    const header =
      window.innerWidth < 768
        ? document.getElementById("mobile_header")
        : document.getElementById("header");
    const CompareSection = document.getElementById("compareSection");

    const scroll = (e) => {
      let { top } = CompareSection.getBoundingClientRect();
      if (window.innerWidth > 768) {
        if (top <= 80) {
          setIsDesktopScrolled(true);
          header.style.transform = "translateY(-100%)";
        } else {
          setIsDesktopScrolled(false);
          header.style.transform = "translateY(0px)";
        }
      } else {
        if (top <= 90) {
          setIsScrolled(true);
          header.style.transform = "translateY(-100%)";
        } else {
          setIsScrolled(false);
          header.style.transform = "translateY(0px)";
        }
      }
    };
    window.addEventListener("scroll", scroll);
    return () => window.removeEventListener("scroll", scroll);
  }, []);

  useEffect(() => {
    let newsData = [];
    props.news.forEach((x) => {
      if (x.slug == "65-inch-OLED-4k-samsung-tv-enjoy-the-view") {
        if (
          selectedMobile[1]?.slug ==
          "samsung-65S95cak-1m-63cm-65-s95c-oled-4k-smart-tv"
        ) {
          newsData.push(x);
        }
      } else if (
        x.slug == "the-ultimate-visual-experience-LG's-65-Inch-OLED-4k-tv"
      ) {
        if (selectedMobile[1]?.slug == "lg-g3-65-4k-smart-tv") {
          newsData.push(x);
        }
      } else if (x.slug == "") {
      } else {
        newsData.push(x);
      }
    });
    setNews(newsData);
  }, [selectedMobile]);

  useEffect(() => {
    let data = sponserData.filter((x) => x.slug2 != selectedMobile[1]?.slug);
    setSponserDataForPage(data);
  }, [selectedMobile]);
  const shareModelDetail = () => {
    try {
      navigator.share({
        title: " Compare TVs",
        text: "",
        url: typeof window !== "undefined" && window.location.href,
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  // let comapereData =getCompareData(CompareProducts,'red')
  

   let comapereData =getSimilarCompareData(selectedMobile[0],CompareProducts,'red') 
  

  return (
    <>
      <Container className={styles?.container}>
        <div
          className={styles.top_banner_desktop}
          onClick={() => setVisibleLeadForm(true)}
        >
          {/* <Image src="/haierSponser/topBanner.jpg" alt="banner" fill={true} /> */}
          <Image
            src={BannerImage[params?.slug.split("-vs-")[0]]?.Top_Banner?.image}
            alt="banner"
            fill={true}
          />
        </div>
        <div
          className={styles.top_banner_mobile}
          onClick={() => setVisibleLeadForm(true)}
        >
          {/* <Image src="/haierSponser/topBanner.jpg" alt="banner" fill={true} /> */}
          <Image
            src={BannerImage[params?.slug.split("-vs-")[0]]?.Top_Banner?.image}
            alt="banner"
            fill={true}
          />
        </div>
        {staticContent && (
          <div className={styles.content} style={{ marginBottom: "1.2rem" }}>
            {/* <h1>{staticContent?.h1}</h1> */}
            <Content
              data={staticContent?.content}
              h1={staticContent?.h1}
              shadow={true}
              marginBottom={true}
              showShare={true}
              shareModelDetail={shareModelDetail}
              height={isMobileView ? 90 : 100}
              tableHeading={`  ${selectedMobile[0]?.Name} <span>vs</span> ${selectedMobile[1]?.Name} Comparison Overview
              `}
              markdownTableHeading={true}
              tabelData={props?.compareTable}
            />
          </div>
        )}
        <Row>
          <Col xs={12} sm={12} md={9}>
            <section className={styles.compare_section} id="compareSection">
              <div
                className={styles.box}
                style={{
                  display: "grid",
                  placeItems: "center",
                  alignContent: "center",
                  background: "rgba(0, 0, 0, 0.03)",
                  padding: 10,
                }}
              >
                <div style={{ marginBottom: 20 }}>Compare by :</div>
                <div className={styles.jumpTo}>
                  <span>Jump To {rightIcon}</span>
                  <div className={styles.jumpToBody}>
                    {selectedMobile[0].specs?.specification.map((x) => {
                      if (x.title == "General Feature") {
                        return (
                          <div
                            className={styles.list}
                            onClick={() => naviagteTo("Overview")}
                          >
                            Overview
                          </div>
                        );
                      } else {
                        return (
                          <div
                            className={styles.list}
                            onClick={() => naviagteTo(x.title)}
                          >
                            {x.title}
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
              {Array.from({ length: 2 }).map((x, i) => {
                if (selectedMobile[i]) {
                  return (
                    <React.Fragment key={`comp-box${i}`}>
                      <div className={styles.selected_model_wrapper}>
                        <div
                          className={`${styles.box} ${
                            isDesktopScrolled ? styles.isScrolled : ""
                          }`}
                          key={`comp-box${i}`}
                          style={{ border: 0 }}
                        >
                          {/* {i != 0 && (
                            <div
                              className={styles.svg}
                              onClick={() => removeSelectedItems(i)}
                            >
                              {edit} <span>Change</span>
                            </div>
                          )} */}
                          <div className={styles.image_box}>
                            {i === 0 &&
                              params?.slug.split("-vs-")[0] ===
                                "haier-c11-65-inch-oled-android-smart-led-tv" && (
                                <svg
                                  onClick={() => setVideoVisibel(true)}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="50"
                                  height="50"
                                  fill="#fff"
                                  className="bi bi-play-circle"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                  <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
                                </svg>
                              )}
                            <Image
                              src={replaceImageUrl(
                                params?.slug.split("-vs-")[0] ==
                                  "haier-mini-led-h65m95eux" && i == 0
                                  ? "https://cmv360.s3.ap-southeast-1.amazonaws.com/Haier_Mini_LED_H65_M95_EUX_1c1ea0208d.webp"
                                  : selectedMobile[i]?.angleImage
                              )}
                              alt={selectedMobile[i]?.Name}
                              fill={true}
                              sizes="(max-width: 768px) 100%"
                              placeholder="blur"
                              blurDataURL="https://via.placeholder.com/180x120"
                            />
                          </div>
                          <div className={styles.card_body_selected} style={{marginTop:"20px"}}>
                            <div
                              className={`${styles.name} ${
                                isScrolled ? styles.isScrolled : ""
                              }`}
                              // style={{ textAlign: i != 0 && "center" }}
                            >
                              {i == 0 && <span>Haier </span>}
                              {selectedMobile[i]?.Name?.replace("Haier", "")}
                            </div>
                            {!isScrolled && (
                              <div className={styles.modName}>
                                {selectedMobile[i]?.modName}
                              </div>
                            )}
                            <div className={styles.price}>
                              Rs. {selectedMobile[i]?.minPrice} {i != 0 && "*"}
                              {i == 0 && !isScrolled && <span>Great Deal</span>}
                            </div>
                            {i == 0 && (
                              <button
                                className={`${styles.interested_button} enquire_form_open`}
                                onClick={() => setVisibleLeadForm(true)}
                              >
                                Enquire Now!
                              </button>
                            )}
                          </div>
                        </div>
                        {i < 1 && (
                          <div className={styles.vs_border}>
                            <div className={styles.absolute_part}>
                              <span className="vs2">VS</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  );
                } else {
                  return (
                    <React.Fragment key={`comp-box${i}`}>
                      <div
                        className={styles.box}
                        key={`comp-box${i}`}
                        style={{
                          justifyContent: "center",
                          cursor: "pointer",
                          display: "flex !important",
                        }}
                        onClick={() => setShow(true)}
                      >
                        <Image
                          width={70}
                          height={70}
                          alt="car-compare-image"
                          src="/assets/compare/tv.png"
                          sizes="(max-width: 768px) 100%"
                          placeholder="blur"
                          blurDataURL="https://via.placeholder.com/180x120"
                        />
                        <div className={styles.select_text}>
                          Select Television
                        </div>
                      </div>
                    </React.Fragment>
                  );
                }
              })}
            </section>
            {/* <h2 className={styles.summary} id="Summary">
              Summary
            </h2>
            <section className={styles.static_section}>
              {Object?.keys(staticItem)?.map((x) => {
                return (
                  <div className={styles.static_grid}>
                    <div
                      className={styles.box}
                      style={{
                        display: "flex",
                        gap: "10px",
                        "--itemCount": staticItem[x].value.length,
                      }}
                    >
                      {staticItem[x].image ? (
                        <Image
                          width={40}
                          height={40}
                          src={`/assets/images/${staticItem[x].image}.png`}
                          alt={staticItem[x].image}
                        />
                      ) : (
                        ""
                      )}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: getEveryFirstLetterUpperCase(x, "_"),
                        }}
                      ></span>
                    </div>

                    {staticItem[x].value.map((y) => (
                      <div
                        onClick={() => {
                          setInfo({
                            info: y.info,
                            modalImage: y.modalImage,
                          });
                          setVisibleAdvantage(true);
                        }}
                        className={`${styles.box} ${
                          y.highlight ? styles.highlight : ""
                        }`}
                      >
                        {y.value}
                        {y.highlight && <span>{infoIcon}</span>}
                      </div>
                    ))}

                    {selectedStatic[x]?.value?.map((y) => (
                      <div
                        className={styles.box}
                        dangerouslySetInnerHTML={{ __html: y }}
                      ></div>
                    ))}
                  </div>
                );
              })}
              <div className={styles.static_grid}>
                <div className={`${styles.heading} ${styles.box}`}>
                  <div
                    style={{
                      width: "1.75rem",
                      height: "1.75rem",
                      borderRadius: "50%",
                      backgroundColor: "#0ca778",
                      position: "relative",
                    }}
                  >
                    {THUMBS_UP_FILL}
                  </div>
                  <div>
                    <span>What We Like?</span>
                  </div>
                </div>
                <div className={styles.pros}>
                  <div
                    className={`${styles.prosData}  ${styles.pros}`}
                    dangerouslySetInnerHTML={{ __html: hierProsCons?.pros }}
                  />
                </div>
                <div className={styles.pros}>
                  <div
                    className={`${styles.prosData}  ${styles.pros}`}
                    dangerouslySetInnerHTML={{ __html: prosCons?.pros }}
                  />
                </div>
              </div>
              <div className={styles.static_grid}>
                <div className={`${styles.heading} ${styles.box}`}>
                  <div
                    style={{
                      width: "1.75rem",
                      height: "1.75rem",
                      borderRadius: "50%",
                      backgroundColor: "#f03d3d",
                      position: "relative",
                    }}
                  >
                    {THUMBS_DOWN_FILL}
                  </div>
                  <div>
                    <span>What could have been better?</span>
                  </div>
                </div>
                <div className={styles.cons}>
                  <div
                    className={`${styles.consData}  ${styles.cons}`}
                    dangerouslySetInnerHTML={{ __html: hierProsCons?.cons }}
                  />
                </div>
                <div className={styles.cons}>
                  <div
                    className={`${styles.consData} ${styles.cons}`}
                    dangerouslySetInnerHTML={{ __html: prosCons?.cons }}
                  />
                </div>
              </div>
            </section> */}

            {/* <ProsCons hierProsCons={hierProsCons} data={prosCons} /> */}
            <div className={styles.add}>
              {/* <div className={styles.desktop}>
                <Image
                  src={
                    BannerImage[params?.slug.split("-vs-")[0]]?.Mid_Banner
                      ?.image
                  }
                  alt="haier"
                  fill={true}
                />
              </div> */}
              <div className={styles.mobile}>
                <Image
                  src={
                    BannerImage[params?.slug.split("-vs-")[0]]?.Mid_Banner
                      ?.image
                  }
                  alt="haier"
                  fill={true}
                />
              </div>
            </div>
            {selectedMobile.length > 0 && (
              <section className={styles.table_section}>
                {selectedMobile[0].specs?.specification.map((item, i) => (
                  <React.Fragment key={`spec-${i}`}>
                    <div
                      className={styles.table_box}
                      id={ item.title}
                    >  
                       
                      <h2>{ item.title}  </h2>

                      {i == 0 && (
                        <>
                          <div className={styles.row_box}>
                            <div className={styles.box}>Price</div>
                            <div className={styles.box}>
                              Rs. {selectedMobile[0]?.minPrice}
                            </div>
                            <div className={styles.box}>
                              {selectedMobile[1]?.minPrice
                                ? `Rs. ${selectedMobile[1]?.minPrice}*`
                                : ""}
                            </div>
                          </div>
                        </>
                      )}
                      {i == 0 && (
                        <>
                          <div className={styles.row_box}>
                            <div className={styles.box}>
                              <Image
                                src="/assets/images/ratingIcon.png"
                                alt="comparos rating"
                                height={30}
                                width={30}
                                style={{ marginRight: 10 }}
                              />
                              Rating
                            </div>
                            <div className={styles.box}>
                              {star}
                              <div className={styles.rating_box}>
                                {selectedMobile[0]?.avgRating}
                              </div>
                            </div>
                            <div className={styles.box}>
                              {selectedMobile[1]?.avgRating && (
                                <>
                                  {star}
                                  <div className={styles.rating_box}>
                                    {selectedMobile[1]?.avgRating}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                      {item.items.map((spec, i2) => (
                        <div className={styles.row_box}>
                          <div className={styles.box}>
                            {
                              spec.icon !== ""?( <Image
                                src={spec.icon}
                                alt="comparos rating"
                                height={30}
                                width={30}
                                style={{ marginRight: 10 }}
                              />):""
                            }
                         
                            {spec.text}</div>
                          <div className={styles.box}>
                            {spec?.value == "Haier " ? (
                              <Image
                                height={50}
                                width={80}
                                style={{ objectFit: "contain" }}
                                src="https://cmv360.s3.ap-southeast-1.amazonaws.com/Untitled_16_aebe96bac0.jpg"
                                alt="haier"
                              />
                            ) : (
                              spec?.value
                            )}
                          </div>
                          {Array.from({
                            length: selectedMobile?.length - 1,
                          }).map((element, i3) => {
                            let data = selectedMobile[
                              i3 + 1
                            ]?.specs?.specification?.filter(
                              (x) => x.title == item.title
                            );
                            if (data) {
                              let newData = data[0]?.items.filter(
                                (x) => x.text == spec.text
                              );
                              return (
                                <div className={styles.box}>
                                  {(newData?.length > 0 && newData[0]?.value) ||
                                    "NA"}
                                </div>
                              );
                            }
                          })}
                        </div>
                      ))}
                    </div>
                  </React.Fragment>
                ))}
              </section>
            )}
            <div className={styles.down_wrapper}>
              <section className={styles.image_box}>
                <Image
                  src={
                    BannerImage[params?.slug.split("-vs-")[0]]?.Bottom_Banner
                      ?.image
                  }
                  fill={true}
                />
              </section>

              {params?.slug.split("-vs-")[0] == "haier-mini-led-h65m95eux" && (
                <div className={styles.expert_desktop}>
                  <AdviceArticlesCarousel
                    carouselData={props.allExpertReviews}
                    h2={`Expert Reviews, You can Trust`}
                    type="expert-reviews"
                  />
                </div>
              )}

              {/* <div className={styles.compare_card}>
                <ComapreCardNew
                  h2={" LED TV Comparison"}
                  data={sponserDataForPage}
                  allText={true}
                />
              </div> */}
            </div>
          </Col>
          <Col xs={12} sm={12} md={3} className={styles.right_section}>
            <div className={styles.enquire_form}>
              <h2>Enquire Now About Haier Refrigerator</h2>
              <form onSubmit={handleSubmit(onSubmit1)}>
                <input
                  {...register("name", { required: true })}
                  placeholder="Full Name"
                />
                <Controller
                  control={control}
                  name="mobile"
                  rules={{
                    required: true,
                    valueAsNumber: true,
                    maxLength: 10,
                    minLength: 10,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Please enter a number",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <input
                      value={value}
                      type="text"
                      onChange={(text) =>
                        onChange(text.target.value.replace(/[^0-9]/g, ""))
                      }
                      maxLength="10"
                      placeholder="Mobile Number"
                    />
                  )}
                />
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i,
                  })}
                  placeholder="Your Email"
                />
                <AsyncSelect
                  onChange={(e) => {
                    setSelectedCity(e.value);
                  }}
                  id="mobile_searchBar"
                  instanceId="mobile_searchBar"
                  placeholder="Search City"
                  cacheOptions
                  loadOptions={loadOptions}
                  defaultOptions
                />
                <Button
                  type="submit"
                  disabled={
                    selectedCity?.length == 0 ||
                    !isDirty ||
                    !isValid ||
                    submitLoading
                  }
                >
                  Enquire Now!
                </Button>
              </form>
            </div>
            <h2> Other Comparison</h2>

            {comapereData.map((card, i) => (
              <Link
                key={`card-${i}${card.Name}`}
                href={`/refrigerator/${card.slug1}-vs-${card.slug2}`}
                prefetch={false}
                passHref
                legacyBehavior
              >
                <a>
                  <div className={styles.card}>
                    <div className={styles.inner_card}>
                      <div className={styles.image_box}>
                        <Image
                          src={replaceImageUrl(card.image1)}
                          fill={true}
                          quality={100}
                          alt={card?.name1}
                          sizes="(max-width: 768px) 100%"
                          placeholder="blur"
                          blurDataURL="https://via.placeholder.com/180x120"
                        />
                      </div>
                      <div className={styles.title}>{card?.name1}</div>
                      <div className={styles.price}>₹ {card?.minPrice1}</div>
                    </div>
                    <div className={styles.vs_border}>
                      <div className={styles.absolute_part}>
                        <span className="vs2">VS</span>
                      </div>
                    </div>
                    <div className={styles.inner_card}>
                      <div className={styles.image_box}>
                        <Image
                          src={replaceImageUrl(card.image2)}
                          fill={true}
                          quality={100}
                          alt={card?.name2}
                          sizes="(max-width: 768px) 100%"
                          placeholder="blur"
                          blurDataURL="https://via.placeholder.com/180x120"
                        />
                      </div>
                      <div className={styles.title}>{card?.name2}</div>
                      <div className={styles.price}>₹ {card?.minPrice2}</div>
                    </div>
                    <button variant="secondary">Compare Now</button>
                  </div>
                </a>
              </Link>
            ))}
          </Col>
        </Row>
        {/* <div className={styles.news}>
          <h2>Latest Articles & News</h2>  
          {news.map((news, i) => (
            <NewsBox item={news} isSponser={true} />
          ))}
        </div> */}
        {params?.slug.split("-vs-")[0] ==
          "haier-c11-65-inch-oled-android-smart-led-tv" && (
          <div className={styles.news}>
            <h2>Latest Articles & News</h2>
            {news.map((newsItem, i) => (
              <NewsBox key={i} item={newsItem} isSponser={true} />
            ))}
          </div>
        )}
        {/* <div>
          <h2>Quick guide to buying a LED TV</h2>

          <BuyingGuide
            //  h2={'Quick guide to buying a LED TV'}
            data={buyingGuideData}
          />
        </div> */}
        {faq && (
          <div className={styles.faq}>
            <h2>Frequently Asked Questions</h2>
            <Faq data={faq} hidShadow={true} isSponser={true} />
          </div>
        )}
        <button
          className={`${styles.sticky_button} enquire_form_open`}
          onClick={() => setVisibleLeadForm(true)}
        >
          Enquire Now!
        </button>
      </Container>
      <Modal
        show={visibleLeadForm}
        onHide={() => {
          setStep(1);
          setVisibleLeadForm(false);
        }}
        centered
        backdrop="static"
        className={styles.lead_form}
      >
        <Modal.Body>
          <div
            className={styles.close_icon}
            onClick={() => {
              setVisibleLeadForm(false);
              setStep(1);
            }}
          >
            {closeIcon}
          </div>
          {step == 1 && (
            <>
              <h2>
                Welcome To <span> Haier</span>
              </h2>
              {/* <p className={styles.first_child}>
                Are you on the hunt for the ideal LED TV to enhance your viewing
                experience? Look no further! At Haier, we offer a wide range of
                cutting-edge LED TVs designed to meet your entertainment needs.
              </p> */}
              <p>
                Fill out the form below to get personalised recommendations and
                special offers:
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register("name", { required: true })}
                  placeholder="Full Name"
                />

                <Controller
                  control={control}
                  name="mobile"
                  rules={{
                    required: true,
                    valueAsNumber: true,
                    maxLength: 10,
                    minLength: 10,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Please enter a number",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <input
                      value={value}
                      type="text"
                      onChange={(text) =>
                        onChange(text.target.value.replace(/[^0-9]/g, ""))
                      }
                      maxLength="10"
                      placeholder="Mobile Number"
                    />
                  )}
                />

                <input
                  {...register("email", {
                    required: true,
                    pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i,
                  })}
                  placeholder="Your Email"
                />
                <AsyncSelect
                  onChange={(e) => {
                    setSelectedCity(e.value);
                  }}
                  id="mobile_searchBar"
                  instanceId="mobile_searchBar"
                  placeholder="Search City"
                  cacheOptions
                  loadOptions={loadOptions}
                  defaultOptions
                />

                <Button
                  type="submit"
                  disabled={
                    selectedCity?.length == 0 ||
                    !isDirty ||
                    !isValid ||
                    submitLoading
                  }
                >
                  Enquire Now!
                </Button>
              </form>
              <div className={styles.help_text}>
                By proceeding ahead you expressly agree to Comparos.In's{" "}
                <Link href={"/terms-and-condition"}>Terms of Use</Link> and{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>
              </div>
            </>
          )}
          {step == 2 && (
            <div className={styles.step2}>
              {check}
              <div className={styles.body}>
                <p>
                  Dear <span>{name || "Harsh"},</span>
                </p>
                <p>Thank you for your inquiry & interest in Haier OLED TV!</p>
                <p>
                  We appreciate your interest and the opportunity to assist you.
                  Our team is dedicated to providing you with the information
                  and solutions you need.{" "}
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
      <Modal
        show={videoVisible}
        onHide={setVideoVisibel}
        centered
        className={styles.youtube_video}
      >
        <Modal.Body>
          {/* <div
            className={styles.close_icon}
            onClick={() => setVideoVisibel(false)}
          >
            {closeIcon}
          </div> */}
          {/* <iframe
            width="420"
            height="315"
            src="https://www.youtube.com/embed/jlqAgxsbURc?autoplay=1&mute=1"
          ></iframe> */}
          {/* <YouTube videoId="jlqAgxsbURc" opts={opts} /> */}
          {params?.slug.split("-vs-")[0] ==
            "haier-c11-65-inch-oled-android-smart-led-tv" && (
            <lite-youtube
              autoload
              short
              videoplay={setVideoVisibel}
              style={{ height: 400 }}
              videoid={"jlqAgxsbURc"}
            ></lite-youtube>
          )}
        </Modal.Body>
      </Modal>
      <Modal
        show={visibleAdvantage}
        onHide={setVisibleAdvantage}
        centered
        size="sm"
        className={styles.advantage_modal}
      >
        <Modal.Body>
          <div
            className={styles.close_icon}
            onClick={() => setVisibleAdvantage(false)}
          >
            {closeIcon}
          </div>
          <h3></h3>
          <div className={styles.details}>
            {info.modalImage && (
              <div className="text-center">
                <Image
                  height={120}
                  width={120}
                  src={`/haierSponser/${info.modalImage}.png`}
                  alt={info.modalImage}
                />
              </div>
            )}
            <div className={styles.body}>
              {bulb} {info.info}
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Television</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modal_body}>
          <ul>
            {sponserData.slice(0, 5).map((item) => (
              <li
                key={item?.brandName2}
                onClick={() => listItemClicked(item?.slug2)}
              >
                {item?.name2}
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
      {loading && <FilterPageLoader />}
    </>
  );
}
