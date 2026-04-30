// SearchBar
export function SearchBar({ value, onChange, placeholder = 'ابحث عن دورة...' }) {
  return (
    <div className="relative">
      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
        fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field pr-11"
      />
      {value && (
        <button onClick={() => onChange('')}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-lg leading-none">
          ✕
        </button>
      )}
    </div>
  );
}

// FilterDropdown
export function FilterDropdown({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">{label}</label>}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="input-field text-sm"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

// SortBar
export function SortBar({ value, onChange }) {
  const options = [
    { value: 'default', label: 'الترتيب الافتراضي' },
    { value: 'price-asc', label: 'السعر: الأقل أولاً' },
    { value: 'price-desc', label: 'السعر: الأعلى أولاً' },
    { value: 'rating', label: 'الأعلى تقييماً' },
    { value: 'students', label: 'الأكثر طلاباً' },
  ];
  return <FilterDropdown label="ترتيب حسب" value={value} onChange={onChange} options={options} />;
}
