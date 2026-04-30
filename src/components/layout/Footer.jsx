import { Link } from 'react-router-dom';

const footerLinks = {
  'الدورات': [
    { label: 'البرمجة', to: '/courses?category=برمجة' },
    { label: 'التصميم', to: '/courses?category=تصميم' },
    { label: 'الذكاء الاصطناعي', to: '/courses?category=ذكاء اصطناعي' },
    { label: 'التسويق', to: '/courses?category=تسويق' },
  ],
  'الشركة': [
    { label: 'من نحن', to: '/about' },
    { label: 'تواصل معنا', to: '/contact' },
    { label: 'المدونة', to: '/blog' },
  ],
  'الحساب': [
    { label: 'تسجيل الدخول', to: '/login' },
    { label: 'إنشاء حساب', to: '/register' },
    { label: 'لوحة التحكم', to: '/dashboard' },
  ],
};

const socials = [
  { icon: '𝕏', href: '#', label: 'Twitter' },
  { icon: 'in', href: '#', label: 'LinkedIn' },
  { icon: 'YT', href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 dark:bg-black text-gray-400 mt-auto">
      <div className="container-app py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="font-bold text-xl text-white">
                Edu<span className="text-primary-400">Platform</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              منصتك التعليمية الأولى في العالم العربي. تعلم المهارات الرقمية من خبراء متخصصين بأسلوب عملي وشامل.
            </p>
            <div className="flex gap-3">
              {socials.map(s => (
                <a key={s.label} href={s.href}
                  className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-primary-700 flex items-center justify-center text-xs font-bold transition-all duration-200 hover:text-white"
                  title={s.label}>{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l.label}>
                    <Link to={l.to}
                      className="text-sm hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} EduPlatform. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-white transition-colors">شروط الاستخدام</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
