import { useState, useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Modal from '../components/dashboard/Modal';
import Button from '../components/ui/Button';
import Badge, { LevelBadge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/States';
import { SearchBar } from '../components/courses/Filters';

const TABS = [
  { key: 'all', label: 'جميع الدورات' },
  { key: 'برمجة', label: 'البرمجة' },
  { key: 'تصميم', label: 'التصميم' },
  { key: 'ذكاء اصطناعي', label: 'AI' },
  { key: 'تسويق', label: 'التسويق' },
];

const EMPTY_FORM = {
  title: '', instructor: '', category: 'برمجة', level: 'مبتدئ',
  price: '', originalPrice: '', rating: '', students: '', duration: '',
  lessons: '', description: '', image: '', tags: '',
};

function validate(form) {
  const errors = {};
  if (!form.title.trim()) errors.title = 'العنوان مطلوب';
  if (!form.instructor.trim()) errors.instructor = 'اسم المدرب مطلوب';
  if (!form.price || isNaN(form.price) || Number(form.price) < 0) errors.price = 'السعر يجب أن يكون رقماً موجباً';
  if (!form.description.trim()) errors.description = 'الوصف مطلوب';
  return errors;
}

function StatCard({ icon, label, value, color = 'primary' }) {
  const colors = {
    primary: 'from-primary-500 to-primary-700',
    green: 'from-green-500 to-green-700',
    orange: 'from-orange-500 to-orange-600',
    purple: 'from-purple-500 to-purple-700',
  };
  return (
    <div className={`card p-5 bg-gradient-to-br ${colors[color]} text-white overflow-hidden relative`}>
      <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-white/10" />
      <div className="relative z-10">
        <div className="text-3xl mb-2">{icon}</div>
        <div className="text-2xl font-extrabold">{value}</div>
        <div className="text-sm opacity-80 mt-0.5">{label}</div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { state, dispatch, notify } = useApp();
  const { user, courses } = state;

  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const ITEMS_PER_PAGE = 5;

  if (!user) return <Navigate to="/login" replace />;

  const filtered = useMemo(() => {
    let list = [...courses];
    if (tab !== 'all') list = list.filter(c => c.category === tab);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c => c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q));
    }
    return list;
  }, [courses, tab, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const stats = {
    total: courses.length,
    students: courses.reduce((a, c) => a + (c.students || 0), 0),
    revenue: courses.reduce((a, c) => a + (c.price || 0), 0),
    avgRating: courses.length ? (courses.reduce((a, c) => a + (c.rating || 0), 0) / courses.length).toFixed(1) : '0',
  };

  const openAdd = () => {
    setEditingCourse(null);
    setForm(EMPTY_FORM);
    setFormErrors({});
    setModalOpen(true);
  };

  const openEdit = (course) => {
    setEditingCourse(course);
    setForm({
      ...course,
      tags: Array.isArray(course.tags) ? course.tags.join(', ') : course.tags,
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const handleFormChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (formErrors[field]) setFormErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSave = async () => {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }

    setSaving(true);
    await new Promise(r => setTimeout(r, 800));

    const payload = {
      ...form,
      id: editingCourse ? editingCourse.id : Date.now(),
      price: Number(form.price) || 0,
      originalPrice: Number(form.originalPrice) || Number(form.price) * 2,
      rating: Number(form.rating) || 4.5,
      students: Number(form.students) || 0,
      lessons: Number(form.lessons) || 10,
      tags: typeof form.tags === 'string' ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : form.tags,
      image: form.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
      featured: false,
      createdAt: editingCourse ? editingCourse.createdAt : new Date().toISOString().split('T')[0],
    };

    if (editingCourse) {
      dispatch({ type: 'UPDATE_COURSE', payload });
      notify('تم تحديث الدورة بنجاح ✏️');
    } else {
      dispatch({ type: 'ADD_COURSE', payload });
      notify('تمت إضافة الدورة بنجاح ✅');
    }
    setSaving(false);
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_COURSE', payload: id });
    notify('تم حذف الدورة', 'error');
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-gray-950">
      <div className="container-app py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              لوحة التحكم 👋
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              مرحباً {user.name}! إليك نظرة عامة على منصتك
            </p>
          </div>
          <Button onClick={openAdd} size="md">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            إضافة دورة جديدة
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon="📚" label="إجمالي الدورات" value={stats.total} color="primary" />
          <StatCard icon="👥" label="إجمالي الطلاب" value={stats.students.toLocaleString()} color="green" />
          <StatCard icon="💰" label="إجمالي الأسعار ($)" value={`$${stats.revenue.toLocaleString()}`} color="orange" />
          <StatCard icon="⭐" label="متوسط التقييم" value={stats.avgRating} color="purple" />
        </div>

        {/* Courses Table */}
        <div className="card">
          {/* Tabs */}
          <div className="flex items-center gap-1 p-4 border-b border-gray-100 dark:border-gray-700 overflow-x-auto">
            {TABS.map(t => (
              <button key={t.key} onClick={() => { setTab(t.key); setPage(1); }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  tab === t.key
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >{t.label}</button>
            ))}
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="max-w-xs">
              <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="ابحث في الدورات..." />
            </div>
          </div>

          {/* Table */}
          {paginated.length === 0 ? (
            <EmptyState
              title="لا توجد دورات"
              description={search ? 'لا توجد نتائج مطابقة للبحث' : 'لم تتم إضافة أي دورات بعد'}
              action={openAdd}
              actionLabel="إضافة أول دورة"
            />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                      <th className="p-4">الدورة</th>
                      <th className="p-4 hidden md:table-cell">الفئة</th>
                      <th className="p-4 hidden sm:table-cell">المستوى</th>
                      <th className="p-4">السعر</th>
                      <th className="p-4 hidden lg:table-cell">التقييم</th>
                      <th className="p-4 hidden lg:table-cell">الطلاب</th>
                      <th className="p-4">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    {paginated.map(course => (
                      <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={course.image} alt={course.title}
                              className="w-10 h-10 rounded-xl object-cover shrink-0 hidden sm:block" />
                            <div className="min-w-0">
                              <Link to={`/courses/${course.id}`}
                                className="font-semibold text-gray-900 dark:text-white text-sm hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-1">
                                {course.title}
                              </Link>
                              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{course.instructor}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <Badge color="blue">{course.category}</Badge>
                        </td>
                        <td className="p-4 hidden sm:table-cell">
                          <LevelBadge level={course.level} />
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-primary-600 dark:text-primary-400">${course.price}</span>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          <span className="flex items-center gap-1 text-sm">
                            <span className="text-yellow-400">★</span>
                            {course.rating}
                          </span>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{(course.students || 0).toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => openEdit(course)}
                              className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                              title="تعديل">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button onClick={() => setDeleteConfirm(course)}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                              title="حذف">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    عرض {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} من {filtered.length}
                  </p>
                  <div className="flex gap-1">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                      className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                      السابق
                    </button>
                    <span className="px-3 py-1.5 text-sm bg-primary-600 text-white rounded-lg font-medium">{page}</span>
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                      className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                      التالي
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCourse ? 'تعديل الدورة ✏️' : 'إضافة دورة جديدة ✨'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>إلغاء</Button>
            <Button loading={saving} onClick={handleSave}>
              {saving ? 'جارٍ الحفظ...' : editingCourse ? 'حفظ التعديلات' : 'إضافة الدورة'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">عنوان الدورة *</label>
            <input value={form.title} onChange={handleFormChange('title')} placeholder="مثال: تطوير الويب مع React"
              className={`input-field ${formErrors.title ? 'border-red-500' : ''}`} />
            {formErrors.title && <p className="text-xs text-red-500 mt-1">{formErrors.title}</p>}
          </div>

          {/* Instructor */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">اسم المدرب *</label>
            <input value={form.instructor} onChange={handleFormChange('instructor')} placeholder="مثال: محمد الأحمد"
              className={`input-field ${formErrors.instructor ? 'border-red-500' : ''}`} />
            {formErrors.instructor && <p className="text-xs text-red-500 mt-1">{formErrors.instructor}</p>}
          </div>

          {/* Category + Level */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">الفئة</label>
              <select value={form.category} onChange={handleFormChange('category')} className="input-field text-sm">
                {['برمجة', 'تصميم', 'ذكاء اصطناعي', 'تسويق', 'أمن', 'أعمال'].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">المستوى</label>
              <select value={form.level} onChange={handleFormChange('level')} className="input-field text-sm">
                {['مبتدئ', 'متوسط', 'متقدم'].map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>

          {/* Price + Original Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">السعر ($) *</label>
              <input type="number" min="0" value={form.price} onChange={handleFormChange('price')} placeholder="0"
                className={`input-field ${formErrors.price ? 'border-red-500' : ''}`} />
              {formErrors.price && <p className="text-xs text-red-500 mt-1">{formErrors.price}</p>}
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">السعر الأصلي ($)</label>
              <input type="number" min="0" value={form.originalPrice} onChange={handleFormChange('originalPrice')} placeholder="0" className="input-field" />
            </div>
          </div>

          {/* Duration + Lessons */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">المدة</label>
              <input value={form.duration} onChange={handleFormChange('duration')} placeholder="مثال: 20 ساعة" className="input-field" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">عدد الدروس</label>
              <input type="number" min="0" value={form.lessons} onChange={handleFormChange('lessons')} placeholder="0" className="input-field" />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">الوسوم (مفصولة بفاصلة)</label>
            <input value={form.tags} onChange={handleFormChange('tags')} placeholder="React, JavaScript, Web" className="input-field" />
          </div>

          {/* Image URL */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">رابط الصورة</label>
            <input value={form.image} onChange={handleFormChange('image')} placeholder="https://..." className="input-field" />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">الوصف *</label>
            <textarea rows={3} value={form.description} onChange={handleFormChange('description')} placeholder="وصف مختصر عن محتوى الدورة..."
              className={`input-field resize-none ${formErrors.description ? 'border-red-500' : ''}`} />
            {formErrors.description && <p className="text-xs text-red-500 mt-1">{formErrors.description}</p>}
          </div>
        </div>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="تأكيد الحذف ⚠️"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>إلغاء</Button>
            <Button variant="danger" onClick={() => handleDelete(deleteConfirm?.id)}>نعم، احذف</Button>
          </>
        }
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-1">هل أنت متأكد من حذف الدورة:</p>
          <p className="font-bold text-gray-900 dark:text-white">"{deleteConfirm?.title}"</p>
          <p className="text-sm text-red-500 mt-2">لا يمكن التراجع عن هذا الإجراء</p>
        </div>
      </Modal>
    </div>
  );
}
