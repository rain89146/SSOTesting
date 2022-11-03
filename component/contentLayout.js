import styles from "../styles/Home.module.scss";

export default function ContentLayout(props) {
    return (
        <div className={styles.content}>
            <div className={styles.children}>{props.children}</div>
            {(props.background) && (<><div className={styles.backdrop}></div><div className={styles.background}>{props.background}</div></>)}
        </div>
    )
}
