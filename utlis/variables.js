// For Mobiles
const MobileSelect =
  "Name brandName launchedAt modelPopularity brandSlug slug minPrice supportedNetworks modelName screenSize screenFeatures internalMemory ram primaryCamera additional rearCamera frontCamera";
const MobileSortOptions = [
  // "Popularity",
  "Price -- Low to High",
  "Price -- High to Low",
  // "Newest First",
];

// For Laptops
const LaptopSelect =
  "Name brandName ssdCapacity screenSize processor graphicsMemory graphicProcessor launchedAt ram modelPopularity brandSlug slug minPrice modelName additional";
const LaptopSortOptions = ["Price -- Low to High", "Price -- High to Low"];

// For Refrigerator
const RefrigeratorSelect =
  "vehicleType waterDispenser energyRating colors comprassorWarranty compressor doorAlarm iceDispenser capacity noOfShelves warranty noOfShelvesFreezer Name brandName launchedAt modelPopularity brandSlug slug minPrice modelName";
const RefrigeratorSortOptions = [
  "Price -- Low to High",
  "Price -- High to Low",
];

const AcSelect =
  "Name brandName launchedAt modelPopularity brandSlug slug minPrice modelName energyRating capacity acType";
const AcSortOptions = ["Price -- Low to High", "Price -- High to Low"];

const TvSelect =
  "Name brandName  instaLink launchedAt modelPopularity brandSlug slug minPrice modelName usbSupports warranty sizediagonal screen_type resolution refresh_rate";
const TvSortOptions = ["Price -- Low to High", "Price -- High to Low"];

const WatchSelect =
  "Name brandName launchedAt modelPopularity brandSlug slug minPrice modelName";
const WatchSortOptions = ["Price -- Low to High", "Price -- High to Low"];

const PrinterSelect =
  "Name brandName launchedAt modelPopularity brandSlug slug minPrice modelName";
const PrinterSortOptions = ["Price -- Low to High", "Price -- High to Low"];

const WashingMachineSelect =
  "Name brandName launchedAt modelPopularity brandSlug warranty slug minPrice modelName capacity control";
const WashingMachineSortOptions = [
  "Price -- Low to High",
  "Price -- High to Low",
];

// Default
const defaultQuery = { status: { $nin: ["expired", "upcoming"] } };
const endPoint = {
  mobile: "mobile-models",
  mobileBrands: "mobile-brands",
  laptop: "laptop-models",
  laptopBrands: "laptop-brands",
  refrigerator: "fridge-models",
  refrigeratorBrands: "fridge-brands",
  ac: "ac-models",
  acBrands: "ac-brands",
  tv: "tv-models",
  tvBrands: "tv-brands",
  watch: "watches-models",
  watchBrand: "watches-brands",
  printer: "printer-models",
  printerBrand: "printer-brands",
  washingMachine: "wm-models",
  washingMachineBrand: "wm-brands",
};

const filtersItems = {
  // curved: [
  //   { label: "Yes", value: "yes" },
  //   { label: "No", value: "no" },
  // ],
  // hdmiPorts: [
  //   { label: "1", value: "1" },
  //   { label: "2", value: "2" },
  //   { label: "3", value: "3" },
  // ],
  // refreshRate: [
  //   { label: "30", value: "30" },
  //   { label: "40", value: "40" },
  //   { label: "60", value: "60" },
  // ],
  inch: [
    { label: "21 Inch", value: "21" },
    { label: "22 Inch", value: "22" },
    { label: "24 Inch", value: "24" },
    { label: "32 Inch", value: "32" },
    { label: "40 Inch", value: "40" },
    { label: "42 Inch", value: "42" },
    { label: "43 Inch", value: "43" },
    { label: "50 Inch", value: "50" },
  ],
  screenType: [
    { label: "QLED", value: "QLED" },
    { label: "LCD", value: "lcd" },
    { label: "Led", value: "led" },
    { label: "Amoled", value: "amoled" },
  ],
  resolution: [
    { label: "2K", value: "2K" },
    { label: "4K", value: "4K" },
    { label: "8K", value: "8K" },
  ],

  smartTv: [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ],
  // warranty: [
  //   { label: "1 year", value: "1" },
  //   { label: "2 year", value: "2" },
  //   { label: "3 year", value: "3" },
  //   { label: "5 year", value: "5" },
  // ],
};

export {
  endPoint,
  defaultQuery,
  MobileSelect,
  MobileSortOptions,
  LaptopSelect,
  LaptopSortOptions,
  RefrigeratorSelect,
  RefrigeratorSortOptions,
  AcSelect,
  AcSortOptions,
  TvSelect,
  TvSortOptions,
  WatchSelect,
  WatchSortOptions,
  PrinterSelect,
  PrinterSortOptions,
  WashingMachineSelect,
  WashingMachineSortOptions,
  filtersItems,
};
