import { useApp } from '../../context/AppContext';

const icons = {
  success: (
    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const styles = {
  success: 'border-green-500 bg-green-50 dark:bg-green-900/20',
  error:   'border-red-500 bg-red-50 dark:bg-red-900/20',
  info:    'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
};

export default function Notification() {
  const { state, dispatch } = useApp();
  const { notification } = state;

  if (!notification) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] animate-slide-up">
      <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border-l-4 ${styles[notification.type]} backdrop-blur-sm`}>
        {icons[notification.type]}
        <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{notification.message}</span>
        <button
          onClick={() => dispatch({ type: 'CLEAR_NOTIFICATION' })}
          className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
