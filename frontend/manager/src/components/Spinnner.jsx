import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex space-x-2">
        <div className="w-5 h-5 bg-emerald-200 rounded-full animate-bounce-custom"></div>
        <div className="w-5 h-5 bg-emerald-500 rounded-full animate-bounce-custom delay-200"></div>
        <div className="w-5 h-5 bg-emerald-700 rounded-full animate-bounce-custom delay-400"></div>
        <div className="w-5 h-5 bg-emerald-900 rounded-full animate-bounce-custom delay-600"></div>
      </div>
    </div>
  );
};

export default Spinner;
