import styles from "./index.module.scss";

function Loader() {
  return (
    <div className={styles.loader}>
      <img src="https://www.comparos.in/assets/loader/loader.gif" />
      {/* <div className={styles.spinner} /> */}
    </div>
  );
}

export default Loader;
