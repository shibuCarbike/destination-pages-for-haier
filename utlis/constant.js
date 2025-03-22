const getRating = (data, from) => {
  let res = data?.map((item, i) => {
    if (item?.star) {
      return item;
    } else {
      return (item = {
        ...item,
        star: parseFloat(Math.random() * (5 - 1) + 1).toFixed(1),
        userCount: Math.floor(Math.random() * 500) + 1,
      });
    }
  });
  return res;
};

const getEveryFirstLetterUpperCase = (text, splitBase) => {
  let spliText = text?.split(splitBase || " ");
  spliText = spliText
    ?.map(
      (text) => text.charAt(0)?.toUpperCase() + text?.slice(1).toLowerCase()
    )
    .join(" ");
  return spliText;
};

const getSplitAndSorted = (arr) => {
  let split = arr
    ?.map((x) => x.split("-"))
    .flat(Infinity)
    .map((y) => Number(y))
    .sort();
  return split;
};

const replaceImageUrl = (url) => {
  let imageUrl = url?.url || url;
  const oldDomain = "cmv360.s3.ap-southeast-1.amazonaws.com";
  const newDomain = "d1odgbsvvxl2qd.cloudfront.net";
  return imageUrl?.replace(oldDomain, newDomain);
};
const sortDataAccordingPrice = (data, type) => {
  switch (type) {
    case "increase": {
      let sortedData = data.sort(
        (a, b) =>
          Number(a.minPrice.replace(",", "")) -
          Number(b.minPrice.replace(",", ""))
      );
      return sortedData;
    }
    case "decrease": {
      let sortedData = data.sort(
        (a, b) =>
          Number(b.minPrice.replace(",", "")) -
          Number(a.minPrice.replace(",", ""))
      );
      return sortedData;
    }
  }
};

export {
  getRating,
  getSplitAndSorted,
  getEveryFirstLetterUpperCase,
  sortDataAccordingPrice,
  replaceImageUrl,
};
