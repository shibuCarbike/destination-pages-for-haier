/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import ReactMarkdown from "react-markdown";
import { upIcon, downIcon } from "utlis/icons";
import { getEveryFirstLetterUpperCase } from "utlis/constant";
import CustomTable from "components/CustomTable";
import moment from "moment";
import Image from "next/image";
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  // LinkedinShareButton,
} from "react-share";

export default function Content({
  data,
  h1,
  h2,
  p,
  footer,
  height,
  shadow,
  markdown,
  margin,
  tabelData,
  note,
  lastUpdate,
  noWrapCount,
  additionalContent,
  top10Text,
  editContentDateText,
  hideReadMore,
  showSameH1,
  showShare,
  shareModelDetail,
  tableHeading,
  markdownTableHeading,
  showNoteAndreadMore,
  tableHighlightContent,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showMoreShare, setShowMoreShare] = useState(false);
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);
  let d = new Date();
  const shareUrl = typeof window !== "undefined" && window.location.href;
  if (data?.length > 0) {
    return (
      <div
        className={`${styles.content_wrapper} ${shadow ? styles.shadow : ""}`}
        // onClick={() => {
        //   !isMobile && setShowMoreShare(!showMoreShare);
        // }}
      >
        {!showShare ? (
          <h1 className={editContentDateText ? styles.h1WithEditText : ""}>
            {showSameH1 ? h1 : h1}
          </h1>
        ) : (
          <div className={styles.h1WithShare}>
            <h1>
              <div dangerouslySetInnerHTML={{ __html: h1 }} />
            </h1>
            {/* <div className={styles.icons}>
              <p>Share via: </p>
              <WhatsappShareButton url={shareUrl}>
                <Image
                  alt={`whatsapp-share-icon`}
                  title={`Whatsapp`}
                  width={32}
                  height={32}
                  style={{
                    width: "32px",
                    height: "32px",
                    cursor: "pointer",
                    margin: "0px",
                  }}
                  className={styles.shareIcon}
                  src={`/images/whatsapp.svg`}
                />
              </WhatsappShareButton>
              <FacebookShareButton url={shareUrl}>
                <Image
                  alt={`facebook-share-icon`}
                  title={`Facebook`}
                  width={32}
                  height={32}
                  style={{
                    width: "32px",
                    height: "32px",
                    cursor: "pointer",
                    margin: "0px",
                  }}
                  className={styles.shareIcon}
                  src={`/images/facebook.svg`}
                />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl}>
                <Image
                  alt={`twitter-share-icon`}
                  title={`Twitter`}
                  width={42}
                  height={42}
                  style={{
                    width: "42px",
                    height: "42px",
                    cursor: "pointer",
                    margin: "0px",
                  }}
                  className={styles.shareIcon}
                  src={`/images/x.svg`}
                />
              </TwitterShareButton>
              <div className={styles.allshareIcon} onClick={shareModelDetail}>
                <Image
                  width={22}
                  height={22}
                  src={"/images/share-icon.svg"}
                  priority={true}
                  title="Share"
                  alt="share-icon"
                />
              </div>
            </div> */}
            <div style={{ display: "flex" }}>
              {/* <div className={styles.iconContainer}>
                <WhatsappShareButton url={shareUrl}>
                  <Image
                    alt="WhatsApp share icon"
                    title="WhatsApp"
                    width={32}
                    height={32}
                    className={styles.shareIcon}
                    src={`/images/whatsapp.svg`}
                  />
                </WhatsappShareButton>
                <FacebookShareButton url={shareUrl}>
                  <Image
                    alt="Facebook share icon"
                    title="Facebook"
                    width={32}
                    height={32}
                    className={styles.shareIcon}
                    src={`/images/facebook.svg`}
                  />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl}>
                  <Image
                    alt="Twitter share icon"
                    title="Twitter"
                    width={32}
                    height={32}
                    className={styles.shareIcon}
                    src={`/images/x.svg`}
                  />
                </TwitterShareButton>
              </div> */}
            </div>
            <div className={styles.moreShareOptions}>
              <div className={styles.shareDesktop}>
                <div
                  onClick={() => {
                    setShowMoreShare(!showMoreShare);
                  }}
                  className={styles.shareButton}
                >
                  <p>Share</p>
                  <Image
                    width={13}
                    height={13}
                    src={"/images/share-icon.svg"}
                    priority={true}
                    title="Share"
                    alt="share-icon"
                    style={{ color: "#878787" }}
                  />
                </div>
              </div>
              <div className={styles.shareMobile}>
                <div onClick={shareModelDetail} className={styles.shareButton}>
                  <p>Share</p>
                  <Image
                    width={13}
                    height={13}
                    src={"/images/share-icon.svg"}
                    priority={true}
                    title="Share"
                    alt="share-icon"
                  />
                </div>
              </div>
              {showMoreShare && (
                <div className={styles.shareOptions}>
                  <div className={styles.shareOption}>
                    <div>
                      <Image
                        alt="WhatsApp share icon"
                        title="WhatsApp"
                        width={32}
                        height={32}
                        className={styles.shareIcon}
                        src={`/images/whatsapp.svg`}
                      />
                    </div>
                    <WhatsappShareButton url={shareUrl}>
                      <p>WhatsApp</p>
                    </WhatsappShareButton>
                  </div>
                  <div className={styles.shareOption}>
                    <div>
                      <Image
                        alt="Facebook share icon"
                        title="Facebook"
                        width={32}
                        height={32}
                        className={styles.shareIcon}
                        src={`/images/facebook.svg`}
                      />
                    </div>
                    <FacebookShareButton url={shareUrl}>
                      <p>Facebook</p>
                    </FacebookShareButton>
                  </div>
                  <div className={styles.shareOption}>
                    <div>
                      {" "}
                      <Image
                        alt="Twitter share icon"
                        title="Twitter"
                        width={32}
                        height={32}
                        className={styles.shareIcon}
                        src={`/images/x.svg`}
                      />
                    </div>
                    <TwitterShareButton url={shareUrl}>
                      <p>Twitter</p>
                    </TwitterShareButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {p && (
          <p>
            By: Editorial Team-Comparos.In | Prices as of{" "}
            {moment(d).format("DD-MMM-YYYY")}
          </p>
        )}
        {h2 && <h2>{getEveryFirstLetterUpperCase(h2)}</h2>}
        {markdown ? (
          <div
            style={{ "--height": `${height || 90}px` }}
            className={`${styles.content} ${isOpen && styles.open}`}
          >
            <ReactMarkdown>{data}</ReactMarkdown>
            {additionalContent?.length > 0 && (
              <div
                dangerouslySetInnerHTML={{ __html: additionalContent }}
                className={styles.additionalContent}
              />
            )}
            {tabelData && (
              <CustomTable
                noWrapCount={noWrapCount}
                data={tabelData}
                lastUpdate={lastUpdate}
              />
            )}
            {note &&
              "Note: The information in this table is based on the specifications available at the time of writing, and it's always recommended to check for the latest updates and reviews before making a purchase. Prices and availability may vary."}
          </div>
        ) : (
          <div
            style={{ "--height": `${height || 90}px` }}
            className={`${styles.content} ${isOpen && styles.open} ${
              hideReadMore ? styles.open : ""
            }`}
          >
            <div dangerouslySetInnerHTML={{ __html: data }} />
            <div dangerouslySetInnerHTML={{ __html: top10Text }} />
            {tabelData && (
              <CustomTable
                noWrapCount={noWrapCount}
                data={tabelData}
                lastUpdate={lastUpdate}
                h2={tableHeading}
                markdownTableHeading={markdownTableHeading}
                tableHighlightContent={tableHighlightContent}
              />
            )}
            {additionalContent?.length > 0 && (
              <div dangerouslySetInnerHTML={{ __html: additionalContent }} />
            )}
            {note && (
              <p
                style={{
                  fontSize: "13px",
                }}
              >
                {/* Note: The information in this table is based on the
                specifications available at the time of writing, and it's always
                recommended to check for the latest updates and reviews before
                making a purchase. Prices and availability may vary. */}
              </p>
            )}
          </div>
        )}
        {!hideReadMore && (
          <div className={`${styles.button_div} ${isOpen && styles.collapsed}`}>
            <button
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            >
              {!isOpen ? "Read More" : "Read Less"}
              {!isOpen ? downIcon : upIcon}
            </button>
          </div>
        )}
      </div>
    );
  }
}
