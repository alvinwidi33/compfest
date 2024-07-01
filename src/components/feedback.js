import React, { useState } from 'react';

function Feedback({ isOpen, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    onSubmit({ rating, feedback });
    setRating(0);
    setFeedback('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg font-[Poppins, sans-serif]">
        <h2 className="text-2xl font-semibold text-[#020030] text-center mb-4">Berikan Ulasanmu</h2>
        <div className="mb-4">
          <label className="block text-[#020030] text-sm font-bold mb-2">Rating<span className='text-[#FF605A]'>*</span></label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`text-2xl ${star <= rating ? 'text-yellow-300' : 'text-gray-300'}`}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-[#020030] text-sm font-bold mb-2">Ulasan<span className='text-[#FF605A]'>*</span></label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-[#020030] leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-[#C3EAFD] text-[#020030] py-2 px-4 rounded-md hover:bg-[#8A60FF] hover:text-white active:bg-[#C3EAFD] active:text-[#020030] transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-[#FEDACC] text-[#020030] px-4 py-2 rounded-md hover:bg-[#8A60FF] hover:text-white active:text-[#020030] active:bg-[#FEDACC] font-medium"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
