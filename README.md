# EduPlatform – منصة دورات وخدمات رقمية

> مشروع React JS نهائي كامل – EdTech / SaaS Landing + Dashboard Lite

---

## 🚀 طريقة التشغيل

```bash
# 1. ثبّت الاعتماديات
npm install

# 2. شغّل بيئة التطوير
npm run dev

# 3. افتح المتصفح على
http://localhost:5173
```

### البناء للإنتاج
```bash
npm run build
npm run preview
```

---

## 📁 هيكل المشروع

```
edtech-platform/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── courses/
│   │   │   ├── CourseCard.jsx      # بطاقة الدورة
│   │   │   └── Filters.jsx         # SearchBar + FilterDropdown + SortBar
│   │   ├── dashboard/
│   │   │   └── Modal.jsx           # Modal قابل لإعادة الاستخدام
│   │   ├── layout/
│   │   │   ├── Layout.jsx          # الهيكل العام (Navbar + Outlet + Footer)
│   │   │   ├── Navbar.jsx          # شريط التنقل مع Dark Mode
│   │   │   └── Footer.jsx          # تذييل الصفحة
│   │   └── ui/
│   │       ├── Badge.jsx           # شارات الفئات والمستويات
│   │       ├── Button.jsx          # زر قابل لإعادة الاستخدام
│   │       ├── Input.jsx           # حقل إدخال مع Validation
│   │       ├── Loader.jsx          # Spinner + Skeleton
│   │       ├── Notification.jsx    # Toast إشعارات
│   │       └── States.jsx          # EmptyState + ErrorState
│   ├── context/
│   │   └── AppContext.jsx          # useReducer: darkMode، user، courses
│   ├── data/
│   │   └── courses.json            # بيانات الدورات المحلية
│   ├── hooks/
│   │   └── useFetch.js             # Custom hook لجلب البيانات
│   ├── pages/
│   │   ├── Home.jsx                # الرئيسية (Hero+Features+Testimonials+Pricing+CTA)
│   │   ├── Courses.jsx             # قائمة الدورات مع Search+Filter+Sort+Pagination
│   │   ├── CourseDetails.jsx       # تفاصيل دورة (Dynamic Route)
│   │   ├── Blog.jsx                # مقالات من JSONPlaceholder API
│   │   ├── About.jsx               # صفحة من نحن
│   │   ├── Contact.jsx             # نموذج تواصل مع Validation
│   │   ├── Login.jsx               # تسجيل دخول
│   │   ├── Register.jsx            # إنشاء حساب
│   │   ├── Dashboard.jsx           # لوحة تحكم CRUD كامل
│   │   └── NotFound.jsx            # صفحة 404
│   ├── App.jsx                     # React Router – جميع المسارات
│   ├── main.jsx                    # نقطة الدخول
│   └── index.css                   # Tailwind + Custom Classes
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## ✅ المتطلبات الأساسية المنفذة

| المتطلب | الحالة |
|---------|--------|
| React + Vite | ✅ |
| TailwindCSS | ✅ |
| React Router (صفحات متعددة) | ✅ |
| Layout: Navbar + Footer | ✅ |
| صفحات: Home, Courses, Details, About, Contact | ✅ |
| صفحة Dashboard مع Add/Edit/Delete | ✅ |
| بيانات من API وهمي (JSONPlaceholder) | ✅ |
| Responsive + RTL Support | ✅ |
| Loading / Error / Empty State | ✅ |
| Dark Mode | ✅ |
| Forms + Validation | ✅ |
| State Management (useReducer + Context) | ✅ |
| localStorage للحفظ | ✅ |
| README | ✅ |

---

## 📄 الصفحات

| الصفحة | المسار | الوصف |
|--------|--------|-------|
| الرئيسية | `/` | Hero + Features + Testimonials + Pricing + CTA |
| الدورات | `/courses` | قائمة مع بحث وفلترة وترتيب وصفحات |
| تفاصيل الدورة | `/courses/:id` | صفحة ديناميكية لكل دورة |
| المدونة | `/blog` | مقالات من JSONPlaceholder API |
| من نحن | `/about` | الفريق والقيم والإحصائيات |
| تواصل | `/contact` | نموذج تواصل مع validation كامل |
| تسجيل الدخول | `/login` | Auth UI |
| إنشاء حساب | `/register` | Auth UI مع Password Strength |
| لوحة التحكم | `/dashboard` | CRUD + Tabs + Pagination + Modal |

---

## 🛠 التقنيات المستخدمة

- **React 18** + **Vite 6**
- **TailwindCSS 3** (Dark Mode, RTL, Custom Animations)
- **React Router DOM 6** (Routes, useParams, Navigate)
- **React Context + useReducer** (Global State)
- **localStorage** (Persistence)
- **JSONPlaceholder API** (Fake REST API)
- **Custom Hooks** (useFetch)

---

## 🌐 النشر على Vercel/Netlify

```bash
npm run build
# ثم ارفع مجلد dist/ على Vercel أو Netlify
```

> لا تنسَ تفعيل SPA Redirects: أضف `_redirects` في `public/` بمحتوى: `/* /index.html 200`

---

## 👤 بيانات تجريبية للدخول

- أي بريد إلكتروني صالح
- كلمة مرور: 6 أحرف فأكثر

---

*مشروع نهائي – React JS Final Project*
