import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/jamboree_logo.png';
import bgImg from '../assets/img1.svg'
import blob_3 from '../assets/b3.svg';
import blob_4 from '../assets/b4.svg';
import blob_5 from '../assets/b5.svg';
import styles from './landing.module.css';

const Landing = ({history}) => {
    return (
        <div className={styles.wrapper}>
            <img className={styles.blob_1} src={blob_5} alt="blob1"/>
            <img className={styles.blob_2} src={blob_4} alt="blob1"/>
            <img className={styles.blob_3} src={blob_3} alt="blob1"/>

            <div className={styles.nav}>
                <div className={styles.nav_logo_box}>
                    <img className={styles.nav_logo} src={logo} alt="logo"/>
                    <h2>jamboree</h2>
                </div>
                
                <ul className={styles.nav_list}>
                    <li className={styles.nav_item}>
                        <Link className={styles.nav_link} to="/">About</Link>
                    </li>
                    <li className={styles.nav_item}>
                        <Link className={styles.nav_link} to="/">JAM Home page</Link>
                    </li>
                    <li className={styles.nav_item}>
                        <Link className={styles.nav_link} to="/login">Login</Link>
                    </li>
                    <li className={styles.nav_item}>
                        <Link className={styles.nav_link_btn} to="/register">Sign up</Link>
                    </li>
                </ul>
            </div>

            <div className={styles.main}>
                <div className={styles.main_content}>
                    <p className={styles.main_content_title}>jam.</p>
                    <p className={styles.main_content_sub}>
                        helping africa help itself. 
                    </p>
                    <p className={styles.subtext}>
                        Joint Aid Management is empowering africans to 
                        create better lives for themselves by working closely 
                        with communities to implement meaningful programs.
                    </p>
                    <button onClick={() => history.push('/login')} className={styles.btn}>
                        login
                    </button>
                </div>
                <div className={styles.main_img_box}>
                    <img className={styles.main_img} src={bgImg} alt="bg-img"/>
                </div>
            </div>
        </div>
    )
}

export default Landing
