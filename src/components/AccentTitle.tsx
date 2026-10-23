/**
 * Заглавие с циан акцент върху края му, както в секциите на началната страница
 * („… — <акцент>в четири стъпки.</акцент>“). Акцентът е последната от изброените фрази, която се среща в текста.
 */
export default function AccentTitle({ text, accents, breakBefore = false }: { text: string; accents: readonly string[]; breakBefore?: boolean }) {
  const part = accents.find((a) => text.includes(a));
  if (!part) return <>{text}</>;
  const i = text.lastIndexOf(part);
  return (
    <>
      {text.slice(0, i).trimEnd()}
      {/* breakBefore: акцентът започва нов ред, за да не остане „си“ само в началото на втория ред */}
      {breakBefore ? <br /> : " "}
      <span className="text-accent-text">{part}</span>
      {text.slice(i + part.length)}
    </>
  );
}
