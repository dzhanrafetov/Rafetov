const Footer = () => {
  return (
    <footer
      className="relative isolate overflow-hidden text-slate-400"
      style={
        {
          backgroundColor: "#0b0f19",
          ["--accent" as any]: "#22D3EE",
          ["--hairline" as any]: "#1f2937",
        } as React.CSSProperties
      }
    >
      {/* hairline top */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      {/* subtle glow */}
      <div aria-hidden className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl bg-[var(--accent)]/10" />

      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-left">
            <div className="text-[12px] uppercase tracking-[0.18em] text-slate-500">rafetov.com</div>
            <div className="mt-1 text-[15px] font-semibold text-slate-200">
              Премиум сайтове и e-магазини
            </div>
          </div>

          <div className="text-center sm:text-right">
            <div className="text-[12.5px] text-slate-400">
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-extrabold text-slate-100">RAFETOV.COM</span>. Всички права са запазени.
            </div>
            <div className="mt-1 text-[12.5px] text-slate-500">
              Дизайн, който изглежда скъпо и работи.
            </div>
          </div>
        </div>

        {/* bottom hairline */}
        <div aria-hidden className="mt-8 h-px w-full" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
        <div className="mt-4 text-center text-[12px] text-slate-500">
          Изработка и поддръжка на дигитални проекти.
        </div>
      </div>
    </footer>
  );
};

export default Footer;