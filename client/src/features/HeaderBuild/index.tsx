import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Logo from "@assets/Logo/logo.svg";
import LinkText from "@shared/ui/LinkText/index";

import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faFile } from '@fortawesome/free-solid-svg-icons'



export const HeaderBuild = () => {
  return (
    <>
      <header className={styles.header}>
				<div className={styles.header__left}>
					<nav className={styles.header__links}>
						<LinkText text="Мои сайты" to="" href="/" linkTextType="header" icon={faHouse}/>
						<div className={styles.header__links_divider}>/</div>
						<LinkText text='Name' to="" href="" linkTextType="header" icon={faGlobe}/>
						<div className={styles.header__links_divider}>/</div>
						<LinkText text='Page name' to="" href="" linkTextType="header" icon={faFile}/>
					</nav>
				</div>
			</header>
    </>
  );
}
