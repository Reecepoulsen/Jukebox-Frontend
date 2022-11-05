import Modal from "react-modal";
import "./GenModal.scss";

const GenModal = ({ modalIsOpen, setModalIsOpen, body }) => {
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
          background: "#1B1A1B",
          height: "fit-content",
          width: "70vw",
          border: "none",
          top: "33%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#FFFEFE",
          borderRadius: "12px"
        },
        overlay: {
          background: "rgba(0, 0, 0, .3)",
        },
      }}
    >
      {body}
    </Modal>
  );
};

export default GenModal;
