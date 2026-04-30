export default function Loader({ text = 'جارٍ التحميل...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-primary-200 dark:border-primary-900 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-primary-600 rounded-full animate-spin" />
      </div>
      <p className="text-gray-500 dark:text-gray-400 font-medium">{text}</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="card p-4 space-y-3">
      <div className="skeleton h-44 w-full rounded-xl" />
      <div className="skeleton h-4 w-3/4" />
      <div className="skeleton h-4 w-1/2" />
      <div className="flex gap-2">
        <div className="skeleton h-6 w-16 rounded-full" />
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
      <div className="skeleton h-10 w-full rounded-xl" />
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}
