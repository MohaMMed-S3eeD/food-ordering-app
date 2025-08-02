import { useTranslations } from "next-intl";

function MainHeading( ) {
  const t = useTranslations("menu");

  return (
    <div className="text-center">
      <span className={`uppercase  font-semibold leading-4 text-zinc-400 `}>
        {t("title")}
      </span>
      <h2 className={`text-primary font-bold text-4xl italic `}>{t("subTitle")}</h2>
    </div>
  );
}

export default MainHeading;
