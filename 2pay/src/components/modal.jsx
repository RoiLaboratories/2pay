import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css-files/landingPage.css";
import Cards from "./cards";

const Modal = ({ onClose, onConfirm }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Contribute</h2>

        <div className="modal-box">
          <div className="modal-box-left">
            <div className="pay-section">
              <div className="label">Pay</div>
              <div className="pay-amount">
                <span className="usdc-icon">💲</span>
                <div>
                  <strong>50 USDC</strong>
                  <div className="subtext">$50</div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-box-right">
            <div className="label">Address</div>
            <div className="address-box">0x80eb...fb8e</div>
          </div>
        </div>

        <div className="modal-summary">
          <div className="row">
            <span>Network fee</span>
            <span>
              &lt;0.01 <span className="eth-icon">🧿</span> ETH
            </span>
          </div>
          <div className="row">
            <span>Total</span>
            <span>$50</span>
          </div>
        </div>

        <div className="modal-buttons">
          <button className="cancel-btn">Cancel</button>
          <button className="confirm-btn">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
