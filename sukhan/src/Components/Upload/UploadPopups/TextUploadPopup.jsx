import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const TextUploadPopup = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>Upload</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ margin: '20px 0' }}>Upload a photo or video</h2>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label htmlFor="file-upload" className="custom-file-upload">
              Choose File
            </label>
            <input id="file-upload" type="file" />
          </div>
          <button onClick={closeModal} style={{ margin: '20px 0' }}>
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default TextUploadPopup;
