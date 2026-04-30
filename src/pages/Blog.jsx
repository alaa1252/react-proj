import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { SearchBar } from '../components/courses/Filters';
import Loader from '../components/ui/Loader';
import { ErrorState } from '../components/ui/States';
import Badge from '../components/ui/Badge';

const CATEGORIES = ['الكل', 'برمجة', 'تصميم', 'ذكاء اصطناعي', 'أعمال', 'تسويق'];
const ITEMS_PER_PAGE = 6;

function BlogCard({ post }) {
  const date = new Date(post.createdAt || Date.now()).toLocaleDateString('ar-EG', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  return (
    <article className="card group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative overflow-hidden">
        <img
          src={`https://picsum.photos/seed/${post.id + 100}/600/300`}
          alt={post.title}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <Badge color="purple">{CATEGORIES[post.id % (CATEGORIES.length - 1) + 1]}</Badge>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1 gap-3">
        <p className="text-xs text-gray-400">{date}</p>
        <h2 className="font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {post.title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 flex-1">
          {post.body}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold">
              {String.fromCharCode(65 + (post.userId % 26))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">كاتب {post.userId}</span>
          </div>
          <button className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline">
            اقرأ المزيد ←
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Blog() {
  const { data: posts, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('الكل');
  const [page, setPage] = useState(1);

  const filtered = (posts || []).filter(p => {
    const q = search.toLowerCase();
    return (!q || p.title.includes(q) || p.body.includes(q));
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container-app text-center max-w-2xl mx-auto">
          <h1 className="section-title mb-3">المدونة 📝</h1>
          <p className="section-subtitle mx-auto">
            مقالات ودروس من خبراء المنصة في أحدث التقنيات والمجالات
          </p>
        </div>
      </section>

      <div className="container-app py-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => { setCategory(cat); setPage(1); }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  category === cat
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-primary-400'
                }`}>{cat}</button>
            ))}
          </div>
          <div className="w-full sm:w-64">
            <SearchBar value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="ابحث في المقالات..." />
          </div>
        </div>

        {/* Content */}
        {loading && <Loader text="جارٍ تحميل المقالات..." />}
        {error && <ErrorState message={`فشل تحميل المقالات: ${error}`} onRetry={() => window.location.reload()} />}

        {!loading && !error && (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              عرض <span className="font-bold text-gray-900 dark:text-white">{filtered.length}</span> مقال
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {paginated.map(post => <BlogCard key={post.id} post={post} />)}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                  ‹ السابق
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const n = page <= 3 ? i + 1 : page - 2 + i;
                  if (n < 1 || n > totalPages) return null;
                  return (
                    <button key={n} onClick={() => setPage(n)}
                      className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${n === page ? 'bg-primary-600 text-white' : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                      {n}
                    </button>
                  );
                })}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                  التالي ›
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
