import { ReactElement } from 'react';
import ImageGallery from 'react-image-gallery';

interface IProps {
  src: string[];
}

const images = [
  {
    original: '/assets/product-1.jpg',
    thumbnail: '/assets/product-1.jpg',
  },
  {
    original: '/assets/product-1.jpg',
    thumbnail: '/assets/product-1.jpg',
  },
  {
    original: '/assets/product-1.jpg',
    thumbnail: '/assets/product-1.jpg',
  },
];

export const MyGallery = ({ src }: IProps): ReactElement => {
  return (
    <ImageGallery
      items={src.map((e) => ({
        original: e,
        thumbnail: e,
      }))}
    />
  );
};
