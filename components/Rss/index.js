import RSS from "rss";

import api from "api.service";

import fs from "fs";

export default async function generateRssFeed() {
  const res = await api.getNews(30, "createdAt:DESC");
  const site_url = "https://tv.comparos.in/";

  const feedOptions = {
    title: "Latest News and Articles | Comparos",
    description:
      "All the latest news about mobile phones, Laptops, TV, AC, refrigerators, Watches, and printers you will find here at comparos",
    site_url: `${site_url}/news`,
    feed_url: `${site_url}/rss/news.xml`,
    image_url: `${site_url}/images/logo.png`,
    pubDate: new Date(),
    language: "en-IN",
    copyright: `All rights reserved ${new Date().getFullYear()}, Comparos.in`,
  };

  const feed = new RSS(feedOptions);

  res?.data?.map((element) => {
    feed.item({
      title: element.title,
      description: element?.smallDesc,
      url: `${site_url}/news/${element.slug}`,
      date: element?.createdAt,
      enclosure: { url: element?.image },
    });
  });

  fs.writeFileSync("public/rss/news.xml", feed.xml({ indent: true }));
}
