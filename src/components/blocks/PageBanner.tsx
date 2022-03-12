import { ReactElement } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import style from './PageBanner.module.scss';

interface IProps {
  title: string;
  img: string;
}

export const PageBanner: React.FC<IProps> = ({
  title,
  img,
}): ReactElement => {
  return (
    <div
      className={style.root}
      style={{
        background: `url(${img}) no-repeat center / cover`,
      }}
    >
      <Container>
        <div className={style.wrap}>
          <Row>
            <Col xl={12} lg={12} xs={12} className="text-center">
              <h1>{title}</h1>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};
