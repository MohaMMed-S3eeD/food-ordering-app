import React from "react";
import MainHeading from "@/components/Main_Heading";
import { Clock, Truck, Shield, Star } from "lucide-react";
import { useTranslations } from "next-intl";

const Features = () => {
  const t = useTranslations("features");
  
  const features = [
    {
      icon: Clock,
      titleKey: "fastDelivery.title",
      descriptionKey: "fastDelivery.description"
    },
    {
      icon: Shield,
      titleKey: "qualityGuaranteed.title",
      descriptionKey: "qualityGuaranteed.description"
    },
    {
      icon: Star,
      titleKey: "bestTaste.title", 
      descriptionKey: "bestTaste.description"
    },
    {
      icon: Truck,
      titleKey: "freeDelivery.title",
      descriptionKey: "freeDelivery.description"
    }
  ];
  
  return (
    <section className="section-gap bg-muted/30 py-10">
      <div className="container">
        <div className="text-center mb-12">
          <MainHeading
            title={t("title")}
            subTitle={t("subTitle")}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="text-center p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(feature.descriptionKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;