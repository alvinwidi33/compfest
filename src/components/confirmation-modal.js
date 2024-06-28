import React from 'react';

const ConfirmationModal = ({ show, onClose, onConfirm, message }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8 shadow-lg">
                <h2 className="text-lg font-semibold mb-4 text-[#055C5B]">Konfirmasi</h2>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-[#C3EAFD] text-[#020030] py-2 px-4 rounded-md hover:bg-[#8A60FF] hover:text-white active:bg-[#C3EAFD] active:text-[#020030] transition"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-[#FEDACC] text-[#020030] px-4 py-2 rounded-md hover:bg-[#8A60FF] hover:text-white active:text-[#020030] active:bg-[#FEDACC] font-medium"
                    >
                        Konfirmasi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;