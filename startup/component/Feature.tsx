export function Feature({ icon, title, desc }: any) {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-lg">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
    </div>
  );
}
