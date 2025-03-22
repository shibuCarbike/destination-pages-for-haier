import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";
function Budgets(props) {
  return (
    <div className={styles.wrapper}>
      <h2 style={{ paddingTop: "10px" }}>{props.h2}</h2>
      <div className={styles.budgetList}>
        {props?.data?.map((item, index) => (
          <Link href={`/${item?.path}`} passHref legacyBehavior>
            <a>
              <div className={styles.budget}>
                <span>{` TV ${item?.label}`}</span>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Budgets;
