import { FaViber } from "react-icons/fa";

/** Иконата на Viber (плътна), в същия размер и стил като WhatsAppIcon. */
export default function ViberIcon({ className = "h-5 w-5" }: { className?: string }) {
  return <FaViber className={className} aria-hidden />;
}
