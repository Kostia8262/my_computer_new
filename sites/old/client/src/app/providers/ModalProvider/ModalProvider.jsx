import React, { createContext, useState } from 'react';

const ModalContext = createContext();
const ModalProvider = ({ children }) => {
  const [modalStates, setModalStates] = useState({});

  const openModal = (modalId, modalContent = "") => {
    setModalStates((prevModalStates) => ({
      ...prevModalStates,
      [modalId]: { state: true, content: modalContent },
    }));
  };

  const closeModal = (modalId) => {
    setModalStates((prevModalStates) => ({
      ...prevModalStates,
      [modalId]: { state: false, content: '' },
    }));
  };

  const isModalOpen = (modalId) => {
    if (modalStates[modalId]) {
        return modalStates[modalId].state || false;
    }
    return false;
  };

  return (
    <ModalContext.Provider value={{ modalStates, openModal, closeModal, isModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
