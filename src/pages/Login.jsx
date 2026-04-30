import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

function validate(form) {
  const errors = {};
  if (!form.email.trim()) errors.email = 'البريد الإلكتروني مطلوب';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'بريد إلكتروني غير صالح';
  if (!form.password) errors.password = 'كلمة المرور مطلوبة';
  else if (form.password.length < 6) errors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
  return errors;
}

export default function Login() {
  const { dispatch, notify } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));

    dispatch({ type: 'LOGIN', payload: { name: 'المستخدم', email: form.email, role: 'user' } });
    notify('مرحباً بك! تم تسجيل الدخول بنجاح 🎉');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="font-bold text-2xl text-gray-900 dark:text-white">
              Edu<span className="text-primary-600">Platform</span>
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">أهلاً بعودتك! 👋</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">سجل دخولك للوصول لدوراتك</p>
        </div>

        <div className="card p-8">
          {/* Demo hint */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 mb-6">
            <p className="text-xs text-blue-700 dark:text-blue-400 text-center">
              💡 للتجربة: أي بريد إلكتروني صالح وكلمة مرور 6+ أحرف
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="البريد الإلكتروني"
              type="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange('email')}
              error={errors.email}
              icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>}
            />

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">كلمة المرور</label>
                <a href="#" className="text-xs text-primary-600 dark:text-primary-400 hover:underline">نسيت كلمة المرور؟</a>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange('password')}
                  className={`input-field pr-10 ${errors.password ? 'border-red-500' : ''}`}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-sm">
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            <Button type="submit" loading={loading} size="lg" className="w-full justify-center">
              {loading ? 'جارٍ الدخول...' : 'تسجيل الدخول'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            ليس لديك حساب؟{' '}
            <Link to="/register" className="text-primary-600 dark:text-primary-400 font-bold hover:underline">
              أنشئ حساباً مجانياً
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
