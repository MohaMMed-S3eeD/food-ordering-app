import Link from "@/components/Link";
import ButtonCrach from "@/components/ui/btn crach/buttonCrach";
import { CircleArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const Hero = () => {
  const t = useTranslations("home.hero");
  return (
    <section className="container grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 section-gap min-h-[80vh] lg:min-h-[50vh] ">
      <div className="relative h-full order-1 lg:order-2">
        <Image
          src="https://res.cloudinary.com/dtvr83fb3/image/upload/v1754017096/Pngtree_burger_with_fries_delicious_fast_21052980_z8v6cd.png"
          alt="Hero"
          loading="eager"
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="flex flex-col gap-4 md:gap-6 lg:justify-center order-2 lg:order-1">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-center lg:text-left">
          {t("title")}
        </h1>
        <p className="text-xs sm:text-lg lg:text-xl text-muted-foreground text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
          {t("description")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
          <Link href="/menu" className="w-full sm:w-auto">
            <ButtonCrach className="login-btn bubbles-login w-full sm:w-auto">
              <div className="flex items-center justify-center gap-2">
                {t("orderNow")}{" "}
                <CircleArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </ButtonCrach>
          </Link>
          <Link href="/menu" className="w-full sm:w-auto">
            <ButtonCrach className="bubbles w-full sm:w-auto">
              <div className="flex items-center justify-center gap-2">
                <h1>{t("viewMenu")}</h1>{" "}
                <CircleArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </ButtonCrach>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
