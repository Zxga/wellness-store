const outlets = ['VOGUE', 'Allure', 'BYRDIE', 'Forbes', 'ELLE'];

export default function AsSeenIn() {
  return (
    <section className="py-14 border-t border-white/8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-text-tertiary text-xs uppercase tracking-[0.3em] mb-8">As Seen In</p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {outlets.map((o) => (
            <span
              key={o}
              className="font-display font-700 text-xl sm:text-2xl text-white/30 hover:text-accent transition-colors duration-300 tracking-wide"
              style={{ fontVariant: 'small-caps' }}
            >
              {o}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
