import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { ismodalopen, closeModal, correct, questions } = useGlobalContext();

  const perc = ((correct / questions.length) * 100).toFixed(0);

  return (
    <div
      className={`${
        ismodalopen ? "modal-container isOpen" : "modal-container"
      }`}
    >
      <div className="modal-content">
        {perc > 50 ? <h2>Congratulations!</h2> : <h2>Oh No!!...</h2>}
        <p>You have answered {perc}% of questions correctly</p>
        <button className="close-btn" onClick={closeModal}>
          play again
        </button>
      </div>
    </div>
  );
};

export default Modal;
