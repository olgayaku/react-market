/* eslint-disable @next/next/no-img-element */
import { ReactElement } from 'react';
import Link from 'next/link';
import styles from './ProductCard.module.scss';
import cls from 'classnames';
import { IProduct } from 'src/models';
import { type } from 'os';
import Shop from 'pages/shop';

export const ProductCard = ({
  id,
  name,
  price,
  img,
  type,
}: IProduct): ReactElement => {
  return (
    <div className={cls(styles.product_card, styles.mb_25, {
      [styles.product_card_shoper]: type === 'shoper',
    })}>
      <div className={styles.product_card_box}>
        <div
          className={cls(styles.product_img, styles.transition, styles.mb_15)}
        >
          <Link href={`product/${id}`}>
          <a>
            <img
              src={img!}
              alt="Endeavor Daytrip Backpack"
              className={styles.transition}
            />
          </a>
          </Link>
          <div
            className={cls(
              styles.product_details_btn,
              styles.text_uppercase,
              styles.text_center,
              styles.transition
            )}
          >
             <Link href={`product/${id}`}>
            <a
              className={cls(styles.quick_popup, styles.mfp_iframe)}
            >
              Quick View
            </a>
            </Link>
          </div>
        </div>
        <div className={styles.product_desc}>
        <Link href={`product/${id}`}>
          <a className={styles.product_name}>
            {name}
          </a>
        </Link>
          <span className={styles.product_pricce}>$ {price}</span>
          {/* <span className={styles.product_pricce_main}>$68.90</span> */}
        </div>
      </div>
    </div>
  );
};
