import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Badge, { LevelBadge } from '../components/ui/Badge';
import { ErrorState } from '../components/ui/States';
import CourseCard from '../components/courses/CourseCard';

export default function CourseDetails() {
  const { id } = useParams();
  const { state } = useApp();
  const navigate = useNavigate();

  const course = state.courses.find(c => c.id === Number(id));
  const related = state.courses.filter(c => c.id !== Number(id) && c.category === course?.category).slice(0, 3);

  if (!course) {
    return (
      <div className="min-h-screen pt-24 container-app">
        <ErrorState message="لم يتم العثور على هذه الدورة. ربما تمت إزالتها." />
        <div className="flex justify-center mt-6">
          <button onClick={() => navigate('/courses')} className="btn-primary">العودة للدورات</button>
        </div>
      </div>
    );
  }

  const discount = Math.round((1 - course.price / course.originalPrice) * 100);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-gray-950">
      {/* Hero Banner */}
      <div className="bg-gradient-to-l from-gray-900 to-gray-800 text-white py-12">
        <div className="container-app">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <span>›</span>
            <Link to="/courses" className="hover:text-white transition-colors">الدورات</Link>
            <span>›</span>
            <span className="text-gray-200">{course.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2 space-y-5">
              <div className="flex flex-wrap gap-2">
                <Badge color="blue">{course.category}</Badge>
                <LevelBadge level={course.level} />
                {course.featured && <Badge color="orange">⭐ مميز</Badge>}
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold leading-tight">{course.title}</h1>
              <p className="text-gray-300 leading-relaxed text-base">{course.description}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <strong className="text-white text-lg">{course.rating}</strong>
                </span>
                <span>👥 {course.students.toLocaleString()} طالب</span>
                <span>⏱ {course.duration}</span>
                <span>📚 {course.lessons} درس</span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-lg">
                  {course.instructor[0]}
                </div>
                <div>
                  <p className="text-xs text-gray-400">المدرب</p>
                  <p className="font-bold text-white">{course.instructor}</p>
                </div>
              </div>
            </div>

            {/* Enroll Card */}
            <div className="card dark:bg-gray-800 p-6 space-y-5 lg:sticky lg:top-24">
              <img src={course.image} alt={course.title} className="w-full h-44 object-cover rounded-xl" />
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-primary-600 dark:text-primary-400">${course.price}</span>
                <span className="text-gray-400 line-through text-lg">${course.originalPrice}</span>
                <span className="badge bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">وفر {discount}%</span>
              </div>
              <Link to="/register" className="btn-primary w-full justify-center text-base py-4">
                اشترك الآن 🚀
              </Link>
              <p className="text-xs text-center text-gray-400">30 يوم ضمان استرداد المال</p>

              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p className="flex justify-between"><span>المستوى</span><strong>{course.level}</strong></p>
                <p className="flex justify-between"><span>المدة</span><strong>{course.duration}</strong></p>
                <p className="flex justify-between"><span>عدد الدروس</span><strong>{course.lessons}</strong></p>
                <p className="flex justify-between"><span>تاريخ النشر</span><strong>{new Date(course.createdAt).toLocaleDateString('ar-EG')}</strong></p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">التقنيات المشمولة</p>
                <div className="flex flex-wrap gap-1.5">
                  {course.tags.map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What you'll learn */}
      <div className="container-app py-12">
        <div className="lg:w-2/3">
          <div className="card p-8 mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">ماذا ستتعلم؟</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'المفاهيم الأساسية والمتقدمة للمادة',
                'تطبيق ما تتعلمه على مشاريع حقيقية',
                'أفضل الممارسات في الصناعة',
                'حل المشكلات التقنية بكفاءة',
                'بناء مشاريع شخصية قوية',
                'الاستعداد لسوق العمل',
              ].map(item => (
                <div key={item} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum preview */}
          <div className="card p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              محتوى الدورة ({course.lessons} درس)
            </h2>
            <div className="space-y-3">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      الوحدة {i + 1}: {['المقدمة والإعداد', 'المفاهيم الأساسية', 'التطبيق العملي', 'المشاريع المتقدمة', 'مشروع التخرج'][i]}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                    {[6, 8, 10, 12, 4][i]} دروس
                  </span>
                </div>
              ))}
              <p className="text-sm text-center text-gray-400 pt-2">... و{course.lessons - 40} درس آخر</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Courses */}
      {related.length > 0 && (
        <div className="container-app pb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">دورات ذات صلة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(c => <CourseCard key={c.id} course={c} />)}
          </div>
        </div>
      )}
    </div>
  );
}
