import { Link } from "react-router-dom";
import LegalLayout, { Section, List, Card, A } from "../components/LegalLayout";
import { BUSINESS, ROUTES } from "../constants/business";
import { useSeo } from "../hooks/useSeo";

export default function LegalNotice() {
  useSeo({
    title: "Правна информация | Rafetov.com",
    description:
      "Правна информация за rafetov.com — Джан Рафетов, БУЛСТАТ 181648949, контакти, предназначение на сайта и условия за ползване на съдържанието.",
    canonicalPath: ROUTES.legal,
  });

  return (
    <LegalLayout
      eyebrow="правна информация"
      title="Правна информация"
      intro="Данни за лицето, което поддържа този сайт, и за какво служи той."
      updated={BUSINESS.updated}
    >
      <Section title="1. Данни за администратора на сайта">
        <Card>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-4 text-[14.5px] sm:grid-cols-2">
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600">Марка</dt>
              <dd className="mt-1 text-slate-200">{BUSINESS.brand}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600">Лице</dt>
              <dd className="mt-1 text-slate-200">{BUSINESS.legalName}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600">БУЛСТАТ</dt>
              <dd className="mt-1 text-slate-200">{BUSINESS.bulstat}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600">Имейл</dt>
              <dd className="mt-1">
                <A href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</A>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600">Телефон</dt>
              <dd className="mt-1">
                <A href={BUSINESS.phoneHref}>{BUSINESS.phone}</A>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600">Място на дейност</dt>
              <dd className="mt-1 text-slate-200">{BUSINESS.city}</dd>
            </div>
          </dl>
        </Card>
        <p>
          {BUSINESS.brand} е търговската марка, под която {BUSINESS.legalName} предлага услуги по
          разработка на уебсайтове. Кореспонденцията се води по имейл и телефон.
        </p>
      </Section>

      <Section title="2. Предназначение на сайта">
        <p>
          Този сайт предоставя информация за предлаганите услуги — изработка на уебсайтове, електронни
          магазини и дигитални менюта — както и възможност да изпратите запитване чрез контактната
          форма.
        </p>
        <p>
          През сайта не се извършват онлайн продажби, не се приемат плащания и не се сключва договор.
          Изпратеното запитване е покана за контакт, а не поръчка и не поражда задължения за нито една
          от страните. Конкретните условия по всеки проект — обхват, срок и цена — се уговарят
          индивидуално, в отделна оферта или договор.
        </p>
      </Section>

      <Section title="3. Съдържание и точност на информацията">
        <p>
          Информацията в сайта е с общ информационен характер и се поддържа с грижа за нейната
          актуалност. Посочените услуги, срокове и примерни резултати не представляват обвързваща
          оферта по смисъла на закона, освен ако не са потвърдени писмено в конкретно предложение.
        </p>
      </Section>

      <Section title="4. Авторски права">
        <p>
          Съдържанието на сайта — текстове, дизайн, структура, графични елементи и програмен код — е
          обект на авторско право. Възпроизвеждането, копирането или използването му с търговска цел
          без предварително писмено съгласие не е разрешено.
        </p>
        <p>
          Показаните в секция „Проекти“ материали са свързани с реализирани проекти. Логата и марките
          на клиентите принадлежат на съответните им притежатели и са показани с илюстративна цел.
        </p>
      </Section>

      <Section title="5. Външни връзки">
        <p>
          Сайтът съдържа връзки към външни ресурси (например профили в социални мрежи, WhatsApp и
          реализирани проекти). Нямам контрол върху съдържанието и практиките за поверителност на тези
          сайтове и не нося отговорност за тях. При посещение важат техните собствени условия.
        </p>
      </Section>

      <Section title="6. Лични данни">
        <p>
          Обработването на лични данни, изпратени през контактната форма, както и техническите данни
          при посещение на сайта, са описани подробно в{" "}
          <Link
            to={ROUTES.privacy}
            className="font-semibold text-slate-200 underline decoration-slate-700 underline-offset-4 transition-colors hover:text-white hover:decoration-[#22D3EE]"
          >
            Политиката за поверителност
          </Link>
          .
        </p>
      </Section>

      <Section title="7. Приложимо право и контакт">
        <p>
          За отношенията, свързани с използването на този сайт, се прилага българското законодателство.
        </p>
        <List
          items={[
            <>Имейл: <A href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</A></>,
            <>Телефон: <A href={BUSINESS.phoneHref}>{BUSINESS.phone}</A></>,
          ]}
        />
      </Section>
    </LegalLayout>
  );
}
