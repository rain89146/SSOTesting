import React from 'react'
import ContentLayout from './contentLayout'
import styles from "../styles/Home.module.scss";

export default function LoggedinScreen({
    goHome,
    Error
}) {
    const background = (
        <div 
        data-aos="fade-in"
        style={{
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url('https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt22e39f96c6755187/5f7f6d089d46c20f09177a0c/SeraphineKDA_Form3_Final.jpg')`
        }}></div>
    )

	return (
		<ContentLayout background={background}>
			<div>
                <h1 className={styles.title}>Website A</h1>
                <div className={styles.grid}>
                    <div className={styles.card} onClick={()=>goHome()}>
                        <h2>Go home</h2>
                    </div>
                </div>
                <div>{Error}</div>
			</div>
		</ContentLayout>
	)
}
