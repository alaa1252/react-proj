import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'الاسم مطلوب';
  else if (form.name.trim().length < 2) errors.name = 'الاسم يجب أن يكون حرفين على الأقل';

  if (!form.email.trim()) errors.email = 'البريد الإلكتروني مطلوب';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'بريد إلكتروني غير صالح';

  if (!form.password) errors.password = 'كلمة المرور مطلوبة';
  else if (form.password.length < 8) errors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';

  if (!form.confirm) errors.confirm = 'تأكيد كلمة المرور مطلوب';
  else if (form.password !== form.confirm) errors.confirm = 'كلمتا المرور غير متطابقتين';

  if (!form.terms) errors.terms = 'يجب الموافقة على الشروط';

  return errors;
}

function PasswordStrength({ password }) {
  if (!password) return null;
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const strength = checks.filter(Boolean).length;
  const labels = ['', 'ضعيفة', 'مقبولة', 'جيدة', 'قوية'];
  const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= strength ? colors[strength] : 'bg-gray-200 dark:bg-gray-700'}`} />
        ))}
      </div>
      <p className={`text-xs mt-1 ${strength <= 1 ? 'text-red-500' : strength <= 2 ? 'text-orange-500' : strength <= 3 ? 'text-yellow-600' : 'text-green-600'}`}>
        {labels[strength] && `قوة كلمة المرور: ${labels[strength]}`}
      </p>
    </div>
  );
}

export default function Register() {
  const { dispatch, notify } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', terms: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    dispatch({ type: 'LOGIN', payload: { name: form.name, email: form.email, role: 'user' } });
    notify('مرحباً! تم إنشاء حسابك بنجاح 🎉');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="font-bold text-2xl text-gray-900 dark:text-white">
              Edu<span className="text-primary-600">Platform</span>
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">أنشئ حسابك المجاني 🚀</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">انضم لأكثر من 50,000 متعلم</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input label="الاسم الكامل *" placeholder="محمد الأحمد" value={form.name} onChange={handleChange('name')} error={errors.name} />
            <Input label="البريد الإلكتروني *" type="email" placeholder="example@email.com" value={form.email} onChange={handleChange('email')} error={errors.email} />

            <div>
              <Input label="كلمة المرور *" type="password" placeholder="8 أحرف على الأقل" value={form.password} onChange={handleChange('password')} error={errors.password} />
              <PasswordStrength password={form.password} />
            </div>

            <Input label="تأكيد كلمة المرور *" type="password" placeholder="أعد إدخال كلمة المرور" value={form.confirm} onChange={handleChange('confirm')} error={errors.confirm} />

            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={form.terms} onChange={handleChange('terms')}
                  className="mt-1 w-4 h-4 text-primary-600 rounded border-gray-300 dark:border-gray-600 focus:ring-primary-500 shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  أوافق على{' '}
                  <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">شروط الاستخدام</a>
                  {' '}و{' '}
                  <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">سياسة الخصوصية</a>
                </span>
              </label>
              {errors.terms && <p className="text-xs text-red-500 mt-1">{errors.terms}</p>}
            </div>

            <Button type="submit" loading={loading} size="lg" className="w-full justify-center">
              {loading ? 'جارٍ إنشاء الحساب...' : 'إنشاء الحساب المجاني'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            لديك حساب بالفعل؟{' '}
            <Link to="/login" className="text-primary-600 dark:text-primary-400 font-bold hover:underline">
              سجل دخولك
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
