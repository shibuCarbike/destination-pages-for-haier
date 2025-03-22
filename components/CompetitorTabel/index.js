import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.scss";
import Table from "react-bootstrap/Table";
import { replaceImageUrl } from "utlis/constant";
import { getEveryFirstLetterUpperCase } from "utlis/constant";
export default function CompetitorTabel({ data, h2 }) {
  return (
    <div className={styles.wrapper}>
      <h2>{h2} Specifications</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            {data.map((item, i) => (
              <th key={`table-header-${i}`} title={item?.Name}>
                <Link
                  href={`/${item?.brandSlug}/${item.slug}`}
                  prefetch={false}
                >
                  <div className={styles.image_box}>
                    <Image
                      src={replaceImageUrl(
                        item?.angleImage?.url || item?.angleImage
                      )}
                      alt={item?.Name}
                      fill={true}
                      sizes="(max-width: 768px) 100%"
                      placeholder="blur"
                      blurDataURL="https://via.placeholder.com/180x120"
                    />
                  </div>
                  <div className={styles.name}>{item?.Name}</div>
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Refresh Rate</td>
            {data.map((item, i) => (
              <td key={`screenSize-${i}`}>
                {(item?.refresh_rate && item?.refresh_rate) || "NA"}
              </td>
            ))}
          </tr>
          <tr>
            <td>Screen Resolution</td>
            {data.map((item, i) => (
              <td key={`battery-${i}`}>
                {(item?.resolution && item?.resolution) || "NA"}
              </td>
            ))}
          </tr>
          <tr>
            <td>Screen Type</td>
            {data.map((item, i) => (
              <td key={`frontCamera-${i}`}>
                {(item?.screen_type && item?.screen_type) || "NA"}
              </td>
            ))}
          </tr>
          <tr>
            <td>Size Diagonal</td>
            {data.map((item, i) => (
              <td key={`ram-${i}`}>
                {(item?.sizediagonal && item?.sizediagonal) || "NA"}
              </td>
            ))}
          </tr>
          <tr>
            <td>Hdmi Ports</td>
            {data.map((item, i) => (
              <td key={`rearCamera-${i}`}>
                {(item?.hdmiPorts && item?.hdmiPorts) || "NA"}
              </td>
            ))}
          </tr>
          <tr>
            <td>Usb Supports</td>
            {data.map((item, i) => (
              <td key={`processor-${i}`}>
                {(item?.usbSupports && item?.usbSupports) || "NA"}
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
