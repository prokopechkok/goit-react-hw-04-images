import ModalComponent from 'react-modal';
const customStyles = {
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: '1200',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    backgroundColor: 'transparent',
  },
};
ModalComponent.setAppElement('#root');

export const Modal = ({
  isOpen,
  onRequestClose,
  contentLabel,
  largeImageURL,
  tags,
}) => {
  return (
    <ModalComponent
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel={contentLabel}
    >
      <img src={largeImageURL} alt={tags} width="550" />
    </ModalComponent>
  );
};
