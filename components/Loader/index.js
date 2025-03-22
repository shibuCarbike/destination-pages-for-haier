import Spinner from "react-bootstrap/Spinner";
import styles from "./index.module.scss";

function FilterPageLoader() {
  return (
    <div className={styles.loader}>
      {/* <img src="/gifs/search.gif" alt="search" /> */}
      <Spinner
        animation="border"
        variant="primary"
        style={{ height: "4rem", width: "4rem" }}
      />
    </div>
  );
}

export default FilterPageLoader;
