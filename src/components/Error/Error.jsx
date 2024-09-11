import styles from './Error.module.css';

function Error({ children }) {
  return <h4 className={styles.errHeader}>{children}</h4>;
}

export default Error;
