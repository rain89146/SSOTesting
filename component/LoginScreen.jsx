import React from 'react'
import ContentLayout from './contentLayout'
import styles from "../styles/Home.module.scss";

export default function LoginScreen({
    generateUrl,
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
            backgroundImage: `url('https://www.gameinformer.com/sites/default/files/styles/full/public/2020/10/11/4d9c98d7/kda_ahri_finalpolish01.jpg')`
        }}></div>
    )

	return (
		<ContentLayout background={background}>
			<div>
				<h1 className={styles.title}>Website A</h1>
				<div className={styles.grid}>
					<div className={styles.card} onClick={()=>generateUrl()}>
						<h2>Login Now</h2>
					</div>
				</div>
				<div>{Error}</div>
			</div>
		</ContentLayout>
	)
}
