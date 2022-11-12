import Modal from "react-modal";
import "./GenModal.scss";

const GenModal = ({ modalIsOpen, setModalIsOpen, body, width="75vw", top="33%", background="#1B1A1B"}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      shouldFocusAfterRender={true}
      onRequestClose={() => setModalIsOpen(false)}
      ariaHideApp={false}
      style={{
        content: {
          background: `${background}`,
          height: "fit-content",
          width: `${width}`,
          border: "none",
          top: `${top}`,
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#FFFEFE",
          borderRadius: "12px"
        },
        overlay: {
          background: "rgba(255, 255, 255, .05)",
        },
      }}
    >
      {body}
    </Modal>
  );
};

export default GenModal;
