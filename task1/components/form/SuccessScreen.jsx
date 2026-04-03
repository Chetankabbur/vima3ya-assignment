'use client';

export const SuccessScreen = ({ onReset }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md mx-4 text-center animate-in fade-in zoom-in duration-300">
        <div className="mb-6 flex justify-center">
          <div className="relative w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Success!</h2>
        <p className="text-slate-600 mb-8">Your form has been submitted successfully. Thank you for your information!</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-blue-900 font-medium">What happens next?</p>
          <ul className="text-sm text-blue-800 mt-2 space-y-1">
            <li>✓ Your details have been recorded</li>
            <li>✓ We will process your request soon</li>
            <li>✓ You will receive confirmation via email</li>
          </ul>
        </div>
        <button
          onClick={onReset}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Submit Another Form
        </button>
      </div>
    </div>
  );
};
