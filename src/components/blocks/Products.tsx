import { ReactElement, useEffect, useState } from 'react';
import styles from './Products.module.scss';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { ProductCard } from '../elements/ProductCard';
import { Button } from '../elements/Button';
import cls from 'classnames';
import { IProduct } from 'src/models';
import { productService } from 'src/services/product';
import { useRouter } from 'next/router';

export const Products = (): ReactElement => {
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[] | null>(null);

  const handleClick = () => {
    router.push('/shop');
  };

  useEffect(() => {
    productService.getAll().then((x) => setProducts(x));
  }, []);

  return (
    <section className={styles.products}>
      <Container>
        <Row>
          <Col md={12}>
            <div
              className={cls(
                styles.section_heading,
                styles.pt_100,
                styles.text_center
              )}
            >
              <h1 className={styles.section_title}>
                Featured <span>Products</span>
              </h1>
              <p className={styles.section_desc}>
                Classic furniture, lighting and decoration collections. Proudly
                designed for everyday living.
              </p>
            </div>
          </Col>
          <Col md={12}>
            <div className={styles.featured_product_tab_content}>
              {!products ? (
                <Spinner animation="border" />
              ) : (
                products.map((e) => <ProductCard key={e.id} {...e} />)
              )}
            </div>
          </Col>
          <Col md={12} className={cls(styles.text_center, styles.mt_20)}>
            <Button
              text="View more Products"
              type="color"
              onClick={handleClick}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
