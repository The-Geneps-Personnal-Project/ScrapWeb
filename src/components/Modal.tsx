import React from "react";
import { ModalProps } from "types/types";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg z-60">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                {children}
                <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
