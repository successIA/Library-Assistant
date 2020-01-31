import React from "react";
import "./Modal.css";
const Modal = ({ shouldShow, handleActionBtn, handleCloseBtn, options }) => {
  shouldShow
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "visible");

  return (
    <div
      className={
        shouldShow
          ? "b-modal-wrapper b-show-modal"
          : "b-modal-wrapper b-hide-modal"
      }
    >
      <div className="b-modal">
        <span className="cancel" onClick={handleCloseBtn}>
          x
        </span>
        <h5>{options.heading}</h5>
        <hr />
        <div className="mb-3">{options.body}</div>
        <div className="b-modal-controls">
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleActionBtn}
          >
            {options.actionBtnText}
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={handleCloseBtn}
          >
            {options.closeBtnText ? options.closeBtnText : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
