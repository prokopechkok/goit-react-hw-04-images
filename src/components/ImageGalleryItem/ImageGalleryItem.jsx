import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { Image, ImageGalleryItemLi } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { webformatURL, largeImageURL, tags } = image;

  const openModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    }
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <ImageGalleryItemLi>
      <Image src={webformatURL} alt={tags} loading="lazy" onClick={openModal} />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        largeImageURL={largeImageURL}
        tags={tags}
      />
    </ImageGalleryItemLi>
  );
};
