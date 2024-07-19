import React from 'react';

const ErrorModal = ({ isOpen, setIsOpen, errorMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg p-6 mx-4 max-w-sm shadow-lg">
      <h2 className="text-lg font-bold text-red-600">Error</h2>
      <p className="mt-2 text-gray-700">{errorMessage}</p>
      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
  );
};

export default ErrorModal;