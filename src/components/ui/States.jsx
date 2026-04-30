import Button from './Button';

export function EmptyState({ title = 'لا توجد نتائج', description = 'لم يتم العثور على أي عناصر.', action, actionLabel }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">{description}</p>
      </div>
      {action && (
        <Button onClick={action} size="sm">{actionLabel || 'إعادة المحاولة'}</Button>
      )}
    </div>
  );
}

export function ErrorState({ message = 'حدث خطأ ما.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
        <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">حدث خطأ</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="danger" size="sm">إعادة المحاولة</Button>
      )}
    </div>
  );
}
