import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import styles from './Filter.module.scss';
import { Form, FormCheck } from 'react-bootstrap';
import Image from 'next/image';
import cls from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export const Filter = (): ReactElement => {
  const router = useRouter();
  const [isInitial, setIsInitial] = useState(false);
  const { categories, prices } = router.query;
  const [filters, setFilters] = useState({
    // categories: categories ? categories.split(',') : [],
    // prices: prices ? prices.split(',') : [],
    categories: [],
    prices: [],
  });

  const handleChange = (e) => {
    if (e === null) return;

    const { checked, name, value } = e.target;

    if (checked) {
      setFilters((s) => ({
        ...s,
        [name]: [...s[name], value.toLowerCase()],
      }));
    } else {
      setFilters((s) => ({
        ...s,
        [name]: s[name].filter((e) => e !== value.toLowerCase()),
      }));
    }
    setIsInitial(true);
  };

  const handleQueryChange = () => {
    console.log('filters1 :>> ', filters);
    router.push({
      query: {
        ...(filters.categories.length > 0 && {
          categories: filters.categories.join(),
        }),
        ...(filters.prices.length > 0 && {
          prices: filters.prices.join(),
        }),
      },
    });
  };

  useEffect(() => {
    console.log('filters :>> ', filters);
    if (isInitial) {
      console.log('filters123123 :>> ', filters);
      handleQueryChange();
    }
  }, [filters]);

  useEffect(() => {
    setFilters((s) => ({
      ...s,
      categories: categories ? categories.split(',') : [],
      prices: prices ? prices.split(',') : [],
    }));
  }, []);

  console.log('router.query; :>> ', categories, prices);

  return (
    <Form className={cls(styles.sidebar_default, styles.mb_30)}>
      <div className={styles.category_content}>
        <h2 className={cls(styles.cat_title, styles.text_uppercase)}>
          Filter By
        </h2>
        <a
          className={cls(styles.btn, styles.small, styles.btn_filter)}
          href="#"
        >
          <FontAwesomeIcon icon={faTimes} />
          <span>Clear all</span>
        </a>
      </div>
      <div className={cls(styles.category_content, styles.filter_by)}>
        <h2 className={cls(styles.cat_title, styles.text_uppercase)}>
          Categories
        </h2>
        <ul className={styles.category}>
          {['Table', 'Chairs', 'Desks'].map((el) => {
            return (
              <li key={el}>
                <div className={styles.check_box}>
                  <Form.Check
                    name="categories"
                    className={styles.chekbox_input}
                    label={el}
                    value={el}
                    onChange={handleChange}
                    checked={filters.categories.includes(el.toLowerCase())}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={cls(styles.category_content, styles.filter_by)}>
        <h2 className={cls(styles.cat_title, styles.text_uppercase)}>Price</h2>
        <ul className={styles.category}>
          {[
            '50 - 100',
            '100 - 200',
            '200 - 300',
            '400 - 500',
            '600 - 700',
            '800 - 1000',
          ].map((el) => {
            return (
              <li key={el}>
                <div className={styles.check_box}>
                  <Form.Check
                    className={styles.chekbox_input}
                    label={el}
                    value={el.replaceAll(' ', '')}
                    name="prices"
                    onChange={handleChange}
                    checked={filters.prices.includes(el.replaceAll(' ', ''))}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Form>
  );
};
