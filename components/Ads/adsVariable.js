const defaultSizesDesktop = {
  topSideSizes: [
    [300, 250],
    [336, 280],
    [300, 600],
  ],
  topSizes: [
    [728, 90],
    [970, 90],
    [980, 270],
    [970, 250],
    [980, 50],
  ],
  mediumSideSizes: [
    [300, 250],
    [336, 280],
    [300, 600],
  ],
  bottomSideSizes: [
    [300, 250],
    [336, 280],
    [300, 600],
  ],
  mediumSizes: [
    [728, 90],
    [970, 90],
    [980, 270],
    [970, 250],
    [980, 50],
  ],
  bottomSizes: [
    [728, 90],
    [970, 90],
    [980, 270],
    [970, 250],
    [980, 50],
  ],
  bottomSizes1: [
    [728, 90],
    [970, 90],
    [980, 270],
    [970, 250],
    [980, 50],
  ],
  stickySizes: [
    // [728, 90],
    // [970, 90],
    // [980, 50],
    [1, 1],
  ],
};

const defaultSizesMobile = {
  topSizes: [
    [300, 250],
    [336, 280],
    [320, 50],
    [300, 50],
    [300, 100],
  ],
  mediumSizes: [
    [300, 250],
    [336, 280],
    [320, 50],
    [300, 50],
    [300, 100],
    [300, 600],
  ],
  bottomSizes: [
    [300, 250],
    [336, 280],
    [320, 50],
    [300, 50],
    [300, 100],
  ],
  stickySizes: [
    // [320, 50],
    // [300, 50],
    // [300, 100],
    [1, 1],
  ],
};

const NewsPageDesktop = {
  topSide: "COM360_Desktop/News_Top_300x250",
  topSideSizes: defaultSizesDesktop.topSideSizes,

  top: "COM360_Desktop/News_Top_728x90",
  topSizes: defaultSizesDesktop.topSizes,

  medium: "COM360_Desktop/News_Medium_728x90",
  mediumSizes: defaultSizesDesktop.mediumSizes,

  bottom: "COM360_Desktop/News_Bottom_728x90",
  bottomSizes: defaultSizesDesktop.bottomSizes,

  // sticky: "COM360_Desktop/News_Sticky_728x90",
  sticky: "Comparos_1x1",
  stickySizes: defaultSizesDesktop.stickySizes,
};

const NewsPageMobile = {
  top: "COM360_Mobile/Televisions_Brand_Model_Top_300x250",
  topSizes: defaultSizesMobile.topSizes,

  medium: "COM360_Mobile/News_Medium_300x250",
  mediumSizes: [...defaultSizesMobile.mediumSizes, ...[250, 250]],

  bottom: "COM360_Mobile/News_Bottom_300x250",
  bottomSizes: [...defaultSizesMobile.bottomSizes, ...[250, 250]],

  // sticky: "COM360_Mobile/News_Sticky_320x50",
  sticky: "Comparos_1x1",
  stickySizes: defaultSizesMobile.stickySizes,
};

const NewsSlugPageDesktop = {
  topSide: "COM360_Desktop/News_Detail_Top_300x250",
  topSideSizes: defaultSizesDesktop.topSideSizes,

  top: "COM360_Desktop/News_Detail_Top_728x90",
  topSizes: defaultSizesDesktop.topSizes,

  medium: "COM360_Desktop/News_Detail_Medium_728x90",
  mediumSizes: defaultSizesDesktop.mediumSizes,

  bottom: "COM360_Desktop/News_Detail_Bottom_728x90",
  bottomSizes: defaultSizesDesktop.bottomSizes,

  bottom1: "COM360_Desktop/News_Detail_Bottom1_728x90",
  bottomSizes1: defaultSizesDesktop.bottomSizes,

  // sticky: "COM360_Desktop/News_Detail_Sticky_728x90",
  sticky: "Comparos_1x1",
  stickySizes: defaultSizesDesktop.stickySizes,
};

const NewsSlugPageMobile = {
  top: "COM360_Mobile/Televisions_Brand_Model_Top_300x250",
  topSizes: defaultSizesMobile.topSizes,

  medium: "COM360_Mobile/News_Detail_Medium_300x250",
  mediumSizes: [...defaultSizesMobile.mediumSizes, ...[250, 250]],

  bottom: "COM360_Mobile/News_Detail_Bottom_300x250",
  bottomSizes: [...defaultSizesMobile.bottomSizes, ...[250, 250]],

  bottom1: "COM360_Mobile/News_Detail_Bottom1_300x250",
  bottomSizes1: [...defaultSizesMobile.bottomSizes, ...[250, 250]],

  // sticky: "COM360_Mobile/News_Detail_Sticky_320x50",
  sticky: "Comparos_1x1",
  stickySizes: defaultSizesMobile.stickySizes,
};
const ComparePageDesktop = {
  top: "COM360_Desktop/Compare_Top_728x90",
  topSizes: [...defaultSizesDesktop.topSizes?.slice(0, 2), [970, 250]],

  medium: "COM360_Desktop/Compare_Medium_728x90",
  mediumSizes: defaultSizesDesktop.mediumSizes?.slice(0, 2),

  bottom: "COM360_Desktop/Compare_Bottom_728x90",
  bottomSizes: defaultSizesDesktop.bottomSizes?.slice(0, 2),

  // sticky: "COM360_Desktop/Compare_Sticky_728x90",
  sticky: "Comparos_1x1",
  stickySizes: defaultSizesDesktop.stickySizes?.slice(0, 2),
};

const ComparePageMobile = {
  top: "COM360_Mobile/Compare_Top_300x250",
  topSizes: defaultSizesMobile.topSizes?.slice(1, 3),

  medium: "COM360_Mobile/Compare_Medium_300x250",
  mediumSizes: defaultSizesMobile.mediumSizes?.slice(0, 2),

  bottom: "COM360_Mobile/Compare_Bottom_300x250",
  bottomSizes: defaultSizesMobile.bottomSizes?.slice(0, 2),

  // sticky: "COM360_Mobile/Compare_Sticky_320x50",
  sticky: "Comparos_1x1",
  stickySizes: defaultSizesMobile.stickySizes?.slice(0, 2),
};
const CompareSlugPageDesktop = {
  topSide: "COM360_Desktop/Compare_Slug_Top_300x250",
  topSideSizes: defaultSizesDesktop.topSideSizes?.slice(0, 2),

  top: "COM360_Desktop/Compare_Slug_Top_728x90",
  topSizes: [...defaultSizesDesktop.topSizes?.slice(0, 2), [970, 250]],

  medium: "COM360_Desktop/Compare_Slug_Medium_728x90",
  mediumSizes: defaultSizesDesktop.mediumSizes?.slice(0, 2),

  bottom: "COM360_Desktop/Compare_Slug_Bottom_728x90",
  bottomSizes: defaultSizesDesktop.bottomSizes?.slice(0, 2),

  medium1: "COM360_Desktop/Compare_Slug_Medium_300x250 ",
  mediumSizes1: defaultSizesDesktop.mediumSizes?.slice(0, 2),

  // sticky: "COM360_Desktop/Compare_Slug_Sticky_728x90",
  sticky: "Comparos_1x1",
  stickySizes: defaultSizesDesktop.stickySizes?.slice(0, 2),
};

const CompareSlugPageMobile = {
  top: "COM360_Mobile/Compare_Slug_Top_300x250",
  topSizes: defaultSizesMobile.topSizes?.slice(1, 3),

  medium: "COM360_Mobile/Compare_Slug_Medium_300x250",
  mediumSizes: defaultSizesMobile.mediumSizes?.slice(0, 2),

  bottom: "COM360_Mobile/Compare_Slug_Bottom_300x250",
  bottomSizes: defaultSizesMobile.bottomSizes?.slice(0, 2),

  sticky: "COM360_Mobile/Compare_Slug_Sticky_320x50",
  stickySizes: defaultSizesMobile.stickySizes?.slice(0, 2),
};
const TvIndexPageDesktop = {
  topSide: "COM360_Desktop/Televisions_Top_300x250",
  topSideSizes: defaultSizesDesktop.topSideSizes?.slice(0, 2),

  top: "COM360_Desktop/Televisions_Top_728x90",
  topSizes: [...defaultSizesDesktop.topSizes?.slice(0, 2), [970, 250]],

  medium: "COM360_Desktop/Televisions_Medium_728x90",
  mediumSizes: defaultSizesDesktop.mediumSizes?.slice(0, 2),

  bottom: "COM360_Desktop/Televisions_Bottom_728x90",
  bottomSizes: defaultSizesDesktop.bottomSizes?.slice(0, 2),

  // sticky: "COM360_Desktop/Televisions_Sticky_728x90",
  sticky: "Comparos_1x1",
  stickySizes: defaultSizesDesktop.stickySizes?.slice(0, 2),
};
const TvIndexPageMobile = {
  top: "COM360_Mobile/Televisions_Top_ATF_300x250",
  topSizes: defaultSizesMobile.topSizes?.slice(0, 2),

  medium: "COM360_Mobile/Televisions_Medium_300x250",
  mediumSizes: defaultSizesMobile.mediumSizes?.slice(0, 2),

  bottom: "COM360_Mobile/Televisions_Bottom_300x250",
  bottomSizes: defaultSizesMobile.bottomSizes?.slice(0, 2),

  // sticky: "COM360_Mobile/Televisions_Sticky_320x50",
  sticky: "Comparos_1x1",
  stickySizes: defaultSizesMobile.stickySizes?.slice(0, 2),
};

const TvBrandPageDesktop = {
  topSide: "COM360_Desktop/Televisions_Brand_Top_300x250",
  topSideSizes: defaultSizesDesktop.topSideSizes,

  top: "COM360_Desktop/Televisions_Brand_Top_728x90",
  topSizes: [...defaultSizesDesktop.topSizes.slice(0, 2), [970, 250]],

  medium: "COM360_Desktop/Televisions_Brand_Medium_300x250",
  mediumSideSizes: defaultSizesDesktop.mediumSideSizes,

  medium: "COM360_Desktop/Televisions_Brand_Medium_728x90",
  mediumSizes: defaultSizesDesktop.mediumSizes.slice(0, 2),

  bottom: "COM360_Desktop/Televisions_Brand_Bottom_728x90",
  bottomSizes: defaultSizesDesktop.bottomSizes,

  bottom1: "COM360_Desktop/Televisions_Brand_Bottom_300x250",
  bottom1SideSizes: defaultSizesDesktop.bottomSideSizes?.slice(0, 2),

  // sticky: "COM360_Desktop/Televisions_Brand_Sticky_728x90",
  sticky: "Comparos_1x1",
  stickySizes: defaultSizesDesktop.stickySizes.slice(0, 2),
};

const TvBrandPageMobile = {
  top: "COM360_Mobile/Televisions_Brand_Top_ATF_300x250",
  topSizes: defaultSizesMobile.topSizes.slice(0, 2),

  medium: "COM360_Mobile/Televisions_Brand_Medium_300x250",
  mediumSizes: defaultSizesMobile.mediumSizes?.slice(0, 2),

  bottom: "COM360_Mobile/Televisions_Brand_Bottom_300x250",
  bottomSizes: defaultSizesMobile.bottomSizes?.slice(0, 2),

  // sticky: "COM360_Mobile/Televisions_Brand_Sticky_320x50",
  sticky: "Comparos_1x1",
  stickySizes: defaultSizesMobile.stickySizes?.slice(0, 2),
};

const TvModelPageDesktop = {
  topSide: "COM360_Desktop/Televisions_Model_Top_300x250",
  topSideSizes: defaultSizesDesktop.topSideSizes?.slice(0, 2),

  top: "COM360_Desktop/Televisions_Model_Top_728x90",
  topSizes: [...defaultSizesDesktop.topSizes?.slice(0, 2), [970, 250]],

  medium: "COM360_Desktop/Televisions_Model_Medium_728x90",
  mediumSizes: defaultSizesDesktop.mediumSizes?.slice(0, 2),

  medium1: "COM360_Desktop/Televisions_Model_Medium_300x250",
  mediumSideSizes: defaultSizesDesktop.mediumSideSizes,

  bottom: "COM360_Desktop/Televisions_Model_Bottom_728x90",
  bottomSizes: defaultSizesDesktop.bottomSizes?.slice(0, 2),

  bottomx: "COM360_Desktop/Televisions_Model_Bottom_300x250",
  bottomSideSizes: defaultSizesDesktop.bottomSideSizes,

  bottom1: "COM360_Desktop/Televisions_Model_Bottom1_728x90",
  bottomSizes1: defaultSizesDesktop.bottomSizes1?.slice(0, 2),

  // sticky: "COM360_Desktop/Televisions_Model_Sticky_728x90",
  sticky: "Comparos_1x1",
  stickySizes: defaultSizesDesktop.stickySizes?.slice(0, 2),
};

const TvModelPageMobile = {
  top: "COM360_Mobile/Televisions_Model_Top_ATF_300x250",
  topSizes: defaultSizesMobile.topSizes?.slice(0, 2),

  medium: "COM360_Mobile/Televisions_Model_Medium_300x250",
  mediumSizes: defaultSizesMobile.mediumSizes?.slice(0, 2),

  bottom: "COM360_Mobile/Televisions_Model_Bottom_300x250",
  bottomSizes: defaultSizesMobile.bottomSizes?.slice(0, 2),

  // sticky: "COM360_Mobile/Televisions_Model_Sticky_320x50",
  sticky: "Comparos_1x1",
  stickySizes: defaultSizesMobile.stickySizes?.slice(0, 2),
};

export {
  ComparePageDesktop,
  ComparePageMobile,
  CompareSlugPageDesktop,
  CompareSlugPageMobile,
  TvIndexPageDesktop,
  TvIndexPageMobile,
  TvBrandPageDesktop,
  TvBrandPageMobile,
  TvModelPageDesktop,
  TvModelPageMobile,
  NewsPageDesktop,
  NewsPageMobile,
  NewsSlugPageDesktop,
  NewsSlugPageMobile,
};
