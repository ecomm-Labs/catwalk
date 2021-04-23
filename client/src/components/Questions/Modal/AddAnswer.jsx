import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import Modal from './index';

const PageBlockerModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  background-color: rgba(128,128,128,0.5);
  text-align:center;
  box-shadow: 0 5px 10px 2px rgba(195,192,192,.5);
  `;

const ModalWrapper = styled.div`
  position: fixed;
  display: grid;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  width: 80%;
  height: 50%;
  opacity: 100%;
  background: white;
  color: black;
  box-shadow: 0, 5px, 16px, rgba(0, 0, 0, 0.2);
  grid-template-columns: 1fr 1fr;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  border-radius: 10px 0 0 10px;
  background: black;
  max-width: 100%;
  height: auto;
  width: auto;
  margin: auto;
`;

const ModalContent = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  margin: auto;
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const AddAnswer = (props) => {
  const { showAddAnswerModal } = props;
  const toggleModal = props.toggleAddAnswerModal;
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      toggleModal();
    }
  };
  const keyPress = useCallback((e) => {
    if (e.key === 'Escape' && showAddAnswerModal) {
      toggleModal();
    }
  }, [showAddAnswerModal, toggleModal]);

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    <>
      { showAddAnswerModal
        ? (
          <PageBlockerModalDiv ref={modalRef} onClick={closeModal}>
            <Modal>
              <ModalWrapper showAddAnswerModal={showAddAnswerModal} onClick={closeModal}>
                <ModalImg src="https://images.hgmsites.net/hug/2021-bmw-5-series_100749427_h.jpg" alt="test" />
                <ModalContent>
                  <h1>The New BMW M5...</h1>
                </ModalContent>
                <CloseModalButton
                  aria-label="Close modal"
                  ref={modalRef}
                  onClick={toggleModal}
                />
              </ModalWrapper>
            </Modal>
          </PageBlockerModalDiv>
        )
        : null }
    </>
  );
};

export default AddAnswer;
