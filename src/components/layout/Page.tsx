import { ReactElement } from 'react';
import { Header } from '../blocks/Header';
import { PageBanner } from '../blocks/PageBanner';
import { BackCall } from '../blocks/BackCall';
import { Footer } from '../blocks/Footer';

interface IProps {
  title: string;
  img: string;
}

export const Page: React.FC<IProps> = ({ title, img, children }): ReactElement => {
  return (
    <>
      <Header />
      <PageBanner img={img} title={title} />
      <div>{children}</div>
      <BackCall/>
      <Footer/>
    </>
  );
};
