import React, { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import { Image, ImageGalleryItemLi } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    if (!this.state.isModalOpen) {
      this.setState({ isModalOpen: true });
    }
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props.image;
    const { isModalOpen } = this.state;

    return (
      <ImageGalleryItemLi>
        <Image
          src={webformatURL}
          alt={tags}
          loading="lazy"
          onClick={this.openModal}
        />
        <Modal
          isOpen={isModalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Image Modal"
          largeImageURL={largeImageURL}
          tags={tags}
        />
      </ImageGalleryItemLi>
    );
  }
}
