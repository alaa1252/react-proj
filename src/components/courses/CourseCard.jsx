import { Link } from 'react-router-dom';
import Badge, { LevelBadge } from '../ui/Badge';

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-yellow-400">★</span>
      <span className="font-bold text-sm text-gray-900 dark:text-white">{rating}</span>
    </div>
  );
}

export default function CourseCard({ course }) {
  const discount = Math.round((1 - course.price / course.originalPrice) * 100);

  return (
    <div className="card group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {course.featured && (
          <div className="absolute top-3 right-3">
            <Badge color="orange">⭐ مميز</Badge>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge color="blue">{discount}% خصم</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Category + Level */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge color="blue">{course.category}</Badge>
          <LevelBadge level={course.level} />
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          بواسطة: <span className="font-semibold text-gray-700 dark:text-gray-300">{course.instructor}</span>
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <StarRating rating={course.rating} />
          <span>👥 {course.students.toLocaleString()}</span>
          <span>⏱ {course.duration}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {course.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-primary-600 dark:text-primary-400">
              ${course.price}
            </span>
            <span className="text-sm text-gray-400 line-through">${course.originalPrice}</span>
          </div>
          <Link to={`/courses/${course.id}`}
            className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline">
            عرض التفاصيل ←
          </Link>
        </div>
      </div>
    </div>
  );
}
