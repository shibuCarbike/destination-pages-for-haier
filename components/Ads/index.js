import styles from "./index.module.scss";
import { AdSlot } from "react-dfp";
import React, { useState } from "react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function Ad({
  mobileUrl,
  desktopUrl,
  mobileSizes,
  desktopSizes,
  targetingArguments,
  margin,
  marginBottom,
  marginTop,
}) {
  const [loading, setLoading] = useState(true);

  return (
    <div
      className={`${styles.add} ${margin && styles.margin} ${
        marginTop && styles.marginTop
      } ${marginBottom && styles.marginBottom}`}
    >
      {loading && (
        <div className={styles.ad_loader_div}>
          <p className={styles.ad_text}>Ad</p>
          <div className={styles.border}></div>
        </div>
      )}

      <div className={styles.desktop}>
        <AdSlot
          sizes={
            desktopSizes || [
              [970, 90],
              [728, 90],
              [970, 250],
            ]
          }
          onSlotRender={(e) => {
            setLoading(false);
          }}
          // onSlotIsViewable={(e) => {
          //   setLoading(false);
          // }}
          targetingArguments={
            typeof targetingArguments === "object"
              ? { ...targetingArguments }
              : { page: targetingArguments }
          }
          adUnit={desktopUrl || "Comparos_New_HP_Desktop_970x250_TOP"}
        />
      </div>
      <div className={styles.mobile}>
        <AdSlot
          onSlotRender={(e) => {
            setLoading(false);
          }}
          // onSlotIsViewable={(e) => {
          // setLoading(false);
          // }}
          targetingArguments={
            typeof targetingArguments === "object"
              ? { ...targetingArguments }
              : { page: targetingArguments }
          }
          sizes={mobileSizes || [[300, 250]]}
          adUnit={mobileUrl || "Comparos_New_HP_Mobile_300x250_Top"}
        />
      </div>
    </div>
  );
}

function SideAd({
  url,
  sizes,
  targetingArguments,
  sticky,
  top,
  margin,
  marginBottom,
  marginTop,
}) {
  const [loading, setLoading] = useState(true);
  return (
    <div
      className={`${styles.sideAds} ${sticky && styles.sticky} ${
        margin && styles.margin
      } ${marginTop && styles.marginTop} ${
        marginBottom && styles.marginBottom
      }`}
      style={{ "--top": `${top || 110}px` }}
    >
      {loading && (
        <div className={styles.ad_loader_div}>
          <p className={styles.ad_text}>Ad</p>
          <div className={styles.border}></div>
        </div>
      )}

      <AdSlot
        sizes={
          sizes || [
            [970, 90],
            [728, 90],
            [970, 250],
          ]
        }
        onSlotRender={(e) => {
          // setLoading(true);
          setLoading(false);
        }}
        onSlotIsViewable={(e) => {
          // setLoading(false);
        }}
        targetingArguments={
          typeof targetingArguments === "object"
            ? { ...targetingArguments }
            : { page: targetingArguments }
        }
        adUnit={url || `Comparos_New_HP_Desktop_970x250_TOP`}
      />
    </div>
  );
}

function StickyAd({
  mobileUrl,
  desktopUrl,
  mobileSizes,
  desktopSizes,
  targetingArguments,
}) {
  const [showSticky, setShowSticky] = useState(true);

  if (showSticky) {
    return (
      <div className={styles.stickyAds}>
        <div className={styles.box}>
          <div className={styles.desktop}>
            <AdSlot
              sizes={
                desktopSizes || [
                  [970, 250],
                  [728, 90],
                  [980, 50],
                  [980, 270],
                ]
              }
              targetingArguments={{ page: targetingArguments }}
              adUnit={desktopUrl || "Comparos_Desktop_Sticky"}
              onSlotIsViewable={(eventData) => setShowSticky(true)}
            />
          </div>
          <div className={styles.mobile}>
            <AdSlot
              sizes={
                mobileSizes || [
                  [300, 50],
                  [320, 50],
                ]
              }
              targetingArguments={{ page: targetingArguments }}
              adUnit={mobileUrl || "Comparos_Mobile_300x50_Sticky"}
              onSlotIsViewable={(eventData) => setShowSticky(true)}
            />
          </div>
          <svg
            className={styles.close_icon}
            onClick={() => setShowSticky(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="red"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </div>
      </div>
    );
  }
}

export { Ad, StickyAd, SideAd };
