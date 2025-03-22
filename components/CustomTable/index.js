import Table from "react-bootstrap/Table";
import styles from "./index.module.scss";
export default function CustomTable(props) {
  let breakPoint = props?.breakPoint
    ? props?.breakPoint
    : props?.data?.th?.length;
  let count = 0;

  if (props?.data?.td?.length > 0) {
    return (
      <div className={styles.table_wrapper}>
        {props?.markdownTableHeading ? (
          <h2>
            <div dangerouslySetInnerHTML={{ __html: props?.h2 }} />
          </h2>
        ) : (
          <>{props?.h2 && <h2>{props?.h2}</h2>}</>
        )}
        {props?.tableHighlightContent && (
          <span>
            <div
              dangerouslySetInnerHTML={{ __html: props?.tableHighlightContent }}
            />
          </span>
        )}
        <div
          style={{
            overflow: "scroll",
            scrollbarWidth: "none",
          }}
        >
          <Table
            // striped
            bordered
            // hover
            className={props?.noMargin ? "" : " mt-3"}
          >
            {props?.data?.th?.length && (
              <thead>
                <tr
                  style={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {props?.data?.th?.map((head, i) => (
                    <th
                      style={{
                        backgroundColor: "#edf0f2",
                        color: "#040404",
                      }}
                      key={i}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {props.data.td.map((body, i) => {
                return (
                  props.data.td[count] && (
                    <tr key={i}>
                      {Array.from({ length: breakPoint || 2 }).map((x, i2) => {
                        count = count + 1;
                        return (
                          <td
                            key={i2}
                            style={{
                              fontWeight: "600",
                              whiteSpace:
                                props?.noWrapCount == i2 + 1
                                  ? "nowrap !important"
                                  : "",
                              backgroundColor: "#edf0f2",
                            }}
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html: props.data.td[count - 1],
                              }}
                            ></span>
                          </td>
                        );
                      })}
                    </tr>
                  )
                );
              })}
              {props?.lastUpdate && (
                <tr>
                  {/* <td colSpan={breakPoint}>
                  Last Updated On : {moment().format("L")}
                </td> */}
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
