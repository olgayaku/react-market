import { ReactElement } from "react";
import styles from "./Sale.module.scss";
import { Container, Row, Col} from "react-bootstrap";
import { Button } from "../elements/Button";
import cls from "classnames";

export const Sale = (): ReactElement => {
  return (
    <section className={cls(styles.sale, styles.ptb_100)}>
      <Container>
       <Row>
           <Col md={6}>
               <div className={cls(styles.sale_main_box, styles.text_center)}>
                    <img src="./assets/product-1.jpg" alt="Sale"/>
               </div>
           </Col>
           <Col md={6} className={styles.align_flex}>
               <div className={styles.sale_product_detail}>
                    <h2 className={styles.sale_title}>Furnitureno Moments Arm Chair</h2>
                    <p className={styles.main_sale_desc}>Extra 10% off Select Chair</p>
                    <Button text="shop now"/>
               </div>
           </Col>
       </Row>
      </Container>
    </section>
  );
};
