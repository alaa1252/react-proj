const team = [
  { name: 'رنا الجابر', role: 'المؤسسة والرئيسة التنفيذية', bio: 'خبرة 10 سنوات في التعليم التقني وريادة الأعمال الرقمية.', emoji: '👩‍💼' },
  { name: 'سامي الدوسري', role: 'مدير المحتوى', bio: 'مطور برمجيات ومحاضر جامعي متخصص في تصميم المناهج.', emoji: '👨‍🏫' },
  { name: 'لمى العنزي', role: 'مديرة تجربة المستخدم', bio: 'مصممة UI/UX حائزة على جوائز دولية في التصميم التفاعلي.', emoji: '👩‍🎨' },
  { name: 'طارق المطيري', role: 'مهندس البنية التحتية', bio: 'خبير سحابي مع شهادات AWS وGoogle Cloud.', emoji: '👨‍💻' },
];

const values = [
  { icon: '🌍', title: 'وصول للجميع', desc: 'نؤمن أن التعليم حق للجميع. نوفر دورات مجانية وأسعار مناسبة للجميع.' },
  { icon: '✨', title: 'جودة بلا تنازل', desc: 'كل دورة تمر بمراجعة معمقة للتأكد من جودة المحتوى والمدرب.' },
  { icon: '🤝', title: 'مجتمع متعاون', desc: 'بناء مجتمع من المتعلمين يتعاونون ويدعمون بعضهم.' },
  { icon: '🔬', title: 'ابتكار مستمر', desc: 'نستخدم أحدث تقنيات التعليم الإلكتروني لتقديم أفضل تجربة.' },
];

export default function About() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-950 py-20">
        <div className="container-app text-center max-w-3xl mx-auto">
          <span className="badge bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 mb-4 text-sm px-4 py-1.5">
            من نحن
          </span>
          <h1 className="section-title mt-4 mb-6">
            نبنيَ مستقبل التعليم الرقمي العربي
          </h1>
          <p className="section-subtitle mx-auto text-base leading-relaxed">
            انطلقنا عام 2021 برؤية واحدة: جعل التعليم التقني المتميز في متناول كل عربي في أي مكان في العالم. اليوم، تخرج لدينا أكثر من 50,000 متعلم يعملون في كبرى شركات التقنية.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container-app">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'متعلم نشط', icon: '👥' },
              { value: '200+', label: 'دورة متاحة', icon: '📚' },
              { value: '50+', label: 'مدرب خبير', icon: '👨‍🏫' },
              { value: '15+', label: 'دولة عربية', icon: '🌍' },
            ].map(s => (
              <div key={s.label} className="card p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-3xl font-extrabold text-primary-600 dark:text-primary-400 mb-1">{s.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-app">
          <h2 className="section-title text-center mb-3">قيمنا</h2>
          <p className="section-subtitle text-center mx-auto mb-12">المبادئ التي تحكم كل قرار نتخذه</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="card p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container-app">
          <h2 className="section-title text-center mb-3">فريقنا</h2>
          <p className="section-subtitle text-center mx-auto mb-12">العقول والقلوب خلف EduPlatform</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(member => (
              <div key={member.name} className="card p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-100 to-blue-100 dark:from-primary-900/30 dark:to-blue-900/30 flex items-center justify-center text-4xl mx-auto mb-4 group-hover:scale-105 transition-transform shadow-md">
                  {member.emoji}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold mb-3">{member.role}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
