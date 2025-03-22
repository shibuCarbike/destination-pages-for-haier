import Image from 'next/image';
import React from 'react'
import { Accordion, Modal } from 'react-bootstrap'
import styles from './compareBrandModal.module.scss'
import { replaceImageUrl } from "utlis/constant";
import { closeIcon, searchIcon } from "utlis/icons";
const CompareBrandModal = ({setShow,show,handleSearchInput,searchList,HandleBrandAccordian,AllBrands,brandModel,listItemClicked}) => {
  return (
    <>
         <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#0091D5", color: "white" }}
          >
            <Modal.Title>Select</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modal_body}>
          
            <div className={styles.input}>
              {searchIcon}
              <input
                type="text"
                onChange={(e) => handleSearchInput(e.target.value)}
                placeholder="search"
              />
            </div>
            {
              searchList?.length !==0 && (
                <div className={styles.searchResult}>
                {searchList?.slice(0, 5).map((item) => (
                  <li style={{cursor:"pointer"}} key={item?.name} onClick={() => listItemClicked(item?.slug)}>{item?.name}</li>
                ))}
              </div>
              )
            }
           
          
            <div className={styles.brandCard}>
              <p>POPULAR BRANDS</p>
              <Accordion defaultActiveKey="0" flush className={styles.mainAccor}>
                {AllBrands?.slice(0, 13).map((brand, i) => (
                  <>
                    <Accordion.Item eventKey={i} >
                      <Accordion.Header
                        className={styles.accordianHeader}
                        onClick={() => HandleBrandAccordian(brand.Name)}
                      >
                        <div className={styles.image_box}>
                          <Image
                            title={brand?.Name}
                            src={replaceImageUrl(brand?.Image)}
                            fill={true}
                            alt={`${brand?.Name}`}
                            sizes="(max-width: 768px) 100%"
                            placeholder="blur"
                            blurDataURL="https://via.placeholder.com/180x120"
                          />
                        </div>
                        <p>{brand.Name}</p>
                      </Accordion.Header>
                      <Accordion.Body
                       
                        className={styles.accModelShow}
                      >
                        {brandModel?.map((model, i) => (
                          <div
                            key={i + 1}
                            className={styles.accorBody}
                            onClick={() => listItemClicked(model?.slug)}
                          >
                            <p className={styles.modelName}>
                              {model?.Name.length > 30
                                ? `${`${brand.Name} ${model?.Name.slice(
                                    0,
                                    30
                                  )}`}....`
                                : `${brand.Name} ${model?.Name}`}
                            </p>
                            <p className={styles.modelPrice}>
                              Rs. {model?.minPrice}
                            </p>
                          </div>
                        ))}
                      </Accordion.Body>
                    </Accordion.Item>
                  </>
                ))}
              </Accordion>
            </div>
            {/* <ul>
              {searchList.slice(0, 5).map((item) => (
                <li
                  key={item?.name}
                  onClick={() => listItemClicked(item?.slug)}
                >
                  {item?.name}
                </li>
              ))}
            </ul> */}
          </Modal.Body>
        </Modal>
    </>
  )
}

export default CompareBrandModal
