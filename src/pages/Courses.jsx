import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import CourseCard from '../components/courses/CourseCard';
import { SearchBar, FilterDropdown, SortBar } from '../components/courses/Filters';
import { EmptyState } from '../components/ui/States';

const ITEMS_PER_PAGE = 6;

const CATEGORIES = [
  { value: '', label: 'جميع الفئات' },
  { value: 'برمجة', label: 'البرمجة' },
  { value: 'تصميم', label: 'التصميم' },
  { value: 'ذكاء اصطناعي', label: 'الذكاء الاصطناعي' },
  { value: 'تسويق', label: 'التسويق' },
  { value: 'أمن', label: 'الأمن السيبراني' },
  { value: 'أعمال', label: 'الأعمال' },
];

const LEVELS = [
  { value: '', label: 'جميع المستويات' },
  { value: 'مبتدئ', label: 'مبتدئ' },
  { value: 'متوسط', label: 'متوسط' },
  { value: 'متقدم', label: 'متقدم' },
];

export default function Courses() {
  const { state } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [sort, setSort] = useState('default');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = [...state.courses];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (category) list = list.filter(c => c.category === category);
    if (level) list = list.filter(c => c.level === level);

    switch (sort) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
      case 'students':   list.sort((a, b) => b.students - a.students); break;
    }

    return list;
  }, [state.courses, search, category, level, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const resetFilters = () => {
    setSearch(''); setCategory(''); setLevel(''); setSort('default'); setPage(1);
  };

  const handleFilter = (setter) => (val) => { setter(val); setPage(1); };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-gray-950">
      <div className="container-app">
        {/* Page Header */}
        <div className="py-12 text-center">
          <h1 className="section-title mb-3">جميع الدورات</h1>
          <p className="section-subtitle mx-auto">
            اكتشف {state.courses.length}+ دورة في مجالات متعددة
          </p>
        </div>

        {/* Filters */}
        <div className="card p-5 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">بحث</label>
              <SearchBar value={search} onChange={handleFilter(setSearch)} />
            </div>
            <FilterDropdown label="الفئة" value={category} onChange={handleFilter(setCategory)} options={CATEGORIES} />
            <FilterDropdown label="المستوى" value={level} onChange={handleFilter(setLevel)} options={LEVELS} />
            <SortBar value={sort} onChange={handleFilter(setSort)} />
          </div>

          {/* Active filters summary */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              عرض <span className="font-bold text-gray-900 dark:text-white">{filtered.length}</span> نتيجة
            </p>
            {(search || category || level || sort !== 'default') && (
              <button onClick={resetFilters}
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-semibold">
                إعادة تعيين الفلاتر ✕
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {paginated.length === 0 ? (
          <EmptyState
            title="لا توجد دورات مطابقة"
            description="جرب تغيير كلمات البحث أو الفلاتر المحددة"
            action={resetFilters}
            actionLabel="إعادة تعيين الفلاتر"
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {paginated.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-gray-600 dark:text-gray-400"
                >‹</button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                      n === page
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >{n}</button>
                ))}

                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-gray-600 dark:text-gray-400"
                >›</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
