import { ReactElement } from "react";
import styles from "./PaginationBase.module.scss";
import { Col, Container, Row, Pagination } from "react-bootstrap";
import cls from "classnames";

export const PaginationBase = (): ReactElement => {
  let active = 1;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  const paginationBasic = (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );

  return (
    <div className={cls(styles.shorting, styles.pagination_1, styles.mt_20)}>
      <Row>
        <Col lg={6} md={6}>
          <div className={styles.pagination_bar}>
            {paginationBasic}
          </div>
        </Col>
        <Col lg={6} md={6}>
          <div
            className={cls(
              styles.show_item,
              styles.right_side,
              styles.float_none_md
            )}
          >
            <span className={cls(styles.float_none_md, styles.mb_20, styles.d_block)}>
              Showing 1 to 15 of 15 (1 Pages)
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
};
