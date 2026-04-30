import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const navLinks = [
  { to: '/',          label: 'الرئيسية' },
  { to: '/courses',   label: 'الدورات' },
  { to: '/about',     label: 'من نحن' },
  { to: '/contact',   label: 'تواصل معنا' },
];

export default function Navbar() {
  const { state, dispatch } = useApp();
  const { darkMode, user } = state;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800'
        : 'bg-transparent'
    }`}>
      <div className="container-app">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-base">E</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              Edu<span className="text-primary-600">Platform</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >{l.label}</NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark Mode */}
            <button
              onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              title={darkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M18.364 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/dashboard"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-semibold hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-all">
                  <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs">
                    {user.name?.[0] || 'م'}
                  </div>
                  لوحة التحكم
                </Link>
                <button onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors px-2">
                  خروج
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors px-3 py-2">
                  تسجيل الدخول
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-5">
                  ابدأ مجاناً
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 animate-fade-in border-t border-gray-200 dark:border-gray-800 mt-2 pt-4 space-y-1">
            {navLinks.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >{l.label}</NavLink>
            ))}
            <div className="flex gap-2 pt-2 px-2">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center btn-primary text-sm py-2">لوحة التحكم</Link>
                  <button onClick={() => { handleLogout(); setMenuOpen(false); }}
                    className="flex-1 btn-secondary text-sm py-2">خروج</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center btn-secondary text-sm py-2">دخول</Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center btn-primary text-sm py-2">ابدأ مجاناً</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
