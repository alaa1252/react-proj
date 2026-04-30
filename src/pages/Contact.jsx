import { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'الاسم مطلوب';
  else if (form.name.trim().length < 2) errors.name = 'الاسم يجب أن يكون حرفين على الأقل';

  if (!form.email.trim()) errors.email = 'البريد الإلكتروني مطلوب';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'بريد إلكتروني غير صالح';

  if (!form.subject.trim()) errors.subject = 'الموضوع مطلوب';

  if (!form.message.trim()) errors.message = 'الرسالة مطلوبة';
  else if (form.message.trim().length < 20) errors.message = 'الرسالة يجب أن تكون 20 حرفاً على الأقل';

  return errors;
}

const contactInfo = [
  { icon: '📧', label: 'البريد الإلكتروني', value: 'hello@eduplatform.com', href: 'mailto:hello@eduplatform.com' },
  { icon: '📞', label: 'الهاتف', value: '+966 50 000 0000', href: 'tel:+966500000000' },
  { icon: '📍', label: 'الموقع', value: 'الرياض، المملكة العربية السعودية', href: '#' },
  { icon: '🕐', label: 'ساعات الدعم', value: 'الأحد - الخميس: 9ص - 5م', href: '#' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container-app text-center max-w-2xl mx-auto">
          <h1 className="section-title mb-4">تواصل معنا</h1>
          <p className="section-subtitle mx-auto">
            هل لديك سؤال أو اقتراح؟ فريقنا هنا لمساعدتك في أي وقت
          </p>
        </div>
      </section>

      <div className="container-app py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">معلومات التواصل</h2>
            {contactInfo.map(info => (
              <a key={info.label} href={info.href}
                className="card p-5 flex items-start gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="text-2xl group-hover:scale-110 transition-transform">{info.icon}</div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-0.5">{info.label}</p>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{info.value}</p>
                </div>
              </a>
            ))}

            <div className="card p-5">
              <p className="text-sm font-bold text-gray-900 dark:text-white mb-3">تابعنا على</p>
              <div className="flex gap-3">
                {['𝕏 Twitter', 'in LinkedIn', 'YT YouTube'].map(s => (
                  <a key={s} href="#"
                    className="flex-1 text-center text-xs py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-400 transition-all font-medium">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {success ? (
              <div className="card p-12 text-center animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">تم إرسال رسالتك! 🎉</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                  شكراً لك! سنرد عليك خلال 24 ساعة عمل على بريدك الإلكتروني.
                </p>
                <Button onClick={() => setSuccess(false)} variant="secondary">
                  إرسال رسالة أخرى
                </Button>
              </div>
            ) : (
              <div className="card p-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">أرسل لنا رسالة</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      label="الاسم الكامل *"
                      placeholder="محمد الأحمد"
                      value={form.name}
                      onChange={handleChange('name')}
                      error={errors.name}
                    />
                    <Input
                      label="البريد الإلكتروني *"
                      type="email"
                      placeholder="example@email.com"
                      value={form.email}
                      onChange={handleChange('email')}
                      error={errors.email}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">الموضوع *</label>
                    <select
                      value={form.subject}
                      onChange={handleChange('subject')}
                      className={`input-field ${errors.subject ? 'border-red-500' : ''}`}
                    >
                      <option value="">اختر موضوع الرسالة...</option>
                      <option>استفسار عن دورة</option>
                      <option>مشكلة تقنية</option>
                      <option>طلب استرداد مال</option>
                      <option>اقتراح دورة جديدة</option>
                      <option>الشراكات والتعاون</option>
                      <option>أخرى</option>
                    </select>
                    {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">الرسالة *</label>
                    <textarea
                      rows={5}
                      placeholder="اكتب رسالتك هنا... (20 حرف على الأقل)"
                      value={form.message}
                      onChange={handleChange('message')}
                      className={`input-field resize-none ${errors.message ? 'border-red-500' : ''}`}
                    />
                    <div className="flex justify-between mt-1">
                      {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                      <p className={`text-xs mr-auto ${form.message.length < 20 ? 'text-gray-400' : 'text-green-500'}`}>
                        {form.message.length} / 20+ حرف
                      </p>
                    </div>
                  </div>

                  <Button type="submit" loading={loading} size="lg" className="w-full justify-center">
                    {loading ? 'جارٍ الإرسال...' : 'إرسال الرسالة 📨'}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
