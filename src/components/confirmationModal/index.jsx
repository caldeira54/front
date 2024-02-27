import React from 'react';

import './confirmationModal.css';

function ConfirmationModal({ isOpen, onClose }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="confirmation-modal">
                <p>Dados salvos com sucesso!</p>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
}

export default ConfirmationModal;