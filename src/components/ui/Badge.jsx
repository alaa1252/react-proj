const colors = {
  blue:   'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  green:  'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  red:    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  gray:   'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
};

const levelColors = {
  'مبتدئ': 'green',
  'متوسط': 'orange',
  'متقدم': 'red',
};

export default function Badge({ children, color = 'blue', className = '' }) {
  return (
    <span className={`badge ${colors[color] || colors.gray} ${className}`}>
      {children}
    </span>
  );
}

export function LevelBadge({ level }) {
  const color = levelColors[level] || 'gray';
  return <Badge color={color}>{level}</Badge>;
}
