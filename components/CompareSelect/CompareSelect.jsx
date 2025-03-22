import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import styles from './compareSelect.module.scss'
import { closeIcon, searchIcon } from "utlis/icons";
import { replaceImageUrl } from "utlis/constant";
const CompareSelect = ({selectedMobile,removeSelectedItems,placeHolderImage,comparePath,compareItem,setShow,handleCompareClick}) => {
    const [isMobile, setIsMobile] = useState( false);

    const checkScreenSize = () => setIsMobile(window.innerWidth < 600 ?true:false)
    useEffect(() => {
        checkScreenSize()
        window.addEventListener("resize", checkScreenSize);

        const CompareSection = document.getElementById("compareSection");

    const scroll = (e) => {
      let { top } = CompareSection.getBoundingClientRect();
      if (window.innerWidth > 600) {
        if (top <= 90) {
          header.style.transform = "translateY(-100%)";
        } else {
          header.style.transform = "translateY(0px)";
        }
      } else {
        if (top <= 108) {
          header.style.transform = "translateY(-100%)";
        } else {
          header.style.transform = "translateY(0px)";
        }
      }
    };
    window.addEventListener("scroll", scroll);
    return () =>{ window.removeEventListener("scroll", scroll)};
      }, []);
    const gridStyle =isMobile && selectedMobile.length >2 ?{display:'grid', gridTemplateColumns: `repeat(${selectedMobile.length}, minmax(150px, 1fr))`,overflow:'auto'}:{}
    const watchName =isMobile && selectedMobile.length >2 ?{wordWrap:"break-word",maxWidth:"7rem"}:{}
    
  return (
    <>
     <section className={styles.compare_section} style={gridStyle} id="compareSection">
         
          {Array.from({ length: 4 }).map((x, i) => {
            if (selectedMobile[i]) {
              return (
                <React.Fragment key={`comp-box${i}`}>
                  <div className={styles.selected_model_wrapper}>
                    <div
                      className={styles.box}
                      key={`comp-box${i}`}
                      style={{ cursor: "auto", border: 0 }}
                    >
                      <div
                        className={styles.svg}
                        onClick={() => removeSelectedItems(i)}
                      >
                        {closeIcon}
                      </div>
                      <Link
                        prefetch={false}
                        passHref
                        href={`/${comparePath}/${selectedMobile[i]?.brandSlug}/${selectedMobile[i]?.slug}`}
                      >
                        <div className={styles.image_box}>
                          <Image
                            src={replaceImageUrl(selectedMobile[i]?.angleImage)}
                            alt={selectedMobile[i]?.Name}
                            fill={true}
                            sizes="(max-width: 768px) 100%"
                            placeholder="blur"
                            blurDataURL="https://via.placeholder.com/180x120"
                          />
                        </div>
                        <div className={styles.name} style={watchName}>
                          {`${selectedMobile[i]?.brandName} ${selectedMobile[i]?.Name}`}
                        </div>
                        <div className={styles.price}>
                        ₹ {" "}{selectedMobile[i]?.minPrice}
                        </div>
                      </Link>
                    </div>
                    {i < 3 && (
                      <div className={styles.vs_border}>
                        <div className={styles.absolute_part}>
                          <span className="vs2">VS</span>
                        </div>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              );
            } else if( isMobile?  (isMobile&& i< 2):i<5 ) {
              return (
                <React.Fragment key={`comp-box${i}`}>
                  <div
                    className={styles.box}
                    key={`comp-box${i}`}
                    style={{cursor:"pointer"}}
                    onClick={() => setShow(true)}
                  >
                    <Image
                      width={70}
                      height={70}
                      alt={`${comparePath}-compare-image`}
                      src={placeHolderImage}
                      sizes="(max-width: 768px) 100%"
                      placeholder="blur"
                      blurDataURL="https://via.placeholder.com/180x120"
                    />
                    <div className={styles.select_text}>Select {compareItem}</div>
                  </div>
                </React.Fragment>
              );
            }
          })}
        </section>
        <div className={styles.compare_Buttons}>
        <button
              onClick={ selectedMobile?.length >= 2 && handleCompareClick}
              className={selectedMobile?.length >= 2 ? styles.ready : ""}
            >
              Compare {selectedMobile?.length >= 2 && "Now"}
            </button>
            {
              isMobile ? (<button
                onClick={selectedMobile?.length >= 2 && selectedMobile?.length < 4 ?() => setShow(true):""}
                className={selectedMobile?.length >= 2 && selectedMobile?.length < 4  ? styles.addReady : ""}
              >
                + Add Product
              </button>):" "
            }
            
        </div>
    </>
  )
}

export default CompareSelect
