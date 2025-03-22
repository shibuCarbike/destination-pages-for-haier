// /* FS MODULE IMPORT */
// import fs from "fs";

// /* API IMPORT */
// import axios from "axios";

// /* MOMENTJS IMPORT */
// import moment from "moment";

// async function fetchData() {
//     let [brands, models, data] = await Promise.all([
//         axios
//             .get(
//                 "https://api.comparos.in/generalFetchDataAmpQuery?model=tv-brands&select=slug"
//             )
//             .then(function (response) {
//                 return response?.data?.data?.map((element) => {
//                     return { slug: element?.slug ?? "NA" };
//                 });
//             }),

//         axios
//             .get(
//                 "https://api.comparos.in/generalFetchDataAmpQuery?model=tv-models&select=slug+brandSlug"
//             )
//             .then(function (response) {
//                 return response?.data?.data?.map((element) => {
//                     return {
//                         slug: element?.slug ?? "NA",
//                         brandSlug: element?.brandSlug ?? "NA",
//                     };
//                 });
//             }),
//         axios.get('https://tv.comparos.in/sitemap.xml').then((response) => { return JSON.stringify(response?.data) })
//     ]);

//     return { brands, models, data };
// }
// const allSiteMapLinks = [
//     'sitemap_brands.xml',
//     'sitemap_category.xml',
//     'sitemap_models.xml',
//     'sitemap_static_pages.xml',
// ]

// const staticPages = [
//     'brands',
//     'search',
//     'compare',
//     'smart-tv',
//     'latest',
//     'popular',
//     'upcoming',
// ]

// let { brands, models, data } = await fetchData();
// let previousDate = data.split("<lastmod>", 2)[1].split("</lastmod>")[0]
// let currentDate = moment(moment().format('YYYY-MM-DD'))
// let diff = moment(currentDate).diff(previousDate, 'days')

// const publicDir = "./public"


// function sitemapBrands() {
//     fs.unlinkSync(`${publicDir}/sitemap_brands.xml`);
//     let filePath = `${publicDir}/sitemap_brands.xml`;
//     fs.appendFileSync(
//         filePath,
//         `<?xml version="1.0" encoding="utf-8"?>
//       <urlset
//         xmlns:xhtml="http://www.w3.org/1999/xhtml"
//         xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//         ${brands
//             .map(
//                 (x) =>
//                     `<url>
//           <loc>https://tv.comparos.in/${x?.slug}</loc>
//           <lastmod>${moment()
//                         .subtract(1, "days")
//                         .format("YYYY-MM-DD")}</lastmod>
//           <priority>0.5</priority>
//         </url>`
//             )
//             .join(`\n        `)}
//       </urlset>`
//     );
//     console.log(`Sitemap -> sitemap_brands.xml -> created successfully!`);
// }

// function category() {
//     let urls = [
//         "best-tv-under-10000-in-india",
//         "best-tv-under-15000-in-india",
//         "best-tv-under-20000-in-india",
//         "best-tv-under-25000-in-india",
//         "best-tv-under-30000-in-india",
//         "best-tv-under-35000-in-india",
//         "best-tv-under-40000-in-india",
//         "best-tv-under-50000-in-india",
//     ];
//     fs.unlinkSync(`${publicDir}/sitemap_category.xml`);
//     let filePath = `${publicDir}/sitemap_category.xml`;
//     fs.appendFileSync(
//         filePath,
//         `<?xml version="1.0" encoding="utf-8"?>
//       <urlset
//         xmlns:xhtml="http://www.w3.org/1999/xhtml"
//         xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//         ${urls
//             .map(
//                 (x) =>
//                     `<url>
//           <loc>https://tv.comparos.in/${x}</loc>
//           <lastmod>${moment()
//                         .subtract(1, "days")
//                         .format("YYYY-MM-DD")}</lastmod>
//           <priority>0.5</priority>
//         </url>`
//             )
//             .join(`\n        `)}
//       </urlset>`
//     );
//     console.log(`Sitemap -> sitemap_category.xml -> created successfully!`);
// }

// function sitemapModels() {
//     fs.unlinkSync(`${publicDir}/sitemap_models.xml`);
//     let filePath = `${publicDir}/sitemap_models.xml`;
//     fs.appendFileSync(
//         filePath,
//         `<?xml version="1.0" encoding="utf-8"?>
//       <urlset
//         xmlns:xhtml="http://www.w3.org/1999/xhtml"
//         xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//         ${models
//             .map(
//                 (x) =>
//                     `<url>
//           <loc>https://tv.comparos.in/${x?.brandSlug}/${x?.slug}</loc>
//           <lastmod>${moment()
//                         .subtract(1, "days")
//                         .format("YYYY-MM-DD")}</lastmod>
//           <priority>0.5</priority>
//         </url>`
//             )
//             .join(`\n        `)}
//       </urlset>`
//     );
//     console.log(`Sitemap -> sitemap_models.xml -> created successfully!`);
// }

// function sitemapStaticPages() {
//     fs.unlinkSync(`${publicDir}/sitemap_static_pages.xml`);
//     let filePath = `${publicDir}/sitemap_static_pages.xml`;
//     fs.appendFileSync(
//         filePath,
//         `<?xml version="1.0" encoding="utf-8"?>
//       <urlset
//         xmlns:xhtml="http://www.w3.org/1999/xhtml"
//         xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//         ${staticPages
//             .map(
//                 (x) =>
//                     `<url>
//           <loc>https://tv.comparos.in/${x}</loc>
//           <lastmod>${moment()
//                         .subtract(1, "days")
//                         .format("YYYY-MM-DD")}</lastmod>
//           <priority>0.5</priority>
//         </url>`
//             )
//             .join(`\n        `)}
//       </urlset>`
//     );
//     console.log(`Sitemap -> sitemap_static_pages.xml -> created successfully!`);
// }

// function allSiteMaps() {
//     fs.unlinkSync(`${publicDir}/sitemap.xml`);
//     let filePath = `${publicDir}/sitemap.xml`;
//     fs.appendFileSync(
//         filePath,
//         `<?xml version="1.0" encoding="utf-8"?>
//     <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//         ${allSiteMapLinks
//             .map(
//                 (x) =>
//                     `  <sitemap>
//           <loc>https://tv.comparos.in/${x}</loc>
//           <lastmod>${moment()
//                         .subtract(1, "days")
//                         .format("YYYY-MM-DD")}</lastmod>
//           </sitemap>`
//             )
//             .join(`\n `)}
//       </sitemapindex>
//       `
//     );
//     console.log(`Sitemap -> all_sitemaps.xml -> created successfully!`);
// }


// if (diff >= 7) {
//     sitemapBrands();
//     category();
//     sitemapModels();
//     sitemapStaticPages();
//     allSiteMaps();
// }
// else{
//     console.log(`-----> Sitemaps Already Updated ${diff} Days Ago.`)
// }

import fs from "fs";
import axios from "axios";
import moment from "moment";

const publicDir = "./public";
const allSiteMapLinks = [
    "sitemap_brands.xml",
    "sitemap_category.xml",
    "sitemap_models.xml",
    "sitemap_static_pages.xml",
];

const staticPages = [
    "brands",
    "search",
    "compare",
    "smart-tv",
    "latest",
    "popular",
    "upcoming",
];

async function fetchData() {
    try {
        let [brands, models, sitemapData] = await Promise.all([
            axios.get("https://api.comparos.in/generalFetchDataAmpQuery?model=tv-brands&select=slug")
                .then(response => response?.data?.data?.map(el => ({ slug: el?.slug ?? "NA" })))
                .catch(() => []),
            axios.get("https://api.comparos.in/generalFetchDataAmpQuery?model=tv-models&select=slug+brandSlug")
                .then(response => response?.data?.data?.map(el => ({ slug: el?.slug ?? "NA", brandSlug: el?.brandSlug ?? "NA" })))
                .catch(() => []),
            axios.get("https://tv.comparos.in/sitemap.xml")
                .then(response => response?.data)
                .catch(() => ""),
        ]);
        return { brands, models, sitemapData };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { brands: [], models: [], sitemapData: "" };
    }
}

function extractLastModifiedDate(sitemapData) {
    let match = sitemapData.match(/<lastmod>(.*?)<\/lastmod>/);
    return match ? moment(match[1], "YYYY-MM-DD") : moment().subtract(8, "days");
}

function deleteFile(filePath) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

function writeSitemap(filePath, content) {
    deleteFile(filePath);
    fs.writeFileSync(filePath, content);
}

function generateSitemap(filePath, urls) {
    let content = `<?xml version="1.0" encoding="utf-8"?>
    <urlset xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls.map(x => `<url><loc>https://tv.comparos.in/${x}</loc><lastmod>${moment().subtract(1, "days").format("YYYY-MM-DD")}</lastmod><priority>0.5</priority></url>`).join("\n")}
    </urlset>`;
    writeSitemap(filePath, content);
    console.log(`✅ Sitemap -> ${filePath} created successfully!`);
}

async function main() {
    let { brands, models, sitemapData } = await fetchData();
    let previousDate = extractLastModifiedDate(sitemapData);
    let diff = moment().diff(previousDate, 'days');

    if (diff < 7) {
        console.log(`✅ Sitemaps are up-to-date (${diff} days ago). No update needed.`);
        return;
    }

    generateSitemap(`${publicDir}/sitemap_brands.xml`, brands.map(b => b.slug));
    generateSitemap(`${publicDir}/sitemap_category.xml`, [
        "best-tv-under-10000-in-india",
        "best-tv-under-15000-in-india",
        "best-tv-under-20000-in-india",
        "best-tv-under-25000-in-india",
        "best-tv-under-30000-in-india",
        "best-tv-under-35000-in-india",
        "best-tv-under-40000-in-india",
        "best-tv-under-50000-in-india",
    ]);
    generateSitemap(`${publicDir}/sitemap_models.xml`, models.map(m => `${m.brandSlug}/${m.slug}`));
    generateSitemap(`${publicDir}/sitemap_static_pages.xml`, staticPages);

    let sitemapIndex = `<?xml version="1.0" encoding="utf-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allSiteMapLinks.map(x => `<sitemap><loc>https://tv.comparos.in/${x}</loc><lastmod>${moment().subtract(1, "days").format("YYYY-MM-DD")}</lastmod></sitemap>`).join("\n")}
    </sitemapindex>`;
    writeSitemap(`${publicDir}/sitemap.xml`, sitemapIndex);
    console.log(`✅ Sitemap -> sitemap.xml created successfully!`);
}

main();
