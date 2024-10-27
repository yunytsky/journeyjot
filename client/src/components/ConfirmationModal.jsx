import React from 'react';

const ConfirmationModal = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h5>Are you sure?</h5>
        <p>This action is permanent and cannot be undone.</p>
        <div className="modal-actions">
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
