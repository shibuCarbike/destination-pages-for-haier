import { Accordion } from "react-bootstrap";
import styles from "./index.module.scss";
import { getEveryFirstLetterUpperCase } from "utlis/constant";

export default function Faq({
  data,
  h2,
  margin,
  marginTop,
  marginBottom,
  hidShadow,
  showHalf
}) {
  if (data?.length > 0) {
    return (
      <div
        className={`${styles.wrapper} ${!!showHalf ? styles.showHalf : ''} ${margin ? styles.margin : ""} ${marginTop ? styles.marginTop : ""
          } ${marginBottom ? styles?.marginBottom : ""}
        } ${hidShadow ? styles?.hidShadow : ""}`}
      >
        {h2 && <h2>{getEveryFirstLetterUpperCase(h2)} FAQs</h2>}
        <Accordion defaultActiveKey={0} flush>
          {data.map((item, i) => (
            <Accordion.Item eventKey={i} key={item.ques}>
              <Accordion.Header>{item.ques}</Accordion.Header>
              <Accordion.Body>
                <span dangerouslySetInnerHTML={{ __html: item.ans }} />
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    );
  }
}
