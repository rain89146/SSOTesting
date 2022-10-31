import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Layout(props) {
    return (
        <div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>{props.children}</main>
        </div>
    )
}
