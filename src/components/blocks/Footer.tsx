import { ReactElement } from "react";
import styles from "./Footer.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import Image from 'next/image';
import cls from "classnames";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

export const Footer = (): ReactElement => {
  return (
    <footer className={cls(styles.footer, styles.pt_100)}>
        <Container>
            <div className={styles.footer_inner}>
                <div className={styles.footer_box}>
                    <div className={styles.footer_logo}>
						<a href="#">
                            <Image src="/assets/logo.png" width={182} height={35} />
                        </a>
                        <p className={styles.footer_desc}>Lorem ipsum dolor sit amet, consectetur adipi-scing elit. In purus sem, consectetur sed aliquam vel, hendrerit in elit. Nunc interdum dolor at quam pulvinar sodales. Nunc venenatis egestas mi ac fermentum.</p>
					</div>
                </div>
                <div className={cls(styles.footer_box, styles.footer_static)}>
                <span className={cls(styles.opener, styles.plus)}></span>
                    <h2 className={cls(styles.footer_title, styles.text_uppercase)}>Our company</h2>
                    <ul className={styles.footer_block_contant}>
							<li><a href="#">My Account</a></li>
							<li><a href="#">Order History</a></li>
							<li><a href="#">Wish List</a></li>
							<li><a href="#">Newsletter</a></li>
							<li><a href="#">Site Map</a></li>
							<li><a href="#">Gift Certificates</a></li>
					</ul>
                </div>
                <div className={cls(styles.footer_box, styles.footer_static)}>
                    <span className={cls(styles.opener, styles.plus)}></span>
                    <h2 className={cls(styles.footer_title, styles.text_uppercase)}>Information</h2>
                    <ul className={styles.footer_block_contant}>
							<li><a href="#">About Us</a></li>
							<li><a href="#">Delivery Information</a></li>
							<li><a href="#">Privacy Policy</a></li>
							<li><a href="#">Terms &amp; Conditions</a></li>
							<li><a href="#">Contact Us</a></li>
							<li><a href="#">Brands</a></li>
					</ul>
                </div>
                <div className={cls(styles.footer_box, styles.footer_contact, styles.footer_static, styles.m_0)}>
                <span className={cls(styles.opener, styles.plus)}></span>
                    <h2 className={cls(styles.footer_title, styles.text_uppercase)}>Contact us</h2>
                    <ul className={styles.footer_block_contant}>
							<li><img src="/assets/cont-1.png" alt="img"/><span>28 Green Tower, New York City, USA</span></li>
							<li><img src="/assets/cont-2.png" alt="img"/><a href="tel:#">+ 91 123 456 789 0</a></li>
							<li><img src="/assets/cont-3.png" alt="img"/><a href="mailto:#">info@example.com</a></li>
					</ul>
                </div>
            </div>      
            <div className={cls(styles.copyright, styles.mt_100, styles.text_center)}>
                <Row>
                    <Col xl={12} lg={12} md={12}>
                    <p className={styles.copyright_text}>© All Rights Reserverd.</p>
                    </Col>
                    <Col xl={12} lg={12} md={12}>
                        <ul>									
                            <li><a href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
							<li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
							<li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
							<li><a href="#"><FontAwesomeIcon icon={faGithub} /></a></li>
						</ul>
                    </Col>
                </Row>
            </div>  
        </Container>
    </footer>
  );
};
