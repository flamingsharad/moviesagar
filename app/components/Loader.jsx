import styles from "./Loader.module.css";
const Loader = () => {
  return (
    <div className={styles.flex}>
    <div className={styles.sharingon}>
      <div className={styles.ring}>
        <div className={styles.to}></div>
        <div className={styles.to}></div>
        <div className={styles.to}></div>
        <div className={styles.circle}></div>
      </div>
    </div>
    </div>
  );
};
export default Loader;
