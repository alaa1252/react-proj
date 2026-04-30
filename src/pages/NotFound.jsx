import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="text-center animate-fade-in">
        <div className="text-[10rem] leading-none font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary-400 to-blue-600 select-none">
          404
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 -mt-4">
          الصفحة غير موجودة
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
          يبدو أن الصفحة التي تبحث عنها لا وجود لها أو تمت إزالتها.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/" className="btn-primary">
            العودة للرئيسية 🏠
          </Link>
          <Link to="/courses" className="btn-secondary">
            استعرض الدورات
          </Link>
        </div>
      </div>
    </div>
  );
}
