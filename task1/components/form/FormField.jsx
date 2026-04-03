'use client';

export const FormField = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  showError,
}) => {
  const hasError = showError && error;
  const isFilled = value && value.toString().trim() !== '';

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="block text-sm font-medium text-slate-900">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-4 py-2.5 border-2 rounded-lg transition-all duration-200 focus:outline-none ${
          hasError
            ? 'border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-600 bg-red-50'
            : isFilled
            ? 'border-blue-500 focus:ring-2 focus:ring-blue-200 focus:border-blue-600 bg-blue-50'
            : 'border-slate-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 bg-white hover:border-blue-400'
        }`}
      />
      {hasError && (
        <div className="flex items-start gap-2 mt-2 p-2 bg-red-50 rounded border border-red-200">
          <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-red-600 font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};
