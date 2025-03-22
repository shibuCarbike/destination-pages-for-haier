import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { Button } from "react-bootstrap";

export default function NoDataFound({ handleFilterClick }) {
  return (
    <div className={styles.noDataFound}>
      <div className={styles.image_box}>
        <Image
          src="https://www.comparos.in/images/noData.svg"
          alt="banner"
          fill={true}
          sizes="(max-width: 768px) 100%"
          placeholder="blur"
          blurDataURL="https://via.placeholder.com/180x120"
        />
      </div>
      {handleFilterClick && (
        <Button onClick={() => handleFilterClick("clearAll")}>
          Reset Filters
        </Button>
      )}
    </div>
  );
}
