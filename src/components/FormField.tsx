/** Общите полета на формата за запитване. */

/** Позволени са само цифри, интервали и +()- ; „+“ само в началото. */
export const PHONE_PATTERN = "\\+?[0-9][0-9 \\(\\)\\-]{5,18}";

export function sanitizePhone(value: string) {
  const cleaned = value.replace(/[^\d+\s()-]/g, "");
  // „+“ има смисъл единствено като първи символ.
  return cleaned.charAt(0) + cleaned.slice(1).replace(/\+/g, "");
}

/**
 * <label> обгръща полето, за да е тапваем и етикетът (иначе ~40% мъртва зона на телефон).
 * `error` се показва под полето само след като човекът го е напуснал или е натиснал „Изпрати“
 * (:user-invalid) — не крещи още докато пише.
 */
export function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-slate-300">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 hidden text-[12.5px] leading-snug text-red-300 peer-[:user-invalid]:block">
          {error}
        </span>
      )}
    </label>
  );
}

/** 16px на телефон: под това iOS увеличава страницата при фокус и формата „скача“. */
export const inputCls = `
  peer h-12 w-full rounded-xl bg-white/[0.04] px-4 text-[16px] text-slate-100 sm:h-11 sm:text-[14.5px]
  ring-1 ring-inset ring-white/[0.10] placeholder:text-slate-500
  transition-all duration-150
  focus:outline-none focus:bg-white/[0.06] focus:ring-2 focus:ring-[#22d3ee]/40
  [&:user-invalid]:ring-red-400/60
`;

/** Избор с един тап вместо падащо меню: опциите се виждат, без да се отваря нищо. */
export const chipCls = (checked: boolean) =>
  `inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl px-4 text-center text-[14px] font-semibold ring-1 ring-inset transition-colors ${
    checked ? "bg-cyan-300/10 text-cyan-100 ring-cyan-300/50" : "bg-white/[0.04] text-slate-300 ring-white/[0.10] hover:bg-white/[0.07]"
  }`;
