import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import CourseCard from '../components/courses/CourseCard';

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 pt-20">
      {/* BG decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-200/30 dark:bg-primary-900/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-200/30 dark:bg-blue-900/20 blur-3xl" />
      </div>

      <div className="container-app relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center py-16">
          {/* Text */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-semibold">
              🚀 المنصة التعليمية الأولى في العالم العربي
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
              طوّر مهاراتك<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-600 to-blue-500">
                وابنِ مستقبلك
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
              انضم لأكثر من 50,000 متعلم وتعلم من أفضل الخبراء في البرمجة والتصميم والذكاء الاصطناعي والتسويق الرقمي.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/courses" className="btn-primary text-base px-8 py-4">
                استعرض الدورات 📚
              </Link>
              <Link to="/register" className="btn-secondary text-base px-8 py-4">
                ابدأ مجاناً ←
              </Link>
            </div>
            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-2">
              {[
                { value: '50K+', label: 'متعلم نشط' },
                { value: '200+', label: 'دورة تعليمية' },
                { value: '98%', label: 'نسبة الرضا' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-2xl font-extrabold text-primary-600 dark:text-primary-400">{s.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Illustration Card */}
          <div className="hidden lg:block relative animate-fade-in">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80"
                alt="Students learning"
                className="w-full rounded-3xl shadow-2xl object-cover h-96"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">متعلم جديد انضم</p>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">كل 3 دقائق!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  { icon: '🎯', title: 'تعلم بأسلوبك', desc: 'دروس مسجلة يمكنك مشاهدتها في أي وقت ومن أي مكان' },
  { icon: '👨‍🏫', title: 'خبراء متخصصون', desc: 'مدربون معتمدون بخبرة عملية في الصناعة' },
  { icon: '🏆', title: 'شهادات معتمدة', desc: 'احصل على شهادات إتمام معترف بها من كبرى الشركات' },
  { icon: '💬', title: 'مجتمع داعم', desc: 'انضم لمجتمع من المتعلمين والخبراء للنقاش والتعاون' },
  { icon: '📱', title: 'تعلم من أي جهاز', desc: 'منصتنا تعمل على الموبايل والتابلت والكمبيوتر' },
  { icon: '🔄', title: 'محتوى محدث باستمرار', desc: 'دوراتنا تتحدث لتواكب أحدث التقنيات والاتجاهات' },
];

function FeaturesSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="container-app">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">لماذا تختار EduPlatform؟</h2>
          <p className="section-subtitle mx-auto">نوفر لك كل ما تحتاجه لرحلة تعلم ناجحة ومثمرة</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(f => (
            <div key={f.title} className="card p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200 inline-block">{f.icon}</div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  { name: 'أيمن الرشيد', role: 'مطور Full Stack', text: 'تعلمت React وNode.js من EduPlatform وحصلت على وظيفة بعد 4 أشهر فقط! المحتوى ممتاز والمدربون محترفون.', avatar: 'أ', rating: 5 },
  { name: 'مروى الحسن', role: 'مصممة UI/UX', text: 'كنت أبدأ من الصفر في التصميم، والآن أعمل لدى إحدى كبرى شركات التقنية. شكراً EduPlatform!', avatar: 'م', rating: 5 },
  { name: 'عبدالله الفارسي', role: 'مهندس بيانات', text: 'دورات الذكاء الاصطناعي رائعة جداً وعملية. أنصح بها كل من يريد دخول هذا المجال المتنامي.', avatar: 'ع', rating: 5 },
];

function TestimonialsSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container-app">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">ماذا يقول طلابنا؟</h2>
          <p className="section-subtitle mx-auto">قصص نجاح حقيقية من متعلمين عبر EduPlatform</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(t => (
            <div key={t.name} className="card p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex text-yellow-400 mb-4 text-lg">
                {'★'.repeat(t.rating)}
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-sm">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-blue-500 flex items-center justify-center text-white font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
const plans = [
  {
    name: 'مجاني', price: 0, period: 'للأبد',
    features: ['5 دورات مجانية', 'شهادة إتمام', 'دعم المجتمع'],
    cta: 'ابدأ مجاناً', variant: 'secondary',
  },
  {
    name: 'Pro', price: 49, period: '/شهر',
    features: ['جميع الدورات', 'شهادات معتمدة', 'دعم مباشر 24/7', 'مشاريع عملية', 'تحديثات مدى الحياة'],
    cta: 'ابدأ تجربة مجانية', variant: 'primary', popular: true,
  },
  {
    name: 'للمؤسسات', price: 199, period: '/شهر',
    features: ['كل مميزات Pro', 'مقاعد غير محدودة', 'تقارير تفصيلية', 'مدير حساب مخصص', 'API Integration'],
    cta: 'تواصل معنا', variant: 'secondary',
  },
];

function PricingSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="container-app">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">خطط تناسب جميع الاحتياجات</h2>
          <p className="section-subtitle mx-auto">ابدأ مجاناً وترقَّ حسب احتياجاتك</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map(plan => (
            <div key={plan.name} className={`card p-8 flex flex-col gap-6 relative ${plan.popular ? 'border-2 border-primary-500 shadow-xl scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">الأكثر شعبية ⭐</span>
                </div>
              )}
              <div>
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-primary-600 dark:text-primary-400">${plan.price}</span>
                  <span className="text-gray-500 dark:text-gray-400">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-3 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-green-500 font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link to="/register"
                className={`text-center font-bold py-3 px-6 rounded-xl transition-all duration-200 ${
                  plan.variant === 'primary'
                    ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-md'
                    : 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white'
                }`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-l from-primary-700 to-blue-700">
      <div className="container-app text-center text-white">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
          هل أنت مستعد لبدء رحلتك؟
        </h2>
        <p className="text-lg text-primary-100 mb-10 max-w-xl mx-auto">
          انضم لأكثر من 50,000 متعلم يطورون مهاراتهم يومياً على EduPlatform
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/register"
            className="px-10 py-4 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-all shadow-lg text-base">
            ابدأ الآن مجاناً 🚀
          </Link>
          <Link to="/courses"
            className="px-10 py-4 border-2 border-white/50 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-base">
            استعرض الدورات
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const { state } = useApp();
  const featured = state.courses.filter(c => c.featured).slice(0, 3);

  return (
    <div>
      <HeroSection />
      <FeaturesSection />

      {/* Featured Courses */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container-app">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <h2 className="section-title">الدورات المميزة</h2>
              <p className="section-subtitle mt-2">أكثر الدورات طلباً من متعلمينا</p>
            </div>
            <Link to="/courses" className="btn-secondary text-sm py-2 px-5">
              عرض جميع الدورات ←
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </div>
  );
}
