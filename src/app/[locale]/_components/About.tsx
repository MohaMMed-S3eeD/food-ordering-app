import { useTranslations } from "next-intl";
import React from "react";
import MainHeading from "@/components/Main_Heading";
import Image from "next/image";

const About = () => {
  const t = useTranslations("home.about");

  return (
    <section className="section-gap bg-muted/30 py-10">
      <div className="container">
        <div className="text-center mb-12">
          <MainHeading />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* النص والوصف */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                {t("descriptions.one")}
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                {t("descriptions.two")}
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                {t("descriptions.three")}
              </p>
            </div>
          </div>

          {/* الصورة */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dtvr83fb3/image/upload/v1754017096/Pngtree_burger_with_fries_delicious_fast_21052980_z8v6cd.png"
              alt="About us"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
